import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/contexts'
import { Link } from 'react-router-dom'
import { ButtonDark, ButtonLight, Input, Textarea, Select } from '../../components/Utils/Utils'
import ListService from '../../services/list-service';

import styles from '../AddItemPage/AddItemPage.module.css'

const EditItemPage = () => {
    const context = useContext(AppContext);
    const [inputValues, setInputValues] = useState({});
    const [error, setError] = useState('');
    const [pmError, setPmError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const itemId = +id;
        setInputValues(context.listItems.find(item => item.id === itemId))
    }, [context.listItems, id])

    const handlePatchItem = e => {
        e.preventDefault()
        const pm = context.pms.find(pm => pm.pm_name === inputValues.pm_name)
        let pmId;
        pm === undefined ? pmId = '' : pmId = pm.id;

        const updateValues = { ...inputValues, pm_id: pmId }
        const fixedProjectUrl = (!inputValues.project_url.includes('https://' || 'http://') && inputValues.project_url.length !== 0) ? `https://${inputValues.project_url}` : inputValues.project_url;
        const fixedContactUrl = (!inputValues.contact_url.includes('https://' || 'http://') && inputValues.contact_url.length !== 0) ? `https://${inputValues.contact_url}` : inputValues.contact_url;
        updateValues.project_url = fixedProjectUrl;
        updateValues.contact_url = fixedContactUrl;

        setInputValues({ ...inputValues, project_url: fixedProjectUrl, contact_url: fixedContactUrl })

        delete updateValues.pm_name;
        delete updateValues.pm_email;

        if (updateValues.project !== '' && updateValues.contact !== '' && updateValues.pm_id !== '') {
            ListService.updateItem(updateValues, id)
                .then(res => !res.ok ? res.json().then(e => Promise.reject(e)) : handlePatchSuccess())
                .catch(res => setError(res.error.message))
        } else if (updateValues.pm_id === '') {
            setPmError('Please select a PM')
        }
    }

    const handlePatchSuccess = () => {
        context.updateItem(inputValues)
        setInputValues({})
        navigate('/main')
    }

    return (
        <div className="container">
            <main className="content">
                {error && <p>{error}</p>}
                <form onSubmit={e => handlePatchItem(e)}>
                    <div className={styles.formSection}>
                        <div className={styles.formPair}>
                            <label htmlFor="project">Project Name</label>
                            <Input required type="text" name='project' id='project' defaultValue={inputValues.project} onChange={e => setInputValues({ ...inputValues, project: e.target.value.trim() })}></Input>
                        </div>
                        <div className={styles.formPair}>
                            <label htmlFor="project_url">Project URL (optional)</label>
                            <Input type="text" name='project_url' id='project_url' defaultValue={inputValues.project_url} onChange={e => setInputValues({ ...inputValues, project_url: e.target.value })}></Input>
                        </div>
                    </div>
                    <div className={styles.formSection}>
                        <div className={styles.formPair}>
                            <label htmlFor="adv-name">Contact Name</label>
                            <Input required type="text" name='adv-name' id='adv-name' defaultValue={inputValues.contact} onChange={e => setInputValues({ ...inputValues, contact: e.target.value.trim() })}></Input>
                        </div>
                        <div className={styles.formPair}>
                            <label htmlFor="adv-url">Contact URL (optional)</label>
                            <Input type="text" name='adv-url' id='adv-url' defaultValue={inputValues.contact_url} onChange={e => setInputValues({ ...inputValues, contact_url: e.target.value })}></Input>
                        </div>
                    </div>

                    <div className={`${styles.pm} ${pmError && styles.pmError}`}>
                        <label htmlFor="pm">Project Manager: </label>
                        <Select name="pm" id="pm" value={inputValues.pm_name} onChange={e => { setInputValues({ ...inputValues, pm_name: e.target.value }); setPmError(null) }}>
                            <option value='none'></option>
                            {context.pms.map(pm => <option value={pm.pm_name} key={pm.id} >{pm.pm_name}</option>)}
                        </Select>
                        <div className={styles.pmError}><span>{pmError && pmError}</span></div>
                    </div>
                    <div className={styles.formSection}>
                        <label htmlFor="notes" className={styles.notesLabel}>Notes: </label>
                        <Textarea name="notes" id="notes" className={styles.notes} defaultValue={inputValues.notes} onChange={e => setInputValues({ ...inputValues, notes: e.target.value })}></Textarea>
                    </div>
                    <div>
                        <Link to='/main'><ButtonLight>Cancel</ButtonLight></Link>
                        <ButtonDark type='submit'>Save</ButtonDark>
                    </div>
                </form>

            </main>
        </div>
    )
}

export default EditItemPage;