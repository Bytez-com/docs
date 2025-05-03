import { Response } from "./Client";
import { Task } from "./Task";

interface Capacity {
  /**
   * The auto-scaling clusters is allowed to scale-down to this amount of instances.
   *
   * To save developers money, by default, `min` is set `0`, allowing clusters to spin down all instances when they under utilized.
   *
   * Default: `0`
   */
  min?: number;
  /**
   * The auto-scaling clusters will try to aim for `desired` number of instances.
   *
   * Note: even when you set `desired`, the auto-scaling cluster may scale-up or scale-down the number of instances. This is where your cluster begins, but depending on use, this is not the exact number of instances your cluster may have.
   *
   * Default: `1`
   */
  desired?: number;

  /**
   * The auto-scaling clusters is allowed to scale-up to this amount of instances.
   *
   * Note: if you slam an auto-scaling cluster, it may exceed the `max` number of instances temporarily by a small margin, to ensure your requests are fulfilled, though in general, the cluster instances will not exceed this number.
   *
   * Default: `1` for free users or `10` for premium users
   */
  max?: number;
}

export interface Create {
  /**
   * Minutes to wait before serverless cluster spins down instances.
   *
   * By default, if an instance doesn't receive a request after `5` mins, the instance shuts down.
   *
   * Receiving a request resets this timer.
   *
   * Timeout is between 1 and 1440 minutes
   *
   * Default: `5`
   */
  timeout?: number;
  /**
   * Bytez places open-source models on fully-managed auto-scaling clusters, allowing you to run open models easily at-scale.
   *
   * By default, Bytez creates a cluster that scales from 0-1 instances for free users and from 0-10 instances for premium users. If you need more instances, let us know.
   *
   * The number of instances can be thought of as concurrency / cluster capacity.
   *
   * Developers can customize cluster capacity at creation time or at anytime by simply updating the cluster.
   */
  capacity?: Capacity;
  /**
    Keyword args to pass to model when it loads
   */
  config?: object;
}

export interface Update extends Create {
  /**
   * The auto-scaling cluster can be manually turned "on" or "off"
   *
   * Turning "off" cluster will shut down all instances
   */
  status?: "on" | "off";
}

export type ModelRunOutput<Stream extends boolean> = Stream extends true
  ? NodeJS.ReadStream & ReadableStream<Uint8Array>
  : Response;

export interface Details {
  /** Model task - text generation, object detection, etc */
  task: Task;
  /** Model params (in billions) */
  params: Number;
  /** RAM required to run inference (in GB) */
  ramRequired: Number;
  /**
   * Depending on RAM required, models are sized from `micro` models to `super` models.
   *
   */
  meter:
    | "micro"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "super"
    | "micro-lm"
    | "xs-lm"
    | "sm-lm"
    | "md-lm"
    | "lg-lm"
    | "xl-lm"
    | "xxl-lm"
    | "super-lm";

  /** The price per second to run the model */
  meterPrice: string;
}
