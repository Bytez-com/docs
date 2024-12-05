import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputAudioBase64 = await getBase64Audio(
  "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav"
);

const model = client.model("aaraki/wav2vec2-base-finetuned-ks");

await model.load();

const { output: labelObjects } = await model.run({
  b64AudioBufferWav: inputAudioBase64
});

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { score, label } = labelObject;

  console.log({ score, label });
}

async function getBase64Audio(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  // Convert the ArrayBuffer to a Buffer
  const buffer = Buffer.from(arrayBuffer);

  // Convert the binary data in the buffer to a base64 string
  return buffer.toString("base64");
}
