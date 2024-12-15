export default function numberFormatter(num: number): string {
	if (num >= 1e12) {
		return `${(num / 1e12).toFixed(2)}T`;
	}
	if (num >= 1e9) {
		return `${(num / 1e9).toFixed(2)}B`;
	}
	if (num >= 1e6) {
		return `${(num / 1e6).toFixed(2)}M`;
	}
	if (num >= 1e3) {
		return `${(num / 1e3).toFixed(2)}K`;
	}
	let numStr = num.toString();
	const index = numStr.indexOf(".");
	if (index > 0) {
		const nonZeroIndex = numStr.substring(index).search(/[1-9]/) + index;
		if (nonZeroIndex > index) {
			numStr = numStr.substring(0, nonZeroIndex + 2);
		}
	}
	return numStr;
}
