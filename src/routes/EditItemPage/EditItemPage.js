import React from 'react';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import { Link } from 'react-router-dom'
import { Button, Input, Textarea, Select } from '../../components/Utils/Utils'
import styles from '../AddItemPage/AddItemPage.module.css'

import config from '../../config'

export default class EditItemPage extends React.Component {
    static contextType = AppContext;
    
    state = {
        inputValues: {},
        error: null,
        pmError: null,
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
        e.preventDefault()
        const pm = this.context.pms.find(pm => pm.pm_name === this.state.inputValues.pm_name)
        let pmId;
        pm === undefined ? pmId = '' : pmId = pm.id;
        const updateValues = {...this.state.inputValues, pm_id: pmId }
        const fixedProjectUrl = (!this.state.inputValues.project_url.includes('https://' || 'http://') && this.state.inputValues.project_url.length !== 0) ? `https://${this.state.inputValues.project_url}` :  this.state.inputValues.project_url;
        const fixedContactUrl = (!this.state.inputValues.contact_url.includes('https://' || 'http://') && this.state.inputValues.contact_url.length !== 0) ? `https://${this.state.inputValues.contact_url}` :  this.state.inputValues.contact_url;
        updateValues.project_url = fixedProjectUrl;
        updateValues.contact_url = fixedContactUrl;
        this.setState({ inputValues: {...this.state.inputValues, project_url: fixedProjectUrl, contact_url: fixedContactUrl} })

        delete updateValues.pm_name;
        delete updateValues.pm_email;

        if (updateValues.project !== '' && updateValues.contact !== '' && updateValues.pm_id !== '') {
            
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
        } else if (updateValues.pm_id === '') {
            this.setState({ pmError: 'Please select a PM' })
        }
       
    }

    handlePatchSuccess = () => {
        this.context.updateItem(this.state.inputValues)
        this.setState({ inputValues: {} })
        this.props.history.push('/main')
    }

    handleChangeProject = val => {
        this.setState({ inputValues: { ...this.state.inputValues, project: val } })
    }

    handleChangeContact = val => {
        this.setState({ inputValues: {...this.state.inputValues, contact: val } })
    }

    handleChangePm = val => {
        this.setState({pmError: null})
        this.setState({ inputValues: { ...this.state.inputValues, pm_name: val } })
    }

    handleChangeNotes = val => {
        this.setState({ inputValues: { ...this.state.inputValues, notes: val } })
    }

    handleChangeContactURL = val => {
        this.setState({ inputValues: { ...this.state.inputValues, contact_url: val } })
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
                        <div className={styles.formSection}>
                            <div className={styles.formPair}>
                                <label htmlFor="project">Project Name</label>
                                <Input required type="text" name='project' id='project' defaultValue={this.state.inputValues.project|| ''} onChange={e => this.handleChangeProject(e.target.value.trim())}></Input>
                            </div>
                            <div className={styles.formPair}>
                                <label htmlFor="project_url">Project URL (optional)</label>
                                <Input type="text" name='project_url' id='project_url' defaultValue={this.state.inputValues.project_url || ''} onChange={e => this.handleChangeProjectURL(e.target.value)}></Input>
                            </div>
                        </div>
                        <div className={styles.formSection}>
                            <div className={styles.formPair}>
                                <label htmlFor="adv-name">Contact Name</label>
                                <Input required type="text" name='adv-name' id='adv-name' defaultValue={this.state.inputValues.contact || ''} onChange={e => this.handleChangeContact(e.target.value.trim())}></Input>
                            </div>
                            <div className={styles.formPair}>
                                <label htmlFor="adv-url">Contact URL (optional)</label>
                                <Input type="text" name='adv-url' id='adv-url' defaultValue={this.state.inputValues.contact_url || ''} onChange={e => this.handleChangeContactURL(e.target.value)}></Input>
                            </div>
                        </div>
                        
                        <div className={`${styles.pm} ${this.state.pmError !== null && styles.pmError}`}>
                            <label htmlFor="pm">Project Manager: </label>
                            <Select name="pm" id="pm" value={this.state.inputValues.pm_name} onChange={e => this.handleChangePm(e.target.value)}>
                                <option value='none'></option>
                                {this.context.pms.map(pm => 
                                     <option value={pm.pm_name} key={pm.id} >{pm.pm_name}</option>
                                )}
                            </Select>
                            <div className={styles.pmError}><span>{this.state.pmError !== null && this.state.pmError}</span></div>
                        </div>
                        <div className={styles.formSection}>
                            <label htmlFor="notes" className={styles.notesLabel}>Notes: </label>
                            <Textarea name="notes" id="notes" className={styles.notes} defaultValue={this.state.inputValues.notes || ''} onChange={e => this.handleChangeNotes(e.target.value)}></Textarea>
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