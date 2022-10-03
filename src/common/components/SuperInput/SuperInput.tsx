import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, ReactNode, useEffect} from 'react'
import styles from './SuperInput.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    title: string
    label: string | number | ReactNode
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

    // const debouncedValue = useDebounce<number>(value, 1000)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = JSON.parse(e.currentTarget.value.replace(/[^+\d]/g, ''))
        if (/^\d+$/.test(value)) {
            onChangeValueInput && onChangeValueInput(+value)
        }
    }

    const onChangeSliderHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        onChangeValue(parseInt(value, 10));
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
    const setValueInput = valueInput.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')
    const finalValueInput = currency ? setValueInput + currency : setValueInput

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
            <div className={styles.wrapper}>
                <input
                    type="range"
                    value={value}
                    onChange={onChangeSliderHandler}
                    max={max} min={min}
                    className={styles.slider}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

