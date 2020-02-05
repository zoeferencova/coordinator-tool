import React from 'react';
import './MainListPage.css'
import MainListTools from '../../components/MainListTools/MainListTools';
import MainListBody from '../../components/MainListBody/MainListBody';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header';
import SendEmailForm from '../../components/SendEmailForm/SendEmailForm'
import AuthApiService from '../../services/auth-api-service'

export default class MainListPage extends React.Component {
    state = {
        emailFormOpen: false,
        emailProject: '',
        emailAdvisor: '',
        emailPm: ''
    }

    openEmailForm = (project, advisor, pm) => {
        this.setState({ emailFormOpen: true })
        this.setState({
            emailProject: project,
            emailAdvisor: advisor,
            emailPm: pm
        })
    }

    closeEmailForm = (e) => {
        e.preventDefault()
        this.setState({ emailFormOpen: false })
        this.setState({
            emailProject: '',
            emailAdvisor: '',
            emailPm: '',
        })
    }

    render() {
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
        const title = new Date().toLocaleDateString("en-US", dateOptions)

        return (
            <div className="container">
                <main className="content">
                    <Header title={title} />
                    <MainListTools />
                    <br></br>
                    <div className='main-list-container'>
                        <MainListBody openEmailForm={this.openEmailForm} closeEmailForm={this.closeEmailForm} />
                    </div>
                    {this.state.emailFormOpen && <SendEmailForm project={this.state.emailProject} advisor={this.state.emailAdvisor} pm={this.state.emailPm} />}
                </main>
                <NavBar />
            </div>
            
        )
    }
}