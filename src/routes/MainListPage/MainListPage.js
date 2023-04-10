import React, { useContext, useState } from 'react';
import AppContext from '../../contexts/contexts'
import ListTools from '../../components/ListTools/ListTools';
import ListHeader from '../../components/ListHeader/ListHeader';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header';
import SendEmailForm from '../../components/SendEmailForm/SendEmailForm'
import ListBody from '../../components/ListBody/ListBody';
import { UserGuide } from '../../components/Utils/Utils'

import styles from './MainListPage.module.css'

const MainListPage = () => {
    const context = useContext(AppContext);
    const [emailFormItem, setEmailFormItem] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState('date-asc');

    //If there are no items that do not have status 'completed' but there are completed items return no item message
    //If there are no items that do not have status 'completed' and no completed items return user guide from Utils for new users
    const renderNoItemMessage = () => {
        const nonCompletedItems = context.listItems.filter(item => item.status !== 'completed')
        if (nonCompletedItems.length === 0 && context.completedListItems.length > 0) {
            return <p>You have no items to do!</p>
        } else if (nonCompletedItems.length === 0 && context.completedListItems.length === 0) {
            return <UserGuide />
        }
    }

    return (
        <div className="container">
            <main className="content">
                <Header title="" />
                <div className={styles.listContainer}>
                    <ListTools tab='main' setSearchQuery={setSearchQuery} />
                    <span className={`${styles.scroll}`}>Scroll for more <i className="fas fa-arrow-right"></i></span>
                    <div className={styles.tableBodyContainer}>
                        <ListHeader tab="main" setSort={setSort} currentSort={sort} />
                        {context.loading && <img src={require('../../images/loader.gif')} alt="loader" className={styles.loader}></img>}
                        {!context.loading && renderNoItemMessage()}
                        <ListBody tab="main" setEmailFormItem={setEmailFormItem} currentSort={sort} searchQuery={searchQuery} />
                    </div>
                </div>
                {emailFormItem && <SendEmailForm data={emailFormItem} closeEmailForm={() => setEmailFormItem(null)} />}
            </main>
            <NavBar />
        </div>

    )
}

export default MainListPage;