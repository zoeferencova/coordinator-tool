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
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.project}`}>Project</div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.advisor}`}>Advisor</div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.pm}`}>PM</div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.date} ${tableStyles.hideMobile}`}>Date</div>
                    <div className={`${tableStyles.tableHeaderCell} ${listStyles.actions} ${styles.revert}`}>Actions</div>
                </div>
                {this.props.renderCompletedItems()}
            </div>
        ) 
    }
}