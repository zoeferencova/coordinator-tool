import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './OnboardingModal.module.css';
import { closeIcon, chevronDownIcon, chevronUpIcon, plusIcon, checkIconLight } from '../Utils/Utils';

const onboardingItems = [
    {
        title: "Add your PMs",
        subtitle: "Add the names and emails of the PMs you support.",
        link: "/account",
        linkText: "Add PM"
    },
    {
        title: "Add your first email template",
        subtitle: "Use these to automate email composition from your list items.",
        link: "/new-template",
        linkText: "Add template"
    },
    {
        title: "Create your first list item",
        subtitle: "Add details for your contacts and include CRM links for quick access.",
        link: "/add-item",
        linkText: "Add item"
    },
    {
        title: "Send your first email",
        subtitle: `Hover over a list item and click the envelope icon, then select from your templates.`,
        link: null,
        linkText: null
    },
]

const OnboardingItem = ({ title, subtitle, link, linkText, currentItem, index, setCurrentItem, setCollapsed }) => (
    <div className={`${styles.listItem} ${currentItem > index ? styles.done : ''}`}>
        <div onClick={() => setCurrentItem(index + 1)} className={styles.circle}>{currentItem > index && checkIconLight}</div>
        <div className={styles.details}>
            <h5 onClick={() => setCurrentItem(index)}>{title}</h5>
            {index === currentItem &&
                <div>
                    <p>{subtitle}</p>
                    {link && <Link onClick={() => setCollapsed(true)} to={link}>{plusIcon} {linkText}</Link>}
                </div>
            }
        </div>

    </div>
)

const OnboardingModal = ({ closeOnboarding }) => {
    const [collapsed, setCollapsed] = useState(false)
    const [currentItem, setCurrentItem] = useState(0)

    return (
        <div className={`${styles.container} ${collapsed ? styles.collapsed : ''}`}>
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <div>
                        <h4>Quick start checklist</h4>
                        <button onClick={() => setCollapsed(!collapsed)}>{collapsed ? chevronUpIcon : chevronDownIcon}</button>
                    </div>
                    <button onClick={closeOnboarding}>{closeIcon}</button>
                </div>
                <div className={styles.progress}>
                    <div style={{ width: `${(currentItem / onboardingItems.length * 100)}%` }} className={styles.progressInner}></div>
                </div>
            </div>
            {!collapsed &&
                <div className={styles.list}>
                    {onboardingItems.map((item, i) => <OnboardingItem index={i} title={item.title} subtitle={item.subtitle} link={item.link} linkText={item.linkText} currentItem={currentItem} setCurrentItem={setCurrentItem} setCollapsed={setCollapsed} />)}
                </div>
            }
        </div>

    )
}

export default OnboardingModal;