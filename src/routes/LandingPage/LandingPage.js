import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ButtonLight, ButtonDark, toDoNavIcon, templateNavIcon, dashboardNavIcon, githubIcon, linkedinIcon } from '../../components/Utils/Utils'

import styles from './LandingPage.module.css'

const LandingPage = () => {
    // const [scrollPosition, getScrollPositon] = useState(document.getElementById('scrollContainer').scrollTop)

    // useEffect(() => {
    //     window.addEventListener('scroll', () => {
    //         getScrollPositon(document.getElementById('scrollContainer').scrollTop);


    //     })
    // }, [])

    // console.log(scrollPosition)

    return (
        <main role="main" className={styles.container}>
            <header className={styles.header}>
                <nav role="navigation" className={styles.nav}>
                    <img className={styles.logo} src={require('../../images/logo.png')} alt="logo"></img>
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
                    <Link to='/register'><ButtonDark large="true" className={styles.button}>See a demo</ButtonDark></Link>
                    <Link to='/register'><ButtonLight large="true" className={styles.button}>Get started</ButtonLight></Link>
                </div>
            </header>
            <section className={styles.bannerMockup}>
                <img className={styles.mockup} src={require('../../images/cover.png')} alt="logo"></img>
            </section>
            <section className={`${styles.section} ${styles.problem}`}>
                <div className={styles.problemContainer}>
                    <h2>The Problem</h2>
                    <p>I created this app in my previous career as a client service coordinator, where much of my day was spent trying to get in touch with a list of consultants that my clients wanted to speak to. I would manually write out a list of names to contact every morning and rewrite the same email to different people dozens of times per day. At the end of every day, I would manually type out a list of updates for the project managers I supported.</p>
                    <p>My coordinator colleagues and I would go on to use the app for 3+ years, saving us hours of work each day.</p>
                </div>
            </section>
            <div className={styles.stickContainer}>
                <section className={`${styles.section} ${styles.solution} `}>
                    <h2>The Solution</h2>
                    <div className={styles.details}>
                        <img className={styles.mockup} src={require('../../images/list.png')} alt="logo"></img>
                        <div className={styles.featureList}>
                            <div>
                                {toDoNavIcon}
                                <h3>Simple task management</h3>
                                <p>Easily track the status of projects and send PM updates in one click.</p>
                            </div>
                            <div>
                                {templateNavIcon}
                                <h3>Automated email composition</h3>
                                <p>Save templates and automatically compose emails using list item values.</p>
                            </div>
                            <div>
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
                    <Link to='/register'><ButtonLight large="true" className={styles.button}>See a demo</ButtonLight></Link>
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