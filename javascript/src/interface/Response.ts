export default interface Response {
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
