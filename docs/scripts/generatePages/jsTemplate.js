import Bytez from 'bytez.js';

// insert your key
const sdk = new Bytez('BYTEZ_KEY');

// choose your model
const model = sdk.model('$MODEL_ID');

// provide the model with input
const input = '$INPUT';
// $PARAMS_SECTION

// provide the model with params
const params = '$PARAMS_PAYLOAD';
// $NON_STREAMING_SECTION

// send to the model
const { error, output } = await model.run(input, params);

// observe the output
console.log({ error, output });

// $STREAMING_SECTION

// set streaming to "true"
const stream = true;

// send to the model
const readStream = await model.run(input, params, stream);

let text = '';

for await (const chunk of readStream) {
  text += chunk;
  console.log(chunk);
}

// observe the output
console.log({ text });
