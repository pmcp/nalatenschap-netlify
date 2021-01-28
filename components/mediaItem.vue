<template>
  <div>
    <div v-if="item">
      <!-- {{ i }} -->
      <img :src="imageUrl">
    </div>
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
      // console.log("https://ucarecdn.com/" + this.item.uploadCareId);
      //ucarecdn.com/0d75ce0b-92fa-40f8-bfc8-25006ce25455/montana32_147235561.jpg
      if (this.item.url) {
        return this.item.url;
      } else {
        return `https://ucarecdn.com/${this.item.uploadCareId}/${
          this.item.file
        }`;
      }
    }
  }
};
</script>

<style scoped>
</style>
