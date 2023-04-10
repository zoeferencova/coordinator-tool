import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <main>
        <h2>Page not found</h2>
        <p>Go back <Link to='/main'>home</Link>.</p>
    </main>
)

export default NotFoundPage;