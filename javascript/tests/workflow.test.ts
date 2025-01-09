// import assert from "node:assert/strict";
// import { describe, it, after } from "node:test";
// //
// // import Bytez from "bytez.js";
// import Bytez from "../src/index";

// async function getDataUrl(url: string) {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   const buffer = await blob.arrayBuffer().then(Buffer.from);

//   return `data:${blob.type};base64,${buffer.toString("base64")}`;
// }

// const bytez = new Bytez(process.env.BYTEZ_KEY ?? "", true);

// describe.skip("single", async () => {
//   const model = bytez.model("openai-community/gpt2");
//   const sequence = [model];
//   const pipeline = bytez.workflow.pipeline(sequence);

//   it("runs", async () => {
//     const { error, output } = await pipeline.run("Hello there");

//     assert(error === null);
//     assert(typeof output === "string" && output.length !== 0, "returns output");
//   });

//   after(pipeline.destroy);
// });

// describe.skip("sequence", async () => {
//   const sequence = [
//     bytez.model("facebook/detr-resnet-101"),
//     bytez.model("nlpconnect/vit-gpt2-image-captioning")
//   ];

//   const pipeline = bytez.workflow.pipeline(sequence);

//   it("test", async () => {
//     const { error, output } = await sequence[0].run(
//       "http://images.cocodataset.org/val2017/000000039769.jpg"
//     );

//     console.log({ error, output });
//   });
//   it.skip("runs", async () => {
//     const { error, output } = await pipeline.run(
//       "http://images.cocodataset.org/val2017/000000039769.jpg"
//     );

//     console.log({ error, output });

//     assert(error === null);
//     // assert(typeof output === "string" && output.length !== 0, "returns output");
//   });

//   after(pipeline.destroy);
// });
