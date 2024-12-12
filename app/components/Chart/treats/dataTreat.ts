import type {ChartData} from "../types/ChartData";

export default function dataTreat(data: ChartData[]) {
	return data.map((item) => {
		const mappedData: {[key: string]: string | number} = {};
		item.dynamicParams.forEach((param, index) => {
			mappedData[param] = item.chartData[index];
		});
		return {
			name: item.name,
			...mappedData,
		};
	});
}
