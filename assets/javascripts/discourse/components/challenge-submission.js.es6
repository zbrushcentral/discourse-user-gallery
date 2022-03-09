import Component from "@ember/component";
import { action } from "@ember/object";
import showModal from "discourse/lib/show-modal";

export default class ChallengeSubmission extends Component {
  constructor() {
    super(...arguments);
  }
  @action
  openSubmissionModal() {
    const submission = this.get("submission");
    const id = this.get("id");

    showModal("challengeDetailsSubmissionModal", {
      titleTranslated: "Like",
      model: { submission, id },
    });
  }
}
