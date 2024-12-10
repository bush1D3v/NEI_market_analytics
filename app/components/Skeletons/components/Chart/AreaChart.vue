<script setup lang="ts"></script>

<template>
    <div class="w-full h-[560px] flex flex-col items-center animate-pulse">
        <div class="w-full h-[512px] flex flex-col items-end ">
            <div class="w-full flex justify-end mb-12 mr-2">
                <div class="flex space-x-2">
                    <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div class="w-10 h-3 bg-gray-300 rounded-full"></div>
                    <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div class="w-10 h-3 bg-gray-300 rounded-full"></div>
                </div>
            </div>

            <div class="w-full h-full flex items-end space-x-2">
                <svg class="w-full h-full mb-20" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M0,30 Q20,10 40,30 T80,30 T100,30 V50 H0 Z" fill="url(#gradient)" />
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#e0e0e0" />
                            <stop offset="100%" stop-color="#f5f5f5" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    </div>
</template>
