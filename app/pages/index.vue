<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();

const { data, error } = await useAsyncData(
  () => `/${locale.value}`,
  () => queryCollection("content").path(`/${locale.value}`).first(),
);

whenever(error, showError, { immediate: true });
useHead(() => data.value?.seo);
</script>
<template>
  <main>
    <UContainer class="max-w-5xl">
      <ContentRenderer v-if="data" :value="data">
        <template #empty><GamesList /></template>
      </ContentRenderer>

      <StaticModal
        :isOpen="route.matched.length > 1"
        :close-link="localePath('/')"
      >
        <NuxtPage />
      </StaticModal>
    </UContainer>
  </main>
</template>
