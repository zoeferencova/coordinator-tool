import React from 'react';
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import './AccountPage.css'
import NavBar from '../../components/NavBar/NavBar';
import config from '../../config'

export default class AccountPage extends React.Component {
    static contextType = AppContext;
    
    renderPms() {
        return this.context.pms.map(pm => 
            <li key={pm.id}>{pm.pm_name} - <span>{pm.pm_email} </span> <button>Delete</button></li>
        )
    }

    handlePostPm(e) {
        e.preventDefault();
        const pm_name = e.target.pm_name.value;
        const pm_email = e.target.pm_email.value;
        
        const pm = { pm_name, pm_email }
        return fetch(`${config.API_ENDPOINT}/pms`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(pm)
        })
          .then(res => res.json())
          .then(pm => this.context.addPm(pm))
    }
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={'Account'} />
                    <section>
                        <h2>Account Info</h2>
                        <p><strong>Name:</strong> {this.context.user.full_name}</p>
                        <p><strong>Email:</strong> {this.context.user.email}</p>
                    </section>
                    <section>
                        <h2>PM Settings</h2>
                        <h3>Current PMs:</h3>
                        <ul className="pm-list">
                            {this.renderPms()}
                        </ul>
                        <form onSubmit={e => this.handlePostPm(e)}>
                            <div>
                                <label htmlFor="pm_name">Name: </label>
                                <input type="text" id="pm_name"></input>
                            </div>
                            <div>
                                <label htmlFor="pm_email">Email: </label>
                                <input type="text" id="pm_email"></input>
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