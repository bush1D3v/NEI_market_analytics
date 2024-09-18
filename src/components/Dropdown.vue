<script lang="ts" setup>
import {Button} from "@/components/ui/button";
import RouterLink from "@/tags/RouterLink.vue";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface SubContent {
	title: string;
	link: string;
	icon: string;
}

export interface Menu {
	title: string;
	link: string;
	subContent: SubContent[] | null;
}

export interface DropdownProps {
	buttonTile: string;
	label: string;
	menu: Menu[];
}

const props = defineProps<DropdownProps>();
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline" data-testid="Dropdown">
                {{ props.buttonTile }}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>
                <span v-translate>
                    {{ props.label }}
                </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <template v-for="menu in props.menu">
                    <RouterLink v-if="menu.subContent === null" :to="menu.link">
                        <DropdownMenuItem class="group cursor-pointer">
                            <span v-translate>{{ menu.title }}</span>
                        </DropdownMenuItem>
                    </RouterLink>
                    <DropdownMenuSub v-else>
                        <RouterLink :to="menu.link">
                            <DropdownMenuSubTrigger class="group cursor-pointer">
                                <span v-translate>{{ menu.title }}</span>
                            </DropdownMenuSubTrigger>
                        </RouterLink>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <template v-for="subContent in menu.subContent">
                                    <RouterLink :to="subContent.link">
                                        <DropdownMenuItem class="group cursor-pointer gap-1">
                                            <span>{{ subContent.icon }}</span>
                                            <span v-translate>{{ subContent.title }}</span>
                                        </DropdownMenuItem>
                                    </RouterLink>
                                </template>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </template>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style scoped>
span {
    @apply group-hover:text-primary;
}
</style>
