import type {Menu} from "@/components/Dropdown.vue";
import Ethereum from "@/assets/images/ethereum.png";
import Bitcoin from "@/assets/images/bitcoin.png";
import Dogecoin from "@/assets/images/dogecoin.png";

export const DropdownDto: Menu[] = [
	{
		emoji: "&#129689;",
		title: "Cripto moedas",
		link: "/cryptos",
		subContent: [
			{
				title: "Bitcoin",
				link: "/cryptos?coin=bitcoin",
				logo: Bitcoin,
			},
			{
				title: "Ethereum",
				link: "/cryptos?coin=ethereum",
				logo: Ethereum,
			},
			{
				title: "Dogecoin",
				link: "/cryptos?coin=dogecoin",
				logo: Dogecoin,
			},
		],
	},
	{
		emoji: "&#128181;",
		title: "Moedas globais",
		link: "/coins",
		subContent: null,
	},
];
