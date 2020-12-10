import React from 'react';
import { Input } from '../Utils/Utils'
import styles from './CompletedListTools.module.css'

export default class CompletedListTools extends React.Component {
    render() {
        return (
            <div className={styles.tools}>
                <div>
                    <label htmlFor="search" className={styles.hide}>Search: </label>
                    <Input type="text" id="search" placeholder="Search"  onChange={e => this.props.setQuery(e.target.value)}></Input>
                </div>
            </div>
        )
    }
}