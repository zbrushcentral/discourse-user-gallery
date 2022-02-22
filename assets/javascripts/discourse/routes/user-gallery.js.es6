import UserGallery from "../models/user-gallery";
import { pixo_domain } from "../utils/const";

export default Ember.Route.extend({
  async model() {
    const user = this.modelFor("user");
    return {
      userGallery: UserGallery.create({ user }),
      challenges: (
        await $.ajax(`${pixo_domain}/zbc-challenge/get-challenges.php`)
      ).filter((challenge) => challenge.status === "open"),
      activity: await $.ajax("/u/" + user.username + "/activity.json", {
        headers: {
          Accept: "application/json",
        },
      }),
    };
  },
});
