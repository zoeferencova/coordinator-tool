import React, { useContext, useState } from 'react';
import AppContext from '../../contexts/contexts'
import ListTools from '../../components/ListTools/ListTools';
import ListHeader from '../../components/ListHeader/ListHeader';
import SendEmailForm from '../../components/SendEmailForm/SendEmailForm'
import ListMobileActions from '../../components/ListMobileActions/ListMobileActions'
import ListBody from '../../components/ListBody/ListBody';

import styles from './MainListPage.module.css'

const MainListPage = () => {
    const context = useContext(AppContext);
    const [emailFormItem, setEmailFormItem] = useState(null)
    const [mobileActionItem, setMobileActionItem] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState('date-asc');

    return (
        <div className="container">
            <main className="content">
                <ListTools tab='main' setSearchQuery={setSearchQuery} />
                <div className={styles.listContainer}>
                    <div className={styles.tableBodyContainer}>
                        <ListHeader tab="main" setSort={setSort} currentSort={sort} />
                        {/* {context.loading && <img src={require('../../images/loader.gif')} alt="loader" className={styles.loader}></img>} */}
                        <ListBody tab="main" setEmailFormItem={setEmailFormItem} setMobileActionItem={setMobileActionItem} currentSort={sort} searchQuery={searchQuery} />
                    </div>
                </div>
                {emailFormItem && <SendEmailForm data={emailFormItem} closeEmailForm={() => setEmailFormItem(null)} />}
                {mobileActionItem && <ListMobileActions data={mobileActionItem} closeMobileActions={() => setMobileActionItem(null)} setEmailFormItem={setEmailFormItem} />}
            </main>
        </div>

    )
}

export default MainListPage;