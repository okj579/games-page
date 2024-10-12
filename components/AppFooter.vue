<script setup lang="ts">
const { locale } = useI18n();
const { data } = useAsyncData(
  async () => {
    const nav = await fetchContentNavigation(
      queryContent("/").locale(locale.value).sort({ title: 1 }),
    );
    return nav.sort((a, b) => a._path.localeCompare(b._path));
  },
  { watch: [locale] },
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
        :key="item._path"
        class="contents before:content-['•'] first:before:content-none before:mx-2 before:text-gray-500"
      >
        <NuxtLinkLocale
          :to="item._path"
          class="font-thin text-md hover:underline decoration-black/50 dark:decoration-white/50"
        >
          {{ item.title }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </UContainer>
</template>
