import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/contexts';
import TokenService from '../../services/token-service'
import config from '../../config'

import './Header.css'

export default class Header extends React.Component {
    static contextType = AppContext;

    handleLogout = () => {
        TokenService.clearAuthToken();
        this.context.setInitialState()
    }
    

    render() {
        return (   
            <div className='header-container'>
                <h1 className='header-title'>{this.props.title}</h1>
                <div className="header-details">
                    <span>Welcome, {this.context.user.full_name} </span>
                    <Link to='/'><span onClick={this.handleLogout}>Log Out</span></Link>
                </div>
            </div>   
        )
    }
}