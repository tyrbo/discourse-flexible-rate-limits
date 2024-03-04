import Component from "@ember/component";
import computed from "discourse-common/utils/decorators";
import { action } from "@ember/object";

export default Component.extend({
  @computed("model.limitType")
  title(limitType) {
    return `flexible_rate_limits.debug_modal.title.${limitType}`;
  },

  @action
  _closeModal() {
    this.closeModal();
  }
});
