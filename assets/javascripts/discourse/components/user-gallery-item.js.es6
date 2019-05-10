import { postUrl } from "discourse/lib/utilities";
import computed from "ember-addons/ember-computed-decorators";

export default Ember.Component.extend({
  @computed("item.topic_slug", "item.topic_id", "item.post_number")
  postUrl(slug, topicId, postNumber) {
    return postUrl(slug, topicId, postNumber);
  }
});
