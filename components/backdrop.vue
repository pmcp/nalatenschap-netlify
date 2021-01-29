<template>
  <div>
    <pre>
      {{ items }}
    </pre>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.session.items;
    }
  }
};
</script>

<style scoped>
</style>>
