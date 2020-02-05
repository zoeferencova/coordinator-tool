import React from 'react';
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import './AccountPage.css'
import NavBar from '../../components/NavBar/NavBar';

export default class AccountPage extends React.Component {
    static contextType = AppContext;
    
    renderPms() {
        return this.context.pms.map(pm => 
            <li key={pm.id}>{pm.name} - <span>{pm.email} </span><button>Edit</button> <button>Delete</button></li>
        )
    }
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={'Account'} />
                    <section>
                        <h2>Account Info</h2>
                        <p><strong>Name:</strong> {this.context.user.name}</p>
                        <p><strong>Email:</strong> {this.context.user.email}</p>
                    </section>
                    <section>
                        <h2>PM Settings</h2>
                        <h3>Current PMs:</h3>
                        <ul className="pm-list">
                            {this.renderPms()}
                        </ul>
                        <form>
                            <div>
                                <label htmlFor="pm-name">Name: </label>
                                <input type="text" id="pm-name"></input>
                            </div>
                            <div>
                                <label htmlFor="pm-email">Email: </label>
                                <input type="text" id="pm-email"></input>
                            </div>
                            <button type="submit">Add PM</button>
                        </form>
                    </section>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}