import Component from "@ember/component";
import { withPluginApi } from "discourse/lib/plugin-api";

export default class ChallengeDetailsComponent extends Component {
  constructor() {
    super(...arguments);
    withPluginApi("0.8", (api) => {
      this.set("name", api.getCurrentUser().username);
      return;
    });
  }
}
