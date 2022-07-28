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
  // didInsertElement() {
  //   let grid = $(".tiles-grid");
  //   let elements = $("#carousel-container");
  //   if (grid) {
  //     console.log("yes grid");
  //     $(".tiles-grid").masonry({
  //       itemSelector: ".tiles-grid",
  //       columnWidth: ".tiles-grid-sizer",
  //       percentPosition: true,
  //     });
  //     jQuery(".tiles-grid")
  //       .prepend(elements)
  //       .masonry("prepended", elements)
  //       .css("visibility", "visible");
  //     $(".tiles-grid").masonry("layout");
  //   } else {
  //     console.log("No Grid!");
  //   }
  // },
  async getChallenges() {
    const challenges = await this.challengeService.getChallenges();
    this.set("challenges", challenges);
  },
});
