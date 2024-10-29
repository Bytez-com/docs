import Bytez from "bytez.js";

const client = new Bytez("YOUR BYTEZ KEY HERE");

const inputImage =
  "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg";

const model = client.model("Salesforce/blip-image-captioning-base");

await model.load();

const { output } = await model.run(inputImage);

// depending on the model, there may be additional props returned
console.log(output);

const [{ generated_text }] = output;

console.log(generated_text);
