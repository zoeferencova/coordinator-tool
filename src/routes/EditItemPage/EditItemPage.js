import React from 'react';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import { Link } from 'react-router-dom'
import Button from '../../components/Utils/Utils'

import './EditItemPage.css';
import config from '../../config'

export default class EditItemPage extends React.Component {
    static contextType = AppContext;
    
    state = {
        inputValues: {},
        error: null
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

    handlePatchItem(e) {
        const pm = this.context.pms.find(pm => pm.pm_name === this.state.inputValues.pm_name)
        let pmId;
        pm === undefined ? pmId = '' : pmId = pm.id;
        const updateValues = {...this.state.inputValues, pm_id: pmId }

        delete updateValues.pm_name;
        delete updateValues.pm_email;

        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/list/${this.props.match.params.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(updateValues)
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : this.handlePatchSuccess()
            )
            .catch(res => {
                this.setState({ error: res.error.message })
            })
    }

    handlePatchSuccess = () => {
        this.context.updateItem(this.state.inputValues)
        this.setState({ inputValues: {} })
        this.props.history.push('/main')
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

    handleChangeAdvisorURL = val => {
        this.setState({ inputValues: { ...this.state.inputValues, advisor_url: val } })
    }

    handleChangeProjectURL = val => {
        this.setState({ inputValues: { ...this.state.inputValues, project_url: val } })
    }
    
    render() {
        return (
            <div className="container">
                
                <main className="content">
                    <Header title='Edit Item' />
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={e => this.handlePatchItem(e)}>
                        <div>
                            <label htmlFor="proj-name">Project Name: </label>
                            <input type="text" name='proj-name' id='proj-name' defaultValue={this.state.inputValues.project|| ''} onChange={e => this.handleChangeProject(e.target.value.trim())}></input>
                        </div>
                        <div>
                            <label htmlFor="proj-url">Project URL: </label>
                            <input type="text" name='proj-url' id='proj-url' defaultValue={this.state.inputValues.project_url || ''} onChange={e => this.handleChangeProjectURL(e.target.value)}></input>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <label htmlFor="adv-name">Advisor Name: </label>
                            <input type="text" name='adv-name' id='adv-name' defaultValue={this.state.inputValues.advisor || ''} onChange={e => this.handleChangeAdvisor(e.target.value.trim())}></input>
                        </div>
                        <div>
                            <label htmlFor="adv-url">Advisor URL: </label>
                            <input type="text" name='adv-url' id='adv-url' defaultValue={this.state.inputValues.advisor_url || ''} onChange={e => this.handleChangeAdvisorURL(e.target.value)}></input>
                        </div><br></br>
                        <br></br><br></br>
                        <br></br>
                        <div>
                            <label htmlFor="pm">Project Manager: </label>
                            <select name="pm" id="pm" value={this.state.inputValues.pm_name} onChange={e => this.handleChangePm(e.target.value)}>
                                <option value={'none'}></option>
                                {this.context.pms.map(pm => 
                                     <option value={pm.pm_name} key={pm.id}>{pm.pm_name}</option>
                                )}                            
                                </select>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="notes">Notes: </label>
                            <textarea name="notes" id="notes" cols="30" rows="5" defaultValue={this.state.inputValues.notes || ''} onChange={e => this.handleChangeNotes(e.target.value)}></textarea>
                        </div>
                        <div>
                            <Link to='/main'><Button>Cancel</Button></Link>
                            <Button type='submit'>Save</Button>
                        </div>
                    </form>

                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}