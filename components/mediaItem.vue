<template>
  <div 
    :style="imageStyle"
    class="filtered">
    <img 
      :data-blink-uuid="item.uploadCareId"
      :style="imageStyle" 
    >
  </div>
  
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl() {
      if (this.item.url) {
        return this.item.url;
      } else {
        return `https://ucarecdn.com/${this.item.uploadCareId}/${
          this.item.file
        }`;
      }
    },
    imageStyle() {
      return {
        backgroundImage: this.$store.state.media.imageStyle
      };
    }
  }
};
</script>

<style scoped>
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
  mix-blend-mode: exclusion;
  filter: grayscale(100%) contrast(800%);

  opacity: 1;
  margin-bottom: -6px;
}
</style>
