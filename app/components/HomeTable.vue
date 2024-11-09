<script setup lang="ts">
import Image from "@/tags/Image.vue";
import Link from "@/tags/Link.vue";

interface Props {
    image: string;
    redirectTo: string;
    title: string;
    symbol: string;
    price: number;
    volume_change_24h: number;
}

const props = defineProps<Props>();
</script>

<template>
    <article class="container justify-center">
        <ul>
            <li v-for="i in 5">
                <Image :src="props.image" :alt="props.title + ' logo'" width="24" height="24" />
                <Link :href="props.redirectTo" target="_self">
                <h2> {{ props.title }} </h2>
                </ Link>
                <span> {{ props.symbol }} </span>
                <span> {{ props.price }} </span>
                <span> {{ props.volume_change_24h }} </span>
            </li>
        </ul>
    </article>
</template>
