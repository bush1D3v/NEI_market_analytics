<script lang="ts">
import Dropdown from '@/components/Dropdown.vue'
import SearchBar from '@/components/SearchBar.vue';
import Image from '@/tags/Image.vue';
import Link from '@/tags/Link.vue';
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import ImageSkeletonSvg from "@/components/Svg/ImageSkeletonSvg.vue";

export default {
    data() {
        return {
            loading: true,
        };
    },
    components: { Dropdown, SearchBar, Skeleton, Image, Link, ImageSkeletonSvg },
    methods: {
        onImageLoad() {
            this.loading = false;
        },
    },
};
</script>

<template>
    <header class="layout flex justify-between px-8 items-center min-w-full border-b" data-testid="Header">
        <div class="relative">
            <Skeleton v-if="loading" class="w-[150px] h-[53.69px] absolute">
                <ImageSkeletonSvg />
            </Skeleton>
            <div class="flex gap-4 items-center">
                <Link href="/" target="_self">
                <Image class="w-[150px] h-[53.69px]" src="/logo.svg" alt="NEI Logo" width="150" height="53.69"
                    @load="onImageLoad()" />
                </Link>
                <Dropdown />
            </div>
        </div>
        <SearchBar />
    </header>
</template>
