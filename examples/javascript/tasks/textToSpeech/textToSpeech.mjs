import Bytez from "bytez.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("suno/bark-small");

await model.load();

const { output_wav } = await model.run("Hello, how are you today?");

const buffer = Buffer.from(output_wav, "base64");

// Write the image to the local file system
writeFileSync(`${__dirname}/output.wav`, buffer);
