import { ajax } from "discourse/lib/ajax";
import { url } from "discourse/lib/computed";
import EmberObject from "@ember/object";
import { Promise } from "rsvp";

export default EmberObject.extend({
  loaded: false,

  _initialize: function () {
    this.setProperties({
      itemsLoaded: 0,
      canLoadMore: true,
      loading: false,
      items: [],
    });
  }.on("init"),

  fetchUrl: url(
    "user.username_lower",
    "itemsLoaded",
    "/discourse-user-gallery/%@/list.json?offset=%@"
  ),

  loadMore() {
    var self = this;
    if (this.get("loading") || !this.get("canLoadMore")) {
      return Promise.reject();
    }

    this.set("loading", true);

    return ajax(this.get("fetchUrl"), { cache: false })
      .then(function (result) {
        if (result) {
          var items = result.items;
          self.get("items").pushObjects(items);
          self.setProperties({
            loaded: true,
            itemsLoaded: self.get("itemsLoaded") + items.length,
            canLoadMore: items.length > 0,
          });
        }
      })
      .finally(function () {
        self.set("loading", false);
      });
  },
});
