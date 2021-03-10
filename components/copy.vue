<template>
  <span>
    {{ copy }}
  </span>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    copy() {
      return this.translatedCopy[this.id];
    },
    ...mapGetters({
      translatedCopy: "copy/translatedCopy"
    })
  }
};
</script>
