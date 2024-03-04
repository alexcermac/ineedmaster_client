export function limitTextSize(text, limit = 10) {
    return text.slice(0, limit) + (text.length > limit ? '...' : '');
}

export function convertStringHourMinutesToDate(hourMinutesAsString) {
    const hourString = hourMinutesAsString.split(':')[0]
    const minutesString = hourMinutesAsString.split(':')[1]
    const hourMinutesAsDate = new Date()
    hourMinutesAsDate.setHours(hourString)
    hourMinutesAsDate.setMinutes(minutesString)

	return hourMinutesAsDate
}

export function convertDateToHourMinutesString(hourMinutesAsDate) {
	const hours = hourMinutesAsDate.getHours()
	const minutes = (hourMinutesAsDate.getMinutes() < 10 ? '0' : '') + hourMinutesAsDate.getMinutes()

	return hours + ":" + minutes
}