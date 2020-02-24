import React from 'react';

import styles from './NotFoundPage.module.css'

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <main>
                <h2>404 - Page not found</h2>
                <p>Try going back to your previous page.</p>
            </main>
        )
    }
}