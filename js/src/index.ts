import Inference from "./interface/inference";
import {
  modelOptionDefaults,
  modelOptionMapper,
  ModelOptions
} from "./interface/model";

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
    /** List your serverless instances */
    instances: () => this.#client._request("model/instances")
  };
  /**
   * Make a HuggingFace model serverless + available on this API! Running this command queues a job. You'll receive an email when the model is ready.
   * @param modelId The HuggingFace modelId, for example `openai-community/gpt2`
   */
  process = () => this.#client._request("model/job");
  /**
   * Get a model, so you can check its status, load, run, or shut it down
   * @param modelId The HuggingFace modelId, for example `openai-community/gpt2`
   */
  model(modelId: string): Model {
    // const modelOptions = { ...modelOptionDefaults, ...options };

    return new Model(this.#client, modelId);
  }
}

class Model {
  constructor(client: Client, modelId: string) {
    this.#client = client;
    this.id = modelId;
    this.options = modelOptionDefaults;
    this.#body = { model: this.id };
  }
  #client: Client;
  #body: object;
  /** The HuggingFace modelId, for example `openai-community/gpt2` */
  id: string;
  /** The serverless configuration */
  options = modelOptionDefaults;
  // methods
  /**
   * Convenience method to model.start(), and then await for model to be ready.
   *
   * @param modelId The HuggingFace modelId, for example `openai-community/gpt2`
   * @param options Serverless configuration
   */
  async load(options?: ModelOptions): Promise<any> {
    await this.start(options);

    do {
      await new Promise(resolve => setTimeout(resolve, 10e3));

      var { status } = await this.status();
    } while (status === "DEPLOYING");
  }
  /**
   * Start a serverless model
   * @param modelId The HuggingFace modelId, for example `openai-community/gpt2`
   * @param options Serverless configuration
   */
  start(options?: ModelOptions) {
    this.options = { ...this.options, ...options };

    return this.#client._request("model/load", {
      ...this.#body,
      ...modelOptionMapper(this.options)
    });
  }
  /** Check the status of this model */
  status() {
    return this.#client._request("model/status", this.#body);
  }
  /** Models auto-shutdown, though you can early stop with this method */
  stop() {
    return this.#client._request("model/delete", this.#body);
  }
  /** Run model */
  run(input: string, options: Inference = {}) {
    if (typeof input !== "string") {
      throw "Sorry, only text inputs are allowed for now";
    }
    const { stream = false, ...params } = options;

    return this.#client._request(
      "model/run",
      { ...this.#body, prompt: input, params, stream },
      stream
    );
  }
}
