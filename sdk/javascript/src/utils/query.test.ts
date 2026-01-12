import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildListModelsPath } from "./query";

describe("buildListModelsPath", () => {
  it("returns base path when no options provided", () => {
    assert.equal(buildListModelsPath(), "list/models");
    assert.equal(buildListModelsPath({}), "list/models");
  });

  it("adds single query parameter correctly", () => {
    assert.equal(
      buildListModelsPath({ task: "chat" }),
      "list/models?task=chat"
    );
    
    assert.equal(
      buildListModelsPath({ modelId: "openai-community/gpt2" }),
      "list/models?modelId=openai-community%2Fgpt2"
    );
  });

  it("adds multiple query parameters with & separator", () => {
    const result = buildListModelsPath({
      task: "text-generation",
      modelId: "openai-community/gpt2"
    });
    
    // URLSearchParams guarantees deterministic order in modern environments
    assert.match(result, /^list\/models\?/);
    assert.match(result, /task=text-generation/);
    assert.match(result, /modelId=openai-community%2Fgpt2/);
    assert.match(result, /&/);
    
    // Ensure we don't have double question marks (the bug this fixes)
    assert.equal(result.split("?").length - 1, 1, "Should have exactly one '?'");
  });

  it("URL-encodes special characters", () => {
    const result = buildListModelsPath({
      modelId: "org/model with spaces"
    });
    
    assert.match(result, /modelId=org%2Fmodel\+with\+spaces/);
  });
});
