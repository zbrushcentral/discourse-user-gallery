import discourseComputed from "discourse-common/utils/decorators";
import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.send("loadMore");
  },

  @discourseComputed("model.loaded", "model.canLoadMore", "model.items")
  isEmpty(loaded, canLoadMore, items) {
    return !canLoadMore && loaded && items.length === 0;
  },

  actions: {
    loadMore() {
      this.get("model").loadMore();
    },
  },
});
