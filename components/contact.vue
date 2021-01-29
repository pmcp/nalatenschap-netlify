<template>
  <section id="send">
    <div class="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div class="relative max-w-xl mx-auto">
       
        <div class="">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Nog even dit...
          </h2>
          <p class="mt-4 text-lg leading-6 text-gray-500">
            Om u het resultaat te bezorgen hebben we uw gegevens nodig.
            Uw gegevens worden enkel gebruikt voor het versturen van het eindresultaat, noch zullen ze bewaard worden.
          </p>
          <!-- {{ session }} -->
        </div>
        <div class="mt-12">
          <form 
            action="/thanks" 
            method="post" 
            netlify
            netlify-honeypot="bot-field"
            class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <input 
              type="hidden" 
              name="form-name" 
              value="contactus" >
            <div class="sm:col-span-2">
              <label 
                for="phone_number" 
                class="block text-sm font-medium text-gray-700">Telefoonnummer</label>
              <div class="mt-1 relative ">
 
                <input 
                  id="phone_number"
                  :value="phone" 
                  type="text" 
                  name="phone_number" 
                  autocomplete="tel" 
                  class="py-3 px-4 block w-full focus:ring-gray-500 focus:border-gray-500 border-black border-2" 
                  placeholder=""
                  @input="setPhone">
              </div>
            </div>
            
            
            <div class="sm:col-span-2">
              <label 
                for="email" 
                class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1">
                <input 
                  id="email"
                  :value="email" 
                  name="email" 
                  type="email" 
                  autocomplete="email" 
                  class="py-3 px-4 block w-full  focus:ring-gray-500 focus:border-gray-500 border-black border-2"
                  @input="setEmail">
              </div>
            </div>
            <input 
              :value="session.user.first" 
              type="hidden" 
              name="first" >
            <input 
              :value="session.items" 
              type="hidden" 
              name="second" >
            <div class="sm:col-span-2">
              <button 
                :disabled="!sendFormFilledCorrect" 
                
                :class="{ 'pmcp-disabled': !sendFormFilledCorrect }"
                type="submit"
                class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Verstuur mijn selectie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  computed: {
    session() {
      return this.$store.state.session;
    },
    email() {
      return this.$store.state.session.user.email;
    },
    phone() {
      return this.$store.state.session.user.phone;
    },
    ...mapGetters({
      sendFormFilledCorrect: "session/sendFormFilledCorrect"
    })
  },

  methods: {
    ...mapMutations({
      setPhone: "session/setPhone",
      setEmail: "session/setEmail"
    })
  }
};
</script>

<style scoped>
.pmcp-disabled {
  opacity: 30%;
}
</style>
