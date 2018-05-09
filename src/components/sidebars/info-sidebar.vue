<template>
  <transition name="info">
    <aside class="info-sidebar">
    </aside>
  </transition>
</template>

<script>
export default {
  name: "info-sidebar",
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.info-sidebar {
  position: fixed;
  right: 0;
  bottom: 0;
  height: calc(100% - var(--header-height));
  z-index: 10;
  transition: var(--slow) var(--transition-out);
  width: 90%;
  background-color: var(--white);
  border-left: 1px solid var(--lightest-gray);
  padding: 20px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  & .system {
    padding-bottom: 30px;
    border-bottom: 1px solid var(--lightest-gray);
    margin-bottom: 30px;
  }
}

.info-enter-active {
  transition: var(--slow) var(--transition-in);
}

.info-leave-active {
  transition: var(--medium) var(--transition-out);
}

.info-enter,
.info-leave-to {
  transform: translateX(100%);
}
</style>
