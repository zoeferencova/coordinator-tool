import React from 'react';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import { Link, Redirect } from 'react-router-dom'
import AppContext from '../../contexts/contexts'
import './AddItemPage.css';
import config from '../../config';

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
                <label htmlFor="advisor">Advisor Name: </label>
                <input type="text" name='advisor' id='advisor'></input>
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

    handlePostItem(e) {
        e.preventDefault();
        const project = e.target.project.value;
        const advisor = e.target.advisor.value;
        const pm_id = this.context.pms.find(pm => pm.pm_name === e.target.pm.value).id;
        const notes = e.target.notes.value;
        
        const item = { project, advisor, pm_id, notes, status: 'none' }
        console.log(JSON.stringify(item))
        return fetch(`${config.API_ENDPOINT}/list`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(item)
        })
          .then(res => res.json())
          .then(item => this.context.addItem(item))
          .then(res => this.props.history.push('/main'))
    }

    render() {
        return (
            <div className="container">
                
                <main className="content">
                    <Header title='Add Item' />
                    <form onSubmit={e => this.handlePostItem(e)}>
                        <div>
                            <label htmlFor="project">Project Name: </label>
                            <input type="text" name='project' id='project'></input>
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
                                     <option value={pm.pm_name} key={pm.id}>{pm.pm_name}</option>
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