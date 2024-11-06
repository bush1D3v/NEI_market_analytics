<script setup lang="ts">
import Image from "@/tags/Image.vue";
import Link from "@/tags/Link.vue";

export interface NewsCardProps {
    id: number;
    datetime: number;
    headline: string;
    image: string;
    summary: string;
    url: string;
    source: string;
}

const props = defineProps<NewsCardProps>();
</script>

<template>
    <article
        class="flex bg-secondaryDarker gap-4 items-center justify-between p-4 md:p-5 rounded-lg md:min-w-96 min-h-52">
        <div class="flex flex-col">
            <span class="-mb-1">{{ props.source }}</span>
            <div class="flex flex-col">
                <Link class="text-link hover:underline" target="_blank" :href="props.url">
                <h2 class="line-clamp-2 text-base md:text-xl lg:text-lg">{{ props.headline }}</h2>
                </Link>
                <p class="line-clamp-2">{{ props.summary }}</p>
            </div>
            <span class="mt-2">{{ new Date(props.datetime * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }) }}</span>
        </div>
        <Image :src="props.image" :alt="props.headline + ' logo'" width="200" height="100"
            class="max-w-[200px] max-h-[100px]" />
    </article>
</template>
