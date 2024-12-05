import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputImage =
  "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg";

const model = client.model("nomic-ai/nomic-embed-vision-v1");

await model.load();

const { output: embedding } = await model.run(inputImage);

console.log(embedding);
