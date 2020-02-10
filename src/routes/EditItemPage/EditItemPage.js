import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import { Link } from 'react-router-dom'
import './EditItemPage.css';
import config from '../../config'

export default class EditItemPage extends React.Component {
    static contextType = AppContext;
    
    state = {
        inputValues: {}
    }

    componentDidMount() {
        const itemId = this.props.match.params.id;
        fetch(`${config.API_ENDPOINT}/list/${itemId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => res.json())
            .then(resJson => this.setState({ inputValues: resJson }))
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

    handlePatchItem(e) {
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/list/${this.props.match.params.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(this.state.inputValues)
        })
            .then(res => this.context.updateItem(this.state.inputValues))
            .then(this.setState({ inputValues: {} }))
            .then(this.props.history.push('/main'))
            
    }

    handleChangeProject = val => {
        this.setState({ inputValues: { ...this.state.inputValues, project: val } })
    }

    handleChangeAdvisor = val => {
        this.setState({ inputValues: {...this.state.inputValues, advisor: val } })
    }

    handleChangePm = val => {
        this.setState({ inputValues: { ...this.state.inputValues, pm_name: val } })
    }

    handleChangeNotes = val => {
        this.setState({ inputValues: { ...this.state.inputValues, notes: val } })
    }
    
    render() {
        return (
            <div className="container">
                
                <main className="content">
                    <Header title='Edit Item' />
                    <form onSubmit={e => this.handlePatchItem(e)}>
                        <div>
                            <label htmlFor="proj-name">Project Name: </label>
                            <input type="text" name='proj-name' id='proj-name' defaultValue={this.state.inputValues.project|| ''} onChange={e => this.handleChangeProject(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="proj-url">Project URL: </label>
                            <input type="text" name='proj-url' id='proj-url' ></input>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <label htmlFor="adv-name">Advisor Name: </label>
                            <input type="text" name='adv-name' id='adv-name' defaultValue={this.state.inputValues.advisor || ''} onChange={e => this.handleChangeAdvisor(e.target.value)}></input>
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
                            <select name="pm" id="pm" defaultValue={this.state.inputValues.pm_name} onChange={e => this.handleChangePm(e.target.value)}>
                                <option value={'none'}></option>
                                {this.context.pms.map(pm => 
                                     <option value={pm.pm_name}>{pm.pm_name}</option>
                                )}                            
                                </select>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="notes">Notes: </label>
                            <textarea name="notes" id="notes" cols="30" rows="5" defaultValue={this.state.inputValues.notes || ''} onChange={e => this.handleChangeNotes(e.target.value)}></textarea>
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