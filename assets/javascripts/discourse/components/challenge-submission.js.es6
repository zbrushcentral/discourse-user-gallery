import Component from "@ember/component";
import { action } from "@ember/object";
import showModal from "discourse/lib/show-modal";
import { zbc_domain } from "../utils/const";
import Post from "discourse/models/post";

export default class ChallengeSubmission extends Component {
  @action
  async openSubmissionModal() {
    const submission = this.get("submission");

    const topicId = submission.topicId;
    const title = submission.topic.title;
    const postCount = (submission.topic.posts_count -= 1);
    const postUrl = `${zbc_domain}/t/${topicId}/posts.json`;
    const resp = await fetch(postUrl).then((res) =>
      res.json().then((data) => data)
    );
    const posts = resp.post_stream.posts;

    for (let i = 0; i < posts.length; i++) {
      const post = Post.create(posts[i]);
      // Topic only has last_posted_username
      const submissionUsername = posts[0].username;

      this.get("submissionUsername");
      this.get("post");
      showModal("challengeDetailsSubmissionModal", {
        titleTranslated: title,
        model: {
          submission,
          posts,
          post,
          submissionUsername,
          postCount,
        },
      });
    }
  }
}
