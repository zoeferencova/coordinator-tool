import React from 'react';

const AppContext = React.createContext({
    listItems: [],
    pms: [],
    user: {},
    templates: [],
    completedListItems: [],
    data: {},
    dateOptions: {},
    fetchData: () => {},
    deleteItem: () => {},
    addItem: () => {},
    addItemById: () => {},
    updateItem: () => {},
    updateItemStatus: () => {},
    addTemplate: () => {},
    deleteTemplate: () => {},
    updateTemplate: () => {},
    addPm: () => {},
    deletePm: () => {},
    revertCompleted: () => {},
    setInitialState: () => {},
    loading: ''
})

export default AppContext;