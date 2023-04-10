import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { listIcon, checkIcon, chartIcon, emailIcon, userIcon } from '../Utils/Utils';

import styles from './NavBar.module.css';

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={styles.navWrap}>
            <button className={`${expanded ? styles.hide : undefined} ${styles.burger} `} onClick={() => setExpanded(true)}>
                <i className="fas fa-bars"></i>
            </button>
            <nav role="navigation" className={`${styles.nav} ${expanded ? styles.show : undefined}`} >
                <img src={require("../../images/new-logo.png")} alt="logo" className={styles.logo}></img>
                <ul className={styles.tabList}>
                    <NavLink to="/main" className={styles.tab}>
                        <li className={styles.tabContent}>
                            {listIcon}
                            <span className={styles.tabTitle}>List</span>
                        </li>
                    </NavLink>
                    <NavLink to="/completed" className={styles.tab}>
                        <li className={styles.tabContent}>
                            {checkIcon}
                            <span className={styles.tabTitle}>Completed</span>
                        </li>
                    </NavLink>
                    <NavLink to="/dashboard" className={styles.tab}>
                        <li className={styles.tabContent}>
                            {chartIcon}
                            <span className={styles.tabTitle}>Dashboard</span>
                        </li>
                    </NavLink>
                    <NavLink to="/templates" className={styles.tab}>
                        <li className={styles.tabContent}>
                            {emailIcon}
                            <span className={styles.tabTitle}>Templates</span>
                        </li>
                    </NavLink>
                    <NavLink to="/account" className={styles.tab}>
                        <li className={styles.tabContent}>
                            {userIcon}
                            <span className={styles.tabTitle}>Account</span>
                        </li>
                    </NavLink>
                </ul>
            </nav>
            <div className={`${styles.overlay} ${expanded ? styles.show : styles.hidden}`} onClick={() => setExpanded(false)}></div>
        </div>

    )
}

export default NavBar;