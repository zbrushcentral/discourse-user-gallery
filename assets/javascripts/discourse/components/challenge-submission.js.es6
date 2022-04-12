import Component from "@ember/component";
import { action } from "@ember/object";
import showModal from "discourse/lib/show-modal";

export default class ChallengeSubmission extends Component {
  @action
  openSubmissionModal() {
    const submission = this.get("submission");
    const title = submission.topic.title;
    showModal("challengeDetailsSubmissionModal", {
      titleTranslated: title,
      model: submission,
    });
  }
}
