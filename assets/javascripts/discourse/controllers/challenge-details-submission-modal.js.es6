import Controller from "@ember/controller";
import { action } from "@ember/object";

export default class ChallengeSubmissionModalController extends Controller {
  @action
  async toggleLike() {
    this.get("model.post.likeAction").toggle(this.get("model.post"));
  }
}
