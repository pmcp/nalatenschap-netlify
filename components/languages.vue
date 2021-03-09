<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    COPY: {{ copy }}
    <div 
      v-if="allLanguages" 
      class="pmcp-grid w-full">
      <button
        v-for="(i, key) in allLanguages"
        :key="key"
        
        :class="{ 'border-gray-200': !i.active }"
        class="border-black border-2 font-extrabold text-xl disabled"
        @click="setLanguage(i)"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  computed: {
    activeLanguage() {
      return this.$store.state.copy.active;
    },
    allLanguages() {
      return this.$store.state.copy.languages;
    },
    copy() {
      return this.$store.state.copy.copy;
    }
  },

  methods: {
    setLanguage(i) {
      this.setActiveLanguage(i);
      this.$scrollTo("#welcome");
    },
    ...mapMutations({
      setActiveLanguage: "copy/setActive"
    })
  }
};
</script>

<style scoped>
.pmcp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(20% - 2rem), 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
}

@media only screen and (max-width: 850px) {
  .pmcp-grid {
    grid-template-columns: repeat(auto-fill, minmax(calc(8em - 2rem), 1fr));
    grid-gap: 1em;
  }
}

.pmcp-grid::before {
  content: "";
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.pmcp-grid > *:first-child {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}
</style>
