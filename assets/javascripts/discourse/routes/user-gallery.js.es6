import UserGallery from '../models/user-gallery';

export default Discourse.Route.extend({
  model() {
    return UserGallery.create({ user: this.modelFor("user") });
  },
});
