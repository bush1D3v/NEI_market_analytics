<script setup lang="ts">
import Accordion from "@/components/Accordion.vue";
import Badges from "@/components/Badges.vue";
</script>

<template>
    <main class="justify-around container">
        <div class="flex flex-col gap-2 text-center">
            <h1>Impulsionando o Futuro Juntos</h1>
            <h2 class="font-light text-textForeground text-base md:text-xl">Colaborando para um amanhã mais tecnológico.
            </h2>
        </div>
        <div class="flex flex-col gap-8 my-10 md:mt-0">
            <p class="text-center text-2xl md:text-3xl pb-2 font-semibold border-b">Por Trás dos Códigos</p>
            <Badges />
        </div>
        <div class="w-full h-fit">
            <Accordion />
        </div>
    </main>
</template>
