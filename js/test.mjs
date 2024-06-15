import assert from "node:assert/strict";
import { describe, test, it } from "node:test";
//
import Bytez from "./src/index.js";

const client = new Bytez(process.env.BYTEZ_KEY);

describe("bytez.js", async () => {
  it("list models", async () => {
    const list = await client.list.models();

    assert(Array.isArray(list), "should return array of models");
    assert(list.length !== 0, "array is not empty");
    assert(
      list.every(
        model => model.name !== undefined && model.requiredRamGB !== undefined
      ),
      "all models should have name and RAM"
    );
  });
  const modelId = "openai-community/gpt2";
  const model = client.model(modelId);
  // const model = await client.load(modelId);

  it("loads a model", () => {
    assert(model.id === modelId, "loads the right model");
  });
  await it("returns model status", async () => {
    const { status } = await model.status();

    assert(status === "DEPLOYING", "returns status deploying");
  });
  // await test("list models", async () => {
  //   const list = await client.list.models();

  //   it("should return array of models", () => {
  //     equal(Array.isArray(list), true);
  //     equal(list.length !== 0, true);
  //   });
  //   it("should have models with name and RAM", () => {
  //     console.log(
  //       list.every(
  //         model => model.name !== undefined && model.requiredRamGB !== undefined
  //       )
  //     );
  //     equal(
  //       list.every(
  //         model => model.name !== undefined && model.requiredRamGB !== undefined
  //       )
  //     );
  //   });
  // });
});
// const model = await client.load("openai", { precision });
