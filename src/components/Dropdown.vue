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
import Image from "@/tags/Image.vue";

export interface SubContent {
	/**
	 * Imagem referente ao subItem
	 */
	logo: string;
	title: string;
	link: string;
}

export interface Menu {
	emoji: string;
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
    <DropdownMenu >
        <DropdownMenuTrigger as-child class="bg-border text-white dark:text-white dark:bg-#0f101d" >
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
                        <DropdownMenuItem class="group cursor-pointer flex gap-3">
                            <span v-html="menu.emoji"></span>
                            <span v-translate>{{ menu.title }}</span>
                        </DropdownMenuItem>
                    </RouterLink>
                    <DropdownMenuSub v-else>
                        <RouterLink :to="menu.link">
                            <DropdownMenuSubTrigger class="group cursor-pointer flex gap-3">
                                <div v-html="menu.emoji"></div>
                                <span v-translate>{{ menu.title }}</span>
                            </DropdownMenuSubTrigger>
                        </RouterLink>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <template v-for="subContent in menu.subContent">
                                    <RouterLink :to="subContent.link">
                                        <DropdownMenuItem class="group cursor-pointer gap-3">
                                            <Image :src="subContent.logo" alt="Logo" width="20" height="20" />
                                            <span>{{ subContent.title }}</span>
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
