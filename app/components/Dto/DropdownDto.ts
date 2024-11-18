import type {Menu} from "../Dropdown.vue";
import Ethereum from "@/assets/images/ethereum.png";
import Bitcoin from "@/assets/images/bitcoin.png";
import Dogecoin from "@/assets/images/dogecoin.png";
import Vale from "@/assets/images/logo-vale.jpg";
import Wege from "@/assets/images/logo-wege.png";
import Petrobras from "@/assets/images/logo-petra.jpg";
export const DropdownDto: Menu[] = [
	{
		emoji: "&#129689;",
		title: "Cripto moedas",
		link: "/cryptos",
		subContent: [
			{
				title: "Bitcoin",
				link: "/cryptos/bitcoin",
				logo: Bitcoin,
			},
			{
				title: "Ethereum",
				link: "/cryptos/ethereum",
				logo: Ethereum,
			},
			{
				title: "Dogecoin",
				link: "/cryptos/dogecoin",
				logo: Dogecoin,
			},
		],
	},
	{
		emoji: "&#128203;",
		title: "Bolsa de Valores",
		link: "/stocks",
		subContent: [
			{
				title: "Petrobras",
				link: "/stocks/petrobras",
				logo: Petrobras,
			},
			{
				title: "Vale",
				link: "/stocks/vale",
				logo: Vale,
			},
			{
				title: "Weg",
				link: "/stocks/weg",
				logo: Wege,
			},
		],
	},
];
