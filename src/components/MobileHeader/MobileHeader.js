import React from 'react';
import { hamburgerIcon } from '../Utils/Utils';
import styles from './MobileHeader.module.css';

const MobileHeader = ({ navOpen, setNavOpen }) => {
    return (
        <div className={styles.mobileHeader}>
            <img src={require("../../images/logo.png")} alt="logo" className={styles.logo}></img>

            <button onClick={() => setNavOpen(!navOpen)}>
                {hamburgerIcon}
            </button>

        </div>

    )
}

export default MobileHeader;