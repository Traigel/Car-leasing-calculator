import React from 'react';
import styles from './App.module.scss'
import {Calculator} from "../features/Calculator/Calculator";

export const App = () => {

    return (
        <div className={styles.app}>
            <Calculator/>
        </div>
    );
}
