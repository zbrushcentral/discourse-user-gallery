import Controller from "@ember/controller";
import { action } from "@ember/object";
import showModal from "discourse/lib/show-modal";
import { devApiKey } from "../utils/const";

export default class ChallengeSubmissionModalController extends Controller {
  @action
  closeModal() {
    const btnClose = $("button.close");
    btnClose.trigger("click");
  }
  @action
  async confirmSubmission() {
    try {
      const res = await $.ajax("/posts.json", {
        contentType: "application/json",
        headers: {
          "Api-Username": window.location.pathname.split("/")[2],
          "Api-Key": devApiKey,
        },
        type: "POST",
        data: JSON.stringify({
          raw: `<img src="${window.location.protocol}//${window.location.host}${
            this.get("model").imageUrl
          }"/>`,
          topic_id: this.get("model").challengeId,
        }),
      });

      this.closeModal();

      showModal("challengeSubmissionSuccess", {
        titleTranslated: "Successful submission",
      });
    } catch (err) {
      this.closeModal();

      showModal("challengeSubmissionError", {
        titleTranslated: "Error in submission",
      });
    }
  }
}
