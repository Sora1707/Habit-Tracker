export function getDateString(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}/${month < 10 ? "0" : ""}${month}/${
        day < 10 ? "0" : ""
    }${day}`;
    return dateString;
}
