import { Route } from "@ember/routing/route";
import { zbc_domain } from "../utils/const";
import { pixo_domain } from "../utils/const";
import Post from "discourse/models/post";

export default Ember.Route.extend({
  async model(params) {
    const { id } = params;

    const res = await fetch(
      `${pixo_domain}/zbc-challenge/get-challenge.php?id=${id}`
    );
    const challenge = await res.json();
    const topic = challenge.topic;

    const url = `${zbc_domain}/t/${topic}/posts.json`;
    const response = await fetch(url).then((res) => res.json());

    const posts = response.post_stream.posts;
    const submissions = [];

    for (let i = 0; i < posts.length; i++) {
      const post = Post.create(posts[i]);
      const username = post.username;
      const $cooked = $(post.cooked);
      const $img = $cooked.find("img");
      const src = $img.attr("src");

      if (src) {
        submissions.push({ post, src, username });
      }
    }

    return { challenge, submissions };
  },
});
