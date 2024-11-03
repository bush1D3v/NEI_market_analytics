<script setup lang="ts">
import {useTranslation} from "@/config/composable/translate";
import Button from "@/components/ui/button/Button.vue";
import RouterLink from "@/tags/RouterLink.vue";

useTranslation();
</script>

<template>
    <main class="container justify-center">
        <RouterLink to="/currency-quotes">
            <Button>
                Cotação de Moedas
            </Button>
        </RouterLink>
    </main>
</template>
