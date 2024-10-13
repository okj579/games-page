<script setup lang="ts">
import { whenever } from "@vueuse/shared";
import { joinURL, withLeadingSlash } from "ufo";

const route = useRoute();
const { locale } = useI18n();
const { data, error } = useAsyncData(route.path, async () => {
  const pathParts = Array.isArray(route.params.slug)
    ? route.params.slug
    : [route.params.slug];
  const _path = withLeadingSlash(joinURL("", ...pathParts));
  return queryContent().where({ _path }).locale(locale.value).findOne();
});
whenever(error, (err) => showError(err), { immediate: true });
whenever(data, (data) => useContentHead(data), { immediate: true });
</script>
<template>
  <main>
    <UContainer :ui="{ constrained: 'max-w-5xl' }">
      <ContentRenderer v-if="data" :value="data">
        <template #empty></template>
      </ContentRenderer>
    </UContainer>
  </main>
</template>
