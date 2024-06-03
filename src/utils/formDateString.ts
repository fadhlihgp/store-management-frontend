export const formatDateString = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().substring(0, 10);
};

export const formatStringToDate = (dateString: string) => {
    const data = new Date(dateString);
    return data;
}