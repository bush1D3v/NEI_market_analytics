<script setup lang="ts">
import {
	NumberField,
	NumberFieldContent,
	NumberFieldDecrement,
	NumberFieldIncrement,
	NumberFieldInput,
} from "@/components/ui/number-field";
import {useCurrencyQuotesStore} from "@/stores/useCurrencyQuotesStore";
import {ref, watch} from "vue";

const currencyQuotesStore = useCurrencyQuotesStore();

const props = defineProps<{
	direction: "left" | "right";
}>();

const currency = ref<string>(
	props.direction === "left" ? currencyQuotesStore.leftCode : currencyQuotesStore.rightCode,
);

watch(
	() => currencyQuotesStore.leftCode,
	(value) => {
		if (props.direction === "left") {
			currency.value = value;
		}
	},
);

watch(
	() => currencyQuotesStore.rightCode,
	(value) => {
		if (props.direction === "right") {
			currency.value = value;
		}
	},
);
</script>

<template>
    <NumberField class="w-fit" :id="currency" @update:model-value="(value) => (currencyQuotesStore.currency = value)"
        :default-value="currencyQuotesStore.currency" :format-options="{
            style: 'currency',
            currency: currency,
            currencyDisplay: 'code',
            currencySign: 'accounting',
        }">
        <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
        </NumberFieldContent>
    </NumberField>
</template>
