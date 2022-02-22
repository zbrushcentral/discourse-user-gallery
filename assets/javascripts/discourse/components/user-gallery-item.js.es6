import { postUrl } from "discourse/lib/utilities";
import Component from "@ember/component";
import showModal from "discourse/lib/show-modal";
import discourseComputed from "discourse-common/utils/decorators";
import { action } from "@ember/object";
import { withPluginApi } from "discourse/lib/plugin-api";

export default class UserGalleryItemComponent extends Component {
  @discourseComputed("item.topic_slug", "item.topic_id", "item.post_number")
  postUrl(slug, topicId, postNumber) {
    return postUrl(slug, topicId, postNumber);
  }

  willRender() {
    const challengeItems = this.get("challenges").map((challenge) => {
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

    withPluginApi("0.8", (api) => {
      this.set(
        "isCurrentUserGallery",
        api.getCurrentUser().username === this.get("user.username")
      );

      return;
    });
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
      titleTranslated: "Challenge Submission",
    });
  }
  @action
  removeSubmission(postId) {
    const modalModel = {
      postId: postId,
    };
    showModal("challengeRemoveSubmissionModal", {
      model: modalModel,
      titleTranslated: "Remove Challenge Submission",
    });
  }
}
