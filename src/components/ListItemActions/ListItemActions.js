import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/contexts';
import { editIcon, emailIconLight, trashIcon } from '../Utils/Utils';
import ListService from '../../services/list-service';

import styles from '../ListItem/ListItem.module.css'

const ListItemActions = ({ item, tab, setEmailFormItem }) => {
    const context = useContext(AppContext);
    const [showMobileActions, setShowMobileActions] = useState(false)

    const { id, project, contact, pm_name, notes, pm_email, project_url, contact_url, date_created } = item;

    const handleDeleteItem = () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            ListService.deleteItem(id)
            context.deleteItem(id)
        }
    }

    return (
        <>
            {tab === "main" && <>
                <button className={`${styles.icon} ${styles.email}`} onClick={() => setEmailFormItem(item)}>
                    {emailIconLight}
                    <span className={styles.srOnly}>send email</span>
                </button>
                <Link to={{ pathname: `/edit-item/${id}`, itemProps: { project, contact, pm_name, notes } }} >
                    <button className={`${styles.icon}`}>
                        {editIcon}
                        <span className={styles.srOnly}>edit item</span>
                    </button>
                </Link>
                <button className={`${styles.icon}`} itemkey={id} onClick={handleDeleteItem}>
                    {trashIcon}
                    <span className={styles.srOnly}>delete item</span>
                </button>
            </>}

        </>
    )
}

export default ListItemActions;



