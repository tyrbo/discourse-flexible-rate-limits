import Component from "@ember/component";
import computed from "ember-addons/ember-computed-decorators";

export default Component.extend({

  @computed("model.limitType")
  title(limitType) {
    return `flexible_rate_limits.debug_modal.title.${limitType}`;
  }

});
