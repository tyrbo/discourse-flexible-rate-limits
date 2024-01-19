import Component from "@ember/component";
import { action } from "@ember/object";

export default Component.extend({
    @action
    _closeModal() {
        this.closeModal();
    }
});