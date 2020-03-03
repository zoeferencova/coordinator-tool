import React from 'react';
import AppContext from '../../contexts/contexts'

import listStyles from '../Utils/shared-styles/CompletedList.module.css'
import tableStyles from '../Utils/shared-styles/TableStyles.module.css'

export default class CompletedListBody extends React.Component {   
    static contextType = AppContext;
    
    render() {
        return (
            <div>
                <div className={tableStyles.table}>
                    <div className={tableStyles.tableHeader}>
                        <div className={`${tableStyles.tableHeaderCell} ${listStyles.project}`}>Project <i onClick={() => this.props.currentSort === 'project-asc' ? this.props.setSort('project-desc') : this.props.setSort('project-asc')} className="fas fa-sort"></i></div>
                        <div className={`${tableStyles.tableHeaderCell} ${listStyles.contact}`}>Contact <i onClick={() => this.props.currentSort === 'contact-asc' ? this.props.setSort('contact-desc') : this.props.setSort('contact-asc')} className="fas fa-sort"></i></div>
                        <div className={`${tableStyles.tableHeaderCell} ${listStyles.pm}`}>PM <i onClick={() => this.props.currentSort === 'pm-asc' ? this.props.setSort('pm-desc') : this.props.setSort('pm-asc')} className="fas fa-sort"></i></div>
                        <div className={`${tableStyles.tableHeaderCell} ${listStyles.date} ${tableStyles.hideMobile}`}>Date <i onClick={() => this.props.currentSort === 'date-asc' ? this.props.setSort('date-desc') : this.props.setSort('date-asc')} className="fas fa-sort"></i></div>
                        <div className={`${tableStyles.tableHeaderCell} ${listStyles.actions} ${tableStyles.hideMobile}`}>Actions</div>
                        <div className={`${tableStyles.tableHeaderCell} ${listStyles.actions} ${tableStyles.hideDesktop}`}></div>
                    </div>
                    {this.props.renderCompletedItems()}
                </div>
                {this.context.completedListItems.length === 0 && <p>There are no completed items.</p>}
            </div>

            
            
        ) 
    }
}