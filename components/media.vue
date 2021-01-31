<template>
  <div>
    <div 
      
      class="pmcp-grid"
    >
      <div 
        v-for="(i, key) in items" 
        :class="classObject(i.orientation, i.firstLine)"
        :key="key">
        <button 
          v-if="i" 
          @click="runFlow(i)">
          <div 
            v-if="i.firstLine" 
            class="text-left hover:border-gray-500 border-black border-2 p-12 bg-white whitespace-pre">
            {{ i.firstLine }}         
          </div>
          <media-item 
            v-else
            :item="i" />
        </button>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    items() {
      return this.$store.state.media.all;
    },
    status() {
      return this.$store.state.session.activeStatus;
    }
  },
  methods: {
    classObject(orientation, firstLine) {
      return {
        landscape: orientation === "landscape",
        portrait: orientation === "portrait",
        "col-span-full": firstLine,
        "flex justify-start items-center": firstLine
      };
    },
    ...mapActions({
      runFlow: "session/runFlow"
    })
  }
};
</script>

<style scoped>
.pmcp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(25% - 2rem), 1fr));
  grid-auto-rows: 1fr;
  /* grid-template-rows: masonry; */
  /* This is better for small screens, once min() is better supported */
  grid-gap: 1rem;
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

.landscape {
  grid-column: span 2;
}

.pmcp-grid > *:first-child.landscape {
  grid-column: span 2;
}

@media (max-width: 900px) {
  .pmcp-grid {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-auto-rows: 1fr;
    grid-template-rows: masonry;
    /* This is better for small screens, once min() is better supported */
    grid-gap: 1rem;
  }
  .pmcp-grid > div {
    grid-column: span 1;
  }
}

@media (max-width: 600px) {
  .pmcp-grid {
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-auto-rows: 1fr;
    /* grid-template-rows: masonry; */
    /* This is better for small screens, once min() is better supported */
    grid-gap: 1rem;
  }
  .pmcp-grid > div {
    grid-column: span 1;
  }
}
</style>
