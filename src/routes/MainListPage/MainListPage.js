import React, { useContext, useState } from 'react';
import AppContext from '../../contexts/contexts'
import ContentLoader from 'react-content-loader'
import ListTools from '../../components/ListTools/ListTools';
import ListHeader from '../../components/ListHeader/ListHeader';
import SendEmailForm from '../../components/SendEmailForm/SendEmailForm'
import ListMobileActions from '../../components/ListMobileActions/ListMobileActions'
import ListBody from '../../components/ListBody/ListBody';

import styles from './MainListPage.module.css'

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={"100%"}
        height={400}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="20" rx="3" ry="3" width="100%" height="25px" />
        <rect x="0" y="65" rx="3" ry="3" width="100%" height="25px" />
        <rect x="0" y="110" rx="3" ry="3" width="100%" height="25px" />
    </ContentLoader>
)

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
                        <ListBody tab="main" setEmailFormItem={setEmailFormItem} setMobileActionItem={setMobileActionItem} currentSort={sort} searchQuery={searchQuery} />
                    </div>
                    {context.loading && <MyLoader width={"100%"} />}

                </div>
                {emailFormItem && <SendEmailForm data={emailFormItem} closeEmailForm={() => setEmailFormItem(null)} />}
                {mobileActionItem && <ListMobileActions data={mobileActionItem} closeMobileActions={() => setMobileActionItem(null)} setEmailFormItem={setEmailFormItem} />}
            </main>
        </div>

    )
}

export default MainListPage;