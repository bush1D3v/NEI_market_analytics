<script setup lang="ts">
import {RouterLink} from "vue-router";
import {Button} from "../components/ui/button";
</script>

<template>
    <main class="container">
        <RouterLink to="/">
            <Button>
                Home
            </Button>
        </RouterLink>
    </main>
</template>
