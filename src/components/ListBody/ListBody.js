import React, { useContext } from 'react';
import AppContext from '../../contexts/contexts';
import ListItem from '../ListItem/ListItem';
import ListService from '../../services/list-service';

import styles from './ListBody.module.css'


const ListBody = ({ tab, setEmailFormItem, currentSort, searchQuery }) => {
    const context = useContext(AppContext);

    let list;

    if (tab === "main") {
        list = ListService.sortItems(context.listItems.map(item => <ListItem key={item.id} tab={tab} setEmailFormItem={setEmailFormItem} item={item} />), currentSort)
    } else {
        list = ListService.sortItems(context.completedListItems.map(item => <ListItem key={item.id} tab={tab} setEmailFormItem={setEmailFormItem} item={item} />), currentSort)
    }

    if (searchQuery) list = ListService.searchItems(list, searchQuery);

    return (
        <div className={styles.table}>
            {list}
        </div>
    )
}

export default ListBody;