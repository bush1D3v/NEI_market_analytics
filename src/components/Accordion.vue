<script lang="ts" setup>
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type {HTMLAttributes} from "vue";

export interface Item {
	value: string;
	title: string;
	content: string;
}

export interface AccordionProps {
	items: Item[];
	type?: "single" | "multiple" | undefined;
	collapsible?: boolean;
	class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<AccordionProps>(), {
	type: "single",
	collapsible: true,
	class: "w-full",
});
</script>

<template>
    <Accordion :type="props.type" :class="props.class" :collapsible="props.collapsible" data-testid="Accordion">
        <AccordionItem v-for="item in props.items" :key="item.value" :value="item.value">
            <AccordionTrigger>{{ item.title }}</AccordionTrigger>
            <AccordionContent>
                {{ item.content }}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>
