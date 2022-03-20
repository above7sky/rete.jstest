import Rete from "rete";
import { stringSocket } from "../sockets";

const sources = [
  "Newspaper",
  "Magazine",
  "Newsletter",
  "Internet Search Engine (Google, etc)",
  "Other",
  "Direct Mail",
  "Internet-Social Media (Facebook,etc)",
  "Internet Referral Agencies",
  "Internet (Company Website)",
  "Word of Mouth",
  "Fax",
  "Corporate Phone-in",
  "Community Phone-in",
  "Walk-in",
  "Website",
  "Advertising / Newspaper",
  "Professional Referral",
  "Radio / Television",
  "Trade Show / Fair",
  "Site / Sign",
  "Yellow Pages",
  "Referral Agency",
  "Resident",
  "Family / Friend",
  "Associate",
  "Internet: SeniorVu"
];

export default class MediaSourceComponent extends Rete.Component {
  constructor() {
    super("MediaSource");

    this.data.render = "stage0";
  }

  builder(node) {
    for (const source of sources) {
      let sourceIn = new Rete.Input(source, source, stringSocket, true);

      node.addInput(sourceIn);
    }

    node.addOutput(new Rete.Output("output", "Output", stringSocket));
  }

  worker(node, inputs, outputs) {
    // outputs["num"] = node.data.num;
    console.log("MediaSource", inputs);
    const active = Object.entries(inputs).find(([source, conns]) =>
      conns.some(c => true)
    );
    const source = active && active[0];

    if (source) outputs.output = source;
    else outputs.output = null;
  }
}
