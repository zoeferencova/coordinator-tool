export default {
    listItems : [
        {
            id: 1,
            checked: true,
            status: 'none',
            project: 'Fake Project',
            advisor: 'Zoe Ferencova',
            pm: 1,
            date: new Date().toLocaleDateString(),
            notes: 'Lorem ipsum'
        },
        {
            id: 2,
            checked: false,
            status: 'none',
            project: 'Dummy Project',
            advisor: 'James Park',
            pm: 2,
            date: new Date().toLocaleDateString(),
            notes: 'Dolor sit amet'
        },
        {
            id: 3,
            checked: false,
            status: 'none',
            project: 'Super Fake Project',
            advisor: 'Robin Hurst',
            pm: 3,
            date: new Date().toLocaleDateString(),
            notes: 'Consectetur adipiscing'
        },
        {
            id: 7,
            checked: false,
            status: 'none',
            project: 'Fake Project',
            advisor: 'Robin Hurst',
            pm: 3,
            date: new Date().toLocaleDateString(),
            notes: 'Consectetur adipiscing'
        },
        {
            id: 4,
            checked: false,
            status: 'reached',
            project: 'Super Fake Project',
            advisor: 'Sara Waldman',
            pm: 3,
            date: new Date().toLocaleDateString(),
            notes: 'Consectetur adipiscing'
        },
        {
            id: 5,
            checked: false,
            status: 'completed',
            project: 'Not Real Project',
            advisor: 'Marnie Hurst',
            pm: 2,
            date: new Date().toLocaleDateString(),
            notes: 'Consectetur adipiscing'
        },
        {
            id: 6,
            checked: false,
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
            template_name: 'Template Name',
            template_subject: 'Hello There!',
            template_body: 'To whom this may concern, Blah blah blah'
        },
        {
            id: 2,
            template_name: 'Template Name',
            template_subject: 'Hello There!',
            template_body: 'To whom this may concern, Blah blah blah'
        },
        {
            id: 3,
            template_name: 'Template Name',
            template_subject: 'Hello There!',
            template_body: 'To whom this may concern, Blah blah blah'
        },
    ],
    completed: [
        {
            id: 1,
            project: 'Fake Project',
            advisor: 'Zoe Ferencova',
            pm: 1,
            date: new Date().toLocaleDateString(),
        },
        {
            id: 2,
            project: 'Dummy Project',
            advisor: 'James Park',
            pm: 2,
            date: new Date().toLocaleDateString(),
        },
        {
            id: 3,
            project: 'Super Fake Project with really long name',
            advisor: 'Robin Hurst',
            pm: 3,
            date: new Date().toLocaleDateString(),
        },
    ],
    dateOptions: { month: 'short', day: 'numeric' },
    
}