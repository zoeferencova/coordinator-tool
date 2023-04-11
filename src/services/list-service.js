import config from '../config';

const ListService = {
    searchItems(inputItems, query) {
        let items;
        if (query !== '') {
            items = inputItems.filter(listItem => listItem.props.item.contact.toLowerCase().includes(query) || listItem.props.item.project.toLowerCase().includes(query))
        } else if (query === '') {
            items = inputItems
        }
        return items;
    },
    sortItems(inputItems, sort) {
        const ASC = 'ascending';
        const DSC = 'descending';

        const sortByContact = (a, b, order = ASC) => {
            console.log(inputItems)
            const diff = a.props.item.contact.toLowerCase().localeCompare(b.props.item.contact.toLowerCase());
            return order === ASC ? diff : -1 * diff
        }
        const sortByProject = (a, b, order = ASC) => {
            const diff = a.props.item.project.toLowerCase().localeCompare(b.props.item.project.toLowerCase());
            return order === ASC ? diff : -1 * diff
        }
        const sortByPM = (a, b, order = ASC) => {
            const diff = a.props.item.pm_name.toLowerCase().localeCompare(b.props.item.pm_name.toLowerCase());
            return order === ASC ? diff : -1 * diff
        }
        const sortByDate = (a, b, order = ASC) => {
            const diff = new Date(a.props.item.unformatted_date) - new Date(b.props.item.unformatted_date);
            return order === ASC ? diff : -1 * diff
        };
        const sortByStatus = (a, b, order = ASC) => {
            const diff = a.props.item.status.toLowerCase().localeCompare(b.props.item.status.toLowerCase());
            return order === ASC ? diff : -1 * diff
        }

        if (sort === 'contact-asc') {
            return inputItems.sort((a, b) => sortByContact(a, b, ASC))
        } else if (sort === 'contact-desc') {
            return inputItems.sort((a, b) => sortByContact(a, b, DSC))
        } else if (sort === 'project-asc') {
            return inputItems.sort((a, b) => sortByProject(a, b, ASC))
        } else if (sort === 'project-desc') {
            return inputItems.sort((a, b) => sortByProject(a, b, DSC))
        } else if (sort === 'pm-asc') {
            return inputItems.sort((a, b) => sortByPM(a, b, ASC))
        } else if (sort === 'pm-desc') {
            return inputItems.sort((a, b) => sortByPM(a, b, DSC))
        } else if (sort === 'date-asc') {
            return inputItems.sort((a, b) => sortByDate(a, b, ASC))
        } else if (sort === 'date-desc') {
            return inputItems.sort((a, b) => sortByDate(a, b, DSC))
        } else if (sort === 'status-asc') {
            return inputItems.sort((a, b) => sortByStatus(a, b, ASC))
        } else if (sort === 'status-desc') {
            return inputItems.sort((a, b) => sortByStatus(a, b, DSC))
        }
    },
    updateDateCompleted(id, date, contact, project, pmId) {
        fetch(`${config.API_ENDPOINT}/list/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify({ date_completed: new Date(date), contact, project, pm_id: pmId })
        })
    },
    updateItemStatus(id, status, project, contact, pmId) {
        return fetch(`${config.API_ENDPOINT}/list/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify({ status, project, contact, pm_id: pmId })
        })
    },
    deleteItem(id) {
        fetch(`${config.API_ENDPOINT}/list/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
    },
    addItem(item) {
        return fetch(`${config.API_ENDPOINT}/list`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(item)
        })
    },
    updateItem(updateValues, id) {
        return fetch(`${config.API_ENDPOINT}/list/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(updateValues)
        })
    }
}

export default ListService;