import Bytez from "bytez.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR BYTEZ KEY HERE");

const model = client.model("ali-vilab/text-to-video-ms-1.7b");

await model.load();

const { output_mp4 } = await model.run("A cat playing with a rose");

const buffer = Buffer.from(output_mp4, "base64");

// Write the image to the local file system
writeFileSync(`${__dirname}/output.mp4`, buffer);

const a = 2;
