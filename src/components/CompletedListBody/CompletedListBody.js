import React from 'react';
import './CompletedListBody.css'
import CompletedListItem from '../CompletedListItem/CompletedListItem';

const dummyData = [
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
        project: 'Super Fake Project',
        advisor: 'Robin Hurst',
        pm: 3,
        date: new Date().toLocaleDateString(),
    },
]

export default class CompletedListBody extends React.Component {   
    renderRows() {
        return dummyData.map(row => 
            <CompletedListItem
                key={row.id}
                project={row.project}
                advisor={row.advisor}
                pm={row.pm}
                date={row.date}
            />
        )
    }
    
    render() {
        return (
            <div className="table">
                <div className="table-header">
                    <div className="table-header-cell">Project</div>
                    <div className="table-header-cell">Advisor</div>
                    <div className="table-header-cell">PM</div>
                    <div className="table-header-cell">Date</div>
                    <div className="table-header-cell">Actions</div>
                </div>
                {this.renderRows()}
            </div>
        ) 
    }
}