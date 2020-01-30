import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'

export default class NavBar extends React.Component {
    
    render() {
        return (      
            <nav role="navigation">
                <h1 className="NavBar__logo">Logo</h1>
                <ul className="tab-list">
                    <li className="tab">
                        <NavLink to="/main">
                            <i className="fas fa-list-alt"></i>
                            <span className="tab-title">List</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="/completed">
                            <i className="fas fa-check-square"></i>
                            <span className="tab-title">Completed</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="/archive">
                            <i className="fas fa-archive"></i>
                            <span className="tab-title">Archive</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="/dashboard">
                            <i className="fas fa-chart-pie"></i>
                            <span className="tab-title">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="email">
                            <i className="fas fa-envelope"></i>
                            <span className="tab-title">Templates</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="account">
                            <i className="fas fa-user-circle"></i>
                            <span className="tab-title">Account</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}