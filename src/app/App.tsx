import React, {ChangeEvent, useState} from 'react';
import styles from './App.module.css'
import {SuperButton} from "../common/components/SuperButton/SuperButton";
import {SuperInputText} from "../common/components/SuperInputText/SuperInputText";

export const App = () => {

    const [value, setValue] = useState('asd')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (

        <div className={styles.app}>
            <SuperButton disabled={false}>Оставить заявку</SuperButton>
            <SuperInputText disabled={false} onChange={onChangeHandler} value={value} title={'Стоимость автомобиля'} label={'₽'}/>
        </div>
    );
}
