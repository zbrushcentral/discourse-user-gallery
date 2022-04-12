import Controller from "@ember/controller";
import { action } from "@ember/object";

export default class ChallengeSubmissionModalController extends Controller {
  @action
  async toggleLike() {
    this.get("model.topic.likeAction").toggle(this.get("model.topic"));
  }
}
