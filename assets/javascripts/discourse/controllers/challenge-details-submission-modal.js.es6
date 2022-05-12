import Controller from "@ember/controller";
import { action } from "@ember/object";
import { zbc_domain } from "../utils/const";

export default class ChallengeDetailsSubmissionModalController extends Controller {
  @action
  async addVote() {
    const topicPostId = this.get("model.topicPost.id");
    await $.ajax(`${zbc_domain}/post_actions`, {
      contentType: "application/json",

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
    await $.ajax(`${zbc_domain}/post_actions/${topicPostId}`, {
      contentType: "application/json",

      type: "DELETE",
      data: JSON.stringify({
        post_action_type_id: 2,
      }),
    });
  }

  @action
  async addLike(commentId = this.model.posts.id) {
    await $.ajax(`${zbc_domain}/post_actions`, {
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify({
        id: commentId,
        post_action_type_id: 2,
      }),
    });
  }
  @action
  async removeLike(commentId = this.model.posts.id) {
    await $.ajax(`${zbc_domain}/post_actions/${commentId}`, {
      contentType: "application/json",
      type: "DELETE",
      data: JSON.stringify({
        post_action_type_id: 2,
      }),
    });
  }
  @action
  async handelSubmit(value) {
    this.get("value");
    const topicId = this.get("model.topicPost.topic_id");
    await $.ajax(`${zbc_domain}/posts.json`, {
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify({
        raw: value,
        topic_id: topicId,
      }),
    });
  }
}
