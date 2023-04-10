import React, { useContext } from 'react';
import AppContext from '../../contexts/contexts';
import { Button } from '../Utils/Utils';
import PmService from '../../services/pm-service';

import styles from './PmItem.module.css'

const PmItem = ({ pm }) => {
    const context = useContext(AppContext);

    const handleDeletePm = e => {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this PM? All list items associated with this PM will also be deleted.')) {
            const pmId = e.target.getAttribute('pmid')
            PmService.deletePm(pmId)
            context.deletePm(pmId)
        }
    }

    return (
        <li key={pm.id} className={styles.pmItem}>
            <div className={styles.pmDetails}>
                <div className={styles.name}>{pm.pm_name}</div>
                <div className={styles.email}>{pm.pm_email}</div>
            </div>
            <Button onClick={(e) => handleDeletePm(e)} pmid={pm.id} className={styles.delete}>Delete</Button>
        </li>
    )
}

export default PmItem;