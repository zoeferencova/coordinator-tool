import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import { ButtonLight, ButtonDark, toDoNavIcon, templateNavIcon, dashboardNavIcon, githubIcon, linkedinIcon } from '../../components/Utils/Utils'

import styles from './LandingPage.module.css'

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.pageYOffset);
        }
        window.addEventListener("scroll", updatePosition);
        updatePosition();
        return () => window.removeEventListener("scroll", updatePosition);
    }, []);

    return scrollPosition;
};

const taskImages = (
    <div className={styles.multiImage}>
        <img className={styles.mockup} src={require('../../images/list.png')} alt="home page"></img>
        <img className={styles.mockup} src={require('../../images/email-example.png')} alt="example of email summary"></img>
    </div>
)

const templateImages = (
    <div className={styles.multiImage}>
        <img className={styles.mockup} src={require('../../images/templates.png')} alt="email template page"></img>
        <img className={styles.mockup} src={require('../../images/email-form-example.png')} alt="example of email template form"></img>
    </div>
)

const dashboardImages = (
    <div className={styles.singleImage}>
        <img className={styles.mockup} src={require('../../images/dashboard.png')} alt="dashboard page"></img>
    </div>
)

const LandingPage = ({ setLoggedIn }) => {
    const scrollPosition = useScrollPosition();

    // Logs in "demo user" basically just passing in login information to avoid the need for demo login info to be entered manually
    const demoLogin = () => {
        AuthApiService.postLogin({ email: "demo@email.com", password: "DemoPass33!" })
            .then(res => {
                setLoggedIn(true)
            })
    }

    return (
        <main role="main" className={styles.container}>
            <header className={styles.header}>
                <nav role="navigation" className={styles.nav}>
                    <img className={styles.logo} src={require('../../images/logo.png')} alt="logo"></img>
                    <img className={styles.mobileLogo} src={require('../../images/mobile-logo.png')} alt="logo"></img>
                    <div>
                        <Link to={'/login'}><ButtonLight large="true">Log In</ButtonLight></Link>
                        <Link to={'/register'}><ButtonDark large="true">Sign Up</ButtonDark></Link>
                    </div>
                </nav>
            </header>

            <header className={styles.banner} role="banner">
                <h1 className={styles.heading}>Lead management made easy</h1>
                <p className={styles.subheading}>Streamline your coordinator workflow with project tracking, email automation, and more</p>
                <div>
                    <Link to='/main'><ButtonDark onClick={() => demoLogin()} large="true" className={styles.button}>See a demo</ButtonDark></Link>
                    <Link to='/register'><ButtonLight large="true" className={styles.button}>Get started</ButtonLight></Link>
                </div>
            </header>
            <section className={styles.bannerMockup}>
                <img className={styles.mockup} src={require('../../images/cover.png')} alt="home page"></img>
            </section>
            <section className={`${styles.section} ${styles.problem}`}>
                <div className={styles.problemContainer}>
                    <h2>The Problem</h2>
                    <p>I created this app in my previous career as a client service coordinator, where much of my day was spent trying to get in touch with a list of consultants that my clients wanted to speak to. I would manually write out a list of names to contact every morning and rewrite the same email to different people dozens of times per day. At the end of every day, I would manually type out a list of updates for the project managers I supported.</p>
                    <p>I built Coordinator to address these pain points and my colleagues and I went on to use the app for 3+ years, saving us hours of work each day.</p>
                </div>
            </section>
            <div id="scrollContainer" className={styles.stickContainer}>
                <section className={`${styles.section} ${styles.solution} `}>
                    <h2>The Solution</h2>
                    <div className={styles.details}>
                        <div className={styles.solutionDesktop}>
                            {scrollPosition < 2861 && taskImages}
                            {scrollPosition > 2861 && scrollPosition < 4195 && templateImages}
                            {scrollPosition > 4195 && dashboardImages}
                        </div>
                        <div className={styles.featureList}>
                            <div className={scrollPosition < 2861 ? styles.focus : undefined}>
                                {taskImages}
                                {toDoNavIcon}
                                <h3>Simple task management</h3>
                                <p>Easily track the status of projects and send PM updates in one click.</p>
                            </div>
                            <div className={scrollPosition > 2861 && scrollPosition < 4195 ? styles.focus : undefined}>
                                {templateImages}
                                {templateNavIcon}
                                <h3>Automated email composition</h3>
                                <p>Save templates and automatically compose emails using list item values.</p>
                            </div>
                            <div className={scrollPosition > 4195 ? styles.focus : undefined}>
                                {dashboardImages}
                                {dashboardNavIcon}
                                <h3>Performance tracking</h3>
                                <p>Keep track of productivity trends with dashboard.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className={`${styles.section} ${styles.last}`}>
                <h2 className={styles.heading}>Get started or explore the demo account</h2>
                <div className={styles.buttonSection}>
                    <Link to={'/register'}><ButtonDark large="true">Sign Up</ButtonDark></Link>
                    <Link to='/main'><ButtonLight onClick={() => demoLogin()} large="true" className={styles.button}>See a demo</ButtonLight></Link>
                </div>
            </section>
            <footer className={styles.footer}>
                <div className={styles.footerDetails}>
                    <p>Made by Zoe Ferencova</p>
                    <a href="https://github.com/zoeferencova/" target="_blank" rel="noopener noreferrer">{githubIcon}</a>
                    <a href="https://www.linkedin.com/in/zoeferencova/" target="_blank" rel="noopener noreferrer">{linkedinIcon}</a>
                </div>
            </footer>

        </main>

    )
}

export default LandingPage;