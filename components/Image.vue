<script setup lang="ts">
const props = defineProps<{ src: string; width?: number; height?: number }>();

const src = toRef(props, "src");
const constraints = reactivePick(props, ["width", "height"]);
const image = useImageDimensions(src, constraints);
</script>
<template>
  <NuxtPicture
    :src="image.src"
    :width="image.width"
    :height="image.height"
    :sizes="`${image.width}px`"
    :densities="image.original?.width > image.width ? '1x 2x' : '1x'"
  />
</template>
