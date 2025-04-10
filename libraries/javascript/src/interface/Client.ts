export type Method = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export type RequestBody = {
  /**
   * Anything else is allowed
   *
   * text-generation: string
   * chat-model: [role: string, message: string]
   */
  [key: string]: any;
  /**
   * Stream back text
   *
   * Default: false
   */
  stream?: boolean;

  /**
   * Return JSON or stream back an media
   *
   * Default: true
   */
  json?: boolean;
};
export interface Response {
  /**
   * If an error occurs during the operation, "error" is returned, and the "output" is usually null.
   */
  error: string | null;

  /**
   * If the operation is successful, the "error" argument is null, and the "output" argument contains the result of the operation.
   *
   * When running models, the output may be a number, string, vector, audio file, or whatever the model generated
   *
   */
  output: any | null;
}
