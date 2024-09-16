<script lang="ts">
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {AccordionDto} from "./Dto/AccordionDto";
import type {PropType} from "vue";

export interface AccordionProps {
	value: string;
	title: string;
	content: string;
}

export default {
	props: {
		items: {
			type: Array as PropType<AccordionProps[]>,
			default: () => AccordionDto,
		},
		type: {
			type: String as PropType<"single" | "multiple" | undefined>,
			default: "single",
		},
		collapsible: {
			type: Boolean,
			default: true,
		},
		class: {
			type: String,
			default: "w-full",
		},
	},
	components: {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger,
	},
};
</script>

<template>
    <Accordion :type="$props.type" :class="$props.class" :collapsible="$props.collapsible" data-testid="Accordion">
        <AccordionItem v-for="item in $props.items" :key="item.value" :value="item.value">
            <AccordionTrigger>{{ item.title }}</AccordionTrigger>
            <AccordionContent>
                {{ item.content }}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>
