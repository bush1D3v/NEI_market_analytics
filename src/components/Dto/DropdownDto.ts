import type { Menu } from "../Dropdown.vue";

export const DropdownDto: Menu[] = [
    {
        title: "Cripto moedas",
        link: "/criptos",
        subContent: [
            {
                title: "Bitcoin",
                link: "/criptos?coin=bitcoin",
                icon: "bitcoin",
            },
            {
                title: "Ethereum",
                link: "/criptos?coin=ethereum",
                icon: "ethereum",
            },
            {
                title: "Dogecoin",
                link: "/criptos?coin=dogecoin",
                icon: "dogecoin",
            },
        ],
    },
    {
        title: "Moedas globais",
        link: "/coins",
        subContent: [
            {
                title: "Dollar",
                link: "/coins?coin=dollar",
                icon: "dollar",
            },
            {
                title: "Euro",
                link: "/coins?coin=euro",
                icon: "Euro",
            },
            {
                title: "Real",
                link: "/coins?coin=real",
                icon: "real",
            },
        ]
    },
    {
        title: "Skins CS2",
        link: "/skins",
        subContent: [
            {
                title: "Dragon Lore",
                link: "/skins?skin=dragon-lore",
                icon: "csgo",
            },
            {
                title: "Butterfly",
                link: "/skins?skin=butterfly",
                icon: "csgo",
            },
            {
                title: "Ak blue-gem",
                link: "/skins?skin=ak-blue-gem",
                icon: "csgo",
            }
        ]
    },
];
