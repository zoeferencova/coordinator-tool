import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default class LandingPage extends React.Component {
    render() {
        return (
            <main role="main">
                <header>
                    <nav role="navigation" className="LandingPage__nav">
                        <Link to={'/login'}>
                            Log In
                        </Link>
                        <Link to={'/register'}>
                            Register
                        </Link>
                    </nav>
                </header>
                
                <header role="banner">
                    <h1>Coordinator Tool</h1>
                    <h2>Streamline your coordinator workflow</h2>
                    <Link to='/register'>Sign Up</Link>
                    <Link to='/main'>See the demo</Link>
                </header>
                <section>
                    <header>
                        <h3>Keep track of advisors that you reach out to and projects that you are assisting on</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of main list interface</em>]</p>
                    <p>Keep track of advisors that you're reaching out to and stay organized with the reach-out tracking page.</p>
                </section>
                <section>
                    <header>
                        <h3>Automate PM update emails and email advisors using Smart Templates</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of PM update example and smart template interface</em>]</p>
                    <p>Save time and streamline your workflow using the Outlook email generator tools.</p>
                </section>
                <section>
                    <header>
                        <h3>Keep track of your personal stats using the Coordinator Dashboard</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of dashboard tab</em>]</p>
                    <p>Interactive charts and personalized statistics help you on stay on track.</p>
                </section>
            </main>
        )
    }
}