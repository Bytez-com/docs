import Bytez from "bytez.js";
import * as tf from "@tensorflow/tfjs"; // Import TensorFlow.js

const client = new Bytez("YOUR BYTEZ KEY HERE");

const model = client.model("sentence-transformers/all-MiniLM-L6-v2");

await model.load();

const sentences = [
  "What is the weather like today?",
  "Is it sunny today?",
  "The e39 BMW M5 was one of the best production sport sedans ever produced."
];

const results = [];

for (const sentence of sentences) {
  const { output: embedding } = await model.run(sentence);

  console.log({ embedding });

  results.push({
    embedding,
    sentence
  });
}

// Extract the original sentence's embedding and the embeddings to compare
const [originalSentenceWithEmbedding] = results;
const sentencesToCompare = results.slice(1);

function cosineSimilarity(embedding1, embedding2) {
  const tensor1 = tf.tensor(embedding1);
  const tensor2 = tf.tensor(embedding2);

  const dotProduct = tf.sum(tf.mul(tensor1, tensor2));
  const magnitude1 = tf.sqrt(tf.sum(tf.square(tensor1)));
  const magnitude2 = tf.sqrt(tf.sum(tf.square(tensor2)));

  const similarity = dotProduct.div(magnitude1.mul(magnitude2));

  return similarity.dataSync()[0]; // Extract the similarity value
}

// Calculate and display cosine similarity for each comparison
for (const sentenceObject of sentencesToCompare) {
  const similarity = cosineSimilarity(
    originalSentenceWithEmbedding.embedding,
    sentenceObject.embedding
  );
  console.log(
    `Cosine similarity between "${originalSentenceWithEmbedding.sentence}" and "${sentenceObject.sentence}":`,
    similarity
  );
}
