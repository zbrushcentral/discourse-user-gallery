import { Route } from "@ember/routing/route";

export default Ember.Route.extend({
  async model(params) {
    const { id } = params;
    const res = await fetch(
      `https://pixologic.com/zbc-challenge/get-challenge.php?id=${id}`
    );
    const challenge = await res.json();
    const topic = challenge.topic;

    const url = `https://www3.zbrushcentral.com/t/${topic}/posts.json`;
    const response = await fetch(url).then((res) => res.json());

    const posts = response.post_stream.posts;
    const submissions = [];
    for (let i = 0; i < posts.length; i++) {
      const $cooked = $(posts[i].cooked);
      const $img = $cooked.find("img");
      const src = $img.attr("src");
      if (src) {
        submissions.push(src);
      }
    }
    return { challenge, submissions };
  },
});
