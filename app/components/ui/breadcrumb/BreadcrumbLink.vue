<script lang="ts" setup>
import type {HTMLAttributes} from "vue";
import {cn} from "@/lib/utils";
import {Primitive, type PrimitiveProps} from "radix-vue";

const props = withDefaults(defineProps<PrimitiveProps & {class?: HTMLAttributes["class"]}>(), {
	as: "a",
});
</script>

<template>
    <Primitive :as="as" :as-child="asChild"
        :class="cn('duration-150 hover:opacity-100 opacity-50 ease-in-out cursor-pointer', props.class)">
        <slot />
    </Primitive>
</template>
