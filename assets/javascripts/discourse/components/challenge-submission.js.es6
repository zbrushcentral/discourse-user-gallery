import Component from "@ember/component";
import { action } from "@ember/object";
import showModal from "discourse/lib/show-modal";
import { zbc_domain } from "../utils/const";

export default class ChallengeSubmission extends Component {
  async topicViews() {
    const submission = this.get("submission");
    const topicId = submission.topicId;
    const res = await fetch(
      `${zbc_domain}/t/${topicId}.json?track_visit=true&forceLoad=true`
    );
    const data = res.json();
    return data;
  }

  @action
  async openSubmissionModal() {
    this.topicViews();
    const submission = this.get("submission");
    const title = submission.topic.title;
    const postCount = submission.topic.posts_count - 1;
    const likes = submission.likes;
    const comments = submission.comments;
    const topicPost = submission.topicPost;

    showModal("challengeDetailsSubmissionModal", {
      titleTranslated: title,
      model: {
        submission,
        comments,
        postCount,
        topicPost,
        likes,
      },
    });
  }
}
