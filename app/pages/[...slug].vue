<script setup lang="ts">
import { joinURL, withLeadingSlash } from "ufo";

const route = useRoute();
const { locale, t } = useI18n();

const { data, error } = await useAsyncData(route.path, async () => {
  const { slug } = route.params;
  const pathParts = Array.isArray(slug) ? slug : [slug];
  const _path = withLeadingSlash(joinURL("", ...pathParts));
  return queryContent().where({ _path }).locale(locale.value).findOne();
});
if (error.value) throw createError({ cause: error.value });
if (!data.value) throw createError({ statusCode: 404 });

useContentHead(data.value);
</script>
<template>
  <main>
    <UContainer class="max-w-5xl prose dark:prose-invert">
      <NuxtLinkLocale to="/">&larr; {{ t("backToHome") }}</NuxtLinkLocale>
      <ContentRenderer v-if="data" :value="data">
        <template #empty></template>
      </ContentRenderer>
    </UContainer>
  </main>
</template>
