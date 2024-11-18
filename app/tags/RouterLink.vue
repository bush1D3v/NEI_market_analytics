<script lang="ts" setup>
import type {HTMLAttributes} from "vue";
import {cn} from "@/lib/utils";

export interface RouterLinkProps {
	class?: HTMLAttributes["class"];
	to: string;
}

const props = defineProps<RouterLinkProps>();
</script>

<template>
    <router-link :to="props.to" :class="cn('duration-150 ease-in-out cursor-pointer', props.class)"
        data-testid="RouterLink">
        <slot />
    </router-link>
</template>
