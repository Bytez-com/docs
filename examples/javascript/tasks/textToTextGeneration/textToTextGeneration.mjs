import Bytez from "bytez.js";

const client = new Bytez("YOUR BYTEZ KEY HERE");

const modelParams = { max_new_tokens: 20, temperature: 2 };

const model = client.model("google/flan-t5-base");

await model.load();

const { output: [{ generated_text } = {}] = [] } = await model.run(
  "Once upon a time there was a small little man who",
  modelParams
);

console.log(generated_text);
