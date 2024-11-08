using Bytez
using LinearAlgebra

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("sentence-transformers/all-MiniLM-L6-v2")

model.load()

sentences = [
	"What is the weather like today?",
	"Is it sunny today?",
	"The e39 BMW M5 was one of the best production sport sedans ever produced.",
]

results = []

# Get embeddings for each sentence
for sentence in sentences
	result = model.run(sentence)
	embedding = result["output"]

	println(Dict("embedding" => embedding))

	push!(results, Dict("embedding" => embedding, "sentence" => sentence))
end

# Extract the original sentence's embedding and the embeddings to compare
original_sentence_with_embedding = results[1]
sentences_to_compare = results[2:end]


function cosine_similarity(embedding1, embedding2)
	embedding1 = collect(embedding1)
	embedding2 = collect(embedding2)

	dot_product = dot(embedding1, embedding2)
	magnitude1 = norm(embedding1)
	magnitude2 = norm(embedding2)

	similarity = dot_product / (magnitude1 * magnitude2)

	return similarity
end

# Calculate and display cosine similarity for each comparison
for sentence_object in sentences_to_compare
	similarity = cosine_similarity(
		original_sentence_with_embedding["embedding"], sentence_object["embedding"],
	)
	println(
		"Cosine similarity between \"$(original_sentence_with_embedding["sentence"])\" and \"$(sentence_object["sentence"])\": $similarity",
	)
end
