<script setup lang="ts">
import HomeTopsTable from "@/components/views/Home/HomeTopsTable.vue";
import HomeTopsTableSkeleton from "@/components/Skeletons/components/views/Home/HomeTopsTable.vue";
import HomeDatasTable from "@/components/views/Home/HomeDatasTable.vue";
import type {New} from "@/types/Finnhub/New";
import {onBeforeMount, ref} from "vue";
import {listCryptoCurrencies} from "@/services/CoinGecko";
import {useCryptoCurrencyStore} from "@/stores/useCryptoCurrencyStore";
import {listCompanyNews} from "@/services/Finnhub";
import {listStocks} from "@/services/BrapiDev";
import {useStocksCurrencyStore} from "@/stores/useStocksCurrencyStore";
import {useNewsStore} from "@/stores/useNewsStore";
import BitcoinNotebook from "@/assets/images/bitcoin-notebook.png";
import BitcoinRocket from "@/assets/images/bitcoin-rocket.png";
import BitcoinEscudo from "@/assets/images/bitcoin-escudo.png";
import Card from "@/components/ui/card/Card.vue";
import Image from "@/tags/Image.vue";

const cryptoCurrencyStore = useCryptoCurrencyStore();
const newsStore = useNewsStore();
const stocksCurrencyStore = useStocksCurrencyStore();

const onCryptoLoading = ref<boolean>(false);
const onNewsLoading = ref<boolean>(false);
const onStocksLoading = ref<boolean>(false);

onBeforeMount(async () => {
	onNewsLoading.value = true;
	onCryptoLoading.value = true;
	onStocksLoading.value = true;

	if (!newsStore.news.company.length) {
		(await listCompanyNews()) as New[];
	}
	onNewsLoading.value = false;

	if (!cryptoCurrencyStore.homeCryptoCurrencies.length) {
		await listCryptoCurrencies(5, 1, "market_cap_desc", "24h");
	}
	onCryptoLoading.value = false;

	if (!stocksCurrencyStore.homeStockCurrencies.length) {
		await listStocks(5, 1, "change", "desc");
	}
	onStocksLoading.value = false;
});
</script>

<template>
    <section class="container flex flex-col items-center justify-center gap-8">
        <ul class="flex gap-4 flex-wrap justify-center">
            <li v-if="!onCryptoLoading">
                <HomeTopsTable icon="🪙" table-title="Moedas em alta" redirect-to="/cryptos"
                    :coins="cryptoCurrencyStore.homeCryptoCurrencies" />
            </li>
            <HomeTopsTableSkeleton v-else type="cryptos" />
            <li v-if="!onStocksLoading">
                <HomeTopsTable icon="📈" table-title="Ações em Alta" redirect-to="/stocks"
                    :stocks="stocksCurrencyStore.homeStockCurrencies" />
            </li>
            <HomeTopsTableSkeleton v-else type="stocks" />
            <li v-if="!onNewsLoading">
                <HomeTopsTable icon="📰" table-title="Do nosso Blog" redirect-to="/news"
                    :news="newsStore.news.company.slice(0, 3)" />
            </li>
            <HomeTopsTableSkeleton v-else type="news" />
        </ul>
        <HomeDatasTable />
        <article class="flex flex-col gap-4">
            <p v-translate class="text-text text-xl md:text-2xl text-center xl:text-start">Novo no Mundo Financeiro Digital? <strong class="text-2xl">Comece aqui!</strong></p>
            <ul class="flex flex-wrap gap-8 justify-center">
                <li>
                    <Card class="flex flex-col items-center gap-4 p-7 bg-purple h-[500px] max-w-[400px]">
                        <Image :src="BitcoinNotebook" alt="Hello" width="225" height="225" />
                        <h4 v-translate class="w-full">Conhecendo o Digital</h4>
                        <p v-translate class="text-gray-200 font-semibold leading-5">
                            O NEI Market Analytics oferece uma plataforma abrangente para explorar e entender o mundo dos criptoativos e ações digitais, e ao utilizá-lo, você pode expandir seu conhecimento sobre o ecossistema digital, tomar decisões informadas e aproveitar melhor as oportunidades neste espaço em constante evolução.
                        </p>
                    </Card>
                </li>
                <li>
                    <Card class="flex flex-col items-center gap-4 p-7 bg-medium h-[500px] max-w-[400px]">
                        <Image :src="BitcoinRocket" alt="Hello" width="225" height="225" />
                        <h4 v-translate class="w-full">Começando a Investir</h4>
                        <p v-translate class="text-gray-200 font-semibold leading-5">
                            O NEI Market Analytics oferece ferramentas essenciais para iniciantes em investimentos digitais: Análises simplificadas de criptoativos e ações - Artigos relacionados com o mercado - Nossa I.A integrada para poder te ajudar com o que precisar. Com o NEI, você ganha confiança para dar seus primeiros passos no universo dos investimentos digitais!
                        </p>
                    </Card>
                </li>
                <li>
                    <Card class="flex flex-col items-center gap-4 p-7 bg-primary h-[500px] max-w-[400px]">
                        <Image :src="BitcoinEscudo" alt="Hello" width="225" height="225" />
                        <h4 v-translate class="w-full">Ferramentas NEI Market</h4>
                        <p v-translate class="text-gray-200 font-semibold leading-5">
                            Nossa plataforma oferece: Dados em tempo real sobre criptomoedas e ações digitais - Análise técnica detalhada para tomada de decisões informadas - Conversor de moedas - Visualizações interativas para compreender tendências de mercado - Ranking de criptoativos e ações com maior valorização/desvalorização.
                        </p>
                    </Card>
                </li>
            </ul>
        </article>
    </section>
</template>
