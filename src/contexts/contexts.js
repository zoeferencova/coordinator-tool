import React from 'react';

const AppContext = React.createContext({
    listItems: [],
    pms: [],
    user: {},
    templates: [],
    completedListItems: [],
    dateOptions: {},
})

export default AppContext;