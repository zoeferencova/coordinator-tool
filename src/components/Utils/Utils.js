import React from 'react';
import styles from './Utils.module.css';

export default function Button({ className, ...props }) {
    return <button className={`${styles.button} ${className}`} {...props} />
}