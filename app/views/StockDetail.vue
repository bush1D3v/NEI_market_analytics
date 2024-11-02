<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();
const stock = String(route.params.stock);

const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

document.title = `${capitalizeFirstLetter(stock)} | NEI Market Analytics`;
</script>


<template>
    <main class="container justify-center">
        <h1 class="hover:underline hover:opacity-50 ease-in-out duration-150">{{ stock }}</h1>
    </main>
</template>
