import jwtDecode from 'jwt-decode';
import config from '../config';

const TokenService = {
    saveAuthToken(token) {
        window.sessionStorage.setItem(config.TOKEN_KEY, token)
    },
    getAuthToken() {
        return window.sessionStorage.getItem(config.TOKEN_KEY)
    },
    clearAuthToken() {
        console.info('clearing the auth token')
        window.sessionStorage.removeItem(config.TOKEN_KEY)
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    },
    makeBasicAuthToken(email, password) {
        return window.btoa(`${email}:${password}`)
    },
    parseJwt(jwt) {
        return jwtDecode(jwt)
    },
    readJwtToken() {
        return TokenService.parseJwt(TokenService.getAuthToken())
    },
}

export default TokenService;