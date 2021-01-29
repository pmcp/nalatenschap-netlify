<template>
  <div class="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
    <div class="pb-4">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl pb-4">
        Dank je om dat met ons te delen.
      </h2>
      <p class="mt-4 text-lg leading-6 text-gray-500">
        We vinden het fijn om er voor je te kunnen zijn.
        Wij willen ook iets delen met jou.
        Hieronder vind je de zes elementen uit de Nalatenschap van Kasper Demeulemeester die jouw betekenis dragen.
        Door op de knop hier onder te drukken, kan je een oplage van 5 fysieke exemplaren van jouw keuze aanvragen bij de Nalatenschap.
      </p>
    </div>
    <div class="pb-8"> 
      <div 
        v-for="(i, key) in items" 
        :key="key"
        class="mt-6 pt-4 flex items-center">
      
        <div class="flex-shrink-0">
          <img 
            :src="i.url" 
            class="h-10 w-10 rounded-full" 
            alt="">
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            {{ i.question }}
          </p>
          <div class="flex space-x-1 text-sm text-gray-500">
     
            <span>
              {{ i.answer }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <button
      v-scroll-to="'#question'"
      class="bg-black text-white px-8 py-4 w-full font-bold"
    >
      Stuur mijn resultaat
    </button>
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
