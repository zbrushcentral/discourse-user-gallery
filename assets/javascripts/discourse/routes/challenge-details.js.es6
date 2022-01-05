import { Route } from "@ember/routing/route";

export default Ember.Route.extend({
  async model(params) {
    const { id } = params;
    const res = await fetch(
      `http://localhost:8888/zbc-challenge/get-challenge.php?id=${id}`
    );
    const challenge = await res.json();
    // console.log(challenge)
    return { challenge };
  },
});
