import Model from "./model";

import { Response } from "./interface/Client";

export class Pipeline {
  constructor(sequence: Model[]) {
    const promises: Promise<any>[] = [];

    for (const model of sequence) {
      promises.push(model.create());
    }

    this.sequence = sequence;
    this.#ready = Promise.resolve();
  }
  #ready: Promise<void>;
  sequence: Model[];
  /** `run` the pipeline by feed it an `input` */
  async run(input: any): Promise<Response> {
    try {
      await this.#ready;

      let error: string | null = null;
      let output: string | null = null;

      for (const model of this.sequence) {
        ({ error, output } = await model.run(input));

        console.log({ error, output });
        if (error !== null) {
          throw error;
        }

        input = output;
      }

      return { error, output };
    } catch (error) {
      console.error("pipeline error:", error);

      return { error, output: null };
    }
  }
  /** `delete` the pipeline's auto-scaling clusters */
  destroy = () => Promise.all([this.sequence.map(model => model.delete())]);
}

export class DAG {
  constructor(nodes: any, edges: any) {
    this.nodes = nodes;
    this.edges = edges;
  }
  nodes: any;
  edges: any;
}
