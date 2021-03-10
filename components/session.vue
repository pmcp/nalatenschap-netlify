<template>
  <div 
    class="bg-white py-16 px-4 overflow-hidden lg:py-24">
    <div class="pb-4">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl pb-4">
        <copy :id="8"/>
      </h2>
      <p class="mt-4 mb-8  text-sm font-medium leading-6 text-gray-500">
        <copy :id="9"/>
      </p>
    </div>
    <div class="pb-8 pmcp-grid "> 
      <div 
        v-for="(i, key) in items" 
        :key="'endofsession'+key"
      >
        
        <session-item :item="i" />
       
      </div>
    </div>
    
    <!-- <button
      v-scroll-to="'#send'"
      class="bg-black text-white px-8 py-4 w-full font-bold mt-24"
    >
      Stuur mijn resultaat
    </button> -->
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
.pmcp-grid {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  /* grid-auto-rows: 1fr; */
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
    /* grid-auto-rows: 1fr; */
    /* grid-template-rows: masonry; */
    /* This is better for small screens, once min() is better supported */
    grid-gap: 1rem;
  }
  .pmcp-grid > div {
    grid-column: span 1;
  }
}
</style>
