class FrontGenericFunctions {
    static toDefineCookie(chave, valor) {
        document.cookie = `${chave}=${valor};path=/`
    };

    static getCookie(chave) {
        return document.cookie.split('; ').find((cookie) => cookie.startsWith(`${chave}=`))?.split('=')[1];
    };

    static cleanCookie(chave) {
        document.cookie = `${chave}=; expires=Thu, 01 Jan 1970 00:00:00`;
    };
}

export { FrontGenericFunctions };