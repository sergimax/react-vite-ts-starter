/**
 * Расчет текстового представления даты c учетом количества прошедших дней
 * @param isoDate Дата в виде строки ISO формата (2025-03-17T22:17:20.007Z)
 * @returns
 */
export function getTextDay(isoDate: string): string {
    const now = new Date();
    const date = new Date(isoDate);
    const time = date.toLocaleTimeString('ru').slice(0, -3);

    const dateWithoutTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );
    const nowWithoutTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
    );

    const timeDifference = nowWithoutTime.getTime() - dateWithoutTime.getTime();
    const daysDifference = Math.floor(timeDifference / (1_000 * 60 * 60 * 24));

    if (daysDifference === 0) {
        return `Сегодня, ${time}`;
    } else if (daysDifference === 1) {
        return `Вчера, ${time}`;
    } else {
        return `${daysDifference} дня назад, ${time}`;
    }
}
