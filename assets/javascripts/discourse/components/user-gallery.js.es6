import discourseComputed from "discourse-common/utils/decorators";
import Component from "@ember/component";
import { withPluginApi } from "discourse/lib/plugin-api";
import { action } from "@ember/object";

export default class UserGalleryComponent extends Component {
  constructor() {
    super(...arguments);
    withPluginApi("0.8", (api) => {
      //add th logic to submit the image
      //when the modal shows
      api.onAppEvent("modal:body-shown", (msg) => {
        if (msg.title !== "challenge_submission_modal_title") {
          return;
        }
      });
    });
  }
  didInsertElement() {
    this.send("loadMore");
  }

  @discourseComputed(
    "model.userGallery.loaded",
    "model.userGallery.canLoadMore",
    "model.userGallery.items"
  )
  isEmpty(loaded, canLoadMore, items) {
    return !canLoadMore && loaded && items.length === 0;
  }

  @action
  loadMore() {
    this.get("model").userGallery.loadMore();
  }
}
