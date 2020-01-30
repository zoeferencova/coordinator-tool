import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './ArchivePage.css'
import ArchiveItem from '../../components/ArchiveItem/ArchiveItem';

const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
const dummyItem = {
        id: 1,
        date: new Date().toLocaleDateString("en-US", dateOptions),
        summary: 'Summary'
}

const rowNumber = 10;

export default class ArchivePage extends React.Component {
    generateItems(item, number) {
        const array = [];
        for (let i=0; i < number; i++) {
            const newId = item.id += 1;
            const newItem = {
                ...item,
                id: newId
            }
            array.push(newItem)
        }
        return array;
    }
    
    renderArchiveItems() {
        const items = this.generateItems(dummyItem, rowNumber)
        return items.map(item => 
            <ArchiveItem
                key={item.id}
                date={item.date}
                summary={item.summary}
            />    
        )
    }
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <h1>Archive</h1>
                    {this.renderArchiveItems()}
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}