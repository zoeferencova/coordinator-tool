import config from '../config';

const PmService = {
    deletePm(id) {
        return fetch(`${config.API_ENDPOINT}/pms/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
    },
    addPm(pm) {
        return fetch(`${config.API_ENDPOINT}/pms`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(pm)
        });
    }
}

export default PmService;