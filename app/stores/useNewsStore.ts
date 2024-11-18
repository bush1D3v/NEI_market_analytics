import {ref} from "vue";
import {defineStore} from "pinia";
import type {New} from "@/types/Finnhub/New";
import type {Category} from "@/types/Finnhub/Category";

type CategoriesNews = {
	[key in Category]: New[];
};

export const useNewsStore = defineStore("news", () => {
	const news = ref<CategoriesNews>({
		crypto: [],
		forex: [],
		general: [],
		merger: [],
		company: [],
	});

	function addNews(data: New[], category: Category): void {
		news.value[category].push(...data);
	}

	return {
		news,
		addNews,
	};
});
