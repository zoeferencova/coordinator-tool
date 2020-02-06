import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import { Link } from 'react-router-dom'
import './EditItemPage.css';

export default class EditItemPage extends React.Component {
    static contextType = AppContext;
    
    state = {
        numberOfAdvisorInputs: 0
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
                    <Header title='Edit Item' />
                    <form>
                        <div>
                            <label htmlFor="proj-name">Project Name: </label>
                            <input type="text" name='proj-name' id='proj-name' defaultValue={this.props.location.itemProps.project || ''}></input>
                        </div>
                        <div>
                            <label htmlFor="proj-url">Project URL: </label>
                            <input type="text" name='proj-url' id='proj-url' ></input>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <label htmlFor="adv-name">Advisor Name: </label>
                            <input type="text" name='adv-name' id='adv-name' defaultValue={this.props.location.itemProps.advisor || ''}></input>
                        </div>
                        <div>
                            <label htmlFor="adv-url">Advisor URL: </label>
                            <input type="text" name='adv-url' id='adv-url'></input>
                        </div><br></br>
                        {this.renderAdvisorInputs()}
                        <button onClick={e => this.setAdvisorInputNumber(e)}>+ Additional Advisors</button>
                        <br></br><br></br>
                        <br></br>
                        <div>
                            <label htmlFor="pm">Project Manager: </label>
                            <select name="pm" id="pm" defaultValue={this.props.location.itemProps.pm.name}>
                                <option value={'none'}></option>
                                {this.context.pms.map((pm, i ) => <option key={i} value={pm.name}>{pm.name}</option>)}
                            </select>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="notes">Notes: </label>
                            <textarea name="notes" id="notes" cols="30" rows="5" defaultValue={this.props.location.itemProps.notes || ''}></textarea>
                        </div>
                        <div>
                            <Link to='/main'><button>Cancel</button></Link>
                            <button type='submit'>Save</button>
                        </div>
                    </form>

                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}