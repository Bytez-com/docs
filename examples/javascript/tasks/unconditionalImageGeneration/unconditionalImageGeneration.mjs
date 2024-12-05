import Bytez from "bytez.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("afshr/cam_finetune");

await model.load();

const { output_png } = await model.run("A rose");

const buffer = Buffer.from(output_png, "base64");

// Write the image to the local file system
writeFileSync(`${__dirname}/output.png`, buffer);
