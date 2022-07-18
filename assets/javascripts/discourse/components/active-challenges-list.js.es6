import Component from "@ember/component";
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
  didInsertElement() {
    $("#carousel-component").prependTo($(".tiles-grid"));
  },
  async getChallenges() {
    const challenges = await this.challengeService.getChallenges();
    this.set("challenges", challenges);
  },
});
