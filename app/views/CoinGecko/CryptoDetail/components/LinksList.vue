<script setup lang="ts">
import {GithubLogoIcon, FileTextIcon, GlobeIcon, ModulzLogoIcon, HomeIcon} from "@radix-icons/vue";
import {MessageSquareMore, BookOpenText, Drum} from "lucide-vue-next";
import Link from "@/tags/Link.vue";
import type {CryptoDataDescription} from "@/types/CoinGecko/CryptoDetail";

const props = defineProps<{
	links: CryptoDataDescription["links"];
}>();
</script>

<template>
    <ul class="flex gap-2 items-end">
        <li v-if="props.links?.homepage[0]">
            <Link target="_blank" :href="props.links?.homepage[0]">
                <HomeIcon class="w-5 h-5" />
            </Link>
        </li>
        <li v-if="props.links?.repos_url.github[0]">
            <Link target="_blank" :href="props.links?.repos_url.github[0]">
                <GithubLogoIcon class="w-5 h-5" />
            </Link>
        </li>
        <li v-if="props.links?.whitepaper">
            <Link target="_blank" :href="props.links?.whitepaper">
                <FileTextIcon class="w-5 h-5" />
            </Link>
        </li>
        <li v-if="props.links?.blockchain_site[0]">
            <Link target="_blank" :href="props.links?.blockchain_site[0]">
                <GlobeIcon class="w-5 h-5" />
            </Link>
        </li>
        <li v-if="props.links?.subreddit_url">
            <Link target="_blank" :href="props.links?.subreddit_url">
                <ModulzLogoIcon class="w-5 h-5" />
            </Link>
        </li>
        <li v-if="props.links?.chat_url[0]">
            <Link target="_blank" :href="props.links?.chat_url[0]">
                <MessageSquareMore class="w-5 h-5" />
            </Link>
        </li>
        <li v-if="props.links?.official_forum_url[0]">
            <Link target="_blank" :href="props.links?.official_forum_url[0]">
                <BookOpenText class="w-5 h-5" />
            </Link>
        </li>
        <li v-if="props.links?.announcement_url[0]">
            <Link target="_blank" :href="props.links?.announcement_url[0]">
                <Drum class="w-5 h-5" />
            </Link>
        </li>
    </ul>
</template>
