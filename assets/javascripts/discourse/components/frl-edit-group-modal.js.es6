import { default as computed, on } from "ember-addons/ember-computed-decorators";
import Component from "@ember/component";
import Object from "@ember/object";

export default Component.extend({

  @on("didReceiveAttrs")
  _setup() {
    this.set("selectedGroupId", this.get("group.id"));
    this.set("topicLimit", this.get("group.topic_limit"));
    this.set("postLimit", this.get("group.post_limit"));
    this.set("cooldown", this.get("group.cooldown"));
  },

  actions: {
    save() {
      if (this.get("disabled")) return;

      const group = this.get("_group");

      if (this.get("group")) {
        this.get("group").setProperties(group);
      } else {
        this.get("currentGroups").addObject(Object.create(group));
      }

      this.closeModal();
    }
  },

  @computed("selectedGroupId")
  formatedGroupId(selectedGroupId) {
    return parseInt(selectedGroupId);
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

  @computed("formatedGroupId", "formatedTopicLimit", "formatedPostLimit", "formatedCooldown")
  disabled(groupId, topicLimit, postLimit, cooldown) {
    return isNaN(groupId) || (groupId < 1) || isNaN(topicLimit) || (topicLimit < 1) || isNaN(postLimit) || (postLimit < 1) || isNaN(cooldown) || (cooldown < 1);
  },

  @computed("formatedGroupId", "formatedTopicLimit", "formatedPostLimit", "formatedCooldown")
  _group(groupId, topicLimit, postLimit, cooldown) {
    return {
      id: groupId,
      topic_limit: topicLimit,
      post_limit: postLimit,
      cooldown: cooldown
    };
  },

  @computed("groups", "currentGroups")
  availableGroups(groups, currentGroups) {
    const groupIds = (currentGroups || []).map(group => group.id);

    return groups.filter((group) => {
      return !groupIds.includes(group.id);
    });
  },

});