import React from 'react';
import styles from './Utils.module.css';
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export const listIcon = <FontAwesomeIcon icon={icon({ name: 'list-alt' })} />
export const checkIcon = <FontAwesomeIcon icon={icon({ name: 'check-square' })} />
export const checkIconLight = <FontAwesomeIcon icon={icon({ name: 'check' })} />
export const chartIcon = <FontAwesomeIcon icon={icon({ name: 'chart-pie' })} />
export const emailIcon = <FontAwesomeIcon icon={icon({ name: 'envelope' })} />
export const emailIconLight = <FontAwesomeIcon icon={icon({ name: 'envelope', style: 'regular' })} />
export const userIcon = <FontAwesomeIcon icon={icon({ name: 'user-circle' })} />
export const editIcon = <FontAwesomeIcon icon={icon({ name: 'edit' })} />
export const trashIcon = <FontAwesomeIcon icon={icon({ name: 'trash-can', style: 'regular' })} />
export const ellipsisIcon = <FontAwesomeIcon icon={icon({ name: 'ellipsis-h' })} />
export const searchIcon = <FontAwesomeIcon icon={icon({ name: 'magnifying-glass' })} />
export const sortIcon = <FontAwesomeIcon icon={icon({ name: 'sort' })} />
export const hamburgerIcon = <FontAwesomeIcon icon={icon({ name: 'bars' })} />
export const plusIcon = <FontAwesomeIcon icon={icon({ name: 'plus' })} />
export const closeIcon = <FontAwesomeIcon icon={icon({ name: 'times' })} />
export const chevronUpIcon = <FontAwesomeIcon icon={icon({ name: 'chevron-up' })} />
export const chevronDownIcon = <FontAwesomeIcon icon={icon({ name: 'chevron-down' })} />
export const githubIcon = <FontAwesomeIcon icon={icon({ name: 'github', style: 'brands' })} />
export const linkedinIcon = <FontAwesomeIcon icon={icon({ name: 'linkedin', style: 'brands' })} />
export const toDoNavIcon = <div className={`${styles.bgIcon} ${styles.purpleIcon}`}><FontAwesomeIcon icon={icon({ name: 'list' })} ></FontAwesomeIcon></div>
export const completedNavIcon = <div className={`${styles.bgIcon} ${styles.greenIcon}`}><FontAwesomeIcon icon={icon({ name: 'check-square', style: 'regular' })} ></FontAwesomeIcon></div>
export const dashboardNavIcon = <div className={`${styles.bgIcon} ${styles.pinkIcon}`}><FontAwesomeIcon icon={icon({ name: 'chart-simple' })} ></FontAwesomeIcon></div>
export const templateNavIcon = <div className={`${styles.bgIcon} ${styles.blueIcon}`}><FontAwesomeIcon icon={icon({ name: 'envelope', style: 'regular' })} ></FontAwesomeIcon></div>
export const spinnerIcon = <FontAwesomeIcon icon={icon({ name: 'spinner' })} spin />

// Assigns a color to the profile picture based on the first letter of the user's name
export function ProfilePicture({ className, ...props }) {
    let color;
    const colorOptions = ["red", "indigo", "green", "teal", "blue", "purple"]
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const firstLetter = props.full_name.slice(0, 1);
    const letterIndex = letters.indexOf(firstLetter.toLowerCase());
    color = colorOptions[Math.floor(letterIndex / colorOptions.length)]
    return <div style={props.style} className={`${styles.circle} ${color} ${className !== undefined ? className : ""}`} {...props}>{firstLetter.toUpperCase()}</div>
}

export function ButtonLight({ className, ...props }) {
    return <button disabled={props.disabled} className={`${styles.button} ${props.large ? styles.large : undefined} ${className !== undefined ? className : ""}`} {...props}>{props.loading === "true" ? spinnerIcon : props.children}</button>
}

export function ButtonDark({ className, ...props }) {
    return <button disabled={props.disabled} className={`${styles.buttonDark} ${props.large ? styles.large : undefined} ${className !== undefined ? className : ""}`} {...props}>{props.loading === "true" ? spinnerIcon : props.children}</button>
}

export function ActionButton({ className, ...props }) {
    return (<button className={styles.actionButton} onClick={props.onClick} item={props.item}>
        {props.action === "edit" && <>{editIcon}<span>Edit</span></>}
        {props.action === "delete" && <>{trashIcon}<span>Delete</span></>}
        {props.action === "email" && <>{emailIconLight}<span>Send email</span></>}
    </button>)
}

// export function Button({ className, ...props }) {
//     return <button className={`${styles.button} ${className}`} {...props} />
// }

export function Input({ className, ...props }) {
    return <input className={`${styles.input} ${className}`} {...props} />
}

export function SearchInput({ className, ...props }) {
    return <div className={styles.searchInput}>{props.search && searchIcon}<input className={`${styles.input} ${className}`} {...props} /></div>
}

export function Textarea({ className, ...props }) {
    return <textarea className={`${styles.textarea} ${className}`} {...props} />
}

export function CustomSelect({ options, value, required, error, onChange, name, id, width }) {
    const selectStyles = {
        option: (styles, state) => ({
            ...styles,
            cursor: 'pointer',
            fontSize: '15px',
            textAlign: "left",
            // backgroundColor: state.isSelected ? "#7dbbc7" : state.isFocused ? "#EDF3F4" : state.isClicked ? "#7dbbc7" : "white",
        }),
        control: (styles) => ({
            ...styles,
            cursor: 'pointer',
            fontSize: '15px',
            boxShadow: 'none',
            border: '1px solid #e6e8ed',
            '&:hover': {
                cursor: 'pointer'
            },
            width: width || "auto",
            textAlign: "left"
        }),
    };

    const getValue = options.find(opt => opt.value === value)

    return <Select
        name={name}
        id={id}
        onChange={onChange}
        options={options}
        placeholder="Select"
        styles={selectStyles}
        value={getValue}
        required={required}
        className={`basic-single ${error && styles.errorCell} ${styles.customSelect}`}
        components={{ IndicatorSeparator: () => null }}

    />
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