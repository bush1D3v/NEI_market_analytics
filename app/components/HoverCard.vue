<script setup lang="ts">
import {CalendarIcon} from "@radix-icons/vue";

import {Button} from "@/components/ui/button";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import Image from "@/tags/Image.vue";

export interface HoverCardProps {
	title: string;
	description: string;
	startDate: string;
	avatarSrc: string;
}

const props = defineProps<HoverCardProps>();
</script>

<template>
    <HoverCard>
        <HoverCardTrigger as-child>
            <Button variant="link" class="p-0 justify-start w-fit" data-testid="HoverCardButton">
                <span>@{{ props.title }}</span>
            </Button>
        </HoverCardTrigger>
        <HoverCardContent class="w-80">
            <div class="flex justify-between space-x-4">
                <Image :src="props.avatarSrc" :alt="props.title" width="80" height="80" class="rounded-full" />
                <div class="space-y-1">
                    <h4 class="text-sm font-semibold">
                        @{{ props.title }}
                    </h4>
                    <span class="text-sm">
                        {{ props.description }}
                    </span>
                    <div class="flex items-center pt-2">
                        <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
                        <span v-translate class="text-xs text-textForeground">
                            Começou em {{ props.startDate }}
                        </span>
                    </div>
                </div>
            </div>
        </HoverCardContent>
    </HoverCard>
</template>
