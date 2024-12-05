import Client from "./client";
import Model from "./model";
import { Pipeline, DAG } from "./workflow";
// interfaces
import { ListModels } from "./interface/List";
import { Response } from "./interface/Client";
import Inference from "./interface/inference";

<<<<<<< HEAD
=======
const ONE_MINUTE_MS = 1e3 * 60;
const MODEL_LOAD_TIMEOUT_MINUTES = 15;
const MODEL_LOAD_TIMEOUT_MINUTES_AS_MS =
  ONE_MINUTE_MS * MODEL_LOAD_TIMEOUT_MINUTES;

class HttpError extends Error {
  constructor(...args) {
    super(...args);
  }
  httpStatus: number;
}

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
          const error = new HttpError(json.error);
          error.httpStatus = res.status;
          throw error;
        }
      }
    } catch (error) {
      return { error };
    }
  }
}
>>>>>>> bde0891a7e55ef0e7e361de77664398ed96a72af
/**
 * API Client for interfacing with the Bytez API.
 * @param apiKey Your Bytez API key
 */
export default class Bytez {
  constructor(apiKey: string, dev = false, browser?: boolean) {
    this.#client = new Client(apiKey, dev, browser);
  }
  #client: Client;

  list = {
    /** List your auto-scaling clusters */
    clusters: (): Promise<Response> =>
      this.#client.request("list/clusters") as Promise<Response>,
    /** Lists available models, and provides basic information about each one, such as RAM required */
    models: (options?: ListModels): Promise<Response> =>
      this.#client.request(
        `list/models${options?.task ? `?task=${options?.task}` : ""}${
          options?.modelId ? `?modelId=${options?.modelId}` : ""
        }`
      ) as Promise<Response>,
    /** List available tasks */
    tasks: (): Promise<Response> =>
      this.#client.request("list/tasks") as Promise<Response>
  };
  /**
   * Get a model - allows you to run closed and open source models
   * @param modelId The modelId, for example `openai-community/gpt2`
   * @param params Optional default model params, for example { temperature: 0 }
   */
<<<<<<< HEAD
  model = (modelId: string, params?: Inference): Model =>
    new Model(modelId, this, this.#client, params);

  workflow = {
    pipeline: (sequence: Model[]) => new Pipeline(sequence),
    dag: (nodes, edges) => new DAG(nodes, edges)
  };
=======
  async load(options?: ModelOptions): Promise<void> {
    const { error }: { error: HttpError } = await this.start(options);

    if (error) {
      // Model is already loaded
      if (error.httpStatus === 409) {
        return;
      }
      // We allow 429's to proceed, that means that a loading operation is already in progress
      if (
        error.httpStatus !== 429 ||
        // TODO remove this when the backend uses the correct status code, 402
        error.message.includes("credits")
      ) {
        throw error;
      }
    }

    const timeToTimeOut = Date.now() + MODEL_LOAD_TIMEOUT_MINUTES_AS_MS;

    let status = "UNSET";
    while (Date.now() < timeToTimeOut) {
      const { status: newStatus, error } = await this.status();

      if (status !== newStatus) {
        status = newStatus;
        console.log(status);
      }

      if (status === "RUNNING") {
        return;
      }

      if (status === "FAILED") {
        throw new Error(error);
      }

      await new Promise(resolve => setTimeout(resolve, 5e3));
    }

    throw new Error(
      `Model loading timed out after: ${MODEL_LOAD_TIMEOUT_MINUTES} minutes`
    );
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
  async run(input: any, options: Inference = {}) {
    const { stream = false, ...params } = options;
    let postBody = { stream, params, ...this.#body };

    if (input?.constructor === Object) {
      postBody = { ...postBody, ...input };
    } else {
      postBody.input = input;
    }

    const results = await this.#client._request("model/run", postBody);

    if (results.error !== undefined) {
      throw new Error(results.error);
    }

    return results;
  }
>>>>>>> bde0891a7e55ef0e7e361de77664398ed96a72af
}
