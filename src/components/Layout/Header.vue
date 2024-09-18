<script lang="ts" setup>
import Dropdown from "@/components/Dropdown.vue";
import SearchBar from "@/components/SearchBar.vue";
import Image from "@/tags/Image.vue";
import RouterLink from "@/tags/RouterLink.vue";
import {DropdownDto} from "@/components/Dto/DropdownDto";
import {useTranslation} from "@/config/composable/translateMixin";

useTranslation();
</script>

<template>
    <header class="layout flex justify-between px-8 items-center min-w-full border-b" data-testid="Header">
        <div class="flex gap-4 items-center">
            <RouterLink to="/" class="hover:opacity-50">
                <Image class="w-[150px] h-[53.69px]" src="/logo.svg" alt="NEI Logo" width="150" height="53.69" />
            </RouterLink>
            <Dropdown buttonTile="Mercados" label="Tópicos" :menu="DropdownDto" />
        </div>
        <SearchBar />
    </header>
</template>
