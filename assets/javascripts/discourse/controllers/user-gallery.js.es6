import Controller from "@ember/controller";
import { action } from "@ember/object";

export default class UserGalleryController extends Controller {
  @action
  refreshPage() {
    this.send("refreshPage");
  }
}
