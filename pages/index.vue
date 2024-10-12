<script setup lang="ts">
import { GamesList } from "#components";

const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();

const { data, error } = useAsyncData(async () =>
  queryContent().where({ _path: "/" }).locale(locale.value).findOne(),
);
whenever(error, showError, { immediate: true });
whenever(data, (data) => useContentHead(data), { immediate: true });
</script>
<template>
  <main>
    <UContainer :ui="{ constrained: 'max-w-5xl' }">
      <ContentRenderer v-if="data" :value="data" :components="{ GamesList }">
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
