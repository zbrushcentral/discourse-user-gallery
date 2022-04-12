import { Route } from "@ember/routing/route";
import { zbc_domain } from "../utils/const";
import { pixo_domain } from "../utils/const";
import Topic from "discourse/models/topic";
import Post from "discourse/models/post";

export default Ember.Route.extend({
  async model(params) {
    const { id } = params;

    const res = await fetch(
      `${pixo_domain}/zbc-challenge/get-challenge.php?id=${id}`
    );
    const challenge = await res.json();

    const challengeUrl = `${zbc_domain}/c/${challenge.category_slug}/${challenge.category_id}.json`;
    const response = await fetch(challengeUrl).then((res) => res.json());
    const topics = response.topic_list.topics;
    topics.shift();

    const submissions = topics.map((topic) => {
      const src = topic.image_url;
      const username = topic.last_poster_username;
      const posts = topic.posters;
      const post = posts.map((post) => {
        post;
      });
      return { src, username, topic, post };
    });

    return { challenge, submissions };
  },
});
