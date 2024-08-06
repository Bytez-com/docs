import Inference from "./inference";

export default interface PostBody {
  /**
   * Model id
   */
  model: string;
  /**
   * Model input
   *
   * text-generation: string
   * chat-model: [role: string, message: string]
   */
  input?: any;
  /**
   * Stream back text
   *
   * Default: false
   */
  stream?: boolean;

  /**
   * Inference params
   *
   */
  params?: Inference;
}
