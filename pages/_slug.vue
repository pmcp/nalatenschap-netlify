<template>
  <div class="prose mx-auto mt-12">
    <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl pb-12">
      {{ page.title }}
    </h1>

    <nuxt-content 
      :document="page" 
      class="prose w-full" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let page;
    try {
      page = await $content("pages", params.slug).fetch();
    } catch (e) {
      error({ message: "Page not found" });
    }
    return {
      page
    };
  }
};
</script>
