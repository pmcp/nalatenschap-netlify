<template>
  <div class="min-h-screen flex flex-col content-center justify-center">
    <p class="mb-5"><copy :id="2"/></p>
    <p class="mb-5"><copy :id="3"/></p>
    
    <div class="mt-12">
      <form 
        action="#" 
        method="POST" 
        class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
      
        <div class="sm:col-span-1">
          <label 
            for="phone_number" 
            class="block text-sm font-medium text-gray-700"><copy :id="4"/></label>
          <div class="mt-1 relative ">

            <input 
              id="phone_number"
              :value="first" 
              type="text" 
              name="first name" 
              class="py-3 px-4 block w-full ring-gray-500 focus:ring-gray-500 focus:border-gray-500 border-black border-2"
              placeholder=""
              @input="setFirst">
          </div>
        </div>
        
        
        <div class="sm:col-span-1">
          <label 
            for="email" 
            class="block text-sm font-medium text-gray-700"><copy :id="5"/></label>
          <div class="mt-1">
            <input 
              id="email"
              :value="last" 
              name="last name" 
              type="text" 
              class="py-3 px-4 block w-full  focus:ring-gray-500 focus:border-gray-500 border-black border-2"
              @input="setLast">
          </div>
        </div>
        
        <div class="sm:col-span-1">
          <button 
            v-scroll-to="'#question'"
            :disabled="!userFormFilledCorrect"
            :class="{ 'pmcp-disabled': !userFormFilledCorrect }"
            class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <copy :id="7"/>
          </button>
        </div>
      </form>
    </div>
    
    
    
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  computed: {
    first() {
      return this.$store.state.session.user.first;
    },
    last() {
      return this.$store.state.session.user.last;
    },
    ...mapGetters({
      userFormFilledCorrect: "session/userFormFilledCorrect"
    })
  },

  methods: {
    ...mapMutations({
      setFirst: "session/setFirst",
      setLast: "session/setLast"
    })
  }
};
</script>

<style scoped>
.pmcp-disabled {
  opacity: 30%;
}
</style>4
