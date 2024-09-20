import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import AboutUs from "@/views/AboutUs.vue";
import NotFound from "@/views/NotFound.vue";
import Coins from "@/views/Coins.vue";
import Cryptos from "@/views/Cryptos.vue";
import CryptoDetail from "@/views/CryptoDetail.vue";
import CoinDetail from "@/views/CoinDetail.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home,
			meta: {
				title: "Home | NEI Market Analytics",
				description:
					"Welcome to NEI Market Analytics, your source for comprehensive market analysis.",
				keywords: "market analysis, business insights, NEI Market Analytics",
				robots: "index, follow",
				ogTitle: "Home | NEI Market Analytics",
				ogDescription:
					"Welcome to NEI Market Analytics, your source for comprehensive market analysis.",
				ogImage: "/logo.svg",
				ogUrl: "http://localhost:5173/",
			},
		},
		{
			path: "/about-us",
			name: "About Us",
			component: AboutUs,
			meta: {
				title: "Sobre Nós | NEI Market Analytics",
				description: "Learn more about NEI Market Analytics and our mission.",
				keywords: "about us, NEI Market Analytics, company information",
				robots: "index, follow",
				ogTitle: "Sobre Nós | NEI Market Analytics",
				ogDescription: "Learn more about NEI Market Analytics and our mission.",
				ogImage: "/logo.svg",
				ogUrl: "http://localhost:5173/about-u",
			},
		},
		{
			path: "/coins",
			name: "Coins",
			component: Coins,
			meta: {
				title: "Coins | NEI Market Analytics",
				description: "Explore our comprehensive list of digital assets.",
				keywords: "coins, digital assets, NEI Market Analytics",
				robots: "index, follow",
				ogTitle: "Coins | NEI Market Analytics",
				ogDescription: "Explore our comprehensive list of digital assets.",
				ogImage: "/logo.svg",
				ogUrl: "http://localhost:5173/coins",
			},
		},
		{
			path: "/coins/:coin",
			name: "CoinDetail",
			component: CoinDetail,
			meta: {
				description: "Explore our comprehensive list of digital assets.",
				keywords: "coins, digital assets, NEI Market Analytics",
				robots: "index, follow",
				ogTitle: "Coins | NEI Market Analytics",
				ogDescription: "Explore our comprehensive list of digital assets.",
				ogImage: "/logo.svg",
				ogUrl: "http://localhost:5173/coins/:coin",
			},
			props: (route) => ({key: route.params.coin}),
		},
		{
			path: "/cryptos",
			name: "Cryptos",
			component: Cryptos,
			meta: {
				title: "Crypto | NEI Market Analytics",
				description: "Explore our comprehensive list of crypto assets.",
				keywords: "crypto, crypto assets, NEI Market Analytics",
				robots: "index, follow",
				ogTitle: "Crypto | NEI Market Analytics",
				ogDescription: "Explore our comprehensive list of crypto assets.",
				ogImage: "/logo.svg",
				ogUrl: "http://localhost:5173/cryptos",
			},
		},
		{
			path: "/cryptos/:crypto",
			name: "CryptoDetail",
			component: CryptoDetail,
			meta: {
				description: "Explore our comprehensive crypto.",
				keywords: "crypto, crypto assets, NEI Market Analytics",
				robots: "index, follow",
				ogTitle: "Crypto | NEI Market Analytics",
				ogDescription: "Explore our comprehensive crypto.",
				ogImage: "/logo.svg",
				ogUrl: "http://localhost:5173/cryptos/:crypto",
			},
			props: (route) => ({key: route.params.crypto}),
		},
		{
			path: "/:pathMatch(.*)*",
			name: "Not Found",
			component: NotFound,
			meta: {
				title: "404 | NEI Market Analytics",
				description: "Page not found",
				keywords: "404, page not found, NEI Market Analytics",
				robots: "noindex, nofollow",
				ogTitle: "404 | NEI Market Analytics",
				ogDescription: "Page not found",
				ogImage: "/logo.svg",
				ogUrl: "http://localhost:5173/",
			},
		},
	],
});

router.beforeEach((to, _from, next) => {
	document.title = (to.meta.title as string) || "NEI Market Analytics";

	const metaTags = [
		{name: "description", content: to.meta.description as string},
		{name: "keywords", content: to.meta.keywords as string},
		{name: "robots", content: to.meta.robots as string},
		{property: "og:title", content: to.meta.ogTitle as string},
		{property: "og:description", content: to.meta.ogDescription as string},
		{property: "og:image", content: to.meta.ogImage as string},
		{property: "og:url", content: to.meta.ogUrl as string},
	];

	for (const tag of metaTags) {
		const key = tag.name ? "name" : "property";
		const value = tag.name || tag.property;
		if (!value) continue;

		let element = document.querySelector(`meta[${key}="${value}"]`);
		if (element) {
			element.setAttribute("content", tag.content);
		} else {
			element = document.createElement("meta");
			element.setAttribute(key, value);
			element.setAttribute("content", tag.content);
			document.head.appendChild(element);
		}
	}

	next();
});

export default router;
