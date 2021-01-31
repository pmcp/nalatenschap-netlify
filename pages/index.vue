<template>
  <section>
    
    <!-- <status /> -->
    <languages 
      id="languages" />
    <welcome 
      id="welcome" />
    <user 
      id="user" />
    <div 
      v-if="userFormFilledCorrect">
      <div
        class="min-h-screen flex flex-col">
        <question 
          id="question" />
        <div 
          id="media" 
          class="relative min-h-screen w-full">
          <backdrop class="absolute" />
          <media class="absolute" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  computed: {
    status() {
      return this.$store.state.session.activeStatus;
    },
    ...mapGetters({
      userFormFilledCorrect: "session/userFormFilledCorrect"
    })
  },
  mounted() {
    this.runFlow();
  },
  methods: {
    ...mapActions({
      runFlow: "session/runFlow"
    })
  }
  // Get the JSON data, and put it in the store (bringing in all media)
  // middleware: "data"
};
</script>
