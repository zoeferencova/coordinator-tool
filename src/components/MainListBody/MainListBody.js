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
    
    render() {
        return (
            <div className="table">
                <div className="table-header">
                    <div className='table-header-cell hide-mobile'><input type="checkbox" id="header-checkbox" onChange={this.setCheckedState}></input></div>
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