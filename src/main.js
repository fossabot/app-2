import Vue from "vue";
import lodash from "lodash";
import Notifications from "vue-notification";
import VueDraggable from "vuedraggable";
import VTooltip from "v-tooltip";
import NProgress from "nprogress";

import "./assets/global.scss";
import "./assets/tooltip.scss";
import "./assets/progressbar.scss";
import "./globals";
import "./register-service-worker";
import App from "./app.vue";

import router from "./router";
import { i18n, loadLanguageAsync } from "./lang/";
import store from "./store/";
import api from "./api";
import helpers from "./helpers";
import hydrateStore from "./store/hydrate";

import "./helpers/handle-focus";

// Check if the global config is setup correctly. Panic if not.
if (!window.__DirectusConfig__) {
  const message = "Config file not found";
  alert(message); // eslint-disable-line no-alert
  throw new Error(message);
}

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, "$lodash", { value: lodash });
Object.defineProperty(Vue.prototype, "$api", { value: api });

NProgress.configure({ showSpinner: false });

Object.defineProperty(Vue.prototype, "$progress", { value: NProgress });

Vue.use(Notifications);

Vue.component("draggable", VueDraggable);

Vue.use(VTooltip, {
  defaultDelay: 500
});

new Vue({
  render: h => h(App),
  router,
  i18n,
  store,
  api,
  helpers
}).$mount("#app");

if (api.loggedIn) {
  hydrateStore().then(() => {
    loadLanguageAsync(store.state.me.data.locale);
  });
}
