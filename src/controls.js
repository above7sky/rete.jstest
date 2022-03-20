import Rete from "rete";
import h from "stage0";
import { ControlComponent } from "rete-stage0-render-plugin";

var Stage0TextControl = {
  template: `<div><label>#label</label><br/><input type="text"/></div>`,
  data() {
    return {
      label: "(no label)",
      value: ""
    };
  },
  methods: {
    update() {
      if (this.root) {
        this.putData(this.ikey, +this.root.value);
      }

      this.emitter.trigger("process");
    }
  },
  mounted() {
    const _self = this;

    this.root.value = this.getData(this.ikey);

    this.root.onkeyup = function(e) {
      _self.root.update();
    };

    this.root.onmouseup = function(e) {
      _self.root.update();
    };

    this.root.ondblclick = function(e) {
      e.stopPropagation();
    };
  }
};

export class TextControl extends Rete.Control {
  constructor(emitter, key, readonly) {
    super(key);
    this.component = Stage0TextControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.stage0Context.root.value = val; // TODO get rid of stage0Context
  }
}
