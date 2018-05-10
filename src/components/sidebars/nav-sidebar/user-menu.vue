<template>
  <div class="user-menu">
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
      <nav-menu
        :links="[
          { path: '/settings', name: $t('admin_settings'), icon: 'settings', color: 'warning' },
          { path: 'https://getdirectus.com', name: $t('help_and_docs'), icon: 'help' }
      ]" />

      <nav-menu
        :links="[
          { path: '/files', name: $t('file_library'), icon: 'collections' },
          { path: '/users', name: $t('user_directory'), icon: 'person' }
      ]" />

      <nav-menu
        :links="[
          { path: '/activity', name: $t('activity'), icon: 'notifications' },
          { path: `/users/${currentUserID}`, name: $t('my_profile'), icon: 'person' }
      ]" />

      <button @click="signOutActive = true">
        <i class="material-icons icon">exit_to_app</i>
        {{ $t('sign_out') }}
      </button>
    </div>
  </div>
</template>

<script>
import NavMenu from "./nav-menu.vue";

export default {
  name: "user-menu",
  components: {
    NavMenu
  },
  computed: {
    avatarURL() {
      if (this.$store.state.me.avatar) {
        // TODO: This is basically pseudo code. Hasn't been tested yet
        const { url } = this.$store.state.auth;
        const { filename } = this.$store.state.me.data.avatar;
        return `${url}/${filename}`;
      }

      return this.$helpers.gravatar(this.email, { size: 40 });
    },
    currentUserID() {
      return this.$store.state.me.data && this.$store.state.me.data.id;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.user-menu {
  padding: 0 20px 20px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
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
</style>
