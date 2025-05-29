import { Task } from "./Task";

export interface ListModels {
  /** List models by task. */
  task?: Task;
  /** Get a single model */
  modelId?: string;
}
