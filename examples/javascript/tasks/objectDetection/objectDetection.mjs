import Bytez from "bytez.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync, rmSync } from "node:fs";
import { PNG } from "pngjs";
import sharp from "sharp";
import { createCanvas } from "canvas";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");
const imgUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg";

const model = client.model("facebook/detr-resnet-50");

await model.load();

const { output: boxObjects, error } = await model.run(imgUrl);

console.log(boxObjects);

for (const boxObject of boxObjects) {
  console.log(boxObject);
  const {
    score,
    label,
    box: { xmin, ymin, xmax, ymax }
  } = boxObject;

  console.log({ score, label, box: { xmin, ymin, xmax, ymax } });
}

const res = await fetch(imgUrl);

const arrayBuffer = await res.arrayBuffer();

const b64ImageBufferJpg = Buffer.from(arrayBuffer);

const imageBufferPng = await sharp(b64ImageBufferJpg).png().toBuffer();

debugImage(imageBufferPng, boxObjects);

function debugImage(srcImgBuffer, boxObjects) {
  // writeFileSync(`${__dirname}/testBoxes.json`, JSON.stringify(boxObjects, null, 2));

  const srcPng = PNG.sync.read(srcImgBuffer);
  const width = srcPng.width;
  const height = srcPng.height;

  // Create a canvas and get the context
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Draw the image onto the canvas
  const imgData = ctx.createImageData(width, height);

  imgData.data.set(srcPng.data);

  ctx.putImageData(imgData, 0, 0);

  const colors = [
    { r: 255, g: 0, b: 0, a: 0.5, colorString: "rgba(255, 0, 0, 0.5)" }, // Red
    { r: 0, g: 255, b: 0, a: 0.5, colorString: "rgba(0, 255, 0, 0.5)" }, // Green
    { r: 0, g: 0, b: 255, a: 0.5, colorString: "rgba(0, 0, 255, 0.5)" }, // Blue
    { r: 255, g: 255, b: 0, a: 0.5, colorString: "rgba(255, 255, 0, 0.5)" } // Yellow
    // Add more colors if needed
  ];

  boxObjects.forEach((boxObject, index) => {
    const { box, score, label } = boxObject;
    const color = colors[index % colors.length]; // Cycle through colors if more boxObjects than colors

    // Draw the bounding box
    ctx.strokeStyle = color.colorString;
    ctx.lineWidth = 2;
    ctx.strokeRect(
      box.xmin,
      box.ymin,
      box.xmax - box.xmin,
      box.ymax - box.ymin
    );

    // Draw the label and score
    ctx.font = "16px Arial";
    ctx.fillStyle = color.colorString;
    ctx.fillText(`${label} (${score.toFixed(2)})`, box.xmin, box.ymin - 5);
  });

  // Encode the image back to buffer
  const imgBuffer = canvas.toBuffer("image/png");

  const imagePath = `${__dirname}/testImage.png`;

  writeFileSync(imagePath, imgBuffer);
}
