<template>
  <div>
    <pre class="text-xs font-medium whitespace-pre-wrap">
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
