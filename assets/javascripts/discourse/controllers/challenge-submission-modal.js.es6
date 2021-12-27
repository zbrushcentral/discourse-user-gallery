import Controller from "@ember/controller";
import { action } from "@ember/object";
import showModal from "discourse/lib/show-modal";

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
          "Api-Key":
            "9410ad25edbc853073e7eda513f25f97a2dc2ed6c3f366597296ad1ab0447c15",
        },
        type: "POST",
        data: JSON.stringify({
          raw: "https:" + this.get("model").image,
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
