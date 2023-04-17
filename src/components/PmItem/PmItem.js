import React, { useContext } from 'react';
import AppContext from '../../contexts/contexts';
import { ActionButton } from '../Utils/Utils';
import PmService from '../../services/pm-service';

import styles from './PmItem.module.css'

const PmItem = ({ pm }) => {
    const context = useContext(AppContext);

    const handleDeletePm = e => {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this PM? All list items associated with this PM will also be deleted.')) {
            const pmId = e.currentTarget.getAttribute('item')
            PmService.deletePm(pmId)
                .then(res => context.deletePm(pmId))
        }
    }

    return (
        <li key={pm.id} className={styles.pmItem}>
            <div className={styles.pmDetails}>
                <div className={styles.name}>{pm.pm_name}</div>
                <div className={styles.email}>{pm.pm_email}</div>
            </div>
            <ActionButton onClick={(e) => handleDeletePm(e)} action="delete" item={pm.id} className={styles.delete}>Delete</ActionButton>
        </li>
    )
}

export default PmItem;