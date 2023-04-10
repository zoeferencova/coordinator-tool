import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ListTools from '../../components/ListTools/ListTools'
import ListBody from '../../components/ListBody/ListBody'
import ListHeader from '../../components/ListHeader/ListHeader'
import Header from '../../components/Header/Header'

import styles from '../MainListPage/MainListPage.module.css'

const CompletedListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState('date-desc');

    return (
        <div className="container">
            <main className="content">
                <Header title={"Completed"} />
                <div className={`${styles.listContainer}`}>
                    <ListTools tab='completed' setSearchQuery={setSearchQuery} />
                    <span className={`${styles.scroll}`}>Scroll for more <i className="fas fa-arrow-right"></i></span>
                    <div className={styles.tableBodyContainer}>
                        <ListHeader tab="completed" setSort={setSort} currentSort={sort} />
                        <ListBody tab="completed" currentSort={sort} searchQuery={searchQuery} />
                    </div>
                </div>
            </main>
            <NavBar />
        </div>
    )
}

export default CompletedListPage;