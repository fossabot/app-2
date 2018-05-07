<template>
  <router-view
    v-if="publicRoute"
    class="directus" />

  <div v-else-if="hydratingError">
    <v-error
      icon="warning"
      :title="$t('server_error')"
      :body="$t('server_error_copy')"
      color="danger" />
  </div>

  <div
    v-else
    class="directus">

    <loader
      v-if="hydrating"
      area="full-page" />

    <div v-else>
      <main>
        <router-view class="page-root" />
      </main>

      <v-confirm
        v-if="unsavedChanges"
        :message="$t('unsaved_changes_copy')"
        :confirm-text="$t('keep_editing')"
        :cancel-text="$t('discard_changes')"
        @confirm="keepEditing"
        @cancel="discardChanges" />
    </div>

    <notifications
      position="bottom right"
      classes="directus-notification" />
  </div>
</template>

<script>
import VError from "./components/VError.vue";

export default {
  name: "directus",
  components: {
    VError
  },
  computed: {
    publicRoute() {
      return this.$route.meta.publicRoute || false;
    },
    hydrating() {
      return this.$store.state.hydrating;
    },
    hydratingError() {
      return this.$store.state.hydratingError;
    },
    unsavedChanges() {
      return this.$route.query.editing === true;
    }
  },
  methods: {
    keepEditing() {
      this.$router.push(
        `/collections/${this.$route.query.collection}/${
          this.$route.query.primaryKey
        }`
      );
    },
    discardChanges() {
      this.$store.dispatch("discardChanges");
      this.$router.push(this.$route.path);
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
