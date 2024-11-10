import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const imgUrl =
  "https://www.padoniavets.com/sites/default/files/field/image/cats-and-dogs.jpg";

const model = client.model("google/vit-base-patch16-224");

await model.load();

const { output: labelObjects } = await model.run(imgUrl);

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { label, score } = labelObject;

  console.log({ label, score });
}
