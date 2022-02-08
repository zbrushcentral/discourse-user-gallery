import { postUrl } from "discourse/lib/utilities";
import Component from "@ember/component";
import showModal from "discourse/lib/show-modal";
import discourseComputed from "discourse-common/utils/decorators";
import { action } from "@ember/object";

export default class UserGalleryItemComponent extends Component {
  @discourseComputed("item.topic_slug", "item.topic_id", "item.post_number")
  postUrl(slug, topicId, postNumber) {
    return postUrl(slug, topicId, postNumber);
  }

  willRender() {
    const challengeItems = this.get("challenges");
    challengeItems.map((challenge) => {
      console.log(challenge);
      let postId;
      const imageSubmitted =
        this.get("activity").find((act) => {
          const topicId = act.topic_id;
          const activityIsForChallenge = act.topic_id + "" === challenge.topic;
          const activityIsForImage =
            act.cooked.search(this.get("item").thumb_url) !== -1;

          if (topicId && activityIsForChallenge && activityIsForImage) {
            postId = act.id;
            return true;
          }
          return false;
        }) !== undefined;

      return { ...challenge, imageSubmitted, postId };
    });

    this.set("challengeItems", challengeItems);
  }
  @action
  openChallengeList() {
    this.set("isChallengeListOpen", true);
  }
  @action
  closeChallengeList() {
    this.set("isChallengeListOpen", false);
  }
  @action
  addSubmission(challengeId) {
    const imgSrc = this.get("item").thumb_url;
    const challenge = this.get("challenges").find(
      (challenge) => challenge.topicid === challengeId
    );
    this.set("isChallengeListOpen", false);
    //show modal
    //passing the parameter to the model so they can be rendered in the modal

    const modalModel = {
      challengeId: challengeId,
      imageUrl: imgSrc,
      challengeName: challenge.name,
    };
    showModal("challengeSubmissionModal", {
      model: modalModel,
      titleTranslated: "Challenge Entry",
    });
  }
  @action
  async removeSubmission(postId) {
    await $.ajax(`/posts/${postId}`, {
      contentType: "application/json",
      headers: {
        "Api-Username": this.getUserPortfolio(),
        "Api-Key":
          "9410ad25edbc853073e7eda513f25f97a2dc2ed6c3f366597296ad1ab0447c15",
      },
      type: "DELETE",
    });

    showModal("challengeSubmissionRemoveSuccess", {
      titleTranslated: "Remove Challenge Entry",
    });
  }

  getUserPortfolio() {
    return window.location.pathname.split("/")[2];
  }
}
