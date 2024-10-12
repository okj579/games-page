<script setup lang="ts">
const { locale } = useI18n();
const { data } = useFetch(() => `/api/${locale.value}/games`);
</script>
<template>
  <UContainer :ui="{ constrained: 'max-w-5xl' }">
    <div
      class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 my-4"
    >
      <GameTile v-for="game in data" :key="game.slug" :game="game" />
    </div>
  </UContainer>
</template>
