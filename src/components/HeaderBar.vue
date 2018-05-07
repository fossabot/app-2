<template>
  <header class="header-bar">
    <h1 v-if="title" class="style-1">{{ title }}</h1>
    <ol v-else class="breadcrumb">
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
.nav-toggle {
  background-color: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  margin-right: 20px;
  cursor: pointer;
  transition: opacity 140ms var(--transition);

  &:hover {
    opacity: 0.6;
  }
}

.header-bar {
  background-color: black;
  background-color: var(--darkest-gray);
  position: fixed;
  width: 100%;
  right: 0;
  top: 0;
  height: 4.62rem;
  color: white;
  display: flex;
  align-items: center;
  z-index: 20;
  padding-left: 20px;

  .title {
    flex-grow: 1;
    color: var(--white);
    margin-right: 20px;

    display: flex;
    align-items: center;
  }

  @media (min-width: 50em) {
    width: calc(100% - var(--nav-sidebar-width));

    .nav-toggle {
      display: none;
    }
  }
}

.buttons {
  display: flex;
  height: 100%;
}

.button {
  flex-shrink: 0;
}
</style>
