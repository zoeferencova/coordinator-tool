import React from 'react';
import './MainListBody.css'
import MainListItem from '../MainListItem/MainListItem';
import AuthApiService from '../../services/auth-api-service';
import AppContext from '../../contexts/contexts'

const dateOptions = { month: 'short', day: 'numeric' }

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
]

export default class MainListBody extends React.Component {   
    static contextType = AppContext;

    state = {
        listItems: dummyData,
        error: null,
    }
    
    // componentDidMount() {
    //     AuthApiService.getUserData()
    //         .then(res => this.setState({ listItems: res }))
    // }

    renderListItems() {
        
        const { listItems } = this.state;
        return listItems.map(item => 
            <MainListItem
                key={item.id}
                checked={item.checked}
                status={item.status}
                project={item.project}
                advisor={item.advisor}
                pm={item.pm}
                date={new Date(item.date).toLocaleDateString('en-US', dateOptions)}
                notes={item.notes}
            />
        )
    }

    render() {
        const { error } = this.context
        return (
            <div className="table">
                <div className="table-header">
                    <div className="table-header-cell"><input type="checkbox"></input></div>
                    <div className="table-header-cell">Status</div>
                    <div className="table-header-cell">Project</div>
                    <div className="table-header-cell">Advisor</div>
                    <div className="table-header-cell">PM</div>
                    <div className="table-header-cell">Date</div>
                    <div className="table-header-cell">Notes</div>
                    <div className="table-header-cell">Actions</div>
                </div>
                {this.renderListItems()}
            </div>
            
        ) 
    }
}