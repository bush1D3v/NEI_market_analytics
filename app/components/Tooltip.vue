<script setup lang="ts">
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
</script>

<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger as-child>
                <slot name="trigger" />
            </TooltipTrigger>
            <TooltipContent>
                <slot name="content" />
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>
