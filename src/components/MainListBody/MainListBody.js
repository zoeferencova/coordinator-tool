import React from 'react';
import './MainListBody.css'
import AppContext from '../../contexts/contexts'

export default class MainListBody extends React.Component {   
    static contextType = AppContext;

    render() {
        return (
            <div className="table">
                <div className="table-header">
                    <div className='table-header-cell hide-mobile'><input type="checkbox"></input></div>
                    <div className="table-header-cell">Status</div>
                    <div className="table-header-cell">Project</div>
                    <div className="table-header-cell">Advisor</div>
                    <div className="table-header-cell hide-mobile">PM</div>
                    <div className="table-header-cell hide-mobile">Date</div>
                    <div className="table-header-cell hide-mobile">Notes</div>
                    <div className="table-header-cell">Actions</div>
                </div>
                {this.props.renderListItems()}
            </div>
            
        ) 
    }
}