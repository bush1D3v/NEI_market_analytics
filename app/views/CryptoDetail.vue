<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();
const crypto = String(route.params.crypto);

const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

document.title = `${capitalizeFirstLetter(crypto)} | NEI Market Analytics`;
</script>

<template>
    <main class="container justify-center">
        <h1 class="hover:underline hover:opacity-50 ease-in-out duration-150">{{ crypto }}</h1>
    </main>
</template>
