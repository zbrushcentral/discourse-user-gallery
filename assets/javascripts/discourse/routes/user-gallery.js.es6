import UserGallery from "../models/user-gallery";

export default Ember.Route.extend({
  model() {
    return UserGallery.create({ user: this.modelFor("user") });
  },
});
