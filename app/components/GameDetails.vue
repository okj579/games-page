<script setup lang="ts">
import type { GamesCollectionItem } from "@nuxt/content";
const props = defineProps<{ game: GamesCollectionItem }>();

const { t } = useI18n();
const image = computed(
  () => props.game.coverImage ?? props.game.thumbnailImage,
);
</script>

<template>
  <div class="p-4 flex max-sm:flex-col gap-4 sm:max-h-[80vh]">
    <!-- Image -->
    <Image
      v-if="image"
      :src="image"
      :width="400"
      :height="250"
      class="sm:max-w-1/2 w-auto max-h-[250px] flex-shrink max-sm:self-center self-start"
      alt=""
    />
    <ImagePlaceholder v-else class="w-52 max-sm:self-center" />

    <!-- Main -->
    <div
      class="sm:w-1/2 flex-grow flex flex-col items-start min-h-full gap-4 self-stretch"
    >
      <!-- Title -->
      <h2 class="text-3xl font-thin">{{ game.title }}</h2>

      <!-- Badges -->
      <div class="flex flex-wrap gap-2">
        <template
          v-for="tag in [
            'single-player',
            'multiplayer-online',
            'multiplayer-local',
          ]"
        >
          <UBadge v-if="game.tags?.includes(tag)" variant="subtle" color="blue">
            {{ t(`tags.${tag}`) }}
          </UBadge>
        </template>

        <UPopover v-if="game.js13k">
          <UBadge variant="subtle">{{ t("js13k.title") }}</UBadge>
          <template #panel>
            <div class="p-4 max-w-96">
              {{ t("js13k.descr", game.js13k) }}
              <ULink
                :to="game.js13k.url"
                target="_blank"
                class="text-primary text-sm"
              >
                {{ t("js13k.link") }}
              </ULink>
            </div>
          </template>
        </UPopover>

        <UButton
          v-if="game.githubUrl"
          size="2xs"
          color="gray"
          :to="game.githubUrl"
          target="_blank"
        >
          <UIcon name="i-mdi-github" class="me-1" />
          Source
        </UButton>
      </div>

      <!-- Description  -->
      <div
        class="flex-1 prose prose-sm prose-li:my-0 prose-p:my-2.5 dark:prose-invert overflow-y-auto"
      >
        <ContentRenderer :value="game">
          <template #empty></template>
        </ContentRenderer>
      </div>

      <!-- Play button -->
      <UButton
        leading-icon="i-ph-play"
        :to="game.url"
        target="_blank"
        class="self-end justify-self-end"
      >
        Play
      </UButton>
    </div>
  </div>
</template>
