import type {Menu} from "../Dropdown.vue";
import Ethereum from "@/assets/images/ethereum.png";
import Bitcoin from "@/assets/images/bitcoin.png";
import Dogecoin from "@/assets/images/dogecoin.png";
import Dollar from "@/assets/images/dollar.png";
import Euro from "@/assets/images/euro.png";
import Real from "@/assets/images/real.png";

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
		emoji: "&#128181;",
		title: "Moedas globais",
		link: "/coins",
		subContent: [
			{
				title: "Dollar",
				link: "/coins/dollar",
				logo: Dollar,
			},
			{
				title: "Real",
				link: "/coins/real",
				logo: Real,
			},
			{
				title: "Euro",
				link: "/coins/euro",
				logo: Euro,
			},
		],
	},
	// {
	//     emoji: "&#128299;",
	//     title: "Skins CS2",
	//     link: "/skins",
	//     subContent: [
	//         {
	//             title: "Dragon Lore",
	//             link: "/skins?skin=dragon-lore",
	//             logo: "csgo",
	//         },
	//         {
	//             title: "Butterfly",
	//             link: "/skins?skin=butterfly",
	//             logo: "csgo",
	//         },
	//         {
	//             title: "Ak blue-gem",
	//             link: "/skins?skin=ak-blue-gem",
	//             logo: "csgo",
	//         },
	//     ],
	// },
];
