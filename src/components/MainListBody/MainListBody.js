import React from 'react';
import './MainListBody.css'
import AppContext from '../../contexts/contexts'

export default class MainListBody extends React.Component {   
    static contextType = AppContext;

    state = {
        checked: false
    }

    setCheckedState = () => {
        this.state.checked === false ? this.setState({ checked: true }) : this.setState({ checked: false })
        const listCheckboxes = document.querySelectorAll('#list-checkbox')
        if (!this.state.checked) {
            listCheckboxes.forEach(item => item.checked = true)
            const allIds = this.context.listItems.map(item => item.id)
            this.props.setChecked(allIds)
        } else if (this.state.checked) {
            listCheckboxes.forEach(item => item.checked = false)
            this.props.clearChecked()
        }
    }

    uncheckAll = () => {
        this.setState({ checked: false })
    }
    
    render() {
        return (
            <div className="table">
                <div className="table-header">
                    <div className='table-header-cell hide-mobile check-column'><input type="checkbox" id="header-checkbox" onChange={this.setCheckedState}></input></div>
                    <div className="table-header-cell proj-cell">Project</div>
                    <div className="table-header-cell adv-cell">Advisor</div>
                    <div className="table-header-cell hide-mobile">PM</div>
                    <div className="table-header-cell hide-mobile">Date</div>
                    <div className="table-header-cell hide-mobile">Notes</div>
                    <div className="table-header-cell status-column">Status</div>
                    <div className="table-header-cell actions-column">Actions</div>
                </div>
                {this.props.renderListItems()}
            </div>
            
        ) 
    }
}