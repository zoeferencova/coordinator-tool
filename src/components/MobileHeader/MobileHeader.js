import React from 'react';
import { Link } from 'react-router-dom';
import { hamburgerIcon } from '../Utils/Utils';
import styles from './MobileHeader.module.css';

const MobileHeader = ({ navOpen, setNavOpen }) => {
    return (
        <div className={styles.mobileHeader}>
            <Link to="/main"><img src={require("../../images/logo.png")} alt="logo" className={styles.logo}></img></Link>

            <button onClick={() => setNavOpen(!navOpen)}>
                {hamburgerIcon}
            </button>

        </div>

    )
}

export default MobileHeader;