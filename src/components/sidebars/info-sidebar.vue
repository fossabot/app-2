<template>
  <transition name="info">
    <aside class="info-sidebar">
      <slot />
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
  width: 80%;
  background-color: var(--white);
  border-left: 1px solid var(--lightest-gray);
  padding: 20px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
