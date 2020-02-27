import React from 'react';
import AppContext from '../../contexts/contexts'
import styles from './EmailTemplate.module.css'

export default class EmailTemplate extends React.Component {
    static contextType = AppContext;

    render() {
        return (
            <div>
                <div className={`${styles.templateItem} ${this.props.current === this.props.id ? styles.current : ''}`} onClick={() => this.props.selectTemplate(this.props.id)}>
                    {this.props.template_name}
                </div>
            </div>
            
        )
    }
}