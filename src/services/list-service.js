const ListService = {
    searchItems(inputItems, query) {
        let items;
        if (query !== '') {
            items = inputItems.filter(item => item.props.contact.toLowerCase().includes(query) || item.props.project.toLowerCase().includes(query))
        } else if (query === '') {
            items = inputItems
        }
        return items;
    },
    sortItems(inputItems, sort) {
        const ASC = 'ascending';
        const DSC = 'descending';

        const sortByContact = (a, b, order=ASC) => {
            const diff = a.props.contact.toLowerCase().localeCompare(b.props.contact.toLowerCase());
            return order === ASC ? diff : -1 * diff
        } 
        const sortByProject = (a, b, order=ASC) => {
            const diff = a.props.project.toLowerCase().localeCompare(b.props.project.toLowerCase());
            return order === ASC ? diff : -1 * diff
        }
        const sortByPM = (a, b, order=ASC) => {
            const diff = a.props.pm_name.toLowerCase().localeCompare(b.props.pm_name.toLowerCase());
            return order === ASC ? diff : -1 * diff
        } 
        const sortByDate = (a, b, order=ASC) => {
            const diff = new Date(a.props.unformatted_date) - new Date(b.props.unformatted_date);
            return order === ASC ? diff : -1 * diff
        };
        const sortByStatus = (a, b, order=ASC) => {
            const diff = a.props.status.toLowerCase().localeCompare(b.props.status.toLowerCase());
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
    }
}

export default ListService;