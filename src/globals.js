import Vue from "vue";
import Spinner from "vue-simple-spinner";

import HeaderBar from "./modules/header-bar/header-bar.vue";
import NavSidebar from "./modules/nav-sidebar/nav-sidebar.vue";
import EditForm from "./modules/edit-form/edit-form.vue";
import VInterface from "./modules/v-interface/v-interface.vue";

import InvisibleLabel from "./components/globals/InvisibleLabel.vue";
import VModal from "./components/globals/VModal.vue";
import VAvatar from "./components/globals/VAvatar.vue";
import VAlert from "./components/globals/VAlert.vue";
import VConfirm from "./components/globals/VConfirm.vue";
import VPrompt from "./components/globals/VPrompt.vue";
import VButton from "./components/globals/VButton.vue";
import VCard from "./components/globals/VCard.vue";
import VCheckbox from "./components/globals/VCheckbox.vue";
import VDetails from "./components/globals/VDetails.vue";
import VInput from "./components/globals/VInput.vue";
import VRadio from "./components/globals/VRadio.vue";
import VSelect from "./components/globals/VSelect.vue";
import VSlider from "./components/globals/VSlider.vue";
import VTable from "./components/globals/VTable.vue";
import VTextarea from "./components/globals/VTextarea.vue";

import ReadonlyExtension from "./components/extensions/ReadonlyExtension.vue";
import ListingExtension from "./components/extensions/ListingExtension.vue";
import ListingOptionsExtension from "./components/extensions/ListingOptionsExtension.vue";

Vue.component("header-bar", HeaderBar);
Vue.component("nav-sidebar", NavSidebar);
Vue.component("edit-form", EditForm);
Vue.component("v-interface", VInterface);

Vue.component("invisible-label", InvisibleLabel);
Vue.component("listing-extension", ListingExtension);
Vue.component("listing-options-extension", ListingOptionsExtension);
Vue.component("readonly-extension", ReadonlyExtension);
Vue.component("spinner", Spinner);
Vue.component("v-avatar", VAvatar);
Vue.component("v-alert", VAlert);
Vue.component("v-confirm", VConfirm);
Vue.component("v-prompt", VPrompt);
Vue.component("v-button", VButton);
Vue.component("v-card", VCard);
Vue.component("v-checkbox", VCheckbox);
Vue.component("v-details", VDetails);
Vue.component("v-input", VInput);
Vue.component("v-modal", VModal);
Vue.component("v-radio", VRadio);
Vue.component("v-select", VSelect);
Vue.component("v-slider", VSlider);
Vue.component("v-table", VTable);
Vue.component("v-textarea", VTextarea);
