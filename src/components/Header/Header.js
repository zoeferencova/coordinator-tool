import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/contexts';
import TokenService from '../../services/token-service'
import { Button } from '../Utils/Utils'

import styles from './Header.module.css'

export default class Header extends React.Component {
    static contextType = AppContext;

    //Clears Auth Token and sets App component's state isLoggedIn to false to render the UnauthenticatedApp component
    handleLogout = () => {
        TokenService.clearAuthToken();
        this.context.setLoggedIn(false)
    }
    

    render() {
        return (   
            <div className={styles.headerContainer}>
                <h1 className={styles.headerTitle}>{this.props.title}</h1>
                <div className={styles.headerDetails}>
                    <span>Welcome, {this.context.user.full_name} </span>
                    <Link to='/'><Button onClick={this.handleLogout}>Log Out</Button></Link>
                </div>
            </div>   
        )
    }
}