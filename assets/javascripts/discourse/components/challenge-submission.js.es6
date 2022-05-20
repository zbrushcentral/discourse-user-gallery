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
    const postCount = submission.topic.posts_count - 1;
    const postUrl = `${zbc_domain}/t/${topicId}/posts.json`;
    const resp = await fetch(postUrl).then((res) =>
      res.json().then((data) => data)
    );

    const posts = resp.post_stream.posts;

    const comments = posts.map((post) => {
      const comment = Post.create(post);
      comment.avatar = post.avatar_template.replace("{size}", "90");
      return comment;
    });
    const topicPost = comments.shift();

    showModal("challengeDetailsSubmissionModal", {
      titleTranslated: title,
      model: {
        submission,
        comments,
        postCount,
        topicPost,
      },
    });
  }
}
