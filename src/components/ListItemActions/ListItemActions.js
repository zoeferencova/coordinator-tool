import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/contexts';
import { editIcon, trashIcon } from '../Utils/Utils';
import ListService from '../../services/list-service';

import styles from '../ListItem/ListItem.module.css'

const ListItemActions = ({ item, tab, setEmailFormItem }) => {
    const context = useContext(AppContext);

    const { id, project, contact, pm_name, notes, pm_email } = item;

    const handleDeleteItem = () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            ListService.deleteItem(id)
            context.deleteItem(id)
        }
    }

    const handleRevert = () => {
        const foundPm = context.pms.find(pm => pm.pm_email === pm_email)
        const pmId = foundPm.id;
        const status = 'none'
        ListService.updateItemStatus(id, status, project, contact, pmId)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : context.revertCompleted(id)
            )
            .catch(err => console.log(err))
    }

    return (
        <>
            {tab === "main" && <>
                <button className={`${styles.icon}`} onClick={() => setEmailFormItem(item)}>
                    <i className="fas fa-envelope"></i>
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
            {tab === "completed" && <button onClick={() => handleRevert(id)} className={styles.revertButton}>Revert</button>}
        </>



    )
}

export default ListItemActions;

{/* Mobile actions */ }
{/* <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideDesktop} ${listStyles.mobileActions}`}>
                <div onClick={() => setPopup(!popup)}>
                    {ellipsisIcon}
                    <span className={styles.srOnly}>get more info on list item</span>
                </div>
                <div className={`${styles.popup} ${popup ? tableStyles.show : tableStyles.hidden}`}>
                    <i onClick={() => setPopup(false)} className={` ${tableStyles.pointer} ${styles.close} fas fa-times`}></i>
                    <p className={`${styles.heading} ${styles.first}`}>Item Info</p>
                    <div className={styles.info}>
                        <p><span className={styles.columnName}>Project</span> {project_url !== '' ? <a href={project_url} target="_blank" rel="noopener noreferrer">{project}</a> : project}</p>
                        <p><span className={styles.columnName}>Contact</span> {contact_url !== '' ? <a href={contact_url} target="_blank" rel="noopener noreferrer">{contact}</a> : contact}</p>
                        <p><span className={styles.columnName}>PM</span> {pm_name}</p>
                        <p><span className={styles.columnName}>Date Created</span>  {date_created}</p>

                        {notes && <p><span className={styles.columnName}>Notes</span> {notes}</p>}
                    </div>
                    <div className={styles.popupActions}>
                        <p className={styles.heading}>Actions</p>
                        <button className={`${styles.icon}`} itemkey={id} onClick={() => { setEmailFormItem(item); setPopup(false) }}>
                            <i className="fas fa-envelope"></i>
                            <span className={styles.srOnly}>send email</span>
                        </button>
                        <Link to={{ pathname: `/edit-item/${id}`, itemProps: { project, contact, pm_name, notes } }} >
                            <button className={`${styles.icon}`}>
                                <i className="fas fa-edit"></i>
                                <span className={styles.srOnly}>edit item</span>
                            </button>
                        </Link>
                        <button className={`${styles.icon}`} itemkey={id} onClick={handleDeleteItem}>
                            <i className="fas fa-trash"></i>
                            <span className={styles.srOnly}>delete item</span>
                        </button>
                    </div>
                </div>
            </div> */}