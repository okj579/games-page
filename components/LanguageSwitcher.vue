<script setup lang="ts">
const { locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const localeOptions = computed(() =>
  locales.value.map(({ code, name }) => ({
    label: name!,
    to: switchLocalePath(code),
  })),
);
</script>
<template>
  <UDropdown v-if="localeOptions.length > 1" :items="[localeOptions]">
    <UButton
      icon="i-ph-globe-simple"
      square
      variant="ghost"
      color="gray"
      :aria-label="t('language')"
    />
  </UDropdown>
</template>
