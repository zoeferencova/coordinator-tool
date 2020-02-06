import React from 'react';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/contexts'
import './AddItemPage.css';

export default class AddItemPage extends React.Component {
    static contextType = AppContext;

    state = {
        numberOfAdvisorInputs: 1
    }

    renderAdvisorInputs = () => {
        const { numberOfAdvisorInputs } = this.state;
        const arr = []
        for (let i=0; i < numberOfAdvisorInputs; i++) {
            arr.push(<div><div>
                <label htmlFor="adv-name">Advisor Name: </label>
                <input type="text" name='adv-name' id='adv-name'></input>
            </div>
            <div>
                <label htmlFor="adv-url">Advisor URL: </label>
                <input type="text" name='adv-url' id='adv-url'></input>
            </div><br></br></div>)
        }

        return arr;
    }

    setAdvisorInputNumber = e => {
        e.preventDefault()
        let newNumber = this.state.numberOfAdvisorInputs + 1;
        this.setState({ numberOfAdvisorInputs: newNumber })
    }

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
                        {this.renderAdvisorInputs()}
                        <button onClick={e => this.setAdvisorInputNumber(e)}>+ Additional Advisors</button>
                        <br></br><br></br>
                        <div>
                            <label htmlFor="pm">Project Manager: </label>
                            <select name="pm" id="pm" >
                                <option></option>
                                {this.context.pms.map(pm => 
                                     <option value={pm.name}>{pm.name}</option>
                                )}
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