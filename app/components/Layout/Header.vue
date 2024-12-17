<script lang="ts" setup>
import Dropdown from "@/components/Dropdown.vue";
import SearchBar from "@/components/SearchBar.vue";
import ToggleTheme from "@/components/ToggleTheme.vue";
import Image from "@/tags/Image.vue";
import RouterLink from "@/tags/RouterLink.vue";
import Button from "@/components/ui/button/Button.vue";
import {DropdownDto} from "@/components/Dto/DropdownDto";
</script>

<template>
    <header class="layout flex justify-between gap-4 xs:gap-0 px-3 xs:px-8 py-3 items-center min-w-full border-b"
        data-testid="Header">
        <div class="gap-4 items-center">
            <RouterLink to="/" class="hidden lg:flex hover:opacity-50">
                <Image class="w-[150px] h-[53.69px]" src="/logo.svg" alt="NEI Logo" width="150" height="53.69" />
            </RouterLink>
            <RouterLink to="/" class="flex lg:hidden hover:opacity-50">
                <Image class="w-[50px] h-[50px]" src="/logo-just-icon.png" alt="NEI Logo" width="50" height="50" />
            </RouterLink>
            <Dropdown class="hidden lg:block" buttonTile="Mercados" label="Tópicos" :menu="DropdownDto" />
        </div>
        <div class="justify-center w-full max-w-80">
            <SearchBar />
        </div>
        <div class="justify-end flex gap-8 items-center">
            <RouterLink to="/news" class="hidden lg:flex">
                <Button v-translate variant="outline">
                    Notícias
                </Button>
            </RouterLink>
            <ToggleTheme variant="switch" />
        </div>
    </header>
</template>

<style scoped>
div {
    @apply lg:flex-1 flex;
}
</style>
