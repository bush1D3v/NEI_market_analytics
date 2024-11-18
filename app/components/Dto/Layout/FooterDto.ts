import {
	HomeIcon,
	DotsHorizontalIcon,
	BackpackIcon,
	StitchesLogoIcon,
	IdCardIcon,
} from "@radix-icons/vue";
import type {FunctionalComponent, HTMLAttributes, VNodeProps} from "vue";

interface FooterDto {
	title: string;
	path: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}, any, {}>;
}

export const FooterDto: FooterDto[] = [
	{
		title: "Explorar",
		path: "/",
		icon: HomeIcon,
	},
	{
		title: "Notícias",
		path: "/news",
		icon: IdCardIcon,
	},
	{
		title: "Ações",
		path: "/stocks",
		icon: BackpackIcon,
	},
	{
		title: "Cripto",
		path: "/cryptos",
		icon: StitchesLogoIcon,
	},
	{
		title: "Mais",
		path: "/more",
		icon: DotsHorizontalIcon,
	},
];
