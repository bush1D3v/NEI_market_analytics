<script setup lang="ts">
import RouterLink from "@/tags/RouterLink.vue";
import Button from "@/components/ui/button/Button.vue";
import { useTranslation } from "@/config/composable/translate";
import { t } from "i18next";

useTranslation();
</script>

<template>
    <section class="container justify-center">
        <RouterLink to="/news">
            <Button>
                {{ t('News') }}
            </Button>
        </RouterLink>
    </section>
</template>
