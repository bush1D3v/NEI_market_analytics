<script setup lang="ts">
import {RouterView} from "vue-router";
import Footer from "@/components/Layout/Footer.vue";
import Header from "@/components/Layout/Header.vue";
import Sonner from "@/components/ui/sonner/Sonner.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import Tab from "@/components/CurrencyQuotes/Tab.vue";
</script>

<template>
    <Header />
    <main class="min-h-[95dvh] relative ">
        <RouterView />
        <Toaster />
        <Sonner />
        <Tab class="hidden xs:block" />
    </main>
    <Footer />
</template>
