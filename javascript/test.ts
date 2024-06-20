import assert from "node:assert/strict";
import { describe, it } from "node:test";
//
import Bytez from "bytez.js";
// import Bytez from "./src/index";

const client = new Bytez(process.env.BYTEZ_KEY ?? "");

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

  it("lists running instances", async () => {
    const instances = await client.list.instances();

    assert(Array.isArray(instances), "should return array of instances");
  });

  const modelId = "openai-community/gpt2";
  const model = client.model(modelId);

  it("creates a model class", () => {
    assert(model.id === modelId, "loads the right model");
  });

  await it("starts a model", async () => {
    const { status, error } = await model.start();

    if (status) {
      assert(status === "started", "model starts");
    } else {
      assert(
        error.includes("already loaded") ||
          (error.includes(modelId) &&
            error.includes("operation already in progress: load")),
        "model already started"
      );
    }
  });

  it("returns model status", async () => {
    const { status } = await model.status();

    assert(
      ["STARTING", "RUNNING", "INSTANTIATING"].includes(status),
      "returns status deploying"
    );
  });

  await it("awaits model load", async () => {
    await model.load();

    const { status } = await model.status();

    assert(status === "RUNNING", "model is now running");
  });

  await it("runs a model", async () => {
    const response = await model.run("Jack and jill");
    console.log(response);
    assert(
      typeof response.output?.[0]?.generated_text === "string",
      "returns output"
    );
  });

  await it("streams text", async () => {
    const stream = await model.run("Jack and jill", {
      stream: true
    });
    const textStream = stream.pipeThrough(new TextDecoderStream());
    let testPass = false;
    // console.log(textStream);

    for await (const chunk of textStream) {
      // console.log({ chunk });
      if (testPass === false) {
        testPass = typeof chunk === "string";
        assert(testPass, "streams output");
      }
    }
  });

  await it("runs a model with params", async () => {
    const input = "Jack and Jill ";
    const response = await model.run(input, {
      min_new_tokens: 1,
      max_new_tokens: 1
    });
    // console.log(response);
    const newText = response.output?.[0]?.generated_text;
    // console.log(newText);
    assert(typeof newText === "string", "returns output");
    assert(
      newText.split(" ").length === input.trim().split(" ").length + 1,
      "returns output"
    );
  });

  await it("stops a model", async () => {
    await model.stop();

    const response = await model.status();

    assert(response.status !== "RUNNING", "model is stopped");
  });
});
