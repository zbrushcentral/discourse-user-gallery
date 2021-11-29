import Component from "@ember/component";
import { action } from "@ember/object";
import discourseComputed, {
  on,
  observes,
} from "discourse-common/utils/decorators";
import { inject } from "@ember/service";

export default Component.extend({
  challenges: [],
  challengeService: inject("challenges"),
  init() {
    this._super(...arguments);
    if (this.challengeService.get("fetchedChallenges")) {
      this.set("challenges", this.challengeService.get("challenges"));
      return;
    }
    this.getChallenges();
  },

  async getChallenges() {
    const challenges = await this.challengeService.getChallenges();
    this.set("challenges", challenges);
  },
});
