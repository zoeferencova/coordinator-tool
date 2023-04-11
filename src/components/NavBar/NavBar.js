import React, { useState, useContext } from 'react';
import AppContext from '../../contexts/contexts';
import { NavLink } from 'react-router-dom';
import { ProfilePicture, userIcon, toDoNavIcon, completedNavIcon, dashboardNavIcon, templateNavIcon } from '../Utils/Utils';

import styles from './NavBar.module.css';

const NavBar = ({ navOpen, setNavOpen }) => {
    const context = useContext(AppContext);

    return (
        <div className={styles.navWrap}>
            <nav role="navigation" className={`${styles.nav} ${navOpen ? styles.show : styles.hide}`} >
                <img src={require("../../images/logo.png")} alt="logo" className={styles.logo}></img>
                <ul className={styles.tabList}>
                    <NavLink to="/main" className={styles.tab} onClick={() => setNavOpen(false)}>
                        <li className={styles.tabContent}>
                            {toDoNavIcon}
                            <span className={styles.tabTitle}>To do</span>
                        </li>
                    </NavLink>
                    <NavLink to="/completed" className={styles.tab} onClick={() => setNavOpen(false)}>
                        <li className={styles.tabContent}>
                            {completedNavIcon}
                            <span className={styles.tabTitle}>Completed</span>
                        </li>
                    </NavLink>
                    <NavLink to="/dashboard" className={styles.tab} onClick={() => setNavOpen(false)}>
                        <li className={styles.tabContent}>
                            {dashboardNavIcon}
                            <span className={styles.tabTitle}>Dashboard</span>
                        </li>
                    </NavLink>
                    <NavLink to="/templates" className={styles.tab} onClick={() => setNavOpen(false)}>
                        <li className={styles.tabContent}>
                            {templateNavIcon}
                            <span className={styles.tabTitle}>Templates</span>
                        </li>
                    </NavLink>
                    <NavLink to="/account" className={`${styles.tab} ${styles.account}`} onClick={() => setNavOpen(false)}>
                        <li className={styles.tabContent}>
                            {!context.loading && <ProfilePicture full_name={context.user.full_name} />}
                            <span className={styles.tabTitle}>{context.user.full_name}</span>
                        </li>
                    </NavLink>
                </ul>
            </nav>
        </div>

    )
}

export default NavBar;