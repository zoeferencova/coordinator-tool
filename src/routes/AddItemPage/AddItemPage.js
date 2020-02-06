import React from 'react';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import './AddItemPage.css';

export default class AddItemPage extends React.Component {
    render() {
        return (
            <div className="container">
                
                <main className="content">
                    <Header title='Add Item' />
                    <form>
                        <div>
                            <label htmlFor="proj-name">Project Name: </label>
                            <input type="text" name='proj-name' id='proj-name'></input>
                        </div>
                        <div>
                            <label htmlFor="proj-url">Project URL: </label>
                            <input type="text" name='proj-url' id='proj-url'></input>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="adv-name">Advisor Name: </label>
                            <input type="text" name='adv-name' id='adv-name'></input>
                        </div>
                        <div>
                            <label htmlFor="adv-url">Advisor URL: </label>
                            <input type="text" name='adv-url' id='adv-url'></input>
                        </div>
                        <button>+ Additional Advisors</button>
                        <br></br>
                        <div>
                            <label htmlFor="pm">Project Manager: </label>
                            <select name="pm" id="pm" >
                                <option value="pm1">PM 1</option>
                                <option value="pm2">PM 2</option>
                                <option value="pm3">PM 3</option>
                            </select>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="notes">Notes: </label>
                            <textarea name="notes" id="notes" cols="30" rows="5"></textarea>
                        </div>
                        <div>
                            <Link to='/main'><button>Cancel</button></Link>
                            <button type='submit'>Add Item</button>
                        </div>
                    </form>

                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}