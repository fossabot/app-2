<template>
  <transition name="nav">
    <aside class="nav-sidebar">
      <button
        class="a11y-close"
        @click="$emit('toggleNav', false)">Close nav</button>

      <v-logo class="logo" />

      <section class="content">
        <project-switcher />

        <nav-menu :title="$t('collections')" :links="collectionNames.map(name => ({
          path: `/collections/${name}`,
          name: $t(`collections-${name}`)
        }))" no-border />

        <nav-bookmarks :bookmarks="bookmarks" />
      </section>

      <user-menu />
    </aside>
  </transition>
</template>

<script>
import VLogo from "./v-logo.vue";
import ProjectSwitcher from "./project-switcher.vue";
import NavMenu from "./nav-menu.vue";
import UserMenu from "./user-menu.vue";
import NavBookmarks from "./nav-bookmarks.vue";

export default {
  name: "nav-sidebar",
  components: {
    VLogo,
    ProjectSwitcher,
    NavMenu,
    UserMenu,
    NavBookmarks
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      signOutActive: false,
    };
  },
  computed: {
    collectionNames() {
      const collections = this.$store.state.collections.data;

      if (collections == null) return [];

      return Object.values(collections)
        .filter(collection => collection.hidden === false)
        .map(collection => collection.collection);
    },
    bookmarks() {
      return this.$store.state.bookmarks.data;
    },
    projectName() {
      return this.$store.state.auth.projectName;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    deleteBookmark(id) {
      this.$store.dispatch("deleteBookmark", id);
    },
    toBookmark(bookmark) {
      /* eslint-disable camelcase */
      const {
        collection,
        search_query,
        filters,
        view_options,
        view_type,
        view_query
      } = bookmark;

      this.$store
        .dispatch("setListingPreferences", {
          collection,
          updates: {
            search_query,
            filters,
            view_options,
            view_type,
            view_query
          }
        })
        .then(() => {
          this.$router.push(`/collections/${collection}`);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
aside {
  width: var(--nav-sidebar-width);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 30;

  > div {
    height: 100%;
  }

  & .a11y-close {
    position: absolute;
    z-index: 15;
    left: -999px;
    background-color: yellow;
    padding: 5px;

    .user-is-tabbing &:focus {
      top: 13px;
      left: 13px;
    }
  }
}

.content,
.user-menu {
  position: relative;
  background-color: var(--white);
  padding: 20px;
  padding-top: 0;
}

.user-menu {
  position: relative;
  max-height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.content {
  height: calc(100% - var(--header-height) - var(--header-height));
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}


.bookmark {
  display: flex;
  align-items: center;

  > * {
    display: block;
  }

  & button:first-child {
    flex-grow: 1;
    text-align: left;
  }

  & button:last-child {
    opacity: 0;
    transition: opacity var(--fast) var(--transition);

    i {
      font-size: 18px;
      vertical-align: baseline;
      color: var(--lighter-gray);
    }

    &:hover i {
      color: var(--danger);
    }
  }

  &:hover button:last-child {
    opacity: 1;
  }
}

.nav-enter-active {
  transition: var(--slow) var(--transition-in);
}

.nav-leave-active {
  transition: var(--medium) var(--transition-out);
}

.nav-enter,
.nav-leave-to {
  transform: translateX(-100%);
}

@media (min-width: 800px) {
  .nav-enter,
  .nav-leave-to {
    transform: translateX(0);
  }

  .content,
  .user-menu {
    box-shadow: 1px 0 0 -0px var(--lightest-gray);
  }
}

.fade-enter-active {
  transition: opacity var(--fast) var(--transition-in);
}

.fade-leave-active {
  transition: opacity var(--fast) var(--transition-out);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
body {
  padding-left: var(--nav-sidebar-width);
}
</style>
