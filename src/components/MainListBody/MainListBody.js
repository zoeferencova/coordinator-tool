import React from 'react';
import AppContext from '../../contexts/contexts';

import tableStyles from '../Utils/shared-styles/TableStyles.module.css'
import listStyles from '../Utils/shared-styles/MainList.module.css'

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
            <div className={tableStyles.table}>
                <div className={tableStyles.tableHeader}>
                    <div className={`${tableStyles.tableHeaderCell} ${tableStyles.hideMobile} ${listStyles.check}`}><input type="checkbox" id="header-checkbox" onChange={this.setCheckedState}></input></div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.project}`}>Project <i onClick={() => this.props.currentSort === 'project-asc' ? this.props.setSort('project-desc') : this.props.setSort('project-asc')} className="fas fa-sort"></i></div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.contact}`}>Contact <i onClick={() => this.props.currentSort === 'contact-asc' ? this.props.setSort('contact-desc') : this.props.setSort('contact-asc')} className="fas fa-sort"></i></div>
                    <div className={`${tableStyles.tableHeaderCell} ${tableStyles.hideMobile}`}>PM <i onClick={() => this.props.currentSort === 'pm-asc' ? this.props.setSort('pm-desc') : this.props.setSort('pm-asc')} className="fas fa-sort"></i></div>
                    <div className={`${tableStyles.tableHeaderCell} ${tableStyles.hideMobile}`}>Date <i onClick={() => this.props.currentSort === 'date-asc' ? this.props.setSort('date-desc') : this.props.setSort('date-asc')} className="fas fa-sort"></i></div>
                    <div className={`${tableStyles.tableHeaderCell} ${tableStyles.hideMobile}`}>Notes</div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.status}`}>Status <i onClick={() => this.props.currentSort === 'status-asc' ? this.props.setSort('status-desc') : this.props.setSort('status-asc')} className="fas fa-sort"></i></div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.actions} ${tableStyles.hideMobile}`}>Actions</div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.mobileActions} ${tableStyles.hideDesktop}`}></div>
                </div>
                {this.props.renderListItems()}
            </div>
        ) 
    }
}