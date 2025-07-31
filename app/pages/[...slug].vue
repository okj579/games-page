<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();

const { data, error } = await useAsyncData(
  () => route.path,
  () =>
    queryCollection("content")
      .path(route.path)
      .first()
      .then((data) => data || Promise.reject(createError({ statusCode: 404 }))),
);

whenever(error, showError, { immediate: true });
useHead(() => data.value?.seo);
</script>
<template>
  <main>
    <UContainer class="max-w-5xl prose dark:prose-invert">
      <NuxtLinkLocale to="/">&larr; {{ t("backToHome") }}</NuxtLinkLocale>
      <ContentRenderer v-if="data" :value="data">
        <template #empty></template>
      </ContentRenderer>
    </UContainer>
  </main>
</template>
