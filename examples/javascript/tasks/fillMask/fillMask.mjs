import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("almanach/camembert-base");

await model.load();

const { output: sequenceObjects } = await model.run(
  "The capital of France is <mask>."
);

for (const sequenceObject of sequenceObjects) {
  // depending on the model, there may be additional props returned
  console.log(sequenceObject);

  const { sequence, score, token, token_str } = sequenceObject;

  console.log({ sequence, score, token, token_str });
}
