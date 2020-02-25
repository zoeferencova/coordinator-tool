import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css';

export default class NavBar extends React.Component {
    state = {
        expanded: false
    }

    showMobile() {
        if (window.innerWidth >= 945) {
            if (this.state.expanded) {
                return 'show'
            } else {
                return 'hidden'
            }
        }
        return 'show'
    }

    render() {
        return (   
            <div className={styles.navWrap}>
                <button className={`${this.state.expanded ? styles.hide : ''} ${styles.burger} `} onClick={() => this.setState({ expanded: true })}><i className="fas fa-bars"></i></button>
                <nav role="navigation" className={`${styles.nav} ${this.state.expanded ? styles.show : ''}`} >
                    <img src={require("../../images/coordinator-logo.png")} className={styles.logo}></img>
                    <ul className={styles.tabList}>
                        <NavLink to="/main" className={styles.tab}>
                            <li className={styles.tabContent}>
                                <i className="fas fa-list-alt"></i>
                                <span className={styles.tabTitle}>List</span>
                            </li>
                        </NavLink>
                        <NavLink to="/completed" className={styles.tab}>
                            <li className={styles.tabContent}>
                                <i className="fas fa-check-square"></i>
                                <span className={styles.tabTitle}>Completed</span>
                            </li>
                        </NavLink>                                  
                        <NavLink to="/dashboard" className={styles.tab}>
                            <li className={styles.tabContent}>
                                <i className="fas fa-chart-pie"></i>
                                <span className={styles.tabTitle}>Dashboard</span>
                            </li>
                        </NavLink>
                        <NavLink to="email" className={styles.tab}>
                            <li className={styles.tabContent}>                       
                                <i className="fas fa-envelope"></i>
                                <span className={styles.tabTitle}>Templates</span>                        
                            </li>
                        </NavLink>
                        <NavLink to="account" className={styles.tab}>
                            <li className={styles.tabContent}>
                                <i className="fas fa-user-circle"></i>
                                <span className={styles.tabTitle}>Account</span>
                            </li>
                        </NavLink>
                    </ul>
                </nav>
                <div className={`${styles.overlay} ${this.state.expanded ? styles.show : styles.hidden}` } onClick={() => this.setState({ expanded: false })}></div>
            </div>   
            
        )
    }
}