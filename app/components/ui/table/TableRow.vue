<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes[ 'class' ]
}>()
</script>

<template>
    <tr :class="cn('border-b transition-colors hover:bg-accentMid', props.class)">
        <slot />
    </tr>
</template>
