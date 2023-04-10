import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/contexts'
import { Button, Select, Input, Textarea } from '../../components/Utils/Utils'
import ListService from '../../services/list-service';

import styles from './AddItemPage.module.css';

const AddItemPage = () => {
    const context = useContext(AppContext);
    const [contactInputCount, setContactInputCount] = useState(1);
    const [error, setError] = useState('');
    const [pmError, setPmError] = useState('');

    const navigate = useNavigate()

    //Renders contact name and contact url form inputs based on the number of contact inputs from state
    //For cases where user has multiple contacts to reach out to on the same project to avoid having to add an individual list item for each contact manually
    const renderContactInputs = () => {
        const arr = []
        for (let i = 0; i < contactInputCount; i++) {
            arr.push(<div key={i} className={styles.formSection}><div className={styles.formPair}>
                <label htmlFor={`contact${i}`}>Contact Name</label>
                <Input required={i === 0 ? true : false} type="text" name={`contact${i}`} id={`contact${i}`}></Input>
            </div>
                <div className={styles.formPair}>
                    <label htmlFor={`contact${i}_url`}>Contact URL (optional)</label>
                    <Input type="text" name={`contact${i}_url`} id={`contact${i}_url`}></Input>
                </div></div>)
        }

        return arr;
    }

    //Post request for list item(s)
    //If multiple contacts exist in the form, a separate post request is sent for each contact
    //If there is a blank contact input it is ignored
    //If the project url or advisor url values do not begin with https:// or http:// it is added to the value to create a valid URL
    const handlePostItem = e => {
        e.preventDefault();
        for (let i = 0; i < contactInputCount; i++) {
            const project = e.target.project.value.trim();
            const project_url = (!e.target.project_url.value.includes('https://' || 'http://') && e.target.project_url.value.length !== 0) ? `https://${e.target.project_url.value}` : e.target.project_url.value;
            const contact = document.getElementById(`contact${i}`).value.trim();
            const contact_url = document.getElementById(`contact${i}_url`).value;
            const fixedContactUrl = (!contact_url.includes('https://' || 'http://') && contact_url.length !== 0) ? `https://${contact_url}` : contact_url;
            const pm = context.pms.find(pm => pm.pm_name === e.target.pm.value);
            let pm_id;
            pm === undefined ? pm_id = '' : pm_id = pm.id;
            const notes = e.target.notes.value;

            const item = { project, project_url, contact, contact_url: fixedContactUrl, pm_id, notes, status: 'none' }
            if (item.contact !== '' && item.project !== '' && item.pm_id !== '') {
                ListService.addItem(item)
                    .then(res => !res.ok ? res.json().then(e => Promise.reject(e)) : res.json())
                    .then(item => {
                        context.addItem(item)
                        navigate('/main')
                    })
                    .catch(res => {
                        res.error.message === `Missing 'pm_id' in request body` ?
                            setError('Please select a PM')
                            : setError(res.error.message)
                    })
            } else if (item.pm_id === '') {
                setPmError('Please select a PM')
            }
        }
    }

    return (
        <div className="container">
            <main className="content">
                <Header title='Add Item' />
                {error && <p>{error}</p>}
                <form onSubmit={e => handlePostItem(e)}>
                    <div className={styles.formSection}>
                        <div className={styles.formPair}>
                            <label htmlFor="project">Project Name</label>
                            <Input required type="text" name='project' id='project'></Input>
                        </div>
                        <div className={styles.formPair}>
                            <label htmlFor="project_url">Project URL (optional)</label>
                            <Input type="text" name='project_url' id='project_url'></Input>
                        </div>
                    </div>
                    {renderContactInputs()}
                    <Button onClick={e => { e.preventDefault(); setContactInputCount(contactInputCount + 1) }}>+ Additional Contacts</Button>
                    <div className={`${styles.pm} ${pmError && styles.pmError}`}>
                        <label htmlFor="pm">Project Manager: </label>
                        <Select name="pm" id="pm" onChange={() => setPmError(null)}>
                            <option value='none'></option>
                            {context.pms.map(pm =>
                                <option value={pm.pm_name} key={pm.id} >{pm.pm_name}</option>
                            )}
                        </Select>
                        <div className={styles.pmError}><span>{pmError && pmError}</span></div>
                    </div>
                    <div className={styles.formSection}>
                        <label htmlFor="notes" className={styles.notesLabel}>Notes: </label>
                        <Textarea name="notes" id="notes" className={styles.notes}></Textarea>
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

export default AddItemPage;