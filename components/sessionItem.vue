<template>
  <div class="relative pmcp-sessionItem">
    <img 
      :src="imageUrl" 
      class="p-12 relative z-10 " 
      alt="">
    <div class="absolute top-0 flex flex-col justify-center items-center h-full" >
      <pre 
        class="whitespace-pre-wrap text-lg font-medium">
        <span 
        class="bg-white">{{ item }}</span>
      </pre>    
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
<style sccoped>
.pmcp-sessionItem:hover img {
  mix-blend-mode: color-burn;
}
</style>
