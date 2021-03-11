<template>
  <section id="send">
    <div class="bg-white px-4 overflow-hidden  text-sm font-medium text">
      <div >
       
        <div class="">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"/>
          <p class="mt-4 leading-6 text-gray-500">
            <copy :id="10"/>
          </p>
          <!-- {{ session }} -->
        </div>
        <div class="mt-12">
          <form 
            name="kdm-nalatenschap-1" 
            action="/thanks/" 
            method="post" 
            netlify
            netlify-honeypot="bot-field"
            class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            
          >
        
        
            <input 
              type="hidden" 
              name="form-name" 
              value="kdm-nalatenschap-1" >
            <div class="sm:col-span-2">
              <label 
                for="phone" 
                class="block text-sm font-medium text-gray-700"><copy :id="11"/></label>
              <div class="mt-1 relative ">
 
                <input 
                  id="phone"
                  :value="phone" 
                  type="text" 
                  name="phone" 
                  autocomplete="tel" 
                  class="py-3 px-4 block w-full focus:ring-gray-500 focus:border-gray-500 border-black border-2" 
                  placeholder=""
                  @input="setPhone">
              </div>
            </div>
            
            <div class="text-center w-full sm:col-span-2 mt-4">- <copy :id="12"/> -</div>
            <div class="sm:col-span-2">
              <label 
                for="email" 
                class="block text-sm font-medium text-gray-700"><copy :id="13"/></label>
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
              :value="session.user.last" 
              type="hidden" 
              name="last" >
            <!-- {{ sessionAsString }} -->
            
            <textarea 
              :value="sessionAsString" 
              type="hidden" 
              name="session"
              class="opacity-0" />
            
            <div class="sm:col-span-2">
              <button 
                :disabled="!sendFormFilledCorrect" 
                :class="{ 'pmcp-disabled': !sendFormFilledCorrect }"
                class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
               
              >
                <copy :id="14"/>
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
    sessionAsString() {
      let content = "";
      for (let i = 0; i < this.session.items.length; i++) {
        content +=
          i +
          ". " +
          this.session.items[i].question +
          "\n" +
          this.session.items[i].answer +
          "\n" +
          this.session.items[i].id +
          "\n" +
          "\n";
      }
      return content;
    },
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
