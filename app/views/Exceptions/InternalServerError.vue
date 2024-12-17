<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import {RouterLink} from "vue-router";
</script>

<template>
    <div class="text-center flex flex-col gap-2">
        <div>
            <h1 v-translate>Erro Interno do Servidor</h1>
            <p v-translate>Algo deu errado, tente novamente mais tarde</p>
        </div>
        <RouterLink to="/">
            <Button v-translate>Vá para Página Inicial</Button>
        </RouterLink>
    </div>
</template>
