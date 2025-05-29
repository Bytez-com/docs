import { Response, Method, RequestBody } from "./interface/Client";

export default class Client {
  constructor(
    apiKey: string,
    dev = false,
    isBrowser = typeof window !== "undefined"
  ) {
    this.#isBrowser = isBrowser;
    this.host = `http${
      dev ? "://localhost:8080" : "s://api.bytez.com"
    }/models/v2/`;
    this.headers = {
      lang: "javascript",
      Authorization: `Key ${apiKey}`,
      "content-type": "application/json"
    };

    if (isBrowser === false) {
      import("stream").then(module => {
        this.#Readable = module.Readable ?? module.default?.Readable;
      });
    }
  }
  #Readable: any;
  #isBrowser: boolean;
  fetch: CallableFunction = fetch;
  host = "";
  headers = {};
  async request(
    path: string,
    method?: Method,
    body?: RequestBody,
    providerKey?: string
  ) {
    try {
      // this allows us to inject our own version of fetch with the node.js client to allow for extended timeouts
      const res = await this.fetch(this.host + path, {
        method,
        headers:
          providerKey === undefined
            ? this.headers
            : { ...this.headers, ["provider-key"]: providerKey },
        body: body ? JSON.stringify(body) : undefined
      });

      if (
        method === "POST" &&
        !res.ok &&
        res.headers.get("content-type") !== "application/json"
      ) {
        throw new Error(res.statusText);
      }

      if (
        res.body !== null &&
        (body?.stream === true || body?.json === false)
      ) {
        // in browsers, return readable text stream
        // in node, return node readable stream
        return this.#isBrowser
          ? res.body
          : this.#Readable.fromWeb(res.body as any);
      } else {
        return res.json() as Promise<Response>;
      }
    } catch (error) {
      return { error: error.message, output: null } as Response;
    }
  }
}
