<template>
  <div class="flex flex-row mb-8">
    <img 
      :src="imageUrl" 
      class="w-48 h-auto" 
      alt="">
    <div class="flex justify-center items-center w-100 ml-4">
      <pre class="whitespace-pre-wrap text-xs font-medium">{{ item }}</pre>    
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
        return `https://ucarecdn.com/${this.item.id}/${this.item.filename}`;
      }
    }
  }
};
</script>
