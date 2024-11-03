<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import {useTranslation} from "@/config/composable/translate";
import {useCurrencyQuotesStore} from "@/stores/useCurrencyQuotesStore";

useTranslation();

const {currencyQuotes, leftCurrency, rightCurrency, invertCurrencies} = useCurrencyQuotesStore();
</script>

<template>
    <main class="container justify-center">
        <Button>
            Currency Quotes
        </Button>
    </main>
</template>
