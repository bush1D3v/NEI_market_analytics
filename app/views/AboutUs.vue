<script setup lang="ts">
import Accordion from "@/components/Accordion.vue";
import Badges from "@/components/Badges.vue";
import {AccordionDto} from "@/components/Dto/AccordionDto";
import {BadgesDto} from "@/components/Dto/BadgesDto";
</script>

<template>
    <section class="justify-around container">
        <div class="flex flex-col gap-2 text-center">
            <h1 v-translate>Impulsionando o Futuro Juntos</h1>
            <h2 v-translate class="font-light text-textForeground text-base md:text-xl">Colaborando para um amanhã mais tecnológico.
            </h2>
        </div>
        <div class="flex flex-col gap-8 my-10 md:mt-0">
            <span v-translate class="text-center text-2xl md:text-3xl pb-2 font-semibold border-b">Por Trás dos Códigos</span>
            <Badges :badges="BadgesDto" />
        </div>
        <div class="w-full h-fit">
            <Accordion :items="AccordionDto" />
        </div>
    </section>
</template>
