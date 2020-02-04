import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'

import './Header.css'

const dummyUser = {
    name: 'Zoe'
}

export default class Header extends React.Component {
    handleLogout = () => {
        TokenService.clearAuthToken();

    }

    render() {
        return (   
            <div className='header-container'>
                <h1 className='header-title'>{this.props.title}</h1>
                <div className="header-details">
                    <span>Welcome, {dummyUser.name} </span>
                    <Link to='/'><span onClick={this.handleLogout}>Log Out</span></Link>
                </div>
            </div>   
        )
    }
}