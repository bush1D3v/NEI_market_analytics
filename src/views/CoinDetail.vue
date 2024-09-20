<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();
const coin = String(route.params.coin);

const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

document.title = `${capitalizeFirstLetter(coin)} | NEI Market Analytics`;
</script>

<template>
    <main class="container justify-center">
        <h1 class="hover:underline hover:opacity-50 ease-in-out duration-150">{{ coin }}</h1>
    </main>
</template>
