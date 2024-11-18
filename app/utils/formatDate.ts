/**
 * @description Function to format a date to the format YYYY-MM-DD.
 *
 * @param {Date} date - The date to format
 * @returns string
 */
export default function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}
