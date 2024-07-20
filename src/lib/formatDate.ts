export function formatDate(date: Date, locale: string = 'en-US') {
    return new Intl.DateTimeFormat(locale, { day:'numeric', month:'short'}).format(date);
}