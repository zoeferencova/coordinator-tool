import React from 'react';
import './AccountPage.css'
import NavBar from '../../components/NavBar/NavBar';

const dummyAccount = {
    name: 'Zoe Ferencova',
    email: 'zoeferencova@gmail.com'
}

const dummyPms = [
    {
        id: 1,
        name: 'James Park',
        email: 'jamespark@gmail.com'
    },
    {
        id: 2,
        name: 'Robin Hurst',
        email: 'robinhurst@gmail.com'
    },
    {
        id: 3,
        name: 'Petr Ferenc',
        email: 'pferi@gmail.com'
    },
]

export default class AccountPage extends React.Component {
    renderPms() {
        return dummyPms.map(pm => 
            <li key={pm.id}>{pm.name} - <span>{pm.email} </span><button>Edit</button> <button>Delete</button></li>
        )
    }
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <h1>Account</h1>
                    <section>
                        <h2>Account Info</h2>
                        <p><strong>Name:</strong> {dummyAccount.name}</p>
                        <p><strong>Email:</strong> {dummyAccount.email}</p>
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