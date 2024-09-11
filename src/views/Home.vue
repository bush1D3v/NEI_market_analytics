<script setup lang="ts">
import {RouterLink} from "vue-router";
import {Button} from "../components/ui/button";
</script>

<template>
    <main class="container">
        <RouterLink to="/about">
            <Button>
                About
            </Button>
        </RouterLink>
    </main>
</template>
