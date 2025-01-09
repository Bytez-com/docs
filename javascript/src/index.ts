import Client from "./client";
import Model from "./model";
// import { Pipeline, DAG } from "./workflow";
// interfaces
import { ListModels } from "./interface/List";
import { Response } from "./interface/Client";
import Inference from "./interface/inference";

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
  model = (modelId: string, params?: Inference): Model =>
    new Model(modelId, this, this.#client, params);

  // workflow = {
  //   pipeline: (sequence: Model[]) => new Pipeline(sequence),
  //   dag: (nodes, edges) => new DAG(nodes, edges)
  // };
}
