import React from 'react';

import styles from '../ListItem/ListItem.module.css'

const ListHeader = ({ tab, setSort, currentSort }) => {
    const handleSort = col => currentSort === `${col}-asc` ? setSort(`${col}-desc`) : setSort(`${col}-asc`)

    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <div className={`${styles.projectHeader} ${styles.project}`} onClick={() => handleSort('project')}>
                    Project <i className="fas fa-sort"></i>
                </div>
                <div className={`${styles.contact}`} onClick={() => handleSort('contact')}>
                    Contact <i className="fas fa-sort"></i>
                </div>
                <div className={`${styles.pm} ${styles.hideMobile}`} onClick={() => handleSort('pm')}>
                    PM <i className="fas fa-sort"></i>
                </div>
                <div className={`${styles.date} ${styles.hideMobile}`} onClick={() => handleSort('date')}>
                    Date <i className="fas fa-sort"></i>
                </div>
                {tab === "main" && <div className={`${styles.notes} ${styles.hideTablet}`}>
                    Notes
                </div>}
                {tab === "main" && <div className={`${styles.status}`} onClick={() => handleSort('status')}>
                    Status <i className="fas fa-sort"></i>
                </div>}
                <div className={`${styles.actions} ${styles.hideMobile}`}>
                    Actions
                </div>
            </div>
        </div>
    )
}

export default ListHeader;