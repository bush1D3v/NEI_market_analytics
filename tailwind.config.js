import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const safelist = ["dark"];
export const prefix = "";
export const content = ["./app/**/*.{ts,tsx,vue}"];
export const theme = {
	container: {
		center: true,
		padding: "2rem",
		screens: {
			"2xl": "1400px",
		},
	},
	extend: {
		colors: {
			primaryForeground: "var(--primary-foreground)",
			textForeground: "var(--text-foreground)",
			material: "var(--material)",
			dark: "var(--dark)",
			texture: "var(--texture)",
			positive: "var(--positive)",
			negative: "var(--negative)",
			positiveLighter: "var(--positive-lighter)",
			positiveDarker: "var(--positive-darker)",
			negativeLighter: "var(--negative-lighter)",
			negativeDarker: "var(--negative-darker)",
			fg: "var(--fg)",
			fgDim: "var(--fg-dim)",
			fgMuted: "var(--fg-muted)",
			secondaryDarker: "var(--secondary-darker)",
			surfaceLighter: "var(--surface-lighter)",
			surfaceDarker: "var(--surface-darker)",
			materialLighter: "var(--material-lighter)",
			materialDarker: "var(--material-darker)",
			textureLighter: "var(--texture-lighter)",
			textureDarker: "var(--texture-darker)",
			onPrimary: "var(--on-primary)",
			twitter: "var(--twitter)",
			telegram: "var(--telegram)",
			reddit: "var(--reddit)",
			facebook: "var(--facebook)",
			medium: "var(--medium)",
			github: "var(--github)",
			discord: "var(--discord)",
			linkedin: "var(--linkedin)",
			instagram: "var(--instagram)",
			youtube: "var(--youtube)",
			"primary-lighter": "var(--primary-lighter)",
			"primary-darker": "var(--primary-darker)",
			background: "var(--background)",
			surface: "var(--surface)",
			text: "var(--text)",
			border: "var(--border)",
			input: "var(--input)",
			ring: "var(--ring)",
			foreground: "var(--foreground)",
			primary: {
				DEFAULT: "var(--primary)",
				foreground: "var(--primary-foreground)",
			},
			secondary: {
				DEFAULT: "var(--secondary)",
				foreground: "var(--secondary-foreground)",
			},
			destructive: {
				DEFAULT: "var(--destructive)",
				foreground: "var(--destructive-foreground)",
			},
			muted: {
				DEFAULT: "var(--muted)",
				foreground: "var(--muted-foreground)",
			},
			accent: {
				DEFAULT: "var(--accent)",
				foreground: "var(--accent-foreground)",
			},
			popover: {
				DEFAULT: "var(--popover)",
				foreground: "var(--popover-foreground)",
			},
			card: {
				DEFAULT: "var(--card)",
				foreground: "var(--card-foreground)",
			},
		},
		borderRadius: {
			xl: "calc(var(--radius) + 4px)",
			lg: "var(--radius)",
			md: "calc(var(--radius) - 2px)",
			sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
			"accordion-down": {
				from: {height: 0},
				to: {height: "var(--radix-accordion-content-height)"},
			},
			"accordion-up": {
				from: {height: "var(--radix-accordion-content-height)"},
				to: {height: 0},
			},
			"collapsible-down": {
				from: {height: 0},
				to: {height: "var(--radix-collapsible-content-height)"},
			},
			"collapsible-up": {
				from: {height: "var(--radix-collapsible-content-height)"},
				to: {height: 0},
			},
		},
		animation: {
			"accordion-down": "accordion-down 0.2s ease-out",
			"accordion-up": "accordion-up 0.2s ease-out",
			"collapsible-down": "collapsible-down 0.2s ease-in-out",
			"collapsible-up": "collapsible-up 0.2s ease-in-out",
		},
	},
};
export const plugins = [animate];
