const weekdays = [
    "Monday",
    "Tuseday",
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

export function getDateString(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}/${month < 10 ? "0" : ""}${month}/${
        day < 10 ? "0" : ""
    }${day}`;
    return dateString;
}

export function getFormattedDateString(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = date.getDay();
    const dateString = `${weekdays[weekday]} ${months[month]} ${day} ${year}`;
    return dateString;
}
