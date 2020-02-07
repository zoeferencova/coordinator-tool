import config from '../config';

const UserDataService = {
    getListItems() { 
        fetch(`${config.API_ENDPOINT}/list`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => res.json())      
    },
    getTemplates() {
        fetch(`${config.API_ENDPOINT}/templates`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => res.json())
    },
    getPms() {
        fetch(`${config.API_ENDPOINT}/pms`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
    }

}

export default UserDataService;