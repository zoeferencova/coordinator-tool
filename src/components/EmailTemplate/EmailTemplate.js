import React from 'react';
import ReactDOM from 'react-dom';
import config from '../../config'
import AppContext from '../../contexts/contexts'
import styles from './EmailTemplate.module.css'
import Button from '../Utils/Utils';

export default class EmailTemplate extends React.Component {
    static contextType = AppContext;
    
    render() {
        return (
            <div>
                <div className={styles.templateItem} onClick={() => this.props.selectTemplate(this.props.id)}>
                    {this.props.template_name}
                </div>
            </div>
            
        )
    }
}