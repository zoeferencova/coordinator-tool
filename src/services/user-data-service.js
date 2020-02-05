import config from '../config';

const UserDataService = {
    getUserData() {
        return fetch(`${config.API_ENDPOINT}/list`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => res.json())
            
    }

}

export default UserDataService;