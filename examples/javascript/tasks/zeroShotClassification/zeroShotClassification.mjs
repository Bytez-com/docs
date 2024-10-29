import Bytez from "bytez.js";

const client = new Bytez("YOUR BYTEZ KEY HERE");

const model = client.model("facebook/bart-large-mnli");

await model.load();

const input = {
  text: "One day I will see the world",
  candidate_labels: ["travel", "cooking", "dancing"]
};

const { output } = await model.run(input);

// depending on the model, there may be additional props returned
console.log(output);

const { sequence, labels, scores } = output;

const labelObjects = labels.map((v, i) => ({
  sequence,
  label: v,
  score: scores[i]
}));

// sort desc
labelObjects.sort((a, b) => (a.score < b.score ? 1 : -1));

for (const labelObject of labelObjects) {
  const { sequence, label, score } = labelObject;

  console.log({ sequence, label, score });
}
