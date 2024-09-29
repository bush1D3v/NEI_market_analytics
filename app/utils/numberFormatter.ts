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
    let fixed = 2;
    let numStr = num.toFixed(fixed);

    while (numStr.endsWith('0') && fixed < 20) {
        fixed++;
        numStr = num.toFixed(fixed);
    }

    return numStr;
}
