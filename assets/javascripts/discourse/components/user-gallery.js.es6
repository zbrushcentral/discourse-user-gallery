import discourseComputed from "discourse-common/utils/decorators";
import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.send("loadMore");
<<<<<<< Updated upstream
  },

  @discourseComputed("model.loaded", "model.canLoadMore", "model.items")
=======
  }
  @discourseComputed(
    "model.userGallery.loaded",
    "model.userGallery.canLoadMore",
    "model.userGallery.items"
  )
>>>>>>> Stashed changes
  isEmpty(loaded, canLoadMore, items) {
    return !canLoadMore && loaded && items.length === 0;
  },

  actions: {
    loadMore() {
      this.get("model").loadMore();
    },
  },
});
