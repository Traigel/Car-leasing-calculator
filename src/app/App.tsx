import React, {ChangeEvent, useState} from 'react';
import styles from './App.module.css'
import {SuperButton} from "../common/components/SuperButton/SuperButton";
import {SuperInput} from "../common/components/SuperInput/SuperInput";

export const App = () => {
    const min = 1000000
    const max = 6000000

    const [value, setValue] = useState<number>(min)

    const onChangeHandler = (value: number) => {
        setValue(value)
    }
console.log('app :',value)
    return (

        <div className={styles.app}>
            <SuperButton disabled={false}>Оставить заявку</SuperButton>
            <SuperInput
                title={'Стоимость автомобиля'}
                label={'мес.'}
                value={value}
                valueInput={value}
                onChangeValue={onChangeHandler}
                onChangeValueInput={onChangeHandler}
                min={min}
                max={max}
                disabled={false}
                // currency={' ₽'}


            />

        </div>
    );
}
