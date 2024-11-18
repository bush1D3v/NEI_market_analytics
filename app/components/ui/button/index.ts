import {type VariantProps, cva} from "class-variance-authority";

export {default as Button} from "./Button.vue";

export const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow hover:bg-buttonBg duration-300",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-buttonBg duration-300",
				outline:
					"border bg-background shadow-sm hover:bg-buttonBg hover:text-textForeground duration-300",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-buttonBg duration-300",
				ghost: "hover:bg-buttonBg hover:text-textForeground duration-300",
				link: "text-primary underline-offset-4 hover:underline duration-300",
			},
			size: {
				default: "h-9 px-4 py-2",
				xs: "h-7 rounded px-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
