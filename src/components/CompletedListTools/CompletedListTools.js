import React from 'react';
import './CompletedListTools.css'

export default class CompletedListTools extends React.Component {
    render() {
        return (
            <div className="tools">
                <div>
                    <label htmlFor="search">Search: </label>
                    <input type="text" id="search" onChange={e => this.props.setQuery(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="sort">Sort by: </label>
                    <select name="sort" id="sort" onChange={e => this.props.setSort(e.target.value)}>
                        <option value="none"></option>
                        <option value="advisor">Advisor (A-Z)</option>
                        <option value="project">Project Name</option>
                        <option value="pm">PM</option>
                        <option value="date-desc">Date (Newest-Oldest)</option>
                        <option value="date-asc">Date (Oldest-Newest)</option>
                    </select>
                </div>
            </div>
        )
    }
}