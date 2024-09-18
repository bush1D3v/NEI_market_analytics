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
        ]
    },
    {
        title: "Skins CS:GO",
        link: "/skins",
        subContent: null,
    },
];
