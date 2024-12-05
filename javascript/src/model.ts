import Client from "./client";
import Bytez from "./index";

// interfaces
import Inference from "./interface/inference";
import { Create, Update, ModelRunOutput, Details } from "./interface/Model";
import { Response, RequestBody } from "./interface/Client";

export default class Model {
  constructor(
    modelId: string,
    bytez: Bytez,
    client: Client,
    params?: Inference
  ) {
    this.#client = client;
    this.id = modelId;
    this.params = params;
    this.#ready = bytez.list.models({ modelId }).then((response: Response) => {
      const mediaGenerators = new Set([
        "text-to-audio",
        "text-to-image",
        "text-to-video",
        "text-to-speech"
      ]);

      this.details = response?.output?.[0] ?? {};
      this.#isGeneratingMedia = mediaGenerators.has(this.details.task);
    });
  }
  #client: Client;
  #ready: Promise<void>;
  #isGeneratingMedia = false;
  /** The modelId, for example `openai-community/gpt2` */
  id: string;
  /** Default model params */
  params: Inference | undefined;
  /** details about the model */
  details: Details;
  /**
   * For open-source models, `create` an auto-scaling cluster to run this model
   *
   * @param options Cluster configuration
   */
  create = (options?: Create): Promise<Response> =>
    this.#client.request(this.id, "PUT", options) as Promise<Response>;

  /** For open-source models, `read` your cluster */
  read = (): Promise<Response> =>
    this.#client.request(this.id, "GET") as Promise<Response>;
  /**
   * For open-source models, `update` your cluster
   *
   * @param options Cluster configuration
   */
  update = (options?: Update): Promise<Response> =>
    this.#client.request(this.id, "PATCH", options) as Promise<Response>;
  /** For open-source models, `delete` your cluster */
  delete = (): Promise<Response> =>
    this.#client.request(this.id, "DELETE") as Promise<Response>;
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
    input?: string,
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
        typeof params === "boolean" || params === undefined
          ? this.params
          : params
    };

    await this.#ready;

    if (params === true || stream === true) {
      if (this.#isGeneratingMedia) {
        postBody.json = false;
      } else {
        postBody.stream = true;
      }
    }

    switch (this.details.task) {
      // require "text" as input
      case "sentence-similarity":
      case "fill-mask":
      case "text-to-speech":
      case "text-to-audio":
      case "text-to-image":
      case "translation":
      case "summarization":
      case "text-to-video":
      case "feature-extraction":
      case "text-classification":
      case "token-classification":
      case "text2text-generation":
      case "text-generation": {
        postBody["text"] = input;
        break;
      }
      //
      // require "messages" as input
      case "chat": {
        postBody["messages"] = input;
        break;
      }
      //
      // requires media as input ('image', 'audio',"video'?)
      //
      case "video-classification":
      case "automatic-speech-recognition":
      case "audio-classification":
      case "mask-generation":
      case "image-to-text":
      case "object-detection":
      case "depth-estimation":
      case "image-segmentation":
      case "image-classification":
      case "image-feature-extraction": {
        if (input?.startsWith("http")) {
          postBody["url"] = input;
        } else if (input?.startsWith("data")) {
          postBody["base64"] = input;
        }
      }
      //
      // multi-input
      case "question-answering": {
        postBody["context"] = input?.context;
        postBody["question"] = input?.question;

        break;
      }
      case "document-question-answering":
      case "visual-question-answering": {
        postBody["question"] = input?.question;

        postBody["url"] = input?.url;
        postBody["base64"] = input?.base64;
        break;
      }
      case "zero-shot-object-detection":
      case "zero-shot-image-classification": {
        postBody["candidate_labels"] = input?.candidate_labels;

        // needs image
        postBody["url"] = input?.url;
        postBody["base64"] = input?.base64;
        break;
      }
      case "zero-shot-classification": {
        postBody["candidate_labels"] = input?.candidate_labels;
        postBody["text"] = input?.text;

        break;
      }
      //
      // several task variants exist
      // so we cannot make assumptions on input, as it widely varies by model? so do nothing
      // does not require input
      case "unconditional-image-generation":
      default: {
        break;
      }
    }

    return this.#client.request(this.id, "POST", postBody);
  }
}
