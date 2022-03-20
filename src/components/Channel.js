import Rete from "rete";
import { stringSocket } from "../sockets";

export default class ChannelComponent extends Rete.Component {
  constructor() {
    super("Channel");

    this.data.render = "stage0";
  }

  builder(node) {
    const channels = [
      "Online Search",
      "Drive By",
      "Professional",
      "Resident",
      "Other",
      "Caring.com",
      "A Place For Mom",
      "Email",
      "Direct Mail"
    ];

    for (const c of channels) {
      node.addOutput(new Rete.Output(c, c, stringSocket, false));
    }
  }

  worker(node, inputs, outputs, lead) {
    console.log("lead", lead);
    console.log("CHANNEL OUTS", node);
    // outputs["num"] = node.data.num;
    if (outputs[lead.channel]) outputs[lead.channel] = true;
  }
}
