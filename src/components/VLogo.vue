<template>
  <div class="v-logo">
    <transition name="fade">
      <img
        v-show="customLogoPath && customLogoLoaded"
        @load="customLogoLoaded = true"
        :src="customLogoPath"
        :alt="projectName">
    </transition>
    <transition name="fade">
      <img
        v-show="directusLogoLoaded && !customLogoExists"
        @load="directusLogoLoaded = true"
        src="../assets/logo.svg"
        alt="Directus Logo">
    </transition>
  </div>
</template>

<script>
export default {
  name: "v-logo",
  data() {
    return {
      customLogoPath: '',
      customLogoLoaded: false,
      directusLogoLoaded: false
    };
  },
  created() {
    if (this.customLogoExists) {
      // NOTE: The api should return the logo relational from directus_settings. See directus/api#121
      this.$api
        .getItem("directus_files", logoID)
        .then(res => res.data.storage.full_url)
        .then(url => (this.customLogo = url))
        .catch(console.error);
    }
  },
  computed: {
    customLogoExists() {
      return Boolean(this.$store.state.settings.data.logo);
    },
  }
};
</script>

<style lang="scss" scoped>
.v-logo {
  width: 100%;
  height: 100%;
  background-color: var(--accent);
  padding: 10px;
  display: grid;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    grid-column: 1;
    grid-row: 1;
  }
}
</style>
