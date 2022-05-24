import Controller from "@ember/controller";
import { action } from "@ember/object";
import { zbc_domain } from "../utils/const";
import Post from "discourse/models/post";

export default class ChallengeDetailsSubmissionModalController extends Controller {
  @action
  async addVote() {
    const topicPost = this.get("model.topicPost");
    topicPost.likeAction.toggle(topicPost);
  }
  @action
  async removeVote() {
    const topicPost = this.get("model.topicPost");
    topicPost.likeAction.toggle(topicPost);
  }

  @action
  async addLike(comment) {
    comment.likeAction.toggle(comment);
  }
  @action
  async removeLike(comment) {
    comment.likeAction.toggle(comment);
  }
  @action
  async submitComment(value) {
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
  @action
  removeComment(comment) {
    const post = Post.create(comment);
    post.destroy(comment);
  }
}
