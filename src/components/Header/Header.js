import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/contexts';
import TokenService from '../../services/token-service'
import { Button } from '../Utils/Utils'

import styles from './Header.module.css'

const Header = ({ title }) => {
    const context = useContext(AppContext);
    const navigate = useNavigate();

    //Clears Auth Token and sets App component's state isLoggedIn to false to render the UnauthenticatedApp component
    const handleLogout = () => {
        TokenService.clearAuthToken();
        context.setLoggedIn(false);
        navigate("/")
    }

    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.headerTitle}>{title}</h1>
            <div className={styles.headerDetails}>
                <span>Welcome, {context.user.full_name} </span>
                <Button onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    )
}

export default Header;