interface IExploreDto {
	emoji: string;
	title: string;
	href: string;
}

export const ExploreDto: IExploreDto[] = [
	{
		emoji: "🪙",
		title: "Cripto moedas",
		href: "/cryptos",
	},
	{
		emoji: "📊",
		title: "Ações",
		href: "/stocks",
	},
	{
		emoji: "📰",
		title: "Notícias",
		href: "/news",
	},
	// TODO: top moedas
	// {
	//     emoji: '🔥',
	//     title: 'Top Moedas',
	//     href: '/cryptos?sort=percent_change_24h'
	// },
	// TODO: top ações
	// {
	//     emoji: '📈',
	//     title: 'Top Ações',
	//     href: '/stocks?sortBy=change&sortOrder=desc'
	// }
];

import {LoopIcon} from "@radix-icons/vue";
import type {FunctionalComponent, HTMLAttributes, VNodeProps} from "vue";

interface IToolsDto {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}, any, {}>;
	title: string;
	href: string;
}

export const ToolsDto: IToolsDto[] = [
	{
		icon: LoopIcon,
		title: "Conversor de moedas",
		href: "/currency-converter",
	},
];

import {CookieIcon, GithubLogoIcon, LockClosedIcon, InfoCircledIcon} from "@radix-icons/vue";

interface IInfoDto {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}, any, {}>;
	title: string;
	href: string;
}

export const InfoDto: IInfoDto[] = [
	{
		icon: InfoCircledIcon,
		title: "Sobre Nós",
		href: "/about-us",
	},
	{
		icon: LockClosedIcon,
		title: "Política de Privacidade",
		href: "/privacy-policy",
	},
	{
		icon: CookieIcon,
		title: "Política de Cookies",
		href: "/cookie-policy",
	},
	{
		icon: GithubLogoIcon,
		title: "Ver no GitHub",
		href: "https://github.com/bush1D3v/NEI_market_analytics/tree/dev",
	},
	// TODO: feedback
	// {
	//     icon: LoopIcon,
	//     title: 'Enviar feedback',
	//     href: '/'
	// },
];
