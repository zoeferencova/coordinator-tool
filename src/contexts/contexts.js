import React from 'react';
import SendEmailForm from '../components/SendEmailForm/SendEmailForm';

const AppContext = React.createContext({
    listItems: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setMainList: () => {},
})

export default AppContext;

export class AppProvider extends React.Component {
    state = {
        listItems: [],
        error: null,
    };

    setMainList = listItems => {
        this.setState({ listItems })
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    render() {
        const value = {
            listItems: this.state.listItems,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setMainList: this.setMainList,
        }
        return(
            <AppContext value={value}>
                {this.props.children}
            </AppContext>
        )
    }
}