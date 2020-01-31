import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header'
import './ArchivePage.css'
import ArchiveItem from '../../components/ArchiveItem/ArchiveItem';

const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
const dummyItem = {
        id: 1,
        date: new Date().toLocaleDateString("en-US", dateOptions),
        summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur'
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
                    <Header title={'Archive'} />
                    {this.renderArchiveItems()}
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}