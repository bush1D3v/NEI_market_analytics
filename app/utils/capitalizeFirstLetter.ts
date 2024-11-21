/**
 * @param string - The string to capitalize
 * @returns - The capitalized string
 */
export default function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
