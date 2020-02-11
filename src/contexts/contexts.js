import React from 'react';

const AppContext = React.createContext({
    listItems: [],
    pms: [],
    user: {},
    templates: [],
    completedListItems: [],
    dateOptions: {},
    deleteItem: () => {},
    addItem: () => {},
    updateItem: () => {},
    updateItemStatus: () => {},
    addTemplate: () => {},
    deleteTemplate: () => {},
    updateTemplate: () => {},
    revertCompleted: () => {},
    setListItems: () => {},
    setCompletedItems: () => {},
    setPms: () => {},
    setTemplates: () => {},
    setUser: () => {},
    setInitialState: () => {},
})

export default AppContext;