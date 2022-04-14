import Component from "@ember/component";
import { zbc_domain } from "../utils/const";

export default Component.extend({
  comments: "",
  init() {
    this._super(...arguments);
    this.getComments();
  },

  async getComments() {
    const topicId = this.get("topic");
    const postUrl = `${zbc_domain}/t/${topicId}/posts.json`;
    const resp = await fetch(postUrl).then((res) =>
      res.json().then((data) => data)
    );
    const posts = resp.post_stream.posts;
    posts.shift();
    this.set("comments", posts);

    return comments;
  },
});

// for (let i = 0; i < posts.length; i++) {
//   const post = posts[i];
//   return post;
// }
// const result = posts.map((post) => ({
//   username: post.username,
//   gName: post.gravatar_name,
// }));
// console.log(this.get("reslut"));
// return result;
// return this.comments;
// const posted = Post.create(post);
// this.set("comments", posted);
// console.log(this.comments.username);
// const $cooked = $(post.cooked);
// const $img = $cooked.find("innerHTML");
// console.log($img);
