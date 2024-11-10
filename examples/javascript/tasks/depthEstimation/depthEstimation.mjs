import Bytez from "bytez.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputImage =
  "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg";

const model = client.model("vinvino02/glpn-nyu");

await model.load();

const { output } = await model.run(inputImage);

const { depth_png, formatted_predicted_depth_array } = output;

///// Decode and view the image /////
const imgBuffer = Buffer.from(depth_png, "base64");

const imagePath = `${__dirname}/testImage.png`;

writeFileSync(imagePath, imgBuffer);

// write the original image for comparison, you could also just ctrl+click the url

const originalImagePath = `${__dirname}/originalImage.jpg`;

const response = await fetch(inputImage);

const arrayBuffer = await response.arrayBuffer();

const buffer = Buffer.from(arrayBuffer);

writeFileSync(originalImagePath, buffer);

// compare the two images by opening theme where they were written
console.log("Wrote the original image to: ", originalImagePath);
console.log("Wrote the inference image to: ", imagePath);

///// 2d depth map, object representation of the pixel values for the depth map /////
const rows = formatted_predicted_depth_array;
for (let j = 0; j < rows.length; j++) {
  const row = formatted_predicted_depth_array[j];

  for (let i = 0; i < row.length; i++) {
    // insert code here if you need these values directly
    const pixel = row[i];
  }
}
