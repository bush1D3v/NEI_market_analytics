<script setup lang="ts">
import Image from "@/tags/Image.vue";
import RouterLink from "@/tags/RouterLink.vue";
import ToggleTheme from "@/components/ToggleTheme.vue";
import Link from "@/tags/Link.vue";
import {FooterDto} from "@/components/Dto/Layout/FooterDto";
import {useRoute} from "vue-router";
import {GithubLogoIcon} from "@radix-icons/vue";

const route = useRoute();
</script>

<template>
    <footer class="layout fixed bottom-0 lg:relative lg:container justify-center min-w-full border-t text-dark"
        data-testid="Footer">
        <ul class="hidden lg:flex gap-0 flex-row justify-around items-center w-full py-12">
            <li class="flex flex-col gap-4">
                <Image src="/logo.svg" alt="NEI Logo" width="200" height="71.59" />
                <span v-translate>© 2024 Todos os direitos reservados.</span>
            </li>
            <li class="flex flex-col gap-5">
                <h3 v-translate>Informações</h3>
                <ul class="flex flex-col gap-2">
                    <li>
                        <RouterLink to="/about-us" class="hover:opacity-50">
                            <span v-translate>Sobre Nós</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/privacy-policy" class="hover:opacity-50">
                            <span v-translate>Política de Privacidade</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/cookie-policy" class="hover:opacity-50">
                            <span v-translate>Política de Cookies</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/more#tools" class="hover:opacity-50">
                            <span v-translate>Ferramentas</span>
                        </RouterLink>
                    </li>
                </ul>
            </li>
            <li class="flex flex-col gap-5">
                <h3 v-translate>Modo Escuro</h3>
                <ToggleTheme variant="airplane" />
                <h3 v-translate>Redes Sociais</h3>
                <Link href="https://github.com/bush1D3v/NEI_market_analytics/tree/dev" target="_blank">
                <div class="flex gap-3">
                    <GithubLogoIcon class="w-6 h-6" />
                    <span v-translate>Ver no GitHub</span>
                </div>
                </Link>
            </li>
        </ul>
        <ul class="grid grid-cols-5 bg-secondaryDarker w-full h-full lg:hidden">
            <li v-for="(data, i) in FooterDto" :key="i"
                :class="{ 'text-primary': route.path === data.path, 'cursor-pointer hover:text-primary duration-150 ease-in-out': true }">
                <RouterLink :to="data.path" class="flex flex-col items-center p-3">
                    <component :is="data.icon" class="w-6 h-6" />
                    <h5 v-translate>{{ data.title }}</h5>
                </RouterLink>
            </li>
        </ul>
    </footer>
</template>

<style scoped>
h3 {
    @apply text-text;
}
</style>
