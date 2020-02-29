import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from '../../components/Utils/Utils'

import styles from './LandingPage.module.css'

export default class LandingPage extends React.Component {
    render() {
        return (
            <main role="main" className={styles.container}>
                <header className={styles.header}>
                    <nav role="navigation" className={styles.nav}>
                        <img className={styles.logo} src={require('../../images/logo.png')}></img>
                        <div>
                            <Link to={'/login'}><Button className={styles.button}>Sign In</Button></Link>
                        </div>
                    </nav>
                </header>
                
                <header className={styles.banner} role="banner">
                    <h1 className={styles.h1}>Streamline your coordinator workflow.</h1>
                    <h2 className={styles.h2}>Let the coordinator tool take care of your project tracking, email composition, update emails and more.</h2>
                    <Button className={styles.button}><Link to='/register'>Sign Up</Link></Button>
                </header>
                <section className={`${styles.section} ${styles.section1}`}>
                    <div className={styles.sectionContent}>
                        <h3 className={styles.sectionHeader}>Keep track of advisors that you reach out to and projects that you are assisting on</h3>
                        <p className={styles.text}>Keep track of advisors that you're reaching out to and stay organized with the reach-out tracking page.</p>
                    </div>
                    <div className={styles.deviceMacbook}>
                        <img className={styles.list} src={require('../../images/list2.png')}></img>
                        <svg className={styles.macbook} viewBox="0 0 620 390" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="macbook"><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="620" height="390"><path id="mask" fillRule="evenodd" clipRule="evenodd" d="M620 0H0V390H620V0ZM539 44.9993H83V330.003H539V44.9993Z" fill="white"></path></mask><g mask="url(#mask0)"><g id="macbook_2"><g id="shadows"><g id="Rectangle 5" opacity="0.8" filter="url(#filter0_f)"><rect width="475" height="3" transform="matrix(1 0 0 -1 73 360)" fill="url(#paint0_linear)"></rect></g><g id="Rectangle 5_2" filter="url(#filter1_f)"><rect x="28" y="360.907" width="475.2" height="1.20038" fill="url(#paint1_linear)"></rect></g><g id="Rectangle 5_3" filter="url(#filter2_f)"><rect width="475.2" height="1.20038" transform="matrix(-1 0 0 1 587.2 360.907)" fill="url(#paint2_linear)"></rect></g><g id="Rectangle 8" opacity="0.05" filter="url(#filter3_f)"><rect x="59.8" y="342.701" width="500.4" height="35.4111" rx="17.7056" fill="black"></rect></g></g><g id="case"><g id="screen" filter="url(#filter4_dd)"><rect x="58" y="22" width="505" height="330" rx="15.6" fill="url(#paint3_linear)"></rect></g><rect id="front" x="10" y="349" width="600" height="4" fill="url(#paint4_linear)"></rect><g id="notch"><path d="M257 349H364C364 350.657 362.657 352 361 352H260C258.343 352 257 350.657 257 349Z" fill="url(#paint5_linear)"></path><path d="M257 349H364C364 350.657 362.657 352 361 352H260C258.343 352 257 350.657 257 349Z" fill="white" style={{mixBlendMode: 'multiply'}}></path></g><g id="bottom"><path fillRule="evenodd" clipRule="evenodd" d="M106 360C24.4241 360 11 353 11 353L311 352L609 353C609 353 595.614 360 514 360H311H106Z" fill="url(#paint6_linear)"></path><path d="M11 353L10.999 352.7L10.8613 353.266L11 353ZM311 352L311.001 351.7L310.999 351.7L311 352ZM609 353L609.139 353.266L609.001 352.7L609 353ZM11 353C10.8613 353.266 10.8617 353.266 10.8621 353.266C10.8623 353.267 10.8628 353.267 10.8632 353.267C10.864 353.267 10.8651 353.268 10.8663 353.269C10.8689 353.27 10.8722 353.272 10.8764 353.274C10.8849 353.278 10.8967 353.284 10.9123 353.291C10.9434 353.306 10.9892 353.327 11.0513 353.354C11.1756 353.408 11.3652 353.485 11.6336 353.583C12.1703 353.778 13.0226 354.054 14.2969 354.384C16.8452 355.044 21.0852 355.921 27.8706 356.798C41.4409 358.55 65.2048 360.3 106 360.3V359.7C65.2193 359.7 41.4832 357.95 27.9475 356.202C21.1798 355.329 16.9654 354.456 14.4474 353.803C13.1885 353.477 12.3548 353.207 11.8387 353.019C11.5807 352.925 11.4023 352.852 11.29 352.803C11.2339 352.779 11.1944 352.761 11.1697 352.749C11.1574 352.743 11.1488 352.739 11.1437 352.736C11.1411 352.735 11.1394 352.734 11.1386 352.734C11.1382 352.734 11.138 352.734 11.138 352.734C11.138 352.734 11.1382 352.734 11.1382 352.734C11.1384 352.734 11.1387 352.734 11 353ZM310.999 351.7L10.999 352.7L11.001 353.3L311.001 352.3L310.999 351.7ZM310.999 352.3L608.999 353.3L609.001 352.7L311.001 351.7L310.999 352.3ZM609 353C608.861 352.734 608.861 352.734 608.861 352.734C608.861 352.734 608.862 352.734 608.862 352.734C608.862 352.734 608.861 352.734 608.861 352.734C608.86 352.735 608.859 352.735 608.856 352.737C608.851 352.739 608.842 352.743 608.83 352.749C608.806 352.761 608.766 352.779 608.71 352.803C608.598 352.852 608.42 352.925 608.163 353.019C607.648 353.207 606.815 353.477 605.558 353.803C603.043 354.456 598.832 355.329 592.067 356.202C578.536 357.95 554.8 359.7 514 359.7V360.3C554.814 360.3 578.578 358.55 592.144 356.798C598.927 355.921 603.163 355.044 605.709 354.384C606.981 354.054 607.832 353.778 608.368 353.583C608.636 353.485 608.825 353.408 608.949 353.354C609.011 353.327 609.057 353.306 609.088 353.291C609.104 353.284 609.115 353.278 609.124 353.274C609.128 353.271 609.131 353.27 609.134 353.268C609.135 353.268 609.136 353.267 609.137 353.267C609.138 353.267 609.138 353.266 609.138 353.266C609.139 353.266 609.139 353.266 609 353ZM514 359.7H311V360.3H514V359.7ZM106 360.3H311V359.7H106V360.3Z" fill="url(#paint7_linear)"></path></g></g></g></g></g><defs><filter id="filter0_f" x="66.2046" y="350.205" width="488.591" height="16.5908" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="3.3977" result="effect1_foregroundBlur"></feGaussianBlur></filter><filter id="filter1_f" x="21.2046" y="354.112" width="488.791" height="14.7912" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="3.3977" result="effect1_foregroundBlur"></feGaussianBlur></filter><filter id="filter2_f" x="105.205" y="354.112" width="488.791" height="14.7912" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="3.3977" result="effect1_foregroundBlur"></feGaussianBlur></filter><filter id="filter3_f" x="43.4903" y="326.391" width="533.019" height="68.0305" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="8.15485" result="effect1_foregroundBlur"></feGaussianBlur></filter><filter id="filter4_dd" x="41" y="1" width="539" height="364" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feColorMatrix type="matrix" values="0 0 0 0 0.130051 0 0 0 0 0.186328 0 0 0 0 0.270742 0 0 0 0.2 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="-4"></feOffset><feGaussianBlur stdDeviation="8.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"></feColorMatrix><feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"></feBlend></filter><linearGradient id="paint0_linear" x1="464.205" y1="0.0340909" x2="0" y2="0.0340909" gradientUnits="userSpaceOnUse"><stop stopOpacity="0.01"></stop><stop offset="0.142119"></stop><stop offset="0.490956"></stop><stop offset="0.852713"></stop><stop offset="1" stopOpacity="0.01"></stop></linearGradient><linearGradient id="paint1_linear" x1="492.4" y1="360.921" x2="28" y2="360.921" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.01"></stop><stop offset="0.852713"></stop><stop offset="1" stopOpacity="0.01"></stop></linearGradient><linearGradient id="paint2_linear" x1="464.4" y1="0.0136406" x2="0" y2="0.0136406" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.01"></stop><stop offset="0.852713"></stop><stop offset="1" stopOpacity="0.01"></stop></linearGradient><linearGradient id="paint3_linear" x1="-27.239" y1="51.135" x2="11.5308" y2="381.904" gradientUnits="userSpaceOnUse"><stop stopColor="#F4F7FA"></stop><stop offset="1" stopColor="#ECEEF1"></stop></linearGradient><linearGradient id="paint4_linear" x1="10" y1="351" x2="610" y2="351" gradientUnits="userSpaceOnUse"><stop stopColor="#C9CCCF"></stop><stop offset="0.0295" stopColor="#D9DEE3"></stop><stop offset="0.0910352" stopColor="#F1F4F7"></stop><stop offset="0.195602" stopColor="#E1E5E9"></stop><stop offset="0.276977" stopColor="#D9DBDE"></stop><stop offset="0.4045" stopColor="#D6D8DB"></stop><stop offset="0.5945" stopColor="#D6D8DB"></stop><stop offset="0.66626" stopColor="#D9DBDE"></stop><stop offset="0.740883" stopColor="#E1E5E9"></stop><stop offset="0.8755" stopColor="#F1F4F7"></stop><stop offset="0.9725" stopColor="#D9DEE3"></stop><stop offset="1" stopColor="#C9CCCF"></stop></linearGradient><linearGradient id="paint5_linear" x1="257" y1="352" x2="364" y2="352" gradientUnits="userSpaceOnUse"><stop stopColor="#AFB2B6"></stop><stop offset="0.0218245" stopColor="#C9CBCE"></stop><stop offset="0.0660112" stopColor="#D8DBDE"></stop><stop offset="0.129038" stopColor="#EDEEEF"></stop><stop offset="0.332443" stopColor="#F0F1F2"></stop><stop offset="0.514133" stopColor="#EEEFF0"></stop><stop offset="0.730491" stopColor="#EEEFF0"></stop><stop offset="0.935393" stopColor="#D8DBDE"></stop><stop offset="0.977001" stopColor="#C9CBCE"></stop><stop offset="1" stopColor="#AFB2B6"></stop></linearGradient><linearGradient id="paint6_linear" x1="11" y1="352" x2="11" y2="360" gradientUnits="userSpaceOnUse"><stop stopColor="#F1F3F5"></stop><stop offset="1" stopColor="#A9ADB1"></stop></linearGradient><linearGradient id="paint7_linear" x1="11" y1="352" x2="11" y2="360" gradientUnits="userSpaceOnUse"><stop stopColor="#D6D9DC"></stop><stop offset="1" stopColor="#B0B4B7"></stop></linearGradient></defs></svg>
                    </div>
                </section>
                <section className={`${styles.section} ${styles.section2}`}>
                    <div className={styles.deviceIphone}>
                        <img className={styles.templates} src={require('../../images/templates.png')}></img>
                        <img className={styles.iphone} src={require('../../images/iphonex.svg')}></img>
                    </div>
                    <div className={styles.sectionContent}>
                        <h3 className={styles.sectionHeader}>Automate PM update emails and email advisors using Smart Templates</h3>
                        <p className={styles.text}>Save time and streamline your workflow using the Outlook email generator tools.</p>
                    </div>
                </section>
                <section className={`${styles.section} ${styles.section3}`}>
                    <div className={styles.sectionContent}>
                        <h3 className={styles.sectionHeader}>Keep track of your personal stats using the Coordinator Dashboard</h3>
                        <p className={styles.text}>Interactive charts and personalized statistics help you on stay on track.</p>
                    </div>
                    <img className={styles.dash} src={require('../../images/dashboard.png')}></img>
                </section>
                <section className={`${styles.section} ${styles.section4}`}>
                    <h3 className={styles.sectionHeader}>Want to see a demo?</h3>
                    <p className={styles.text}>Sign in to the demo account - Email: demoaccount@demo.com, Password: DemoPassword1!</p>
                </section>
            </main>
        )
    }
}