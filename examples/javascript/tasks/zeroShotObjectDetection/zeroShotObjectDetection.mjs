import Bytez from "bytez.js";

const client = new Bytez("YOUR BYTEZ KEY HERE");

const inputImageBase64 = await getBase64Image(
  "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
);

const model = client.model("BilelDJ/clip-hugging-face-finetuned");

await model.load();

const input = {
  b64ImageBufferPng: inputImageBase64,
  candidate_labels: ["squid", "octopus", "human", "cat"]
};

const { output: labelObjects } = await model.run(input);

// sort desc
labelObjects.sort((a, b) => (a.score < b.score ? 1 : -1));

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { score, label } = labelObject;

  console.log({ score, label });
}

async function getBase64Image(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer(); // Get the image as arrayBuffer
  const buffer = Buffer.from(arrayBuffer); // Convert it to a Buffer
  return buffer.toString("base64"); // Convert the buffer to base64
}
