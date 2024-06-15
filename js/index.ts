import Inference from "./interface/inference";
import ModelOptions from "./interface/model";

class Client {
  constructor(apiKey: string) {
    this.auth = { Authorization: `Key ${apiKey}` };
  }
  auth = {};
  async _request(path = "", body?: object | undefined, stream = false) {
    try {
      const res = await fetch(`https://api.bytez.com/${path}`, {
        method: body ? "POST" : "GET",
        body: body ? JSON.stringify(body) : undefined,
        headers: body
          ? { ...this.auth, "Content-Type": "application/json" }
          : this.auth
      });

      if (stream) {
        return res.body;
      } else {
        const json = await res.json();

        if (res.ok) {
          return json;
        } else {
          throw json.error;
        }
      }
    } catch (error) {
      return { error };
    }
  }
}
/**
 * API Client for interfacing with the Bytez API.
 * @param apiKey Your Bytez API key
 */
export default class Bytez {
  constructor(apiKey: string) {
    this.#client = new Client(apiKey);
  }
  #client: Client;

  list = {
    /** Lists the currently available models, and provides basic information about each one, such as RAM required */
    models: () => this.#client._request("model/list"),
    /** List running serverless instances */
    runningInstances: () => this.#client._request("model/instances")
  };
  /**
   * Make a HuggingFace model serverless + available on this API! Running this command queues a job. You'll receive an email when the model is ready.
   * @param modelId The HuggingFace modelId, for example `openai-community/gpt2`
   */
  process = () => this.#client._request("model/job");
  /**
   * Load a serverless model
   * @param modelId The HuggingFace modelId, for example `openai-community/gpt2`
   * @param options Serverless configuration
   */
  async load(modelId: string, options: Partial<ModelOptions> = {}) {
    const model = new Model(this.#client, modelId, options);

    await this.#client._request("model/load", {
      model: modelId,
      ...model.options
    });

    return model;
  }
}

class Model {
  constructor(
    client: Client,
    modelId: string,
    options: Partial<ModelOptions> = {}
  ) {
    this.#client = client;
    this.id = modelId;
    this.options = options;
    this.#body = { model: this.id };
  }
  #client: Client;
  #body: object;
  /** The HuggingFace modelId, for example `openai-community/gpt2` */
  id: string;
  /** The serverless configuration */
  options: ModelOptions;
  // methods
  /** Check the loaded model's status */
  status() {
    return this.#client._request("model/status", this.#body);
  }
  /** Shutdown a loaded model */
  terminate() {
    return this.#client._request("model/delete", this.#body);
  }
  /** Run model */
  run(input: string, options: Inference = {}) {
    if (typeof input !== "string") {
      throw "Sorry, only text inputs are allowed for now";
    }
    const { stream = true, ...params } = options;

    return this.#client._request(
      "model/run",
      { ...this.#body, prompt: input, params, stream },
      stream
    );
  }
}