import computed from "ember-addons/ember-computed-decorators";

export default Ember.Component.extend({
  didInsertElement() {
    this.send('loadMore');
  },

  @computed("model.loaded", "model.canLoadMore", "model.items")
  isEmpty(loaded, canLoadMore, items) {
    return !canLoadMore && loaded && (items.length === 0);
  },

  actions: {
    loadMore() {
      this.get("model").loadMore();
    }
  }
});
