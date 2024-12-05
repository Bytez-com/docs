import Model from "./model";

export class Pipeline {
  constructor(sequence: Model[]) {
    for (const model of sequence) {
      model.create();
    }

    this.sequence = sequence;
  }
  sequence: Model[];
  async input(input: any) {
    try {
      for (const model of this.sequence) {
        const { error, output } = await model.run(input);

        if (error) {
          throw error;
        }

        input = output;
      }
    } catch (error) {
      console.error("pipeline error:", error);
    }
  }
}

export class DAG {
  constructor(nodes: any, edges: any) {
    this.nodes = nodes;
    this.edges = edges;
  }
  nodes: any;
  edges: any;
}
