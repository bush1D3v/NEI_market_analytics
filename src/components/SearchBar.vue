<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useMagicKeys} from "@vueuse/core";
import {PlusIcon} from "@radix-icons/vue";
import {RoutesEnum} from "@/enum/RoutesEnum";
import {t} from "i18next";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandDialog,
} from "@/components/ui/command";

const inputValue = ref("");

const searchValue = JSON.parse(localStorage.getItem("searchValue") || "[]") as string[];

function saveToLocalStorage(input: string): void {
	const treatedValue = RoutesEnum.findClosestTextMatch(input) as string;

	if (
		!searchValue.includes(treatedValue) &&
		treatedValue !== undefined &&
		treatedValue !== "" &&
		treatedValue !== null
	) {
		if (searchValue.length === 4) {
			searchValue.pop();
		}
		searchValue.unshift(treatedValue);
	}

	localStorage.setItem("searchValue", JSON.stringify(searchValue));
	inputValue.value = "";
	blur();
}

const isFocused = ref(false);

function focus() {
	isFocused.value = true;
}

function blur() {
	isFocused.value = false;
}

function handleOpenChange() {
	isFocused.value = !isFocused.value;
}

const {Meta_J, Ctrl_J} = useMagicKeys({
	passive: false,
	onEventFired(e) {
		if (e.key === "j" && (e.metaKey || e.ctrlKey)) e.preventDefault();
	},
});

watch([Meta_J, Ctrl_J], (v) => {
	if (v[0] || v[1]) handleOpenChange();
});

onMounted(() => {
	blur();
});
</script>

<template>
    <Command class="group rounded-lg border shadow-md max-w-80 md:max-w-[450px] mx-0 z-50 relative">
        <div class="w-full" cmdk-input-wrapper>
            <CommandInput @click="focus" :icon-text="'dark'" :placeholder="t('Pesquisar...')" class="w-full" />
        </div>
        <kbd
            class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium text-text opacity-100 absolute top-[10px] right-4 bg-transparent my-0">
            <span class="text-xs">⌘</span>J
        </kbd>
        <CommandDialog v-model:open="isFocused" class="flex h-[350px]">
            <div class="flex items-center border-b bg-darkAlt pl-4" cmdk-input-wrapper>
                <CommandInput :placeholder="t('Pesquisar...')" @input="inputValue = $event.target.value"
                    :icon-text="'light'" />
            </div>
            <CommandList>
                <CommandGroup heading="Recentes" v-if="searchValue.length > 0 && inputValue.length === 0">
                    <CommandItem @click="saveToLocalStorage(item)" v-for="item in searchValue" :key="item"
                        :to="RoutesEnum.findClosestRouteMatch(item)" :value="item">
                        <span class="text-lg text-light material-symbols-outlined"> history </span>
                        <span class="ml-2 text-light">{{ item }}</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup heading="Sugestões" v-if="inputValue.length === 0">
                    <CommandItem value="Criar" to="/reminders/create" @click="saveToLocalStorage('Criar')">
                        <PlusIcon class="mr-2 h-4 w-4 text-light" />
                        <span class="text-light">Criar</span>
                    </CommandItem>
                    <CommandItem value="Seus Lembretes" to="/reminders" @click="saveToLocalStorage('Seus Lembretes')">
                        <span class="material-icons mr-2 text-base text-light">table_view</span>
                        <span class="text-light">Seus Lembretes</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Recomendado" v-if="inputValue.length > 0">
                    <CommandItem value="Configurações" to="/settings" @click="saveToLocalStorage('Configurações')">
                        <span class="material-icons mr-2 text-base text-light">settings</span>
                        <span class="text-light">Configurações</span>
                    </CommandItem>
                    <CommandItem value="Página Inicial" to="/" @click="saveToLocalStorage('Página Inicial')">
                        <span class="material-icons mr-2 text-base text-light">home</span>
                        <span class="text-light">Página Inicial</span>
                    </CommandItem>
                    <CommandItem value="Seus Lembretes" to="/reminders" @click="saveToLocalStorage('Seus Lembretes')">
                        <span class="material-icons mr-2 text-base text-light">table_view</span>
                        <span class="text-light">Seus Lembretes</span>
                    </CommandItem>
                    <CommandItem value="Gráficos" to="/graphs" @click="saveToLocalStorage('Gráficos')">
                        <span class="material-icons mr-2 text-base text-light">view_kanban</span>
                        <span class="text-light">Gráficos</span>
                    </CommandItem>
                    <CommandItem value="Criar" to="/reminders/create" @click="saveToLocalStorage('Criar')">
                        <span class="material-icons mr-2 text-base text-light">add</span>
                        <span class="text-light">Criar</span>
                    </CommandItem>

                </CommandGroup>
            </CommandList>
        </CommandDialog>
    </Command>
</template>
