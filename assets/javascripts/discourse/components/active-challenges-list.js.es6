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
        let grid = $(".tiles-grid")
        let elements = $(`
    <div
      id="carousel-container"
      class="carousel-container tiles-grid-item topic-list-item"
    >
      <div class="carousel my-carousel carousel--translate">
        <input
          class="carousel__activator"
          type="radio"
          name="carousel"
          id="F"
          checked="checked"
        />
        <input class="carousel__activator" type="radio" name="carousel" id="G" />
        <input class="carousel__activator" type="radio" name="carousel" id="H" />
        <div class="carousel__controls">
          <label
            class="carousel__control carousel__control--backward"
            for="J"
          ></label>
          <label
            class="carousel__control carousel__control--forward"
            for="G"
          ></label>
        </div>
        <div class="carousel__controls">
          <label
            class="carousel__control carousel__control--backward"
            for="F"
          ></label>
          <label
            class="carousel__control carousel__control--forward"
            for="H"
          ></label>
        </div>
        <div class="carousel__controls">
          <label
            class="carousel__control carousel__control--backward"
            for="G"
          ></label>
          <label
            class="carousel__control carousel__control--forward"
            for="I"
          ></label>
        </div>
        <div class="carousel__track">
          <li class="carousel__slide">
            <span class="carousel__title">Title</span>
          </li>
          <li class="carousel__slide">
            <span class="carousel__title">Title</span>
          </li>
          <li class="carousel__slide">
            <span class="carousel__title">Title</span>
          </li>
        </div>
        <div class="carousel__indicators">
          <label class="carousel__indicator" for="F"></label>
          <label class="carousel__indicator" for="G"></label>
          <label class="carousel__indicator" for="H"></label>
        </div>
      </div>
    </div>`).css("width", "500px").css("height", "500px");
        if(grid){
            $('.tiles-grid').masonry({ itemSelector: '.tiles-grid', columnWidth: '.tiles-grid-sizer', percentPosition: true });
             jQuery(".tiles-grid").prepend(elements).masonry("prepended", elements).css("visibility", "visible");
              $(".tiles-grid").masonry('layout');
        }else {
          console.log("No Grid!")
        }
  },
  async getChallenges() {
    const challenges = await this.challengeService.getChallenges();
    this.set("challenges", challenges);
  },
});
