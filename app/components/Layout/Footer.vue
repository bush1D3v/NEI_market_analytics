<script setup lang="ts">
import Image from "@/tags/Image.vue";
import RouterLink from "@/tags/RouterLink.vue";
import ToggleTheme from "@/components/ToggleTheme.vue";
import Link from "@/tags/Link.vue";
import github from "@/assets/images/github.png";
</script>

<template>
    <footer class="layout container justify-center min-w-full border-t text-dark" data-testid="Footer">
        <ul class="flex justify-around w-full py-12">
            <li class="flex flex-col gap-4">
                <Image src="/logo.svg" alt="NEI Logo" width="200" height="71.59" />
                <span>© 2024 Todos os direitos reservados.</span>
            </li>
            <li class="flex flex-col gap-5">
                <h3>Info</h3>
                <ul class="flex flex-col gap-2">
                    <li>
                        <RouterLink to="/about-us" class="hover:opacity-50">
                            <span>Sobre nós</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/privacy-policy" class="hover:opacity-50">
                            <span>Política de Privacidade</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/cookie-policy" class="hover:opacity-50">
                            <span>Política de Cookies</span>
                        </RouterLink>
                    </li>
                </ul>
            </li>
            <li class="flex flex-col gap-5">
                <h3>Modo Escuro</h3>
                <ToggleTheme variant="airplane" />
                <h3>Redes Sociais</h3>
                <Link href="https://github.com/bush1D3v/NEI_market_analytics/tree/dev" target="_blank">
                <div class="flex gap-3">
                    <Image :src="github" alt="GitHub Logo" width="24" height="24" />
                    <span>Ver no GitHub</span>
                </div>
                </Link>
            </li>
        </ul>
    </footer>
</template>

<style scoped>
h3 {
    @apply text-text;
}
</style>
