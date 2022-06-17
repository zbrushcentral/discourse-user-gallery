import { Route } from "@ember/routing/route";
import { zbc_domain, pixo_domain } from "../utils/const";
import Post from "discourse/models/post";

export default Ember.Route.extend({
  async model(params) {
    const { id } = params;

    const res = await fetch(
      `${pixo_domain}/zbc-challenge/get-challenge.php?id=${id}`
    );
    const challenge = await res.json();

    const isClosed = challenge.status === "closed";
    const isOpen = challenge.status === "open";

    const challengeUrl = `${zbc_domain}/c/${challenge.category_slug}/${challenge.category_id}.json`;
    const response = await fetch(challengeUrl).then((res) => res.json());
    //this is the first topic that is about the category
    const topics = response.topic_list.topics;

    let submissions = await Promise.all(
      topics.map(async (topic) => {
        const src = topic.image_url;
        const topicId = topic.id;
        const views = topic.views;
        const title = topic.title;
        const postUrl = `${zbc_domain}/t/${topicId}/posts.json`;
        const resp = await fetch(postUrl).then((res) =>
          res.json().then((data) => data)
        );

        const posts = resp.post_stream.posts;

        const comments = posts.map((post) => {
          const comment = Post.create(post);
          comment.avatar = post.avatar_template.replace("{size}", "90");
          let commentLikes = "";
          comment.commentLikes =
            post?.likeAction?.count === undefined ? 0 : post.likeAction.count;

          return comment;
        });
        const topicPost = comments.shift();
        const isCurrentUser = topicPost.yours;
        const likes =
          topicPost?.likeAction?.count === undefined
            ? 0
            : topicPost.likeAction.count;
        const superLike = likes * 25;
        const score = superLike + views;

        return {
          src,
          topic,
          topicId,
          views,
          title,
          score,
          comments,
          topicPost,
          likes,
          superLike,
          isCurrentUser,
        };
      })
    );

    submissions = submissions
      .sort((a, b) => b.score - a.score)
      .map((submission, index) => {
        return {
          ...submission,
          placement: index + 1,
        };
      });
    // .sort(() => {
    //   Math.random() < 0.5 ? -1 : 1;
    // });

    const totalSubmissions = submissions.length - 1;
    return { challenge, submissions, isOpen, isClosed, totalSubmissions };
  },
});
