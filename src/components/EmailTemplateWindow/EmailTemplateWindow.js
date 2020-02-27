
import React from 'react';
import AppContext from '../../contexts/contexts'
import styles from './EmailTemplateWindow.module.css'
import { style } from 'd3';

export default class EmailTemplateWindow extends React.Component {
    static contextType = AppContext;



    handleChangeName = val => {
        this.setState({ inputValues: { ...this.state.inputValues, template_name: val } })
    }

    handleChangeSubject = val => {
        this.setState({ inputValues: {...this.state.inputValues, template_subject: val } })
    }

    handleChangeContent = val => {
        this.setState({ inputValues: { ...this.state.inputValues, template_content: val } })
    }
    
    render() {
        return (
            <div className={style.box}>
                <div className={styles.templateContent} itemkey={this.props.id}>
                    <p className={styles.templateSubject}>{this.props.template_subject}</p>
                    <p className={styles.templateBody}>{this.props.template_content}</p>
                </div>
            </div>
            
        )
    }
}