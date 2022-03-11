import { Route } from "@ember/routing/route";
import { zbc_domain } from "../utils/const";
import { pixo_domain } from "../utils/const";

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
      const id = posts[i].id;
      const likes = posts[i].post_likes;
      const $cooked = $(posts[i].cooked);
      const $img = $cooked.find("img");
      const src = $img.attr("src");
      const username = posts[i].username;
      const action = posts[i].actions_summary.find((action) => action.id === 2);

      if (src) {
        submissions.push({ id, username, src, likes: action.count || 0 });
      }
    }

    return { challenge, submissions };
  },
});
