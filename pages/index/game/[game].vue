<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const { data: game } = await useFetch(
  () => `/api/${locale.value}/game/${route.params.game}`,
);
</script>
<template>
  <div>
    <GameDetails :game />
  </div>
</template>
