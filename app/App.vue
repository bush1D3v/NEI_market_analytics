<script setup lang="ts">
import { RouterView } from "vue-router";
import Footer from "@/components/Layout/Footer.vue";
import Header from "@/components/Layout/Header.vue";
import Sonner from "@/components/ui/sonner/Sonner.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
// import Tab from "@/components/CurrencyQuotes/Tab.vue";
import GenerativeAI from "@/components/GenerativeAI.vue";
import { onBeforeMount } from "vue";
import { getCsrfToken } from "./services/Tokens";

onBeforeMount(async () => {
    await getCsrfToken();
})
</script>

<template>
    <Header />
    <main class="min-h-[95dvh] mb-[72px] lg:mb-0 relative ">
        <Breadcrumb />
        <RouterView />
        <Toaster />
        <Sonner />
        <!-- <Tab class="hidden lg:block" /> -->
        <GenerativeAI />
    </main>
    <Footer />
</template>
