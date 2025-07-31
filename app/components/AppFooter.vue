<script setup lang="ts">
import { findPageChildren } from "@nuxt/content/utils";

const { locale } = useI18n();
const { data } = useAsyncData(
  () => `Footer-${locale.value}`,
  () => queryCollectionNavigation("content"),
  { transform: (nav) => findPageChildren(nav, `/${locale.value}`) },
);
</script>
<template>
  <UContainer as="footer" class="my-8">
    <ul
      v-if="data && data.length > 1"
      class="flex justify-center items-center gap-2"
    >
      <li
        v-for="item in data"
        :key="item.path"
        class="contents before:content-['•'] first:before:content-none before:mx-2 before:text-gray-500"
      >
        <NuxtLinkLocale
          :to="item.path"
          class="font-thin text-md hover:underline decoration-black/50 dark:decoration-white/50"
        >
          {{ item.title }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </UContainer>
</template>
