const data = {
    listItems : [
        {
            id: 1,
            status: 'reached',
            project: 'Fake Project',
            advisor: 'Zoe Ferencova',
            pm: 1,
            date: new Date().toLocaleDateString(),
            notes: 'Lorem ipsum'
        },
        {
            id: 2,
            status: 'reached',
            project: 'Dummy Project',
            advisor: 'James Park',
            pm: 2,
            date: new Date().toLocaleDateString(),
            notes: 'Dolor sit amet'
        },
        {
            id: 3,
            status: 'none',
            project: 'Super Fake Project',
            advisor: 'Robin Hurst',
            pm: 3,
            date: new Date().toLocaleDateString(),
            notes: 'Consectetur adipiscing'
        },
        {
            id: 7,
            status: 'none',
            project: 'Fake Project',
            advisor: 'Robin Hurst',
            pm: 3,
            date: new Date().toLocaleDateString(),
            notes: 'Consectetur adipiscing'
        },
        {
            id: 4,
            status: 'none',
            project: 'Super Fake Project',
            advisor: 'Sara Waldman',
            pm: 3,
            date: new Date().toLocaleDateString(),
            notes: 'Consectetur adipiscing'
        },
        {
            id: 6,
            status: 'none',
            project: 'Another Fake Project with a Super Long Title',
            advisor: 'Daniela Narvaez',
            pm: 1,
            date: new Date().toLocaleDateString(),
            notes: 'Consectetur adipiscing'
        },
    ],
    pms: [
        {
            id: 1,
            name: 'James Park',
            email: 'jamespark@gmail.com'
        },
        {
            id: 2,
            name: 'Robin Hurst',
            email: 'robinhurst@gmail.com'
        },
        {
            id: 3,
            name: 'Petr Ferenc',
            email: 'pferi@gmail.com'
        },
    ],
    user: {
        name: 'Zoe Ferencova',
        email: 'zoeferencova@gmail.com'
    },
    templates: [
        {
            id: 1,
            template_name: 'Availability',
            template_subject: 'Availability for Call',
            template_body: 'Hi [ADVISOR],\n\nI am working with my colleague [PM] to arrange the new consultation on [PROJECT]. My client was hoping to schedule the call for this week. Could you please let me know what time windows work for you?\n\nThank you\n\nBest,\nZoe'
        },
        {
            id: 2,
            template_name: 'Template Name',
            template_subject: 'Hello There!',
            template_body: 'To whom this \n may concern, Blah blah blah'
        },
        {
            id: 3,
            template_name: 'Template Name',
            template_subject: 'Hello &#013; There!',
            template_body: 'To whom this may concern, Blah blah blah'
        },
    ],
    completedListItems: [
        {
            id: 1,
            status: 'completed',
            project: 'Fake Project',
            advisor: 'Zoe Ferencova',
            pm: 1,
            date: new Date().toLocaleDateString(),
            notes: 'Note',
        },
        {
            id: 2,
            status: 'completed',
            project: 'Dummy Project',
            advisor: 'James Park',
            pm: 2,
            date: new Date().toLocaleDateString(),
            notes: 'Note',
        },
        {
            id: 3,
            status: 'completed',
            project: 'Super Fake Project with really long name',
            advisor: 'Robin Hurst',
            pm: 3,
            date: new Date().toLocaleDateString(),
            notes: 'Note',
        },
    ],
    dateOptions: { month: 'short', day: 'numeric' },
    
}

export default data;