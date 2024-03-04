import { default as computed, on } from "discourse-common/utils/decorators";
import Component from "@ember/component";
import Object from "@ember/object";
import { isEmpty } from "@ember/utils";

export default Component.extend({
  
  @on("didReceiveAttrs")
  _setup() {
    this.set("categoryGroupName", this.get("model.category_group.name"));
    this.set("topicLimit", this.get("model.category_group.topic_limit"));
    this.set("postLimit", this.get("model.category_group.post_limit"));
    this.set("cooldown", this.get("model.category_group.cooldown"));
  },

  actions: {
    save() {
      this.set("errorMsg", null);

      if (this.get("disabled")) return;

      const categoryGroupName = this.get("formatedCategoryGroupName");

      if (categoryGroupName == this.get("model.category_group.name")) {
        this.get("model.category_group").setProperties(this.get("categoryGroup"));
        this._closeModal();
        return;
      }

      if (this.get("categoryGroupNames").includes(categoryGroupName)) {
        this.set("errorMsg", I18n.t("flexible_rate_limits.admin.error.duplicate_category_group_name"));
        return;
      }

      const topicLimit = this.get("formatedTopicLimit");
      const postLimit = this.get("formatedPostLimit");

      if (this.get("model.category_group")) {
        this.get("model.category_group").setProperties(this.get("categoryGroup"));
      } else {
        this.get("model.category_groups").addObject(Object.create(this.get("categoryGroup")));
      }

      this._closeModal();
    }
  },

  @computed("formatedCategoryGroupName", "formatedTopicLimit", "formatedPostLimit", "formatedCooldown")
  disabled(categoryGroupName, topicLimit, postLimit, cooldown) {
    return isEmpty(categoryGroupName) || isNaN(topicLimit) || (topicLimit < 1) || isNaN(postLimit) || (postLimit < 1) || isNaN(cooldown) || (cooldown < 1);
  },

  @computed("categoryGroupName")
  formatedCategoryGroupName(categoryGroupName) {
    return (categoryGroupName || "").toLowerCase().trim();
  },

  @computed("topicLimit")
  formatedTopicLimit(topicLimit) {
    return parseInt(topicLimit);
  },

  @computed("postLimit")
  formatedPostLimit(postLimit) {
    return parseInt(postLimit);
  },

  @computed("cooldown")
  formatedCooldown(cooldown) {
    return parseInt(cooldown);
  },

  @computed("model.category_groups")
  categoryGroupNames(categoryGroups) {
    if (!categoryGroups) return [];

    return categoryGroups.map((cg) => {
      return cg.name;
    });
  },

  @computed("formatedCategoryGroupName", "formatedTopicLimit", "formatedPostLimit", "formatedCooldown")
  categoryGroup(categoryGroupName, topicLimit, postLimit, cooldown) {
    return {
      name: categoryGroupName,
      topic_limit: topicLimit,
      post_limit: postLimit,
      cooldown: cooldown
    };
  },

  _closeModal() {
    this.closeModal();
  }
});