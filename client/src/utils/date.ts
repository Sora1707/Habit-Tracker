const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export function getShortWeekdayString(index: number) {
    return weekdays[index].slice(0, 3);
}

export function getDateString(
    year: number | string,
    month: number | string,
    day: number | string
) {
    if (typeof year === "string") year = parseInt(year);
    if (typeof month === "string") month = parseInt(month);
    if (typeof day === "string") day = parseInt(day);
    const dateString = `${year}/${month < 10 ? "0" : ""}${month}/${
        day < 10 ? "0" : ""
    }${day}`;
    return dateString;
}

export function getDateStringByDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return getDateString(year, month, day);
}

export function getFormattedDateString(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = date.getDay();
    const dateString = `${weekdays[weekday]}, ${months[month]} ${day} ${year}`;
    return dateString;
}

export function getDateBeforeAfter(date: Date, value: number) {
    const targetDate = new Date(date);
    targetDate.setDate(date.getDate() + value);

    return targetDate;
}

export function getWeekDates(date: Date) {
    let weekday = date.getDay();
    if (weekday === 0) weekday = 7;
    const weekDates: Date[] = new Array(7);
    // Monday -> Saturday: 1 -> 6
    for (let i = 0; i < 7; ++i) {
        weekDates[i] = getDateBeforeAfter(date, i + 1 - weekday);
    }
    return weekDates;
}
