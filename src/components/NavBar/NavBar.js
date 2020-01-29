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
                            <i className="fas fa-list-alt active"></i>
                            <span className="tab-title active">List</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="/completed">
                            <i className="fas fa-check-square inactive"></i>
                            <span className="tab-title inactive">Completed</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="/archive">
                            <i className="fas fa-archive inactive"></i>
                            <span className="tab-title inactive">Archive</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="/dashboard">
                            <i className="fas fa-chart-pie inactive"></i>
                            <span className="tab-title inactive">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="email">
                            <i className="fas fa-envelope inactive"></i>
                            <span className="tab-title inactive">Templates</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="account">
                            <i className="fas fa-user-circle inactive"></i>
                            <span className="tab-title inactive">Account</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}