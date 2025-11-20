import Client from "./client";
import Model from "./model";
// interfaces
import { ListModels } from "./interface/List";
import { Response } from "./interface/Client";

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
    /** Lists available models, and provides basic information about each one, such as RAM required */
    models: (options?: ListModels): Promise<Response> =>
      this.#client.request(
        `list/models${options?.task ? `?task=${options.task}` : ""}${
          options?.modelId ? `?modelId=${options.modelId}` : ""
        }`
      ) as Promise<Response>,
    /** List available tasks */
    tasks: (): Promise<Response> =>
      this.#client.request("list/tasks") as Promise<Response>
  };
  /**
   * Get a model - allows you to run closed and open source models
   * @param modelId The modelId, for example `openai-community/gpt2`
   * @param providerKey Optional: Closed-source model provider's API key (e.g. OpenAI key)
   */
  model = (modelId: string, providerKey?: string): Model =>
    new Model(modelId, this, this.#client, providerKey);
}
