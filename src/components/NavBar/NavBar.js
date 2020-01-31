import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'

export default class NavBar extends React.Component {
    state = {
        expanded: false
    }

    showMobile() {
        if (window.innerWidth >= 970) {
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
            <div className='nav-wrap'>
                <button className={`burger`} onClick={() => this.setState({ expanded: true })}><i className="fas fa-bars"></i></button>
                <nav role="navigation" className={`App__nav ${this.state.expanded ? 'show': ''}`} >
                    <h1 className="NavBar__logo">Logo</h1>
                    <ul className="tab-list">
                        <NavLink to="/main" className="tab">
                            <li className="tab-content">
                                <i className="fas fa-list-alt"></i>
                                <span className="tab-title">List</span>
                            </li>
                        </NavLink>
                        <NavLink to="/completed" className="tab">
                            <li className="tab-content">
                                <i className="fas fa-check-square"></i>
                                <span className="tab-title">Completed</span>
                            </li>
                        </NavLink>
                        <NavLink to="/archive" className="tab">
                            <li className="tab-content">
                                <i className="fas fa-archive"></i>
                                <span className="tab-title">Archive</span>
                            </li>
                        </NavLink>                                       
                        <NavLink to="/dashboard" className="tab">
                            <li className="tab-content">
                                <i className="fas fa-chart-pie"></i>
                                <span className="tab-title">Dashboard</span>
                            </li>
                        </NavLink>
                        <NavLink to="email" className="tab">
                            <li className="tab-content">                       
                                <i className="fas fa-envelope"></i>
                                <span className="tab-title">Templates</span>                        
                            </li>
                        </NavLink>
                        <NavLink to="account" className="tab">
                            <li className="tab-content">
                                <i className="fas fa-user-circle"></i>
                                <span className="tab-title">Account</span>
                            </li>
                        </NavLink>
                    </ul>
                </nav>
                <div className={`overlay ${this.state.expanded ? 'show' : 'hidden'}` } onClick={() => this.setState({ expanded: false })}></div>
            </div>   
            
        )
    }
}