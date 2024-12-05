import { Response, Method, RequestBody } from "./interface/Client";

export default class Client {
  constructor(apiKey: string, dev = false, browser?: boolean) {
    this.host = `http${
      dev ? "://localhost:8080" : "s://api.bytez.com"
    }/models/v2/`;
    this.headers = {
      Authorization: `Key ${apiKey}`,
      "content-type": "application/json"
    };
    this.#isBrowser = browser || typeof window !== "undefined";

    if (this.#isBrowser === false) {
      import("node:stream").then(({ Readable }) => {
        this.#Readable = Readable;
      });
    }
  }
  #Readable: any;
  #isBrowser: boolean;
  host = "";
  headers = {};
  async request(path: string, method?: Method, body?: RequestBody) {
    try {
      const res = await fetch(this.host + path, {
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : undefined
      });

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
