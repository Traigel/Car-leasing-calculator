import React, {ChangeEvent} from 'react';
import {SuperInput} from '../../common/components/SuperInput/SuperInput';
import styles from './Calculator.module.scss'
import {SuperButton} from "../../common/components/SuperButton/SuperButton";
import {NumberBoard} from "../../common/components/NumberBoard/NumberBoard";
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {setDataTC, setMonthsAC, setPercentagesAC, setPriceAC} from "./calculator-reducer";

export const Calculator = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const interestRate = useAppSelector(state => state.calculator.interestRate)
    const price = useAppSelector(state => state.calculator.price)
    const percentages = useAppSelector(state => state.calculator.percentages)
    const months = useAppSelector(state => state.calculator.months)

    const onChangePriceHandler = (value: number) => {
        dispatch(setPriceAC(value))
    }

    const onChangePercentagesHandler = (value: number) => {
        dispatch(setPercentagesAC(value))
    }

    const onChangeLabelHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = JSON.parse(e.currentTarget.value.replace(/[^+\d]/g, ''))
        if (/^\d+$/.test(value)) {
            dispatch(setPercentagesAC(value))
        }
    }

    const onChangeMonthsHandler = (value: number) => {
        dispatch(setMonthsAC(value))
    }

    const initial = Math.round(price * (percentages / 100)) // Первоначальный взнос
    const monthlyFee = Math.round((price - initial) * ((interestRate * Math.pow((1 + interestRate), months)) / (Math.pow((1 + interestRate), months) - 1))) // Ежемесячный платеж от
    const amountDeal = initial + months * monthlyFee // Сумма договора лизинга

    const onClickHandler = () => {
        dispatch(setDataTC({interestRate, price, percentages, months, initial, monthlyFee, amountDeal}))
    }

    const finalMonthlyFee = monthlyFee.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')
    const finalAmountDeal = amountDeal.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')

    return (

        <div className={styles.calculatorBlock}>
            <div className={styles.title}>
                <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
            </div>
            <div className={styles.inputs}>
                <SuperInput
                    title={'Стоимость автомобиля'}
                    label={'₽'}
                    value={price}
                    onChangeValue={onChangePriceHandler}
                    min={1000000}
                    max={6000000}
                    disabled={status === 'loading'}
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
                    blockInput={true}
                    disabled={status === 'loading'}
                />
                <SuperInput
                    title={'Срок лизинга'}
                    label={'мес.'}
                    value={months}
                    onChangeValue={onChangeMonthsHandler}
                    min={1}
                    max={60}
                    disabled={status === 'loading'}
                />
            </div>
            <div className={styles.info}>
                <NumberBoard
                    title={'Сумма договора лизинга'}
                    number={finalAmountDeal}
                    currency={'₽'}/>
                <NumberBoard
                    className={styles.board}
                    title={'Ежемесячный платеж от'}
                    number={finalMonthlyFee}
                    currency={'₽'}/>
                <div className={styles.buttonBlock}>
                    <SuperButton
                        onClick={onClickHandler}
                        disabled={status === 'loading'}
                    >
                        Оставить заявку
                    </SuperButton>
                </div>
            </div>
        </div>
    )
}