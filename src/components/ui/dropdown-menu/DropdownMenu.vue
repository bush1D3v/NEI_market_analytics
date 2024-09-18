<script setup lang="ts">
import {
	DropdownMenuRoot,
	type DropdownMenuRootEmits,
	type DropdownMenuRootProps,
	useForwardPropsEmits,
} from "radix-vue";

export type Props = DropdownMenuRootProps;

const props = defineProps<DropdownMenuRootProps>();
const emits = defineEmits<DropdownMenuRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <DropdownMenuRoot v-bind="forwarded">
        <slot />
    </DropdownMenuRoot>
</template>
