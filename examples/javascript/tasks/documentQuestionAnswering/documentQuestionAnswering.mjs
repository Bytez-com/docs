import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("cloudqi/CQI_Visual_Question_Awnser_PT_v0");

await model.load();

const input = {
  image: "https://templates.invoicehome.com/invoice-template-us-neat-750px.png",
  question: "How many hours of labor?"
};

const { output } = await model.run(input);

// depending on the model, there may be additional props returned
console.log(output);

const [{ answer, score, start, end }] = output;

console.log({ answer, score, start, end });
