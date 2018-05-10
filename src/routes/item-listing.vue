<template>
  <div class="item-listing">
    <header-bar />
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    setTimeout(() => next(), 2000);
  }
};
</script>
