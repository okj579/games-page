<script setup lang="ts">
import type { PropType, VNode } from "vue";
import type { ParsedContent, QueryBuilderParams } from "@nuxt/content";

const props = defineProps<{
  path?: string;
  tag?: string;
  excerpt?: boolean;
  query?: PropType<QueryBuilderParams>;
  head?: boolean;
}>();
defineSlots<{
  default: (context: {
    doc: ParsedContent;
    refresh: () => Promise<void>;
  }) => VNode[] | undefined;
  empty?: any;
  "not-found"?: any;
}>();

const { defaultLocale, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const path = computed(() => props.path ?? switchLocalePath(defaultLocale));
const { data } = await useAsyncData(
  `content-${path}`,
  () =>
    queryContent(props.query)
      .where({ _path: path.value })
      .locale(locale.value)
      .findOne(),
  { watch: [useRoute(), locale] },
);
</script>
<template>
  <ContentRenderer :excerpt :tag :value="data" />
</template>
