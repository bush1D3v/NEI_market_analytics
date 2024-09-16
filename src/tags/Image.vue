<script lang="ts" setup>
import type {HTMLAttributes, ImgHTMLAttributes} from "vue";
import {cn} from "@/lib/utils";

export interface ImageProps extends /* @vue-ignore */ ImgHTMLAttributes {
	class?: HTMLAttributes["class"];
	src: string;
	alt: string;
	width: string;
	height: string;
}

const props = defineProps<ImageProps>();
</script>

<template>
    <img :src="props.src" :alt="props.alt" :width="props.width" :height="props.height" :class="cn(props.class)"
        data-testid="Image" />
</template>
