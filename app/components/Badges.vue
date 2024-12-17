<script lang="ts" setup>
import Image from "@/tags/Image.vue";
import Link from "@/tags/Link.vue";
import HoverCard from "@/components/HoverCard.vue";

export interface BadgeProps {
	name: string;
	occupation: string;
	github: string;
	nickname: string;
	description: string;
	startDate: string;
}

const props = defineProps<{badges: BadgeProps[]}>();
</script>

<template>
    <ul class="flex gap-4 flex-wrap justify-center" data-testid="Badges">
        <li v-for="badge in props.badges" class="flex gap-2 min-w-64">
            <div>
                <Link :href="badge.github" target="_blank">
                <Image :src="badge.github + '.png'" :alt="badge.name + ' photo'" width="80" height="80"
                    class="rounded-full" />
                </Link>
            </div>
            <div class="flex flex-col">
                <div class="flex flex-col gap-y-0">
                    <h3>{{ badge.name }}</h3>
                    <span v-translate class="ml-[2px] -mt-[6px]">{{ badge.occupation }}</span>
                </div>
                <HoverCard :description="badge.description" :title="badge.nickname" :start-date="badge.startDate"
                    :avatar-src="badge.github + '.png'" />
            </div>
        </li>
    </ul>
</template>
