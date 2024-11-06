<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import {useCurrencyQuotesStore} from "@/stores/useCurrencyQuotesStore";
import {ref, watch} from "vue";
import {Cross2Icon} from "@radix-icons/vue";

const currencyQuotesStore = useCurrencyQuotesStore();

const props = defineProps<{result: number | undefined; open: boolean}>();
const emit = defineEmits(["update:open"]);

const isOpen = ref(props.open);

watch(
	() => props.open,
	(newVal) => {
		isOpen.value = newVal;
	},
);

watch(isOpen, (newVal) => {
	emit("update:open", newVal);
});

watch(
	() => currencyQuotesStore.leftCode,
	(value) => {
		currencyQuotesStore.leftCode = value;
	},
);

watch(
	() => currencyQuotesStore.rightCode,
	(value) => {
		currencyQuotesStore.rightCode = value;
	},
);
</script>

<template>
    <Dialog :open="isOpen">
        <DialogTrigger as-child>
            <slot name="trigger" />
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <template #close-button>
                <Cross2Icon class="w-4 h-4" @click="isOpen = false" />
            </template>
            <DialogHeader>
                <DialogTitle>Resultado da Conversão</DialogTitle>
            </DialogHeader>
            <p>
                A conversão de {{ currencyQuotesStore.leftCode }} {{ currencyQuotesStore.currency }} para {{
                    currencyQuotesStore.rightCode }} resulta em {{ props.result }}.
            </p>
            <DialogFooter>
                <DialogClose as-child>
                    <Button type="submit" @click="isOpen = false">
                        Concluir
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
