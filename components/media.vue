<template>
  <div>
    {{ status }}
    <div 
      v-if="items && status === 0"
      class="pmcp-grid"
    >
      <div 
        v-for="(i, key) in items" 
        :class="i.orientation"
        :key="key">
        <button 
          v-if="i" 
          @click="runFlow(i)">
          
          <div v-if="i.mime === 'application/rtf'">
            ITS A TEXT
          </div>
          <div v-else-if="i.mime === 'application/pdf'">
            ITS A PDF
          </div>
          <div v-else-if="i.mime === 'image/tiff'">
            ITS A TIFF
          </div>
          <media-item 
            
            :item="i" />
            <!-- <div 
            class="filtered blue">
          </div> -->
        </button>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapMutations } from "vuex";
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

/* test for template */
.blue {
  background: #23427b;
}
.red {
  background: #d02631;
}

.filtered img {
  width: auto;
  /* background-blend-mode: screen; */
  mix-blend-mode: screen;
  filter: grayscale(100%) contrast(800%);
  opacity: 1;
  margin-bottom: -6px;
}

.item {
  background-size: cover;
  background-position: center;
  height: 100%;
}

.blend {
  background-blend-mode: screen;
}

.landscape {
  grid-column: span 2;
}

.pmcp-grid > *:first-child.landscape {
  grid-column: span 2;
}
/* .item {
  background-image: url(https://unsplash.it/g/500/500?random);
  background-color: rgba(237, 190, 0, 0.85);
} */
</style>
