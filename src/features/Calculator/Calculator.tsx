import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {SuperInput} from '../../common/components/SuperInput/SuperInput';
import styles from './Calculator.module.scss'
import {SuperButton} from "../../common/components/SuperButton/SuperButton";
import {NumberBoard} from "../../common/components/NumberBoard/NumberBoard";
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {setDataTC, setMonthsAC, setPercentagesAC, setPriceAC} from "./calculator-reducer";
import {valueUtils} from "../../common/utils/value-utils";

export const Calculator = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const interestRate = useAppSelector(state => state.calculator.interestRate)
    const price = useAppSelector(state => state.calculator.price)
    const percentages = useAppSelector(state => state.calculator.percentages)
    const months = useAppSelector(state => state.calculator.months)

    const [valueDuplicate, setValueDuplicate] = useState<string>('10')
    const [visibilityValue, setVisibilityValue] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const onChangePriceHandler = (value: number) => {
        dispatch(setPriceAC(value))
    }

    const onChangePercentagesHandler = (value: number) => {
        dispatch(setPercentagesAC(value))
    }

    const onChangeLabelHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '') {
            setValueDuplicate('')
        }
        const value = e.currentTarget.value.replace(/[\D]+/g, '')
        if (/^\d+$/.test(value)) {
            setValueDuplicate(value)
        }
    }

    const onFocusLabelHandler = () => {
        setVisibilityValue(true)
        setValueDuplicate(percentages.toString())
    }

    const onBlurLabelHandler = () => {
        dispatch(setPercentagesAC(+valueDuplicate))
        setVisibilityValue(false)
    }

    const onKeyLabelUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurLabelHandler()
            inputRef.current?.blur()
        }
    }

    const labelHandler = () => {
        inputRef.current?.focus()
    }

    const onChangeMonthsHandler = (value: number) => {
        dispatch(setMonthsAC(value))
    }


    useEffect(() => {
        if (+valueDuplicate < 10) {
            dispatch(setPercentagesAC(10))
            setValueDuplicate('10')
        }
        if (+valueDuplicate > 60) {
            dispatch(setPercentagesAC(60))
            setValueDuplicate('60')
        }
    }, [percentages])

    const initial = Math.round(price * (percentages / 100)) // Первоначальный взнос
    const monthlyFee = Math.round((price - initial) * ((interestRate * Math.pow((1 + interestRate), months)) / (Math.pow((1 + interestRate), months) - 1))) // Ежемесячный платеж от
    const amountDeal = initial + months * monthlyFee // Сумма договора лизинга

    const onClickHandler = () => {
        dispatch(setDataTC({interestRate, price, percentages, months, initial, monthlyFee, amountDeal}))
    }

    const finalMonthlyFee = valueUtils(monthlyFee.toString())
    const finalAmountDeal = valueUtils(amountDeal.toString())

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
                        <>
                            <input
                                value={visibilityValue ? valueDuplicate : percentages}
                                className={styles.initialFeeLabel}
                                onChange={onChangeLabelHandler}
                                onFocus={onFocusLabelHandler}
                                onBlur={onBlurLabelHandler}
                                onKeyUp={onKeyLabelUpHandler}
                                ref={inputRef}
                                disabled={status === 'loading'}
                                maxLength={2}
                            />
                            <span
                                className={styles.label}
                                onClick={status !== 'loading' ? labelHandler : () => {
                                }}
                            >%</span>
                        </>

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
                    tabIndex={-1}
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