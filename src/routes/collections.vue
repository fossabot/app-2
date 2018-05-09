<template>
  <div class="collections">
    <header-bar />
    <nav-sidebar />
    <v-table
      :items="items"
      :columns="fields"
      primary-key-field="collection"
      link="__link__"
      @select="select" />
  </div>
</template>

<script>
export default {
  name: "collections",
  computed: {
    items() {
      const collections = this.$store.state.collections.data || {};

      return Object.values(collections)
        .filter(collection => collection.hidden === false)
        .map(collection => ({
          collection: this.$t(`collections-${collection.collection}`),
          __link__: `/collections/${collection.collection}`
        }));
    },
    fields() {
      return [
        {
          field: "collection",
          name: this.$t("collection")
        }
      ];
    }
  },
  methods: {
    select(selection) {
      this.selection = selection;
    }
  }
};
</script>

<style lang="scss" scoped>
.collections {
  padding-bottom: (--page-padding-bottom);
}
</style>
