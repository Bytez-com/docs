import Bytez from "bytez.js";

const client = new Bytez("YOUR BYTEZ KEY HERE");

const inputText = "Hello, how are you? Beautiful day today, isn't it?";

const model = client.model("Helsinki-NLP/opus-mt-en-zh");

await model.load();

const { output: [{ translation_text }] } = await model.run(inputText);

console.log(translation_text);
