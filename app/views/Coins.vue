<script setup lang="ts">
import {RouterLink} from "vue-router";
import {useTranslation} from "@/config/composable/translate";
import Button from "@/components/ui/button/Button.vue";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import EntityCard from "@/components/EntityCard.vue";
import InternalServerError from "./InternalServerError.vue";
import {ref, onMounted} from "vue";
import { useTransition } from "@vueuse/core";

useTranslation();
</script>

<template>
    <main class="container justify-center">
        <RouterLink to="/cryptos">
            <h1 class="hover:underline hover:opacity-50 ease-in-out duration-150">

                Teste</h1>
        </RouterLink>
    </main>
</template>
