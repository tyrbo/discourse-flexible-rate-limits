import { ajax } from "discourse/lib/ajax";
import DiscourseRoute from "discourse/routes/discourse";
import Object from "@ember/object";

export default DiscourseRoute.extend({

  titleToken() {
    return I18n.t("flexible_rate_limits.admin.title");
  },

  model() {
    return ajax("/admin/plugins/flexible-rate-limits.json").then((data) => {

      data.category_groups = (data.category_groups || []).map((cg) => {
        cg.groups = (cg.groups || []).map(g => Object.create(g));
        return Object.create(cg);
      });

      return data;
    });
  },

  setupController(controller, model) {
    controller.set("model", model);

    const availableCategoryIds = this.availableCategoryIds(model);

    if (availableCategoryIds) {
      controller.set("availableCategoryIds", availableCategoryIds);
    }
  },

  actions: {
    reload() {
      this.refresh();
    }
  },

  availableCategoryIds(model) {
    if (!model) return;

    const categoryGroups = model.category_groups;

    let usedIds = [];

    categoryGroups.forEach((categoryGroup) => {
      if (categoryGroup.categories) {
        usedIds = usedIds.concat(categoryGroup.categories);
      }
    });

    return this.site.categories.filter( category => !usedIds.includes(category.id) ).map( category => category.id );
  }

});