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
            }
        ],
    },
    {
        title: "Moedas globais",
        link: "/moedas",
        subContent: null,
    },
    {
        title: "Skins CS:GO",
        link: "/skins",
        subContent: null,
    },
];
