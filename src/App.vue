<script setup lang="ts">
import {RouterView} from "vue-router";
import Footer from "@/components/Layout/Footer.vue";
import Header from "@/components/Layout/Header.vue";
</script>

<template>
    <Header />
    <RouterView />
    <Footer />
</template>
