import React from 'react';
import { sortIcon } from "../Utils/Utils";

import styles from '../ListItem/ListItem.module.css'

const ListHeader = ({ tab, setSort, currentSort }) => {
    const handleSort = col => currentSort === `${col}-asc` ? setSort(`${col}-desc`) : setSort(`${col}-asc`)

    return (
        <div className={styles.tableHeader}>
            <div className={`${styles.projectHeader} ${styles.project}`} onClick={() => handleSort('project')}>
                Project {sortIcon}
            </div>
            <div className={`${styles.contact}`} onClick={() => handleSort('contact')}>
                Contact {sortIcon}
            </div>
            <div className={`${styles.pm} ${styles.hideMobile}`} onClick={() => handleSort('pm')}>
                PM {sortIcon}
            </div>
            <div className={`${styles.date} ${styles.hideMobile}`} onClick={() => handleSort('date')}>
                Date {sortIcon}
            </div>
            <div className={`${styles.status}`} onClick={() => handleSort('status')}>
                Status {sortIcon}
            </div>
            <div className={`${styles.notes} ${styles.hideTablet}`}>
                Notes
            </div>
        </div>
    )
}

export default ListHeader;