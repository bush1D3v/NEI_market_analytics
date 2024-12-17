<script setup lang="ts">
import RouterLink from "@/tags/RouterLink.vue";
import Link from "@/tags/Link.vue";
import {ExploreDto, ToolsDto, InfoDto} from "@/components/Dto/views/MoreDto";
import {ChevronRight} from "lucide-vue-next";
</script>

<template>
    <section class="justify-around gap-8 container">
        <article>
            <h2 v-translate>Explorar</h2>
            <ul>
                <li v-for="(data, i) in ExploreDto" :key="i">
                    <RouterLink :to="data.href">
                        <div>
                            {{ data.emoji }}
                            <h4 v-translate>{{ data.title }}</h4>
                        </div>
                        <ChevronRight />
                    </RouterLink>
                </li>
            </ul>
        </article>
        <article>
            <h2 v-translate id="tools">Ferramentas</h2>
            <ul>
                <li v-for="(data, i) in ToolsDto" :key="i">
                    <RouterLink :to="data.href">
                        <div>
                            <component :is="data.icon" />
                            <h4 v-translate>{{ data.title }}</h4>
                        </div>
                        <ChevronRight />
                    </RouterLink>
                </li>
            </ul>
        </article>
        <article>
            <h2 v-translate>Informações</h2>
            <ul>
                <li v-for="(data, i) in InfoDto" :key="i">
                    <Link v-if="data.title === 'Ver no GitHub'" :href="data.href" target="_blank">
                    <div>
                        <component :is="data.icon" />
                        <h4 v-translate>{{ data.title }}</h4>
                    </div>
                    <ChevronRight />
                    </Link>
                    <RouterLink v-else :to="data.href">
                        <div>
                            <component :is="data.icon" />
                            <h4 v-translate>{{ data.title }}</h4>
                        </div>
                        <ChevronRight />
                    </RouterLink>
                </li>
            </ul>
        </article>
    </section>
</template>

<style lang="css" scoped>
article {
    @apply flex flex-col gap-4 w-full;
}

ul {
    @apply w-full bg-secondaryDarker p-4 rounded-lg flex flex-col gap-4;
}

svg {
    @apply w-5 h-5;
}

a {
    @apply flex items-center gap-2 justify-between hover:opacity-50 duration-150 ease-in-out;

    div {
        @apply flex items-center gap-2;
    }
}
</style>
