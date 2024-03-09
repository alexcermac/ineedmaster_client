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

export function checkStringIsNumber(text) {
    var floatPattern = /^[+-]?(?:\d*\.)?\d+(?:[eE][+-]?\d+)?$/
    return floatPattern.test(text)
}

export function convertStringToNumber(text) {
    text = text.trim(); // remove leading and trailing whitespaces

    // remove leading zeros
    while (text.startsWith('0')) {
        text = text.substr(1)
    }

    var number = parseFloat(text)
    return number
}