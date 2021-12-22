import UserGallery from "../models/user-gallery";

export default Ember.Route.extend({
  async model() {
    const user = this.modelFor("user");
    return {
      userGallery: UserGallery.create({ user }),
      challenges: await $.ajax(
        "http://localhost:8888/zbc-challenge/get-challenges.php"
      ),
      activity: await $.ajax("/u/" + user.username + "/activity.json", {
        headers: {
          Accept: "application/json",
        },
      }),
    };
  },
});
