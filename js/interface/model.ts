export default interface ModelOptions {
  /**
   * Load this model quantized.
   *
   * By default, models load in full precision.
   *
   * Pass `8` or `4` to load the model in 8-bit or 4-bit precision.
   *
   * Currently disabled. Coming soon.
   */
  precision?: number;
  /**
   * Number of serverless instances.
   *
   * For example, if you set to `3`, then you can do 3 parallel inferences.
   *
   * If you set to `1`, then you can do 1 inference at a time.
   *
   * Default: `1`
   */
  concurrency?: number;

  /**
   * Seconds to wait before serverless instance auto-shuts down.
   *
   * By default, if an instance doesn't receive a request after `300` seconds, then it shuts down.
   *
   * Receiving a request resets this timer.
   *
   * Default: `300`
   */
  timeout?: number;
}
