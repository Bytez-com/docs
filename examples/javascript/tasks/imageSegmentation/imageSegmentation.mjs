import Bytez from "bytez.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const client = new Bytez("YOUR BYTEZ KEY HERE");

const imgUrl =
  "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";

const model = client.model("sayeed99/segformer-b3-fashion");

await model.load();

const { output: maskObjects } = await model.run(imgUrl);

for (let i = 0; i < maskObjects.length; i++) {
  // depending on the model, there may be additional props returned
  const maskObject = maskObjects[i];
  console.log(maskObject);

  const { label, score, mask_png } = maskObject;
  console.log({ label, score });

  const maskBufferPng = Buffer.from(mask_png, "base64");

  writeFileSync(`${__dirname}/mask-${i}.png`, maskBufferPng);
}
