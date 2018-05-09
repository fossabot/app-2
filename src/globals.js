import Vue from "vue";

import HeaderBar from "./components/header-bar/header-bar.vue";
import NavSidebar from "./components/sidebars/nav-sidebar/nav-sidebar.vue";
import EditForm from "./components/edit-form/edit-form.vue";

// extensions
import VInterface from "./components/extensions/v-interface/v-interface.vue";
import VListing from "./components/extensions/v-listing/v-listing.vue";
import VListingOptions from "./components/extensions/v-listing-options/v-listing-options.vue";
import VReadonly from "./components/extensions/v-readonly/v-readonly.vue";

// form-inputs
import VButton from "./components/form-inputs/v-button.vue";
import VCheckbox from "./components/form-inputs/v-checkbox.vue";
import VInput from "./components/form-inputs/v-input.vue";
import VRadio from "./components/form-inputs/v-radio.vue";
import VSelect from "./components/form-inputs/v-select.vue";
import VSlider from "./components/form-inputs/v-slider.vue";
import VTextarea from "./components/form-inputs/v-textarea.vue";

import VModal from "./components/modals/v-modal.vue";

import VTable from "./components/v-table/v-table.vue";

import VAvatar from "./components/v-avatar.vue";
import VCard from "./components/v-card.vue";
import VDetails from "./components/v-details.vue";
import VNotice from "./components/v-notice.vue";

Vue.component("header-bar", HeaderBar);
Vue.component("nav-sidebar", NavSidebar);
Vue.component("edit-form", EditForm);

// extensions
Vue.component("v-interface", VInterface);
Vue.component("v-listing", VListing);
Vue.component("v-listing-options", VListingOptions);
Vue.component("v-readonly", VReadonly);

// form-inputs
Vue.component("v-button", VButton);
Vue.component("v-checkbox", VCheckbox);
Vue.component("v-input", VInput);
Vue.component("v-radio", VRadio);
Vue.component("v-select", VSelect);
Vue.component("v-slider", VSlider);
Vue.component("v-textarea", VTextarea);

Vue.component("v-modal", VModal);

Vue.component("v-table", VTable);

Vue.component("v-avatar", VAvatar);
Vue.component("v-card", VCard);
Vue.component("v-details", VDetails);
Vue.component("v-notice", VNotice);
