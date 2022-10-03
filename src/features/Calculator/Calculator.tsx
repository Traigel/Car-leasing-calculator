import React, {ChangeEvent, useState} from 'react';
import {SuperInput} from '../../common/components/SuperInput/SuperInput';
import styles from './Calculator.module.scss'
import {SuperButton} from "../../common/components/SuperButton/SuperButton";

export const Calculator = () => {

    const [price, setPrice] = useState<number>(1000000) // Стоимость автомобиля

    const onChangePriceHandler = (value: number) => {
        setPrice(value)
    }

    const [percentages, setPercentages] = useState<number>(10) // Проценты (Первоначальный взнос)

    const onChangePercentagesHandler = (value: number) => {
        setPercentages(value)
    }

    const onChangeLabelHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = JSON.parse(e.currentTarget.value.replace(/[^+\d]/g, ''))
        if (/^\d+$/.test(value)) {
            setPercentages(value)
        }
    }


    const [months, setMonths] = useState<number>(1) // Срок кредита в месяцах

    const onChangeMonthsHandler = (value: number) => {
        setMonths(value)
    }

    const interestRate = 0.035 // Процентная ставка
    const initial = Math.round(price * (percentages / 100)) // Первоначальный взнос
    const monthPay = Math.round((price - initial) * ((interestRate * Math.pow((1 + interestRate), months)) / (Math.pow((1 + interestRate), months) - 1))) // Ежемесячный платеж от
    const rentAmount = initial + months * monthPay // Сумма договора лизинга

    const finalMonthPay = monthPay.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')
    const finalRentAmount = rentAmount.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')


    return (

        <div className={styles.calculatorBlock}>
            <div className={styles.title}>
                <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
            </div>

            <div className={styles.inputs}>
                <SuperInput
                    title={'Стоимость автомобиля'}
                    label={'₽'}
                    classNameLabel={styles.currencyLabel}
                    value={price}
                    valueInput={price}
                    onChangeValue={onChangePriceHandler}
                    onChangeValueInput={onChangePriceHandler}
                    min={1000000}
                    max={6000000}
                />
                <SuperInput
                    title={'Первоначальный взнос'}
                    label={
                        <input
                            value={percentages + '%'}
                            className={styles.initialFeeLabel}
                            onChange={onChangeLabelHandler}
                        />
                    }
                    classNameLabel={styles.percentagesLabel}
                    className={styles.secondInput}
                    value={percentages}
                    valueInput={initial}
                    onChangeValue={onChangePercentagesHandler}
                    min={10}
                    max={60}
                    currency={' ₽'}
                />
                <SuperInput
                    title={'Срок лизинга'}
                    label={'мес.'}
                    value={months}
                    valueInput={months}
                    onChangeValue={onChangeMonthsHandler}
                    onChangeValueInput={onChangeMonthsHandler}
                    min={1}
                    max={60}
                />
            </div>
            <div className={styles.info}>
                <div>
                    <p>Сумма договора лизинга</p>
                    <span>{finalRentAmount + ' ₽'}</span>
                </div>
                <div>
                    <p>Ежемесячный платеж от</p>
                    <span>{finalMonthPay + ' ₽'}</span>
                </div>
                <SuperButton>Оставить заявку</SuperButton>
            </div>
        </div>
    )
}