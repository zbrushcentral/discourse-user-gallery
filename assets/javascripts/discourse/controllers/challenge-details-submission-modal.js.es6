import Controller from "@ember/controller";
import { action } from "@ember/object";

export default class ChallengeSubmissionModalController extends Controller {
  @action
  async handleLikes() {
    const res = await $.ajax("/post_actions", {
      contentType: "application/json",

      type: "POST",
      data: JSON.stringify({
        id: this.get("model.id"),
        post_action_type_id: 2,
        flag_topic: false,
      }),
    });
  }
}
