import Bytez from "bytez.js";

const client = new Bytez("YOUR BYTEZ KEY HERE");

const messages = [
  {
    role: "system",
    content: "You are a friendly chatbot",
  },
  {
    role: "user",
    content: "What is the capital of England?",
  },
];

const model = client.model("microsoft/Phi-3-mini-4k-instruct");

await model.load();

const { output } = await model.run(messages, { max_length: 100 });

const [{ generated_text }] = output;

for (const message of generated_text) {
  // depending on the model, there may be additional props returned
  console.log(message);

  const { content, role } = message;

  console.log({ content, role });
}
