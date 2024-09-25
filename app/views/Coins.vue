<script setup lang="ts">
import {RouterLink} from "vue-router";
import {useTranslation} from "@/config/composable/translate";

useTranslation();
</script>

<template>
    <main class="container justify-center">
        <RouterLink to="/cryptos">
            <h1 class="hover:underline hover:opacity-50 ease-in-out duration-150">Vá para cripto moedas</h1>
        </RouterLink>
    </main>
</template>
