import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { set } from "lodash";

import auth from "./modules/auth/";
import collections from "./modules/collections";
import me from "./modules/me";
import settings from "./modules/settings";
import extensions from "./modules/extensions";
import edits from "./modules/edits";
import bookmarks from "./modules/bookmarks";

import * as actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const persistedPaths = [
  "auth.token",
  "auth.url",
  "auth.projectName",
  "edits.collection",
  "edits.primaryKey",
  "edits.values"
];

const store = new Vuex.Store({
  state: {
    hydrating: true,
    hydratingError: null,
    latency: []
  },
  actions,
  getters,
  mutations,
  strict: debug,
  modules: {
    auth,
    collections,
    me,
    settings,
    extensions,
    edits,
    bookmarks
  },
  plugins: [
    createPersistedState({
      key: "directus",
      paths: persistedPaths
    })
  ]
});

export default store;

const initialStateCopy = JSON.parse(JSON.stringify(store.state));

/* Delete the persisted data from the initial state, so the app won't reset back to the persisted
     data */
persistedPaths.forEach(path => {
  set(initialStateCopy, path, null);
});

export function resetState() {
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)));
}
