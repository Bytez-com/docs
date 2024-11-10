import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputText = "We are furious with the results of the experiment!";

const model = client.model(
  "AdamCodd/distilbert-base-uncased-finetuned-sentiment-amazon"
);

await model.load();

const { output: labelObjects } = await model.run(inputText);

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { label, score } = labelObject;

  console.log({ label, score });
}
