import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("dslim/bert-base-NER");

await model.load();

const { output: wordObjects } = await model.run(
  "John Doe is a software engineer at Google."
);

for (const wordObject of wordObjects) {
  // depending on the model, there may be additional props returned
  console.log(wordObject);

  const { word, entity, score, index, start, end } = wordObject;

  console.log({ word, entity, score, index, start, end });
}
