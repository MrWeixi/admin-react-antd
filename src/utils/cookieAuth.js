import Cookies from 'js-cookie';

const Token = 'Token';

export function getToken() {
    return Cookies.get(Token);
}
export function setToken(tokenKey) {
    return Cookies.set(Token, tokenKey)
}
export function removeToken() {
    return Cookies.remove(Token)
}