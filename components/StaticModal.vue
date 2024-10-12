<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  isOpen: boolean;
  closeLink?: RouteLocationRaw;
}>();
const emit = defineEmits(["close"]);

const close = () =>
  props.closeLink ? navigateTo(props.closeLink) : emit("close");
</script>

<template>
  <Transition name="fade">
    <div
      v-show="isOpen"
      class="fixed top-0 left-0 min-h-[100vh] w-full flex justify-center items-center"
      @click="close"
    >
      <div
        class="fixed inset-0 transition-opacity bg-gray-200/75 dark:bg-gray-800/75"
      />
      <div
        class="relative bg-white dark:bg-gray-900 sm:max-w-5xl shadow-xl w-full rounded-lg sm:my-8"
        @click.stop
      >
        <div class="relative">
          <UButton
            icon="i-ph-x"
            variant="ghost"
            size="xl"
            color="white"
            class="absolute -top-2 right-0 -translate-y-full cursor-pointer rounded-full"
            :to="closeLink"
            @click.prevent="close"
          />
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<!--suppress CssUnusedSymbol -->
<style>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
