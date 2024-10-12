<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { FocusTrap, TransitionChild, TransitionRoot } from "@headlessui/vue";

const props = defineProps<{
  isOpen: boolean;
  closeLink?: RouteLocationRaw;
}>();
const emit = defineEmits(["close"]);

const isOpen = ref(props.isOpen);
syncRefs(toRef(props, "isOpen"), isOpen);

const close = () => (isOpen.value = false);
const finishClose = () =>
  props.closeLink ? navigateTo(props.closeLink) : emit("close");

useBodyScrollLock(() => props.isOpen);
</script>

<template>
  <TransitionRoot :show="isOpen" @after-leave="finishClose">
    <FocusTrap>
      <div
        class="fixed top-0 left-0 h-full w-full overflow-y-scroll"
        @click="close"
      >
        <TransitionChild
          :unmount="false"
          enter="transition-opacity duration-300"
          leave="transition-opacity duration-300"
          enter-from="opacity-0"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 transition-opacity bg-gray-200/75 dark:bg-gray-800/75"
          />
        </TransitionChild>

        <TransitionChild
          :unmount="false"
          enter="transition duration-300 translate"
          enter-from="opacity-0 translate-y-full"
          leave="transition duration-300 translate"
          leave-to="opacity-0 translate-y-full"
          class="w-full sm:max-w-5xl min-h-[100vh] flex flex-col justify-center items-center p-4 sm:p-8 gap-4 relative mx-auto"
        >
          <UButton
            icon="i-ph-x"
            variant="ghost"
            size="xl"
            color="white"
            class="cursor-pointer rounded-full self-end"
            :to="closeLink"
            @click.prevent="close"
          />
          <div
            class="w-full bg-white dark:bg-gray-900 shadow-xl rounded-lg"
            @click.stop
          >
            <slot />
          </div>
        </TransitionChild>
      </div>
    </FocusTrap>
  </TransitionRoot>
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
