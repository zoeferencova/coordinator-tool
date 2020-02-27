import React from 'react';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/contexts'
import Button from '../../components/Utils/Utils'
import config from '../../config';

// import styles from './AddItemPage.module.css';

export default class AddItemPage extends React.Component {
    static contextType = AppContext;

    state = {
        numberOfAdvisorInputs: 1,
        error: null
    }

    renderAdvisorInputs = () => {
        const { numberOfAdvisorInputs } = this.state;
        const arr = []
        for (let i=0; i < numberOfAdvisorInputs; i++) {
            arr.push(<div key={i}><div>
                <label htmlFor={`advisor${i}`}>Advisor Name: </label>
                <input type="text" name={`advisor${i}`} id={`advisor${i}`}></input>
            </div>
            <div>
                <label htmlFor={`advisor${i}_url`}>Advisor URL: </label>
                <input type="text" name={`advisor${i}_url`} id={`advisor${i}_url`}></input>
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
        for (let i=0; i < this.state.numberOfAdvisorInputs; i++) {
            const project = e.target.project.value.trim();
            const project_url = e.target.project_url.value;
            const advisor = document.getElementById(`advisor${i}`).value.trim();
            const advisor_url = document.getElementById(`advisor${i}_url`).value;
            const pm = this.context.pms.find(pm => pm.pm_name === e.target.pm.value);
            let pm_id;
            pm === undefined ? pm_id = '' : pm_id = pm.id;
            const notes = e.target.notes.value;
            
            const item = { project, project_url, advisor, advisor_url, pm_id, notes, status: 'none' }
            
            fetch(`${config.API_ENDPOINT}/list`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                },
                body: JSON.stringify(item)
            })
                .then(res => 
                    (!res.ok)
                        ? res.json().then(e => Promise.reject(e))
                        : res.json()
                )
                .then(item => this.handlePostSuccess(item))
                .catch(res => {
                    this.setState({ error: res.error.message })
                })
            }
    }

    handlePostSuccess = (item) => {
        this.context.addItem(item)
        this.props.history.push('/main')
    }

    componentWillUnmount() {
        this.setState({numberOfAdvisorInputs: 1})
    }

    render() {
        return (
            <div className="container">
                
                <main className="content">
                    <Header title='Add Item' />
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={e => this.handlePostItem(e)}>
                        <div>
                            <label htmlFor="project">Project Name: </label>
                            <input type="text" name='project' id='project'></input>
                        </div>
                        <div>
                            <label htmlFor="project_url">Project URL: </label>
                            <input type="text" name='project_url' id='project_url'></input>
                        </div>
                        <br></br>
                        {this.renderAdvisorInputs()}
                        <Button onClick={e => this.setAdvisorInputNumber(e)}>+ Additional Advisors</Button>
                        <br></br><br></br>
                        <div>
                            <label htmlFor="pm">Project Manager: </label>
                            <select name="pm" id="pm" >
                                <option value='none'></option>
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
                            <Link to='/main'><Button>Cancel</Button></Link>
                            <Button type='submit'>Add Item</Button>
                        </div>
                    </form>

                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}