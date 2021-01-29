<template>
  <div 
    class="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
    <div class="pb-4">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl pb-4">
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
        :key="'endofsession'+key"
        class="">
        <session-item :item="i" />
       
      </div>
    </div>
    
    <button
      v-scroll-to="'#send'"
      class="bg-black text-white px-8 py-4 w-full font-bold mt-24"
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
