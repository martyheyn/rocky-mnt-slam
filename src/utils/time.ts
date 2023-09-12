export function convertToStandardTime(militaryTime: string) {
	const militaryHours = parseInt(militaryTime.substring(0, 2));
	const militaryMinutes = parseInt(militaryTime.substring(3, 5));

	let standardHours = militaryHours % 12;
	if (standardHours === 0) {
		standardHours = 12;
	}

	const ampm = militaryHours < 12 ? 'AM' : 'PM';

	const standardTime = `${standardHours.toString().padStart(2, '0')}:${militaryMinutes
		.toString()
		.padStart(2, '0')} ${ampm}`;
	return standardTime;
}
