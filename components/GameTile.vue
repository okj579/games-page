<script setup lang="ts">
import type { Game } from "~/types/game";

const props = defineProps<{
  game: Game;
}>();
const game = toReactive(toRef(props, "game"));
const localeRoute = useLocaleRoute();
</script>

<template>
  <NuxtLink :to="localeRoute(`/game/${game.slug}`)">
    <UCard class="h-full">
      <div class="flex flex-col justify-items-center">
        <Image
          v-if="game.thumbnailImage"
          :src="game.thumbnailImage"
          :width="200"
          :height="200"
          class="w-full aspect-1 rounded-3xl"
          alt=""
        />
        <ImagePlaceholder v-else class="w-full" />

        <div class="mt-4 font-thin">{{ game.title }}</div>
      </div>
    </UCard>
  </NuxtLink>
</template>
