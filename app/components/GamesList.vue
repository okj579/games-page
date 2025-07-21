<script setup lang="ts">
const { locale } = useI18n();
const { data } = await useFetch(`/api/${locale.value}/games`);
const localeRoute = useLocaleRoute();
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-5xl' }">
    <div class="grid justify-center justify-items-center gap-4 my-4">
      <NuxtLink
        v-for="game in data"
        :key="game.slug"
        :to="localeRoute(`/game/${game.slug}`)"
        class="max-w-52"
      >
        <UCard class="h-full">
          <div class="flex flex-col justify-items-center">
            <Image
              v-if="game.thumbnailImage"
              :src="game.thumbnailImage"
              :width="160"
              :height="160"
              class="w-full aspect-1 rounded-3xl flex justify-center items-center"
              alt=""
            />
            <ImagePlaceholder v-else class="w-full" />

            <div class="mt-4 font-thin">{{ game.title }}</div>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </UContainer>
</template>

<style scoped>
.grid {
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  @media (min-width: theme("screens.md")) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
