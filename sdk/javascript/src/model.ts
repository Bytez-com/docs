import Bytez from ".";
import Client from "./client";

// interfaces
import Inference from "./interface/inference";
import { ModelRunOutput, Details } from "./interface/Model";
import { Response, RequestBody } from "./interface/Client";

export default class Model {
  constructor(
    modelId: string,
    bytez: Bytez,
    client: Client,
    providerKey?: string
  ) {
    this.#client = client;
    this.id = modelId;
    this.#providerKey = providerKey;
    this.#ready = bytez.list.models({ modelId }).then((response: Response) => {
      const mediaGenerators = [
        "text-to-audio",
        "text-to-image",
        "text-to-video",
        "text-to-speech"
      ];

      this.details = response?.output?.[0] ?? {};
      this.#isGeneratingMedia = mediaGenerators.includes(this.details.task);
    });
  }
  #client: Client;
  #ready: Promise<void>;
  #isGeneratingMedia = false;
  #providerKey: string | undefined;
  /** The modelId, for example `openai-community/gpt2` */
  id: string;
  /** Default model params */
  params: Inference | undefined;
  /** details about the model */
  details: Details;

  /**
   * `Run` model by passing in an `input`, and optionally passing in `params` and/or a `stream` flag.
   *
   * Execute this function in 1 of 4 ways:

   * 1. run(`input`) => returns JSON => { error, output }
   * 2. run(`input`, `params`) => returns JSON => { error, output }
   * 3. run(`input`, `stream`) => stream === true? returns read stream, else returns JSON
   * 4. run(`input`, `params`, `stream`) => stream === true? returns read stream, else returns JSON
   *
   * Parameters:
   * @param input - Input to pass to model (e.g., text, URL, base64).
   * @param params - models parameters object
   * @param stream - boolean
   */
  async run(input?: any, params?: Inference): Promise<Response>;
  async run<Stream extends boolean = false>(
    input?: any,
    stream?: Stream
  ): Promise<ModelRunOutput<Stream>>;
  async run<Stream extends boolean = false>(
    input?: any,
    params?: Inference,
    stream?: Stream
  ): Promise<ModelRunOutput<Stream>>;
  async run<Stream extends boolean = false>(
    input?: any,
    params?: Inference | Stream,
    stream?: Stream
  ) {
    const postBody: RequestBody = {
      params:
        typeof params === "boolean" || params === undefined ? undefined : params
    };

    await this.#ready;

    if (params === true || stream === true) {
      if (this.#isGeneratingMedia) {
        postBody.json = false;
      } else {
        postBody.stream = true;
      }
    }

    postBody["input"] = input;

    return this.#client.request(this.id, "POST", postBody, this.#providerKey);
  }
}
