export function getDateString(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateString = `${year}/${month < 10 ? "0" : ""}${month}/${
        day < 10 ? "0" : ""
    }${day}`;
    return dateString;
}
