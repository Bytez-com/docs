import Bytez from "bytez.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR BYTEZ KEY HERE");

const model = client.model("dreamlike-art/dreamlike-photoreal-2.0");

await model.load();

const { output_png } = await model.run(
  "A beautiful landscape with mountains and a river"
);

const buffer = Buffer.from(output_png, "base64");

// Write the image to the local file system
writeFileSync(`${__dirname}/output.png`, buffer);
