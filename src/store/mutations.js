import {
  STORE_HYDRATED,
  HYDRATING_FAILED,
  LATENCY,
  TOGGLE_NAV,
  TOGGLE_INFO
} from "./mutation-types";

const mutations = {
  [STORE_HYDRATED](state) {
    state.hydrating = false;
  },

  [HYDRATING_FAILED](state, error) {
    state.hydrating = false;
    state.hydratingError = error;
  },

  [LATENCY](state, info) {
    const latencies = [...state.latency];
    latencies.push(info);

    if (latencies.length > 200) {
      latencies.shift();
    }

    state.latency = latencies;
  },

  [TOGGLE_NAV](state, active) {
    state.sidebars.nav = active;
  },

  [TOGGLE_INFO](state, active) {
    state.sidebars.info = active;
  }
};

export default mutations;
