import React from 'react';
import styles from './Utils.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export const listIcon = <FontAwesomeIcon icon={icon({ name: 'list-alt' })} />
export const checkIcon = <FontAwesomeIcon icon={icon({ name: 'check-square' })} />
export const chartIcon = <FontAwesomeIcon icon={icon({ name: 'chart-pie' })} />
export const emailIcon = <FontAwesomeIcon icon={icon({ name: 'envelope' })} />
export const userIcon = <FontAwesomeIcon icon={icon({ name: 'user-circle' })} />
export const editIcon = <FontAwesomeIcon icon={icon({ name: 'edit' })} />
export const trashIcon = <FontAwesomeIcon icon={icon({ name: 'trash' })} />
export const ellipsisIcon = <FontAwesomeIcon icon={icon({ name: 'ellipsis-h' })} />

export function Button({ className, ...props }) {
    return <button className={`${styles.button} ${className}`} {...props} />
}

export function Input({ className, ...props }) {
    return <input className={`${styles.input} ${className}`} {...props} />
}

export function Textarea({ className, ...props }) {
    return <textarea className={`${styles.textarea} ${className}`} {...props} />
}

export function Select({ className, ...props }) {
    return <select className={`${styles.select} ${className}`} {...props} />
}

export function UserGuide({ className, ...props }) {
    return (
        <div className={`${styles.instructions} ${className}`} {...props}>
            <p>Welcome to the coordinator tool! Here's how to get started:</p>
            <ol>
                <li>Add your Project Manager names and emails in the <span className={styles.tabStyle}><i className="fas fa-user-circle"></i> Account</span> tab PM Settings section.</li>
                <li>Create some email templates in the <span className={styles.tabStyle}><i className="fas fa-envelope"></i> Templates</span> tab.</li>
                <li>Add your first list item! Use the <span className={styles.addButtonStyle}>+ Add Item</span> button to start adding list items. You can include URL's for the contact or project page which will link the list item values to the external pages for quick navigation in the future.</li>
                <li>Other tips:</li>
                <ul>
                    <li>Use the <span className={styles.buttonStyle}>PM Update</span> button to automatically generate an email with all of your current list items categorized by PM. This can be used to send an update email to all of your PM's whenever you need to.</li>
                    <li>The <span className={styles.buttonStyle}>Reset</span> button can be used to reset the status of all of the list items back to no status. You can use this in the beginning of the day to mark all items as no longer pending from the previous day.</li>
                    <li>When you mark a list item completed, it will automatically get moved into the <span className={styles.tabStyle}><i className="fas fa-check-square"></i> Completed</span> tab where you can revert the status of any completed item if needed and move it back into your main list.</li>
                    <li>Use the <span className={styles.tabStyle}><i className="fas fa-chart-pie"></i> Dashboard</span> tab to keep track of metrics and gain insight into trends related to your workflow.</li>
                    <li>You can see these instructions any time by clicking on the "User Guide" button in the <span className={styles.tabStyle}><i className="fas fa-user-circle"></i> Account</span> tab.</li>
                </ul>
            </ol>
        </div>
    )
}