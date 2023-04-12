import React, { useContext } from 'react';
import AppContext from '../../contexts/contexts'
import ListService from '../../services/list-service';
import Select from 'react-select'

const options = [
    { value: 'none', label: 'New', color: '#3B2E20', backgroundColor: '#FAF3DE' },
    { value: 'reached', label: 'Contacted', color: '#303C2D', backgroundColor: '#e4f0e4' },
    { value: 'completed', label: 'Completed', color: '#4b4b4b', backgroundColor: '#e8e8e8' },
]

const selectStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        border: 'none',
        background: state.selectProps.value.backgroundColor,
        color: state.selectProps.value.color,
        padding: '0px',
        minHeight: 'fit-content',
        width: 'fit-content',
        padding: '2.5px 0px',
        boxShadow: 'none',
        '&:hover': {
            border: 'none',
            cursor: 'pointer'
        }
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        // backgroundColor: state.isSelected ? "#7dbbc7" : state.isFocused ? "#EDF3F4" : "white",
        height: "25px",
        padding: "5px",
        border: "0px",
        textAlign: "left",
        '&:hover': {
            cursor: 'pointer'
        }
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        color: state.selectProps.value.color,
    }),
    container: (baseStyles, state) => ({
        ...baseStyles,
        width: "95px",
    })
}

const ListItemStatus = ({ item }) => {
    const context = useContext(AppContext);

    const { id, status, project, contact, pm_email } = item;

    const handleStatusChange = newStatus => {
        const pmId = context.pms.find(pm => pm.pm_email === pm_email).id

        ListService.updateItemStatus(id, newStatus, project, contact, pmId)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : context.updateItemStatus(id, newStatus))
            .catch(err => console.log(err))
    }

    return (
        <Select
            styles={selectStyles}
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            options={options}
            isSearchable={false}
            defaultValue={options.find(opt => opt.value === status)}
            onChange={e => handleStatusChange(e.value)}
        />
    )
}

export default ListItemStatus;