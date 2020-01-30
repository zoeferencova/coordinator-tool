import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

const dummyUser = {
    name: 'Zoe'
}

export default class Header extends React.Component {
    render() {
        return (   
            <div className='header-container'>
                <h1 className='header-title'>{this.props.title}</h1>
                <div className="header-details">
                    <span>Welcome, {dummyUser.name} </span>
                    <span><Link to="/">Log Out</Link></span>
                </div>
            </div>   
        )
    }
}