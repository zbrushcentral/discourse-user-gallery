import { Route } from "@ember/routing/route";

export default Ember.Route.extend({
  async model(params) {
    const { id } = params;
    const res = await fetch(
      `https://pixologic.com/zbc-challenge/get-challenge.php?id=${id}`
    );
    const challenge = await res.json();
    // console.log(challenge)
    return { challenge };
  },
});
