<template>
  <div class="fixed">
    <pre>
      STATUS:
      {{ status }}
    </pre>
  </div>
</template>

<script>
export default {
  computed: {
    status() {
      return this.$store.state.session.status[
        this.$store.state.session.activeStatus
      ];
    }
  }
};
</script>

<style scoped>
</style>>
