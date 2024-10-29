import Bytez from "bytez.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { writeFileSync, readFileSync } from "node:fs";
import { PNG } from "pngjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR BYTEZ KEY HERE");

const inputImageBase64 = await getBase64Image(
  "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png"
);

const model = client.model("facebook/sam-vit-base");

await model.load();

const { output } = await model.run({ b64ImageBufferPng: inputImageBase64 });

console.log(output);

const { input_image_dimensions, masks, scores } = output;

console.log({ input_image_dimensions, masks, scores });

// to then visualize the masks:
const testMasksPath = `${__dirname}/testMasks.json`;

writeFileSync(testMasksPath, JSON.stringify(masks, null, 2));

const testMasks = JSON.parse(readFileSync(testMasksPath));

writeMasksToImage(inputImageBase64, testMasks);

function writeMasksToImage(inputImageBase64, masks) {
  // Decode the base64 image buffer
  const srcImgBuffer = Buffer.from(inputImageBase64, "base64");
  const srcPng = PNG.sync.read(srcImgBuffer);

  // Function to apply masks to the image
  function applyMasks(srcPng, masks) {
    const colors = [
      { r: 255, g: 0, b: 0, a: 50 }, // Red
      { r: 0, g: 255, b: 0, a: 50 }, // Green
      { r: 0, g: 0, b: 255, a: 50 }, // Blue
      { r: 255, g: 255, b: 0, a: 50 } // Yellow
      // Add more colors if needed
    ];

    masks.forEach((mask, maskIndex) => {
      const color = colors[maskIndex % colors.length]; // Cycle through colors if more masks than colors

      for (let i = 0; i < mask.length; i++) {
        const row = mask[i];
        for (let j = 0; j < row.length; j++) {
          if (row[j]) {
            // Assuming mask contains 1 for masked pixel and 0 for non-masked
            const idx = (i * srcPng.width + j) << 2;
            srcPng.data[idx] = color.r;
            srcPng.data[idx + 1] = color.g;
            srcPng.data[idx + 2] = color.b;
            srcPng.data[idx + 3] = color.a;
          }
        }
      }
    });

    return srcPng;
  }

  // Apply masks to the image
  const imgWithMasks = applyMasks(srcPng, masks);

  // Encode the image back to buffer
  const imgBuffer = PNG.sync.write(imgWithMasks);

  const imagePath = `${__dirname}/testImage.png`;

  writeFileSync(imagePath, imgBuffer);
}

async function getBase64Image(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer(); // Get the image as arrayBuffer
  const buffer = Buffer.from(arrayBuffer); // Convert it to a Buffer
  return buffer.toString("base64"); // Convert the buffer to base64
}
