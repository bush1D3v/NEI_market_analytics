import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import AboutUs from "@/views/AboutUs.vue";

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
				ogUrl: "http://localhost:5173/aboutus",
			},
		},
	],
});

router.beforeEach((to, from, next) => {
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
