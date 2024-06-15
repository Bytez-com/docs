import Bytez from "./index.js";

const client = new Bytez(process.env);
console.log(client);

const model = await client.load("openai", { precision });
// client.list.models().then(console.log);
