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
    const topics = response.topic_list.topics;
    //this is the first topic that is about the category
    const aboutCategory = topics.shift();

    console.log(aboutCategory);

    const submissions = topics.map((topic) => {
      const topicId = topic.id;
      const src = topic.image_url;
      const views = topic.views;
      const title = topic.title;
      const score = "";

      return { src, topic, topicId, views, title, score };
    });

    const totalSubmissions = submissions.length - 1;
    return { challenge, submissions, isOpen, totalSubmissions };
  },
});
