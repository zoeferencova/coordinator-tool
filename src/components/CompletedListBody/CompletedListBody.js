import React from 'react';
import AppContext from '../../contexts/contexts'

import styles from './CompletedListBody.module.css'
import listStyles from '../Utils/shared-styles/CompletedList.module.css'
import tableStyles from '../Utils/shared-styles/TableStyles.module.css'

export default class CompletedListBody extends React.Component {   
    static contextType = AppContext;
    
    render() {
        return (
            <div className={tableStyles.table}>
                <div className={tableStyles.tableHeader}>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.project}`}>Project <i onClick={() => this.props.currentSort === 'project-asc' ? this.props.setSort('project-desc') : this.props.setSort('project-asc')} className="fas fa-sort"></i></div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.advisor}`}>Advisor <i onClick={() => this.props.currentSort === 'advisor-asc' ? this.props.setSort('advisor-desc') : this.props.setSort('advisor-asc')} className="fas fa-sort"></i></div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.pm}`}>PM <i onClick={() => this.props.currentSort === 'pm-asc' ? this.props.setSort('pm-desc') : this.props.setSort('pm-asc')} className="fas fa-sort"></i></div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.date} ${tableStyles.hideMobile}`}>Date <i onClick={() => this.props.currentSort === 'date-asc' ? this.props.setSort('date-desc') : this.props.setSort('date-asc')} className="fas fa-sort"></i></div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.actions} ${styles.revert}`}>Actions</div>
                </div>
                {this.props.renderCompletedItems()}
            </div>
        ) 
    }
}