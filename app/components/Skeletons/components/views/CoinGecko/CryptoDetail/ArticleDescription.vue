<script setup lang="tsx"></script>

<template>
    <div class="w-full flex flex-col gap-4 rounded-lg animate-pulse">
        <div class="flex flex-col items-center md:flex-row justify-between gap-4">
            <div class="flex flex-col justify-between gap-2">
                <div class="flex items-center gap-2">
                    <div class="bg-gray-300 h-[50px] w-[50px] rounded-full" />
                    <div class="bg-gray-300 h-10 w-36 rounded" />
                    -<div class="bg-gray-300 h-8 w-12 rounded" />
                </div>
                <div class="flex gap-2 items-end">
                    <div v-for="_i in 5" class="bg-gray-300 h-5 w-5 rounded-full" />
                </div>
            </div>
            <div class="flex flex-col items-end gap-2">
                <div v-for="_i in 3" class="bg-gray-300 h-5 w-20 rounded" />
            </div>
        </div>
        <div class="bg-gray-300 h-20 w-full rounded" />
        <div class="flex gap-2 items-center w-full rounded">
            <div class="bg-gray-300 h-5 w-40 rounded" />
            <div v-for="_i in 5" class="items-center gap-2 hidden md:flex">
                |
                <div class="bg-gray-300 h-5 w-24 rounded"></div>
            </div>
            <div v-for="_i in 2" class="flex items-center gap-2 md:hidden">
                |
                <div class="bg-gray-300 h-5 w-24 rounded"></div>
            </div>
        </div>
    </div>
</template>
