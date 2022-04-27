import Controller from "@ember/controller";
import { action } from "@ember/object";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";
import { zbc_domain } from "../utils/const";

export default class ChallengeDetailsSubmissionModalController extends Controller {
  @action
  addLike() {
    const postId = this.get("model.post.id");
    ajax(`${zbc_domain}/post_actions`, {
      type: "POST",
      data: {
        id: postId,
        post_action_type_id: 2,
      },
      returnXHR: true,
    }).catch(function (error) {
      popupAjaxError(error);
    });
  }
  @action
  removeLike() {
    const postId = this.get("model.post.id");
    ajax(`${zbc_domain}/post_actions/${postId}`, {
      type: "DELETE",
      data: {
        post_action_type_id: 2,
      },
    }).catch(function (error) {
      popupAjaxError(error);
    });
  }
}
