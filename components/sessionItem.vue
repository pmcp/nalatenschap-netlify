<template>
  <div class="flex flex-col m-4">
    <img 
      :src="item.url" 
      class="h-48 w-full object-cover mt-8 mb-8" 
      alt="">
    <div class="flex justify-center items-center w-100 mb-12">
      <pre class="whitespace-pre-wrap">{{ item }}</pre>    
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
      if (this.item.url) {
        return this.item.url;
      } else {
        return `https://ucarecdn.com/${this.item.id}/${this.item.file}`;
      }
    }
  }
};
</script>
