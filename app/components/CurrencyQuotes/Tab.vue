<script setup lang="ts">
import Select from '@/components/CurrencyQuotes/Select.vue'
import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDownIcon, ChevronUpIcon, DoubleArrowDownIcon } from '@radix-icons/vue'
import { ref } from 'vue'
import { t } from 'i18next'
import { useCurrencyQuotesStore } from '@/stores/useCurrencyQuotesStore'

const { invertCurrencies } = useCurrencyQuotesStore()

const isOpen = ref(false)
</script>

<template>
    <Collapsible v-model:open="isOpen"
        class="fixed z-50 right-10 bottom-0 space-y-2 bg-material rounded-t-2xl shadow-2xl shadow-accent py-2 px-4 translate-ignore">
        <div class="flex items-center justify-between space-x-4">
            <h4 class="font-semibold pr-20">
                {{ t("Conversor de moedas") }}
            </h4>
            <CollapsibleTrigger as-child>
                <Button variant="ghost" size="sm" class="w-9 p-0 rounded-full">
                    <ChevronDownIcon class="w-6 h-6" v-if=isOpen />
                    <ChevronUpIcon class="w-6 h-6" v-if=!isOpen />
                    <span class="sr-only">{{ isOpen ? 'Fechar' : 'Abrir' }}</span>
                </Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent class="space-y-2 flex flex-col">
            <Select direction="left" />
            <Button variant="default" class="w-9 p-0 rounded-full">
                <DoubleArrowDownIcon @click="invertCurrencies">
                    revert
                </DoubleArrowDownIcon>
            </Button>
            <Select direction="right" />
        </CollapsibleContent>
    </Collapsible>
</template>
