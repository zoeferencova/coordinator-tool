import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/contexts'
import { ButtonLight, ButtonDark, SearchInput, emailIcon, plusIcon } from '../Utils/Utils'
import EmailService from '../../services/email-service';

import styles from './ListTools.module.css'

const ListTools = ({ tab, setSearchQuery }) => {
    const context = useContext(AppContext);

    const emailHref = `mailto:${EmailService.formatUpdateEmailAddresses(context.listItems)}?Subject=Update - ${new Date().toLocaleDateString('en-US', { month: 'long', weekday: 'long', day: 'numeric' })}&Body=${EmailService.formatEmailUpdate(context.listItems)}`

    return (
        <div className={styles.tools}>
            <div className={styles.search}>
                <div>
                    <label htmlFor="search" className={styles.hide}>Search: </label>
                    <SearchInput type="text" id="search" className={styles.searchInput} placeholder="Search" search="true" onChange={e => setSearchQuery(e.target.value)}></SearchInput>
                </div>
            </div>
            {tab === 'main' && <div className={styles.buttons}>
                <a target="_blank" rel="noreferrer" href={emailHref}>
                    <ButtonLight disabled={context.listItems.length === 0} className={styles.emailButton}>Email Summary</ButtonLight>
                    <ButtonLight disabled={context.listItems.length === 0} className={styles.emailButtonMobile}>{emailIcon}</ButtonLight>
                </a>
                <Link to='/add-item'>
                    <ButtonDark className={`${styles.addButton}`} disabled={context.pms.length === 0}>New Item</ButtonDark>
                    <ButtonDark className={`${styles.addButtonMobile}`} disabled={context.pms.length === 0}>{plusIcon}</ButtonDark>
                </Link>
            </div>}
        </div>
    )
}

export default ListTools;