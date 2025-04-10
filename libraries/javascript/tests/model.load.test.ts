// import assert from "node:assert/strict";
// import { describe, it } from "node:test";
// //
// // import Bytez from "bytez.js";
// import Bytez from "../src/index";

// const client = new Bytez(process.env.BYTEZ_KEY ?? "");

// describe("model.load()", async () => {
//   it("throws an error if user is out of credits", async () => {
//     const model = client.model("aaraki/wav2vec2-base-finetuned-ks");
//     const _start = model.start;

//     const mockResponse = {
//       status: undefined,
//       error: new Error(
//         "Out of free monthly credits. Wait until next month for more free credits, or upgrade to premium for immediate access"
//       )
//     };

//     model.start = async () => mockResponse;

//     try {
//       await model.load();
//     } catch (error) {
//       assert(
//         error.message === mockResponse.error.message,
//         "an error should be throw when out of credits"
//       );
//       return;
//     } finally {
//       model.start = _start;
//     }

//     throw new Error("model.load() did not throw");
//   });
// });
