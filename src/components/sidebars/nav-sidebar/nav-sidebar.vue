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
        }))" />

        <h3
          v-if="bookmarks && bookmarks.length > 0"
          class="style-4">{{ $t('bookmarks') }}</h3>
        <nav v-if="bookmarks && bookmarks.length > 0">
          <ul>
            <li
              v-for="bookmark in bookmarks"
              :key="bookmark.id"
              class="bookmark">
              <button
                class="no-wrap"
                @click="toBookmark(bookmark)">
              <i class="material-icons icon">bookmark_outline</i>{{ bookmark.title }}</button>
              <button v-tooltip="$t('delete_bookmark')" @click="deleteBookmark(bookmark.id)">
                <i class="material-icons">remove_circle_outline</i>
              </button>
            </li>
          </ul>
        </nav>
      </section>
      <section class="user-menu">
        <header>
          <button @click="toggleUserMenu()">
            <v-avatar
              :src="avatarURL"
              :alt="fullName"
              :indicator="true"
              class="avatar" />
            <span>{{ fullName }}</span>
            <i class="material-icons">more_vert</i>
          </button>
        </header>
        <div class="links">
          <nav>
            <ul>
              <li class="warning">
                <router-link to="/settings">
                  <i class="material-icons icon">settings</i>
                  {{ $t('admin_settings') }}
                </router-link>
              </li>
              <li>
                <a href="https://getdirectus.com">
                  <i class="material-icons icon">help</i>
                  {{ $t('help_and_docs') }}
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>
                <router-link to="/files">
                  <i class="material-icons icon">collections</i>
                  {{ $t('file_library') }}
                </router-link>
              </li>
              <li>
                <router-link to="/users">
                  <i class="material-icons icon">person</i>
                  {{ $t('user_directory') }}
                </router-link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>
                <router-link to="/activity">
                  <i class="material-icons icon">notifications</i>
                  {{ $t('activity') }}
                </router-link>
              </li>
              <li>
                <router-link :to="`/users/${currentUserID}`">
                  <i class="material-icons icon">person</i>
                  {{ $t('my_profile') }}
                </router-link>
              </li>
              <li>
                <button @click="signOutActive = true">
                  <i class="material-icons icon">exit_to_app</i>
                  {{ $t('sign_out') }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </aside>
  </transition>
</template>

<script>
import VLogo from "./v-logo.vue";
import ProjectSwitcher from "./project-switcher.vue";
import NavMenu from "./nav-menu.vue";

export default {
  name: "nav-sidebar",
  components: {
    VLogo,
    ProjectSwitcher,
    NavMenu
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
    avatarURL() {
      if (this.$store.state.me.avatar) {
        // TODO: This is basically pseudo code. Hasn't been tested yet
        const { url } = this.$store.state.auth;
        const { filename } = this.$store.state.me.data.avatar;
        return `${url}/${filename}`;
      }

      return this.$helpers.gravatar(this.email, { size: 40 });
    },
    email() {
      return this.$store.state.me.data && this.$store.state.me.data.email;
    },
    fullName() {
      const firstName =
        this.$store.state.me.data && this.$store.state.me.data.first_name;

      const lastName =
        this.$store.state.me.data && this.$store.state.me.data.last_name;

      return `${firstName} ${lastName}`;
    },
    currentUserID() {
      return this.$store.state.me.data && this.$store.state.me.data.id;
    }
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

.user-menu {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  transform: translateY(calc(100% - var(--header-height)));
  transition: transform var(--medium) var(--transition-out);
  will-change: transform;

  &:hover,
  .user-is-tabbing &:focus,
  .user-is-tabbing &:focus-within {
    transform: translateY(0);
    transition: transform var(--slow) var(--transition-in);
  }

  header {
    position: sticky;
    top: 0;
    background-color: var(--white);
    padding: 10px 0;
    border-top: 1px solid var(--lightest-gray);
    border-bottom: 1px solid var(--lightest-gray);
    margin-bottom: 10px;
    z-index: +1;

    .avatar {
      margin-right: 10px;
    }

    button {
      display: flex;
      align-items: center;
    }

    i {
      position: absolute;
      right: -10px;
      color: inherit;
    }
  }
  .warning {
    a,
    i {
      color: var(--warning);
    }
  }

  .warning:hover {
    a,
    i {
      color: var(--warning-dark);
    }
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
