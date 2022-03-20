import "./styles.css";
import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import Stage0RenderPlugin from "rete-stage0-render-plugin";
import ChannelComponent from "./components/Channel";
import MediaSourceComponent from "./components/MediaSource";
import LeadPostComponent from "./components/LeadPost";

const container = document.getElementById("app");
const editor = new Rete.NodeEditor("demo@0.1.0", container);

editor.use(ConnectionPlugin);
editor.use(Stage0RenderPlugin);

const engine = new Rete.Engine("demo@0.1.0");

const components = [
  new ChannelComponent(),
  new MediaSourceComponent(),
  new LeadPostComponent()
];

components.forEach(c => {
  editor.register(c);
  engine.register(c);
});

let l1;

editor.on(
  "process nodecreated noderemoved connectioncreated connectionremoved",
  async () => {
    await engine.abort();
    await engine.process(editor.toJSON(), null, { channel: "Other" });

    // console.log(editor.toJSON());
  }
);

(async () => {
  var n1 = await components[0].createNode();
  var m1 = await components[1].createNode();
  l1 = await components[2].createNode();
  editor.addNode(n1);
  editor.addNode(m1);
  editor.addNode(l1);
})();

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use Parcel to bundle this sandbox, you can find more info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;
