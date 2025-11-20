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
      // make undici invisible to webpack's static analysis
      new Function('return import("undici")')().then(({ Agent }) => {
        this.#dispatcher = new Agent({
          keepAliveTimeout: this.#timeout,
          keepAliveMaxTimeout: this.#timeout,
          connectTimeout: this.#timeout,
          headersTimeout: this.#timeout,
          bodyTimeout: this.#timeout
        });
      });
    }
  }
  #Readable: any;
  #isBrowser: boolean;
  #dispatcher?: any;
  #timeout = 15 * 60e3;
  host = "";
  headers = {};
  async request(
    path: string,
    method?: Method,
    body?: RequestBody,
    providerKey?: string
  ) {
    try {
      const res = await fetch(this.host + path, {
        method,
        headers:
          providerKey === undefined
            ? this.headers
            : { ...this.headers, ["provider-key"]: providerKey },
        // @ts-expect-error  dispatcher is undici-only
        dispatcher: this.#dispatcher,
        signal: AbortSignal.timeout(this.#timeout),
        body: body ? JSON.stringify(body) : undefined
      });

      if (
        method === "POST" &&
        !res.ok &&
        res.headers.get("content-type") !== "application/json"
      ) {
        const { error } = await res.json().catch(console.error);

        throw new Error(error || res.statusText);
      }

      if (
        res.body !== null &&
        (body?.stream === true || body?.json === false)
      ) {
        // in browsers, return readable text stream
        // in node, return node readable stream
        return this.#isBrowser
          ? res.body.pipeThrough(new TextDecoderStream())
          : this.#Readable.fromWeb(res.body as any, { encoding: "utf8" });
      } else {
        return await res.json();
      }
    } catch (error) {
      return { error: error.message, output: null } as Response;
    }
  }
}
