import React from 'react';
import { Input, Select } from '../Utils/Utils'
import styles from './CompletedListTools.module.css'

export default class CompletedListTools extends React.Component {
    render() {
        return (
            <div className={styles.tools}>
                <div>
                    <label htmlFor="search">Search: </label>
                    <Input type="text" id="search" onChange={e => this.props.setQuery(e.target.value)}></Input>
                </div>
            </div>
        )
    }
}