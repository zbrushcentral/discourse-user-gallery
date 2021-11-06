import { postUrl } from "discourse/lib/utilities";
import discourseComputed from "discourse-common/utils/decorators";
import Component from "@ember/component";

export default Component.extend({
  @discourseComputed("item.topic_slug", "item.topic_id", "item.post_number")
  postUrl(slug, topicId, postNumber) {
    return postUrl(slug, topicId, postNumber);
  },
});
