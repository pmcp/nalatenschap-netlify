<template>
  <h1 class="mt-16 mb-16 pt-8 tracking-tight font-extrabold text-xl">
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
