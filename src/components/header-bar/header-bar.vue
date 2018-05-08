<template>
  <header class="header-bar">
    <h1 v-if="title" class="title">{{ title }}</h1>
    <ol v-else class="breadcrumb title">
      <li v-for="({ name, path }, index) in (breadcrumb || defaultBreadcrumb)">
        <template v-if="index !== (breadcrumb || defaultBreadcrumb).length - 1">{{ name }}</template>
        <h1 v-else>{{ name }}</h1>
      </li>
    </ol>
    <slot />
  </header>
</template>

<script>
export default {
  name: "header-bar",
  props: {
    title: {
      type: String,
      default: null
    },
    breadcrumb: {
      type: Array,
      default: null
    }
  },
  computed: {
    defaultBreadcrumb() {
      const routeParts = this.$route.path.split("/");
      routeParts.shift();

      return routeParts.map((part, i) => {
        let url = "";

        for (let x = 0; x < i; x++) {
          url += `/${routeParts[x]}`;
        }

        url += `/${part}`;

        return {
          name: this.$helpers.formatTitle(part),
          path: url
        };
      });
    }
  }
};
</script>

<style scoped lang="scss">
.header-bar {
  background-color: var(--darkest-gray);
  position: fixed;
  width: 100%;
  right: 0;
  top: 0;
  height: 4.62rem;
  color: var(--white);
  display: flex;
  align-items: center;
  z-index: 20;
  padding-left: calc(var(--nav-sidebar-width) + 20px);

  .title {
    color: var(--darker-gray);
    font-size: 1.38em;
    line-height: 1.16;
    font-weight: 400;
    height: 20px;
  }

  .breadcrumb {
    list-style: none;
    padding: 0;
  }

  h1.title,
  .title h1 {
    color: var(--white);
  }
}
</style>

<style>
body {
  padding-top: var(--header-height);
}
</style>
