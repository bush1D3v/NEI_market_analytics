import {addons} from "@storybook/manager-api";
import {create} from "@storybook/theming";

addons.setConfig({
	theme: create({
		base: "dark",
		textColor: "white",
		appPreviewBg: "#0f101d",
		brandTitle: "NEI Market Analytics",
		brandUrl: "https://bush1d3v-portfolio.vercel.app/",
		brandImage: "logo.svg",
		brandTarget: "_self",
	}),
});
