import Bytez from "bytez.js";

const client = new Bytez("YOUR BYTEZ KEY HERE");

const model = client.model("BilelDJ/clip-hugging-face-finetuned");

await model.load();

const input = {
  image:
    "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg",
  candidate_labels: ["squid", "octopus", "human", "cat"]
};

const { output: labelObjects } = await model.run(input);

// sort desc
labelObjects.sort((a, b) => (a.score < b.score ? 1 : -1));

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { score, label } = labelObject;

  console.log({ score, label });
}
