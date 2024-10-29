import Bytez from "bytez.js";

const client = new Bytez("YOUR BYTEZ KEY HERE");

const modelParams = {
  max_new_tokens: 500,
  min_new_tokens: 50,
  temperature: 0.5
};

const model = client.model("Qwen/Qwen2-7B-Instruct");

await model.load();

const stream = await model.run(
  "Once upon a time there was a beautiful home where",
  { stream: true, ...modelParams }
);

const reader = stream.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(new TextDecoder().decode(value));
}
