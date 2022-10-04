import Slider from '@mui/material/Slider'
import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, ReactNode, useEffect} from 'react'
import {useDebounce} from '../../hooks/useDebounce'
import styles from './SuperInput.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    title: string
    label: string | number | ReactNode
    value: number
    valueInput?: number
    onChangeValue: (value: number) => void
    min: number
    max: number
    blockInput?: boolean
    currency?: string
    classNameLabel?: string
}

export const SuperInput = ({
                               currency,
                               min,
                               max,
                               onChangeValue,
                               blockInput,
                               value,
                               valueInput,
                               classNameLabel,
                               label,
                               title,
                               className,
                               disabled,
                               ...restProps
                           }: SuperInputTextPropsType) => {

    const debouncedValue = useDebounce<number>(value, 1000)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = JSON.parse(e.currentTarget.value.replace(/[^+\d]/g, ''))
        if (/^\d+$/.test(value)) {
            onChangeValue(value)
        }
    }

    const onChangeSliderHandler = (event: Event, newValue: number | number[]) => {
        onChangeValue(newValue as number);
    };

    useEffect(() => {
        if (value < min) {
            onChangeValue(min)
        }
        if (value > max) {
            onChangeValue(max)
        }
    }, [debouncedValue])

    const finalClassName = `${styles.inputBlock} ${disabled ? styles.disabled : ''}`
    const finalClassNameLabel = `${classNameLabel ? classNameLabel : ''}`
    const valueInputDuplicate = valueInput ? valueInput : value
    const setValueInput = valueInputDuplicate.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')
    const finalValueInput = currency ? setValueInput + currency : setValueInput

    const disableStyleSlider = {
        '& .MuiSlider-rail': {
            color: '#E1E1E1',
            height: '2px',
        },
        '& .MuiSlider-track': {
            color: '#FF9514',
            border: 'none',
            height: '2px',
        },
        '& .MuiSlider-thumb': {
            color: '#FF9514',
            width: 20,
            height: 20,
            '&:before': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none',
            },
        },
    }
    const styleSlider = disabled ? disableStyleSlider : {
        color: '#FF9514',
        '& .MuiSlider-rail': {
            color: '#E1E1E1',
            height: '2px',
        },
        '& .MuiSlider-track': {
            border: 'none',
            height: '2px',
        },
        '& .MuiSlider-thumb': {
            width: 20,
            height: 20,
            '&:before': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none',
            },
        },
    }

    return (
        <div className={finalClassName}>
            <p>{title}</p>
            <input
                className={className}
                disabled={disabled}
                value={finalValueInput}
                onChange={!blockInput ? onChangeInputHandler : () => {
                }}
                {...restProps}
            />
            <p className={finalClassNameLabel}>{label}</p>
            <div className={styles.wrapper}>
                <Slider
                    value={value}
                    onChange={onChangeSliderHandler}
                    className={styles.slider}
                    disabled={disabled}
                    sx={styleSlider}
                    min={min}
                    max={max}
                />
            </div>
        </div>
    )
}

