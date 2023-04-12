import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/contexts';
import { emailIconLight, trashIcon, editIcon, ActionButton } from '../Utils/Utils';
import ListService from '../../services/list-service';

import styles from '../ListMobileActions/ListMobileActions.module.css'

const ListMobileActions = ({ data, setEmailFormItem, closeMobileActions }) => {
    const context = useContext(AppContext);

    const { id, project, contact, pm_name, notes, project_url, contact_url, date_created } = data;

    const handleDeleteItem = () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            ListService.deleteItem(id)
            context.deleteItem(id)
            closeMobileActions()
        }
    }

    return (
        <div className={`${styles.mobileActions} ${data ? styles.show : styles.hide}`}>
            <div className={styles.overlay} onClick={closeMobileActions}></div>
            <div className={styles.content}>
                <p className={`${styles.heading}`}>Details</p>
                <div className={styles.info}>
                    <div>
                        <span className={styles.columnName}>Project</span>
                        <span className={styles.columnValue}>{project_url !== '' ? <a href={project_url} target="_blank" rel="noopener noreferrer">{project}</a> : project}</span>
                    </div>
                    <div>
                        <span className={styles.columnName}>Contact</span>
                        <span className={styles.columnValue}>{contact_url !== '' ? <a href={contact_url} target="_blank" rel="noopener noreferrer">{contact}</a> : contact}</span>
                    </div>
                    <div>
                        <span className={styles.columnName}>PM</span>
                        <span className={styles.columnValue}>{pm_name}</span>
                    </div>
                    <div>
                        <span className={styles.columnName}>Date Created</span>
                        <span className={styles.columnValue}>{new Date(date_created).toLocaleDateString('en-US', context.dateOptions)}</span>
                    </div>

                    {notes && <div><span className={styles.columnName}>Notes</span> <span className={styles.columnValue}>{notes}</span></div>}
                </div>
                <div className={styles.actions}>
                    <ActionButton action="email" onClick={() => setEmailFormItem(data)} />
                    <Link to={{ pathname: `/edit-item/${id}`, itemProps: { project, contact, pm_name, notes } }} >
                        <ActionButton action="edit" />
                    </Link>
                    <ActionButton action="delete" onClick={handleDeleteItem} />
                </div>
            </div>

        </div>
    )
}

export default ListMobileActions;



