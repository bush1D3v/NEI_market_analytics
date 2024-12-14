<script setup lang="tsx">
interface Props {
	type: "cryptos" | "stocks" | "news";
}
const props = defineProps<Props>();
</script>

<template>
    <article
        class="flex flex-col justify-around md:justify-center bg-secondaryDarker rounded-lg gap-1 p-2 md:p-3 min-w-[310px] max-w-[310px] mn:min-w-[355px] mn:max-w-[355px] min-h-[250px] max-h-[250px] md:min-w-[425px] md:max-w-[425px] md:min-h-[250px] md:max-h-[250px] animate-pulse">
        <div class="flex justify-between">
            <div class="flex gap-2 items-center">
                <span class="bg-gray-300 h-5 w-5" :class="{ 'rounded-full': props.type === 'cryptos' }" />
                <span class="bg-gray-300 h-6 w-24 rounded" />
            </div>
            <span class="bg-gray-300 h-4 w-16 rounded mt-2" />
        </div>
        <hr class="h-[1px] w-full bg-gray-300" />
        <div class="flex gap-8" v-if="props.type !== 'news'">
            <div class="flex gap-2 min-w-40 max-w-40 md:min-w-60 md:max-w-60 justify-between items-end">
                <span class="bg-gray-300 h-4 w-8 rounded"></span>
                <span class="bg-gray-300 h-4 w-10 rounded"></span>
            </div>
            <div class="flex gap-2 items-center justify-between mt-1 w-full">
                <span class="bg-gray-300 h-4 w-7 rounded"></span>
                <span class="bg-gray-300 h-4 w-12 rounded"></span>
            </div>
        </div>
        <ul class="flex flex-col" :class="{ 'gap-2': props.type !== 'news', 'gap-3': props.type === 'news' }">
            <li v-if="props.type === 'news'" v-for="i in 3" class="flex gap-3 items-center justify-between">
                <div class="w-[82px] h-[47px] bg-gray-300 rounded-lg" />
                <div class="flex flex-col max-h-14">
                    <div class="flex flex-col hover:underline gap-1">
                        <div class="h-3 w-56  md:w-72 bg-gray-300 rounded" />
                        <div class="h-3 w-56  md:w-72 bg-gray-300 rounded" />
                    </div>
                    <div class="mt-1 h-4 w-16 bg-gray-300 rounded" />
                </div>
            </li>
            <li v-else v-for="i in 5" class="flex gap-2 items-center justify-around mn:justify-between text-center">
                <div
                    class="flex gap-2 min-w-40 max-w-40 mn:min-w-60 mn:max-w-60 md:min-w-72 md:max-w-72 justify-between">
                    <div class="flex gap-2 items-center">
                        <span class="bg-gray-300 h-6 w-6 rounded-full" />
                        <span class="bg-gray-300 h-5 w-28 rounded" />
                    </div>
                    <span class="hidden mn:flex bg-gray-300 h-6 w-12 rounded" />
                </div>
                <div class="flex gap-2">
                    <span class="bg-gray-300 h-6 w-10 rounded" />
                    <span class="bg-gray-300 h-6 w-10 rounded" />
                </div>
            </li>
        </ul>
    </article>
</template>
