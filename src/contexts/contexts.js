import React from 'react';

const AppContext = React.createContext({
    listItems: [],
    pms: [],
    user: {},
    templates: [],
    completedListItems: [],
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
    setListItems: () => {},
    setCompletedItems: () => {},
    setPms: () => {},
    setTemplates: () => {},
    setUser: () => {},
    setInitialState: () => {},
})

export default AppContext;