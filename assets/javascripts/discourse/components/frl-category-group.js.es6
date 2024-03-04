import computed from "discourse-common/utils/decorators";
import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

import EditGroup from "../components/frl-edit-group";

export default Component.extend({
  classNames: ["frl-category-group"],
  modal: service(),

  @action
  edit() {
    this.editCategoryGroup(this.get("categoryGroup"));
  },

  @action
  delete() {
    this.deleteCategoryGroup(this.get("categoryGroup"));
  },

  @action
  addGroup() {
    if (!this.get("categoryGroup.groups")) {
      this.set("categoryGroup.groups", []);
    }
    this.modal.show(EditGroup, { model: { groups: this.get("groups"), currentGroups: this.get("categoryGroup.groups") } });
  },

  @action
  editGroup(group) {
    this.modal.show(EditGroup, { model: { groups: this.get("groups"), currentGroups: this.get("categoryGroup.groups"), group: group } });
  },

  @action
  removeGroup(group) {
    this.get("categoryGroup.groups").removeObject(group);
  },

  @action
  addCategory() {
    const categoryId = this.get("formatedCategoryId");

    if (isNaN(categoryId)) return;
    if (!this.get("categoryGroup.categories")) this.set("categoryGroup.categories", []);

    this.get("categoryGroup.categories").addObject(categoryId);
    this.get("availableCategoryIds").removeObject(categoryId);
    this.set("selectedCategoryId", null);
  },

  @action
  deleteCategory(categoryId) {
    this.get("categoryGroup.categories").removeObject(categoryId);
    this.get("availableCategoryIds").addObject(categoryId);
  },

  @action
  _closeModal() {
      this.closeModal();
  },

  @computed("selectedCategoryId")
  formatedCategoryId(categoryId) {
    return parseInt(categoryId);
  }
});