import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useEffect} from 'react'
import Slider from "@mui/material/Slider";
import styles from './SuperInput.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    title: string
    label: string | number
    value: number
    onChangeValue: (value: number) => void
    valueInput: number
    onChangeValueInput?: (value: number) => void
    min: number
    max: number
    currency?: string
    classNameLabel?: string
}

export const SuperInput = ({
                               currency,
                               min,
                               max,
                               onChangeValue,
                               onChangeValueInput,
                               value,
                               valueInput,
                               classNameLabel,
                               label,
                               title,
                               className,
                               disabled,
                               ...restProps
                           }: SuperInputTextPropsType) => {

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/[^+\d]/g, '')
        if (/^\d+$/.test(value)) {
            onChangeValueInput && onChangeValueInput(+value)
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
    }, [value])

    const finalClassName = `${styles.inputBlock} ${disabled ? styles.disabled : ''}`
    const finalClassNameLabel = `${classNameLabel ? classNameLabel : ''}`
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
    const setValueInput = valueInput.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')
    const finalValueInput = currency ? setValueInput + currency : setValueInput

    console.log(setValueInput)
    return (
        <div className={finalClassName}>
            <p>{title}</p>
            <input
                className={className}
                disabled={disabled}
                value={finalValueInput}
                onChange={onChangeValueInput ? onChangeInputHandler : () => {
                }}
                {...restProps}
            />
            <p className={finalClassNameLabel}>{label}</p>
            <Slider
                value={value}
                onChange={onChangeSliderHandler}
                className={styles.slider}
                disabled={disabled}
                sx={styleSlider}
                min={min}
                max={max}
            />
            <div>
                {finalValueInput}
            </div>
        </div>

    )
}

