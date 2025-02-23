import { CookieParams } from './types';

/**
 * Сохранение данных в куки
 * @param name
 * @param value
 * @param param
 */
export function setCookie(
    name: string,
    value: string,
    param: CookieParams = {}
): void {
    console.log('setCookie');

    let exp = param.expires;
    console.log('exp', exp);

    // Обработка срока действия куки (expires)
    if (typeof exp === 'number' && exp) {
        console.log('N');

        const d = new Date();
        // TODO ? Срок жизни токена accessToken — 20 минут.
        d.setTime(d.getTime() + exp * 1000);
        exp = param.expires = d;
    }

    // Преобразование даты в строку UTC, если expires является объектом Date
    if (exp && typeof exp.toUTCString === 'function') {
        console.log('D');

        param.expires = exp.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = `${name}=${value}`;

    for (const paramName in param) {
        updatedCookie += `; ${paramName}`;
        const propValue = param[paramName];

        if (propValue !== true) {
            updatedCookie += `=${propValue}`;
        }
    }

    document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)'
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
    setCookie(name, '', {
        'max-age': '',
    });
}
