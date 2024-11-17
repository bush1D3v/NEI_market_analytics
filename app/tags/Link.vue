<script lang="ts" setup>
import type {AnchorHTMLAttributes, HTMLAttributes} from "vue";
import {cn} from "@/lib/utils";

export interface LinkProps extends /* @vue-ignore */ AnchorHTMLAttributes {
	class?: HTMLAttributes["class"];
	target: "_blank" | "_self" | "_parent" | "_top";
	href: string;
}

const props = defineProps<LinkProps>();
</script>

<template>
    <a :href="props.href" :target="props.target" rel="no-referrer"
        :class="cn('hover:opacity-50 duration-150 ease-in-out', props.class)" data-testid="Link">
        <slot />
    </a>
</template>
