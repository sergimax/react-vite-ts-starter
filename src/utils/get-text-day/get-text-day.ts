/**
 * Расчет текстового представления даты c учетом количества прошедших дней
 * @param isoDate Дата в виде строки ISO формата (2025-03-17T22:17:20.007Z)
 * @returns
 */
export function getTextDay(isoDate: string): string {
    const now: Date = new Date();
    const date: Date = new Date(isoDate);
    const time: string = date.toLocaleTimeString('ru').slice(0, -3);

    const dateWithoutTime: Date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );
    const nowWithoutTime: Date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
    );

    const timeDifference: number =
        nowWithoutTime.getTime() - dateWithoutTime.getTime();
    const daysDifference: number = Math.floor(
        timeDifference / (1_000 * 60 * 60 * 24),
    );

    const daysDifferenceText: string = [2, 3, 4].includes(daysDifference % 10)
        ? 'дня'
        : 'дней';

    if (daysDifference === 0) {
        return `Сегодня, ${time}`;
    } else if (daysDifference === 1) {
        return `Вчера, ${time}`;
    }

    return `${daysDifference} ${daysDifferenceText} назад, ${time}`;
}
