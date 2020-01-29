import React from 'react';
import NavBar from '../../components/NavBar/NavBar'
import './AddItemPage.css';

export default class AddItemPage extends React.Component {
    render() {
        return (
            <div className="container">
                <main className="content">
                    <h1>Add Item</h1>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}