import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputText = "Your text for feature extraction goes here...";

const model = client.model("Salesforce/SFR-Embedding-2_R");

await model.load();

const {
  output: [embedding]
} = await model.run(inputText);

console.log(embedding);
