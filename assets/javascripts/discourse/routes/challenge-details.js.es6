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
    const submissionsSrc = [];
    const submissionId = [];

    for (let i = 0; i < posts.length; i++) {
      const postId = posts[i].id;
      const $cooked = $(posts[i].cooked);
      const $img = $cooked.find("img");
      const src = $img.attr("src");
      submissionId.push(postId);
      if (src) {
        submissionsSrc.push(src);
      }
    }
    const item = submissionId.map((id, index) => {
      index -= 1;
      return {
        id: id,
        src: submissionsSrc[index],
      };
    });
    const submissions = [];
    for (let i = 1; i < item.length; i++) {
      submissions.push(item[i]);
      console.log(submissions);
    }
    return { challenge, submissions };
  },
});
