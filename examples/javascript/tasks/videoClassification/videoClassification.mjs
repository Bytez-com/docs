import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const videoUrl =
  "https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4";

const model = client.model("ahmedabdo/video-classifier");

await model.load();

const { output: outputs } = await model.run(videoUrl);

const [labelObjects] = outputs;

// sort desc
labelObjects.sort((a, b) => (a.score < b.score ? 1 : -1));

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { score, label } = labelObject;

  console.log({ score, label });
}
