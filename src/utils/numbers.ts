export function addLeadingZero(number: string | number) {
	if (String(number).length > 1) {
		return String(number);
	}

	return String(number).padStart(2, "0");
}
