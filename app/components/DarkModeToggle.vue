<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const toggleColorMode = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>
<template>
  <UButton
    square
    variant="ghost"
    color="neutral"
    aria-label="Theme"
    @click="toggleColorMode"
  >
    <UIcon name="i-ph-sun" class="w-5 h-5 shrink-0 dark:hidden" />
    <UIcon name="i-ph-moon" class="w-5 h-5 shrink-0 hidden dark:block" />
  </UButton>
</template>
