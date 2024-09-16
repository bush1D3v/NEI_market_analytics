<script setup lang="ts">
import {RouterView} from "vue-router";
import {Header, Footer} from "./components/Layout";
</script>

<template>
    <Header />
    <RouterView />
    <Footer />
</template>
