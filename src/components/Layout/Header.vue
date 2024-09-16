<script setup lang="ts">
import Dropdown from '@/components/Dropdown.vue'
import SearchBar from '@/components/SearchBar.vue';
</script>

<template>
    <header class="layout flex justify-around items-center min-w-full border-b" data-testid="Header">
        <Dropdown />
        <SearchBar />
    </header>
</template>
