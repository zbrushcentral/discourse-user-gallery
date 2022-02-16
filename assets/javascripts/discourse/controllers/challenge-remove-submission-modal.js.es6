import Controller from "@ember/controller";
import { action } from "@ember/object";
import showModal from "discourse/lib/show-modal";

export default class ChallengeRemoveSubmissionModalController extends Controller {
  @action
  closeModal() {
    const btnClose = $("button.close");
    btnClose.trigger("click");
  }
  @action
  async confirmRemoveSubmission(postId) {
    await $.ajax(`/posts/${postId}`, {
      contentType: "application/json",
      headers: {
        "Api-Username": this.getUserPortfolio(),
        "Api-Key":
          "9410ad25edbc853073e7eda513f25f97a2dc2ed6c3f366597296ad1ab0447c15",
      },
      type: "DELETE",
    });

    this.closeModal();

    showModal("challengeRemoveSubmissionSuccess", {
      titleTranslated: "Successfully removed submission",
    });
  }
  catch(err) {
    this.closeModal();

    showModal("challengeSubmissionError", {
      titleTranslated: "Error in submission",
    });
  }
  getUserPortfolio() {
    return window.location.pathname.split("/")[2];
  }
}
