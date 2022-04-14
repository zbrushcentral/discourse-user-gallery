import { Route } from "@ember/routing/route";
import { zbc_domain, pixo_domain } from "../utils/const";
// import Post from "discourse/models/post";

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

    // topics.shift();
    const submissions = topics.map((topic) => {
      const topicId = topic.id;
      const src = topic.image_url;

      const username = topic.last_poster_username;
      return { src, username, topic, topicId };
    });

    return { challenge, submissions };
  },
});
