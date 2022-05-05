import Controller from "@ember/controller";
import { action } from "@ember/object";
import { zbc_domain, devApiKey } from "../utils/const";
import { withPluginApi } from "discourse/lib/plugin-api";

export default class ChallengeDetailsSubmissionModalController extends Controller {
  constructor() {
    super(...arguments);
    withPluginApi("0.8", (api) => {
      this.set("currentUsername", api.getCurrentUser().username);
      return;
    });
  }

  @action
  async addVote() {
    const topicPostId = this.get("model.topicPost.id");
    const currentUser = this.get("currentUsername");
    await $.ajax(`${zbc_domain}/post_actions`, {
      contentType: "application/json",
      headers: {
        "Api-Username": currentUser,
        "Api-Key": devApiKey,
      },
      type: "POST",
      data: JSON.stringify({
        id: topicPostId,
        post_action_type_id: 2,
      }),
    });
  }
  @action
  async removeVote() {
    const topicPostId = this.get("model.topicPost.id");
    const currentUser = this.get("currentUsername");
    await $.ajax(`${zbc_domain}/post_actions/${topicPostId}`, {
      contentType: "application/json",
      headers: {
        "Api-Username": currentUser,
        "Api-Key": devApiKey,
      },
      type: "DELETE",
      data: JSON.stringify({
        post_action_type_id: 2,
      }),
    });
  }

  @action
  async addLike(commentId = this.model.posts.id) {
    const currentUser = this.get("currentUsername");
    await $.ajax(`${zbc_domain}/post_actions`, {
      contentType: "application/json",
      headers: {
        "Api-Username": currentUser,
        "Api-Key":
          "12651d6006a1464881e1de406d23421f37102fb4cc5f0110b6a5300eb289bb62",
      },
      type: "POST",
      data: JSON.stringify({
        id: commentId,
        post_action_type_id: 2,
      }),
    });
  }
  @action
  async removeLike(commentId = this.model.posts.id) {
    const currentUser = this.get("currentUsername");
    await $.ajax(`${zbc_domain}/post_actions/${commentId}`, {
      contentType: "application/json",
      headers: {
        "Api-Username": currentUser,
        "Api-Key":
          "12651d6006a1464881e1de406d23421f37102fb4cc5f0110b6a5300eb289bb62",
      },
      type: "DELETE",
      data: JSON.stringify({
        post_action_type_id: 2,
      }),
    });
  }
}
