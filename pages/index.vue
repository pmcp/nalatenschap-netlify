<template>
  <section>
    
    <languages id="languages" />
    <welcome id="welcome" />
    <user id="user" />
    <div 
      class="h-screen flex flex-col" 
    >
      <question id="question" />
      <div 
        v-if="status.id === 0"
        id="media" 
        class="relative h-screen">
        <session class="absolute" />
        <media class="absolute" />
      </div>
    </div>
    <finish v-if="status.id === 2"/>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  computed: {
    status() {
      return this.$store.state.session.status[
        this.$store.state.session.activeStatus
      ];
    }
  },
  mounted() {
    this.runFlow();
  },
  methods: {
    ...mapActions({
      runFlow: "session/runFlow"
    })
  },
  // Get the JSON data, and put it in the store (bringing in all media)
  middleware: "data"
};
</script>
