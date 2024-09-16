<script lang="ts">
import Image from "@/tags/Image.vue";
import {BadgesDto} from "./Dto/BadgesDto";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import Link from "@/tags/Link.vue";
import HoverCard from "@/components/HoverCard.vue";
import ImageSkeletonSvg from "@/components/Svg/ImageSkeletonSvg.vue";
import type {PropType} from "vue";

export interface BadgeProps {
	name: string;
	occupation: string;
	github: string;
	nickname: string;
	description: string;
	startDate: string;
	initialLetters: string;
}

export default {
	props: {
		badges: {
			type: Array as PropType<BadgeProps[]>,
			default: () => BadgesDto,
		},
	},
	data() {
		return {
			loading: true,
		};
	},
	components: {Skeleton, Image, Link, HoverCard, ImageSkeletonSvg},
	methods: {
		onImageLoad() {
			this.loading = false;
		},
	},
};
</script>

<template>
    <ul class="flex gap-4 flex-wrap justify-center" data-testid="Badges">
        <li v-for="badge in $props.badges" class="flex gap-2 min-w-64">
            <div>
                <Skeleton v-if="loading" class="w-20 h-20 rounded-full">
                    <ImageSkeletonSvg />
                </Skeleton>
                <Link :href="badge.github" target="_blank" class="hover:opacity-50 duration-150 ease-in-out">
                <Image :src="badge.github + '.png'" :alt="badge.name + ' photo'" width="80" height="80"
                    class="rounded-full" @load="onImageLoad()" />
                </Link>
            </div>
            <div class="flex flex-col">
                <div class="flex flex-col gap-y-0">
                    <h3>{{ badge.name }}</h3>
                    <span class="ml-[2px] -mt-[6px]">{{ badge.occupation }}</span>
                </div>
                <HoverCard :description="badge.description" :title="badge.nickname" :start-date="badge.startDate"
                    :avatar-src="badge.github + '.png'" :avatar-fallback="badge.initialLetters" />
            </div>
        </li>
    </ul>
</template>
