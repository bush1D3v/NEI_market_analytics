<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import InternalServerError from "@/views/Exceptions/InternalServerError.vue";
import NewsCard from "@/components/NewsCard.vue";
import NewsCardSkeleton from "@/components/Skeletons/components/NewsCard.vue";
import translate from "@/utils/externalDataTranslator";
import {ref, onMounted, watch} from "vue";
import {listMarketNews} from "@/services/Finnhub";
import {useNewsStore} from "@/stores/useNewsStore";

const newStore = useNewsStore();
const isLoading = ref<boolean>(true);
const isLoadingMore = ref<boolean>(false);
const error = ref<boolean>(false);
const limit = ref<number>(12);

function loadMore() {
	limit.value += 12;
}

function paginatedNews() {
	return newStore.news.crypto.slice(0, limit.value);
}

onMounted(async () => {
	isLoading.value = true;

	if (newStore.news.crypto.length === 0) {
		try {
			await listMarketNews();
		} catch (err) {
			error.value = true;
		}
	}

	isLoading.value = false;

	for (let i = limit.value - 12; i < limit.value; i++) {
		newStore.news.crypto[i].summary = await translate(newStore.news.crypto[i].summary);
		newStore.news.crypto[i].headline = await translate(newStore.news.crypto[i].headline);
	}
});

watch(limit, async () => {
	isLoadingMore.value = true;
	for (let i = limit.value - 12; i < limit.value; i++) {
		newStore.news.crypto[i].summary = await translate(newStore.news.crypto[i].summary);
		newStore.news.crypto[i].headline = await translate(newStore.news.crypto[i].headline);
	}
	isLoadingMore.value = false;
});
</script>

<template>
    <section class="container md:px-4 justify-center my-10">
        <ul v-if="!error" class="flex gap-10 flex-wrap justify-center">
            <li class="w-full 2xl:max-w-max" v-if="!isLoading" v-for="news in paginatedNews()" :key="news.id">
                <NewsCard :id="news.id" :datetime="news.datetime" :headline="news.headline" :url="news.url"
                    :source="news.source" :summary="news.summary" :image="news.image" />
            </li>
            <NewsCardSkeleton v-else v-if="!isLoadingMore" v-for="i in 12" :key="i" />
        </ul>
        <div v-if="!error && !isLoading && limit < newStore.news.crypto.length" class="flex justify-center mt-10">
            <Button v-translate @click="loadMore" :disabled="isLoadingMore">
                {{ isLoadingMore ? 'Carregando...' : 'Carregar Mais' }}
            </Button>
        </div>
        <InternalServerError v-if="error" />
    </section>
</template>
