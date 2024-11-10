import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("Salesforce/blip-vqa-base");

await model.load();

const input = {
  image:
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9",
  question: "What kind of animal is this?"
};

const { output: outputs } = await model.run(input);

const [{ answer }] = outputs;

console.log(answer);
