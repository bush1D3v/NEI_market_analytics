<script setup lang="ts">
import { useTranslation } from "@/config/composable/translate";
import Button from "@/components/ui/button/Button.vue";

useTranslation();
</script>

<template>
    <main class="container justify-center">
        <Button>
            Currency Quotes
        </Button>
    </main>
</template>
