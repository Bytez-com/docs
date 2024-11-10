import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputAudioBase64 = await getBase64Audio(
  "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/automatic-speech-recognition/input.flac"
);

const model = client.model("facebook/data2vec-audio-base-960h");

await model.load();

const { output } = await model.run({ b64AudioBufferWav: inputAudioBase64 });

// depending on the model, there may be additional props returned
console.log(output);

const { text } = output;

console.log("Inference is: ", text);

await model.stop();

async function getBase64Audio(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  // Convert the ArrayBuffer to a Buffer
  const buffer = Buffer.from(arrayBuffer);

  // Convert the binary data in the buffer to a base64 string
  return buffer.toString("base64");
}
