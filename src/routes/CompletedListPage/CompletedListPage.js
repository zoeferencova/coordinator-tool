import React, { useState } from 'react';
import ListTools from '../../components/ListTools/ListTools'
import ListBody from '../../components/ListBody/ListBody'
import ListHeader from '../../components/ListHeader/ListHeader'

import styles from '../MainListPage/MainListPage.module.css'

const CompletedListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState('date-desc');

    return (
        <div className="container">
            <main className="content">
                <ListTools tab='completed' setSearchQuery={setSearchQuery} />
                <div className={`${styles.listContainer}`}>
                    <div className={styles.tableBodyContainer}>
                        <ListHeader tab="completed" setSort={setSort} currentSort={sort} />
                        <ListBody tab="completed" currentSort={sort} searchQuery={searchQuery} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CompletedListPage;