import Rete from "rete";
import { objectSocket, stringSocket } from "../sockets";
import { TextControl } from "../controls";

const fields = ["title", "firstname", "lastname", "mediasource"];

export default class MediaSourceComponent extends Rete.Component {
  constructor() {
    super("LeadPost");

    this.data.render = "stage0";
  }

  async builder(node) {
    console.log("this.editor", this.editor);

    for (const field of fields) {
      let sourceIn = new Rete.Input(field, field, stringSocket, false);
      await sourceIn.addControl(new TextControl(this.editor, field));

      node.addInput(sourceIn);
    }

    node.addOutput(new Rete.Output("output", "Output", objectSocket));
  }

  worker(node, inputs, outputs) {
    console.log("INPUTS", inputs);
    // outputs["num"] = node.data.num;
    const out = {};
    for (const field of fields) {
      out[field] = inputs[field] ? inputs[field][0] : null;
    }

    console.log("LEAD POST", out);
  }
}
