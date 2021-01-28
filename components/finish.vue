<template>
  <div>
    <h1 class="m-16 text-center tracking-tight font-extrabold text-xl">
      We done here
    </h1>

  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
export default {
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  methods: {
    ...mapActions({
      sendSession: "session/sendSession"
    })
  }
};
</script>
