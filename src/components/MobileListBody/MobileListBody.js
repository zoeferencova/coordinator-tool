import React from 'react';
import './MobileListBody.css'
import MobileListItem from '../MobileListItem/MobileListItem';



const dummyData = [
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
        status: 'none',
        project: 'Super Fake Project',
        advisor: 'Sara Waldman',
        pm: 3,
        date: new Date().toLocaleDateString(),
        notes: 'Consectetur adipiscing'
    },
    {
        id: 5,
        checked: false,
        status: 'none',
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
]

export default class MobileListBody extends React.Component {   
    renderMobileRows() {
        return dummyData.map(row => 
            <MobileListItem
                key={row.id}
                checked={row.checked}
                status={row.status}
                project={row.project}
                advisor={row.advisor}
                pm={row.pm}
                date={row.date}
                notes={row.notes}
            />
        )
    }

    render() {
        return (
            <div className="table">
                <div className="table-header">
                    <div className="table-header-cell"><input type="checkbox"></input></div>
                    <div className="table-header-cell">Status</div>
                    <div className="table-header-cell">Project</div>
                    <div className="table-header-cell">Advisor</div>
                    <div className="table-header-cell">More</div>
                </div>
                {this.renderMobileRows()}
            </div>
            
        ) 
    }
}