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
    const urls = `${zbc_domain}/t/${id}.json`;

    const response = await fetch(url).then((res) => res.json());
    const responses = await fetch(urls).then((res) => res.json());
    const topics = responses;
    // console.log(topics);

    const posts = response.post_stream.posts;
    const submissions = [];
    console.log("this is posts ", posts);

    for (let i = 0; i < posts.length; i++) {
      const post = Post.create(posts[i]);
      const username = post.username;
      const $cooked = $(post.cooked);
      const $img = $cooked.find("img");
      const src = $img.attr("src");

      if (src) {
        submissions.push({ post, src, username, topics });
      }
    }

    return { challenge, submissions };
  },
});
