<script lang="ts" setup>
import { computed, ref, type HTMLAttributes, type ImgHTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import ImageSkeletonSvg from "@/components/Svg/ImageSkeletonSvg.vue";

export interface ImageProps extends /* @vue-ignore */ ImgHTMLAttributes {
    class?: HTMLAttributes[ "class" ];
    src: string;
    alt: string;
    width: string;
    height: string;
}

const props = defineProps<ImageProps>();

// Data
const loading = ref<boolean>(true);

// Methods
function onImageLoad() {
    loading.value = false;
}

const roundedClass = computed(() => {
    const classList = props.class?.split(" ") || [];
    return classList.filter((cls: string) => cls.startsWith("rounded")).join(" ");
});
</script>

<template>
    <div class="relative" :class="`w-[${props.width}px] h-[${props.height}px]`">
        <Skeleton v-if="loading" :class="`w-full h-full absolute ${roundedClass}`">
            <ImageSkeletonSvg />
        </Skeleton>
        <img :src="props.src" :alt="props.alt" :width="props.width" :height="props.height" :class="cn(props.class)"
            data-testid="Image" @load="onImageLoad()" />
    </div>
</template>
