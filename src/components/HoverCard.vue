<script setup lang="ts">
import { CalendarIcon } from "@radix-icons/vue";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export interface HoverCardProps {
    title: string;
    description: string;
    startDate: string;
    avatarSrc: string;
    avatarFallback: string;
}

const props = defineProps<HoverCardProps>();
</script>

<template>
    <HoverCard>
        <HoverCardTrigger as-child>
            <Button variant="link" class="p-0 justify-start w-fit" data-testid="HoverCardButton">
                @{{ props.title }}
            </Button>
        </HoverCardTrigger>
        <HoverCardContent class="w-80">
            <div class="flex justify-between space-x-4">
                <Avatar>
                    <AvatarImage :src="props.avatarSrc" />
                    <AvatarFallback>{{ props.avatarFallback }}</AvatarFallback>
                </Avatar>
                <div class="space-y-1">
                    <h4 class="text-sm font-semibold">
                        @{{ props.title }}
                    </h4>
                    <p class="text-sm">
                        {{ props.description }}
                    </p>
                    <div class="flex items-center pt-2">
                        <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
                        <span class="text-xs text-textForeground">
                            Joined {{ props.startDate }}
                        </span>
                    </div>
                </div>
            </div>
        </HoverCardContent>
    </HoverCard>
</template>
