import Component from "@ember/component";
import showModal from "discourse/lib/show-modal";
import { ajax } from "discourse/lib/ajax";
import { action } from "@ember/object";

export default Component.extend({

  availableCategoryIds: [],

  @action
  addCategoryGroup() {
    this.set("model.category_group", null);
    showModal("edit-category-group", { model: this.get("model") });
  },

  @action
  editCategoryGroup(categoryGroup) {
    this.set("model.category_group", categoryGroup);
    showModal("edit-category-group", { model: this.get("model") });
  },

  @action
  deleteCategoryGroup(categoryGroup) {
    this.get("model.category_groups").removeObject(categoryGroup);
    if (categoryGroup.categories) this.get("availableCategoryIds").removeObjects(categoryGroup.categories);
  },

  @action
  saveCategoryGroups() {
    if (!this.get("model.category_groups")) return;
    this.save();
  },

  save() {
    this.set("disableSave", true);

    const categoryGroups = JSON.stringify({ category_groups: this.get("model.category_groups") });
    const args = { type: "POST", dataType: "json", contentType: "application/json", data: categoryGroups }

    ajax("/admin/plugins/flexible-rate-limits/save.json", args)
      .then( () => this.send("reload") )
      .finally(() => this.set("disableSave", false) );
  }

});