<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();

const { data, error } = await useFetch(
  () => `/api/${locale.value}/game/${route.params.game}`,
);

whenever(error, showError, { immediate: true });
whenever(data, (data) => useHead(data.seo), { immediate: true });
</script>

<template>
  <div>
    <GameDetails v-if="data" :game="data" />
  </div>
</template>
