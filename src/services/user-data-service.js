import config from '../config';

const UserDataService = {
    async getUserData() {
        const res = await fetch(`${config.API_ENDPOINT}/user-data`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        });
        return await (
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json());
    }
}

export default UserDataService;