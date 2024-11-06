from bytez import Bytez
import numpy as np

client = Bytez("YOUR BYTEZ KEY HERE")

# Load and run the model
model = client.model("sentence-transformers/all-MiniLM-L6-v2")
model.load()

sentences = [
    "What is the weather like today?",
    "Is it sunny today?",
    "The e39 BMW M5 was one of the best production sport sedans ever produced.",
]

results = []

# Get embeddings for each sentence
for sentence in sentences:
    result = model.run(sentence)
    embedding = result.get("output")

    print({"embedding": embedding})

    results.append({"embedding": embedding, "sentence": sentence})

# Extract the original sentence's embedding and the embeddings to compare
original_sentence_with_embedding = results[0]
sentences_to_compare = results[1:]


def cosine_similarity(embedding1, embedding2):
    embedding1 = np.array(embedding1)
    embedding2 = np.array(embedding2)

    dot_product = np.dot(embedding1, embedding2)
    magnitude1 = np.linalg.norm(embedding1)
    magnitude2 = np.linalg.norm(embedding2)

    similarity = dot_product / (magnitude1 * magnitude2)

    return similarity


# Calculate and display cosine similarity for each comparison
for sentence_object in sentences_to_compare:
    similarity = cosine_similarity(
        original_sentence_with_embedding["embedding"], sentence_object["embedding"]
    )
    print(
        f'Cosine similarity between "{original_sentence_with_embedding["sentence"]}" and "{sentence_object["sentence"]}": {similarity}'
    )
