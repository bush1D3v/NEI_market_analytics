<script setup lang="ts">
import RouterLink from "@/tags/RouterLink.vue";
import Link from "@/tags/Link.vue";
import { ExploreDto, ToolsDto, InfoDto } from "@/components/Dto/views/MoreDto";
import { ChevronRight } from "lucide-vue-next";
import { useTranslation } from "@/config/composable/translate";
//TODO Criar página de more
useTranslation();
</script>

<template>
    <section class="justify-around container">
        <article>
            <h2>Explorar</h2>
            <ul>
                <li v-for="(data, i) in ExploreDto" :key="i">
                    <RouterLink :to="data.href">
                        {{ data.emoji }}
                        <p>{{ data.title }}</p>
                        <ChevronRight />
                    </RouterLink>
                </li>
            </ul>
        </article>
        <article>
            <h2>Ferramentas</h2>
            <ul>
                <li v-for="(data, i) in ToolsDto" :key="i">
                    <RouterLink :to="data.href">
                        <component :is="data.icon" />
                        <p>{{ data.title }}</p>
                        <ChevronRight />
                    </RouterLink>
                </li>
            </ul>
        </article>
        <article>
            <h2>Informações</h2>
            <ul>
                <li v-for="(data, i) in InfoDto" :key="i">
                    <Link v-if="data.title === 'Ver no GitHub'" :href="data.href" target="_blank">
                    <component :is="data.icon" />
                    <p>{{ data.title }}</p>
                    <ChevronRight />
                    </Link>
                    <RouterLink v-else :to="data.href">
                        <component :is="data.icon" />
                        <p>{{ data.title }}</p>
                        <ChevronRight />
                    </RouterLink>
                </li>
            </ul>
        </article>
    </section>
</template>

<style lang="css" scoped>
a {
    @apply flex gap-2 hover:opacity-50 duration-150 ease-in-out;
}
</style>
