<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import type { Game } from "~/types/game";

const route = useRoute();
const { locale } = useI18n();

const { data, error } = await useFetch<ParsedContent & Game>(
  `/api/${locale.value}/game/${route.params.game}`,
);

whenever(error, (err) => showError(err), { immediate: true });
whenever(data, (data) => useContentHead(data), { immediate: true });
</script>

<template>
  <div>
    <GameDetails v-if="data" :game="data" />
  </div>
</template>
