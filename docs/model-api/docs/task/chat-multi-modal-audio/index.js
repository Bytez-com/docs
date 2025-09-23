import Bytez from 'bytez.js';

// insert your key
const sdk = new Bytez('BYTEZ_KEY');
// choose your chat model
const model = sdk.model('Qwen/Qwen2-Audio-7B-Instruct');
// init the model
await model.create();
// provide the model your chat session
const messages = [
  {
    role: 'user',
    content: [
      { type: 'text', text: 'Describe this audio' },
      {
        type: 'audio',
        url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
      },
    ],
  },
];
const stream = true;
// send to model
const readStream = await model.run(messages, stream);

let text = '';

for await (const chunk of readStream) {
  text += chunk;
  console.log(chunk);
}

console.log({ text });
