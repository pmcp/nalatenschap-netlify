<template>
  <h1 class="m-16 pt-8 text-center tracking-tight font-extrabold text-xl">
    <span class="block xl:inline">
      {{ activeQuestionText }}
    </span>
  </h1>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      activeQuestionText: "questions/activeQuestionText"
    })
  }
};
</script>
