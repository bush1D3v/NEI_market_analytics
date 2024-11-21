export default function transformDate(date: number): string {
	const locale = navigator.language;
	return new Date(date * 1000).toLocaleDateString(locale, {day: "numeric", month: "short"});
}
