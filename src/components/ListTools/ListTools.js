import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/contexts'
import { Button, Input } from '../Utils/Utils'
import EmailService from '../../services/email-service';

import styles from './ListTools.module.css'

const ListTools = ({ tab, setSearchQuery }) => {
    const context = useContext(AppContext);

    const emailHref = `mailto:${EmailService.formatUpdateEmailAddresses(context.listItems)}?Subject=Update - ${new Date().toLocaleDateString('en-US', { month: 'long', weekday: 'long', day: 'numeric' })}&Body=${EmailService.formatEmailUpdate(context.listItems)}`

    return (
        <div className={styles.tools}>
            <div className={styles.flex}>
                <div>
                    <label htmlFor="search" className={styles.hide}>Search: </label>
                    <Input type="text" id="search" className={styles.search} placeholder={"Search"} onChange={e => setSearchQuery(e.target.value)}></Input>
                </div>
            </div>
            {tab === 'main' && <div className={styles.flex}>
                <a target="_blank" rel="noreferrer" href={emailHref}>
                    <Button disabled={context.listItems.length === 0} className={styles.toolButton}>PM Update</Button>
                </a>
                <Link to='/add-item'>
                    <Button className={`${styles.addButton}`} disabled={context.pms.length === 0}>+ Add Item</Button>
                </Link>
            </div>}
        </div>
    )
}

export default ListTools;