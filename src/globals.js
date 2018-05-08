import Vue from "vue";

import HeaderBar from "./components/header-bar/header-bar.vue";
import NavSidebar from "./components/sidebars/nav-sidebar/nav-sidebar.vue";
import EditForm from "./components/edit-form/edit-form.vue";
import VInterface from "./components/extensions/v-interface/v-interface.vue";
import VListing from "./components/extensions/v-listing/v-listing.vue";
import VListingOptions from "./components/extensions/v-listing-options/v-listing-options.vue";
import VReadonly from "./components/extensions/v-readonly/v-readonly.vue";

Vue.component("header-bar", HeaderBar);
Vue.component("nav-sidebar", NavSidebar);
Vue.component("edit-form", EditForm);
Vue.component("v-interface", VInterface);
Vue.component("v-listing", VListing);
Vue.component("v-listing-options", VListingOptions);
Vue.component("v-readonly", VReadonly);
