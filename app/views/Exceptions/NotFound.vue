<script setup lang="ts">
import NotFoundImage from "@/assets/images/404.png";
import Button from "@/components/ui/button/Button.vue";
import Image from "@/tags/Image.vue";
import RouterLink from "@/tags/RouterLink.vue";
</script>

<template>
    <section class="container justify-center">
        <div class="flex flex-col items-center text-center gap-4 pb-2">
            <h1 v-translate class="max-w-3xl">
                Você tentou acessar uma página que se perdeu pelo caminho
            </h1>
            <div class="flex items-center gap-1">
                <p v-translate class="max-w-5xl text-lg">
                    A página que você tentou acessar não existe, mas você pode começar um novo caminho
                    voltando para a página inicial
                </p>
                <span>😀</span>
            </div>
        </div>
        <Image :src="NotFoundImage" alt="Not Found Image" width="500" height="500" class="-my-10 md:-my-20" />
        <RouterLink to="/" class="z-10">
            <Button v-translate class="text-lg">
                Vá para Página Inicial
            </Button>
        </RouterLink>
    </section>
</template>
