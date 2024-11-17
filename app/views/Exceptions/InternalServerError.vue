<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { RouterLink } from "vue-router";
import { useTranslation } from "@/config/composable/translate";

useTranslation();
</script>

<template>
    <div class="text-center flex flex-col gap-2">
        <div>
            <h1>Erro Interno do Servidor</h1>
            <p>Algo deu errado, tente novamente mais tarde</p>
        </div>
        <RouterLink to="/">
            <Button>Vá para Página Inicial</Button>
        </RouterLink>
    </div>
</template>
