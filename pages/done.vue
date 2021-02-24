<template>
  <section>
  
    <div id="thanks"/>
    <div>
      <session 
        v-if="status === 3"
        class="min-h-screen" />
      <contact 
       
        class="min-h-screen"/>
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
