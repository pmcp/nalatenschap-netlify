<!-- 1. Get template at random -->
<!-- 2. Get images with max items from template -->
<!-- 3. Get Question -->
<template>
  <section>
    {{ media }}
    <languages id="languages" />
    <welcome id="welcome" />
    <user id="user" />
    <div class="h-screen flex flex-col">
      <question id="question" />
      <div
        id="media"
        class="relative">
        <session class="absolute" />
        <media class="absolute" />
      </div>
      <!-- <image-path /> -->
    </div>
    <finish />

    <!-- Active Template: {{ activeTemplate }}

      <LazyTemplateOne v-if="activeTemplate === 1" />
      <LazyTemplateTwo v-if="activeTemplate === 2" /> -->
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  computed: {
    activeTemplate() {
      return this.$store.state.templates.active;
    },
    activeImagePath() {
      return this.$store.state.media.activePath;
    },
    media() {
      return this.$store.state.media.all;
    },
    mediaStatus() {
      return this.$store.state.media.status[
        this.$store.state.media.activeStatus
      ];
    },
    availableQuestions() {
      return this.$store.state.questions.list.filter(item => !item.used);
    },
    question() {
      console.log(
        this.availableQuestions.length,
        this.$store.state.questions.activeQuestion
      );
      if (this.availableQuestions.length === 0)
        return "Ik heb geen vragen meer.";
      return this.availableQuestions[
        this.$store.state.questions.activeQuestion
      ];
    }
  },
  // async fetch() {
  //   this.setRandomTemplate()
  // },
  // fetchOnServer: true,
  mounted() {
    this.setRandomTemplate();
  },
  methods: {
    ...mapActions({
      getFolders: "media/getFolders",
      setRandomTemplate: "templates/setRandomTemplate"
    })
  },
  middleware: "data"
};
</script>
