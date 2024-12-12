import {useToast} from "@/components/ui/toast/use-toast";
import {t} from "i18next";

const {toast} = useToast();

export default function useToastNotification(title: string) {
	const language = navigator.language;
	let date = new Date().toLocaleString(language, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});
	date = date.charAt(0).toUpperCase() + date.slice(1);

	toast({
		title: t(title),
		description: date,
	});
}
