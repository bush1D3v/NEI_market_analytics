<script setup lang="ts">
import {RouterView} from "vue-router";
import Footer from "@/components/Layout/Footer.vue";
import Header from "@/components/Layout/Header.vue";
import Sonner from "./components/ui/sonner/Sonner.vue";
import Toaster from "./components/ui/toast/Toaster.vue";
</script>

<template>
    <Header />
    <RouterView />
    <Footer />
    <Toaster />
    <Sonner />
</template>
