import Inference from "./interface/inference";
import PostBody from "./interface/postBody";
import {
  modelOptionDefaults,
  modelOptionMapper,
  ModelOptions
} from "./interface/model";
import { Task } from "./interface/task";

class Client {
  constructor(apiKey: string, dev = false) {
    this.host = dev ? "http://localhost:8080/" : "https://api.bytez.com/";
    this.headers = {
      Authorization: `Key ${apiKey}`,
      "content-type": "application/json"
    };
  }
  host = "";
  headers = {};
  async _request(path = "", body?: PostBody) {
    try {
      const res = await fetch(this.host + path, {
        headers: this.headers,
        method: body ? "POST" : undefined,
        body: body ? JSON.stringify(body) : undefined
      });

      if (body?.stream) {
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
  constructor(apiKey: string, dev = false) {
    this.#client = new Client(apiKey, dev);
  }
  #client: Client;

  list = {
    models: {
      /** Lists the currently available models, and provides basic information about each one, such as RAM required */
      all: () => this.#client._request("model/list"),
      byTask: (task: Task) => this.#client._request(`model/list?task=${task}`)
    },
    /** List your serverless instances */
    instances: () => this.#client._request("model/instances")
  };
  /**
   * Make a HuggingFace model serverless + available on this API! Running this command queues a job. You'll receive an email when the model is ready.
   * @param modelId The HuggingFace modelId, for example `openai-community/gpt2`
   */
  process = (modelId: string) =>
    this.#client._request("model/job", { model: modelId });
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

    // this.#client._request(`model/get/${modelId}`).then(({ task }) => {
    //   this.#task = task;
    // });
  }
  #client: Client;
  // #task: string;
  #body: PostBody;
  /** The HuggingFace modelId, for example `openai-community/gpt2` */
  id: string;
  /** The serverless configuration */
  options = modelOptionDefaults;
  // methods
  /**
   * Convenience method to model.start(), and then await for model to be ready.
   *
   * @param options Serverless configuration
   */
  async load(options?: ModelOptions): Promise<any> {
    let { status, error } = await this.start(options);

    status ??= error?.includes?.("already loaded") ? "RUNNING" : "";

    while (status !== "FAILED" && status !== "RUNNING") {
      ({ status } = await this.status());

      if (status !== "RUNNING") {
        if (status !== lastStatus) {
          var lastStatus = status;

          console.log(status);
        }

        await new Promise(resolve => setTimeout(resolve, 5e3));
      }
    }
  }
  /**
   * Start a serverless model
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
  run(input: any, options: Inference = {}) {
    const { stream = false, ...params } = options;
    let postBody = { stream, params, ...this.#body };

    if (input?.constructor === Object) {
      postBody = { ...postBody, ...input };
    } else {
      postBody.input = input;
    }

    return this.#client._request("model/run", postBody);
  }
}
