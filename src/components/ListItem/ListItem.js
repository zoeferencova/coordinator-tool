import React, { useContext } from 'react';
import AppContext from '../../contexts/contexts'
import ListItemStatus from '../ListItemStatus/ListItemStatus';
import ListItemActions from '../ListItemActions/ListItemActions';

import styles from './ListItem.module.css'

const ListItem = ({ item, tab, setEmailFormItem, setMobileActionItem }) => {
    const context = useContext(AppContext);

    const { project, project_url, contact, contact_url, pm_name, date_created, notes } = item;

    return (
        <div className={`${styles.tableRow}`} onClick={() => setMobileActionItem(item)}>
            <div className={`${styles.project}`}>
                {project_url !== '' ? <a href={project_url} target="_blank" rel="noopener noreferrer">{project}</a> : project}
            </div>
            <div className={`${styles.contact}`}>
                {contact_url !== '' ? <a href={contact_url} target="_blank" rel="noopener noreferrer">{contact}</a> : contact}
            </div>
            <div className={`${styles.hideMobile} ${styles.pm}`}>
                {pm_name}
            </div>
            <div className={`${styles.hideMobile} ${styles.date}`}>{new Date(date_created).toLocaleDateString('en-US', context.dateOptions)}</div>

            <div className={`${styles.status}`}>
                <ListItemStatus item={item} />
            </div>
            <div className={`${styles.hideTablet} ${styles.notes}`}>
                {notes}
                <div className={`${styles.hideMobile} ${styles.actions}`}>
                    <ListItemActions item={item} tab={tab} setEmailFormItem={setEmailFormItem} />
                </div>
            </div>

        </div>
    )
}

export default ListItem;