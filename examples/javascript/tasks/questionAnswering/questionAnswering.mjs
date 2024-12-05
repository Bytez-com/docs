import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("deepset/roberta-base-squad2");

await model.load();

const QA_input = {
  question: "Where does Holly live?",
  context: "My name is Holly and I live in NYC"
};

const { output } = await model.run(QA_input);

// depending on the model, there may be additional props returned
console.log(output);

const { answer, score, start, end } = output;

console.log({
  answer,
  score,
  start,
  end
});
