// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class RoutesEnum {
	private static settings = "configurações";
	private static graphs = "gráficos";
	private static reminderCreate = "criar";
	private static home = "página inicial";
	private static reminder = "seus lembretes";

	private static angry = "raiva";
	private static sad = "tristeza";
	private static envy = "inveja";
	private static disgust = "nojinho";
	private static happiness = "alegria";
	private static fear = "medo";
	private static shame = "vergonha";
	private static boredom = "tédio";
	private static anxiety = "ansiedade";

	private static TextExhibitionList = {
		[RoutesEnum.settings]: "Configurações",
		[RoutesEnum.reminder]: "Seus Lembretes",
		[RoutesEnum.graphs]: "Gráficos",
		[RoutesEnum.home]: "Página inicial",
		[RoutesEnum.reminderCreate]: "Criar",
		[RoutesEnum.angry]: "Raiva",
		[RoutesEnum.sad]: "Tristeza",
		[RoutesEnum.envy]: "Inveja",
		[RoutesEnum.disgust]: "Nojinho",
		[RoutesEnum.happiness]: "Alegria",
		[RoutesEnum.fear]: "Medo",
		[RoutesEnum.shame]: "Vergonha",
		[RoutesEnum.boredom]: "Tédio",
		[RoutesEnum.anxiety]: "Ansiedade",
	};

	public static findClosestTextMatch(input: string): string | undefined {
		let closestMatch = undefined;
		let closestMatchLength = Number.POSITIVE_INFINITY;
		let highestSimilarityScore = -1;

		if (input === "" || input === undefined || input === null) {
			return "";
		}

		for (const text of Object.values(RoutesEnum.TextExhibitionList)) {
			const lowerCaseText = text.toLowerCase();
			const lowerCaseInput = input.toLowerCase();

			let similarityScore = 0;
			let searchPosition = 0;
			for (const char of lowerCaseInput) {
				const foundPosition = lowerCaseText.indexOf(char, searchPosition);
				if (foundPosition !== -1) {
					similarityScore++;
					searchPosition = foundPosition + 1;
				} else {
					break;
				}
			}

			const lengthDifference = Math.abs(input.length - text.length);
			if (
				similarityScore > highestSimilarityScore ||
				(similarityScore === highestSimilarityScore &&
					lengthDifference < closestMatchLength)
			) {
				closestMatch = text;
				closestMatchLength = lengthDifference;
				highestSimilarityScore = similarityScore;
			}
		}

		return closestMatch;
	}

	private static graphsMatch = "Gráficos";
	private static homeMatch = "Página inicial";
	private static reminderCreateMatch = "Criar";
	private static reminderMatch = "Seus Lembretes";
	private static settingsMatch = "Configurações";
	private static angryMatch = "Raiva";
	private static sadMatch = "Tristeza";
	private static envyMatch = "Inveja";
	private static disgustMatch = "Nojinho";
	private static happinessMatch = "Alegria";
	private static fearMatch = "Medo";
	private static shameMatch = "Vergonha";
	private static boredomMatch = "Tédio";
	private static anxietyMatch = "Ansiedade";

	private static RouteTypeList = {
		[RoutesEnum.graphsMatch]: "/graphs",
		[RoutesEnum.homeMatch]: "/",
		[RoutesEnum.reminderCreateMatch]: "/reminders/create",
		[RoutesEnum.reminderMatch]: "/reminders",
		[RoutesEnum.settingsMatch]: "/settings",
		[RoutesEnum.angryMatch]: "/reminders/angry?page=1",
		[RoutesEnum.sadMatch]: "/reminders/sad?page=1",
		[RoutesEnum.envyMatch]: "/reminders/envy?page=1",
		[RoutesEnum.disgustMatch]: "/reminders/disgust?page=1",
		[RoutesEnum.happinessMatch]: "/reminders/happiness?page=1",
		[RoutesEnum.fearMatch]: "/reminders/fear?page=1",
		[RoutesEnum.shameMatch]: "/reminders/shame?page=1",
		[RoutesEnum.boredomMatch]: "/reminders/boredom?page=1",
		[RoutesEnum.anxietyMatch]: "/reminders/anxiety?page=1",
	};

	public static findClosestRouteMatch(input: string): string {
		const closestTextMatch = RoutesEnum.findClosestTextMatch(input);

		return RoutesEnum.RouteTypeList[closestTextMatch as string];
	}
}
