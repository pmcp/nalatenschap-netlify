<template>
  <section id="send">
    <div class="bg-white px-4 overflow-hidden  text-sm font-medium text">
      <div >
       
        <div class="">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Nog even dit...
          </h2>
          <p class="mt-4 leading-6 text-gray-500">
            Om u het resultaat te bezorgen hebben we uw gegevens nodig.
            Uw gegevens worden enkel gebruikt voor het versturen van het eindresultaat, noch zullen ze bewaard worden.
          </p>
          <!-- {{ session }} -->
        </div>
        <div class="mt-12">
          <form 
            name="kdm-nalatenschap-1" 
            action="/thanks" 
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
                class="block text-sm font-medium text-gray-700">Telefoonnummer</label>
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
              :value="session.user.last" 
              type="hidden" 
              name="last" >
            <!-- {{ sessionAsString }} -->
            <textarea 
              :value="sessionAsString" 
              type="hidden" 
              name="items" />
            
            <div class="sm:col-span-2">
              <button 
                :disabled="!sendFormFilledCorrect" 
                :class="{ 'pmcp-disabled': !sendFormFilledCorrect }"
                class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
               
              >
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
      console.log(content);
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
    //     sendForm(e) {
    //       e.preventDefault();
    //
    //       let content = "";
    //       for (let i = 0; i < this.session.items.length; i++) {
    //         content +=
    //           i +
    //           ". " +
    //           this.session.items[i].question +
    //           "\n" +
    //           this.session.items[i].answer +
    //           "\n" +
    //           this.session.items[i].id +
    //           "\n" +
    //           "\n";
    //       }
    //
    //       const form = {
    //         email: this.email,
    //         phone: this.phone,
    //         last: this.session.user.last,
    //         first: this.session.user.first,
    //         session: content
    //       };
    //
    //       let formData = new FormData(form);
    //       fetch("/", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //         body: new URLSearchParams(formData).toString()
    //       })
    //         .then(() => console.log("Form successfully submitted"))
    //         .catch(error => alert(error));
    //     }
  }
};
</script>

<style scoped>
.pmcp-disabled {
  opacity: 30%;
}
</style>
