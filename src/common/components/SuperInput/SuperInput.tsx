import Slider from '@mui/material/Slider'
import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode,
    useEffect, useRef,
    useState
} from 'react'
import styles from './SuperInput.module.scss'
import {valueUtils} from "../../utils/value-utils";

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

    const inputRef = useRef<HTMLInputElement>(null)

    const [valueDuplicate, setValueDuplicate] = useState<string>(min.toString())
    const [visibilityValue, setVisibilityValue] = useState<boolean>(false)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '') {
            setValueDuplicate('')
        }
        const value = e.currentTarget.value.replace(/[\D]+/g, '')
        if (/^\d+$/.test(value)) {
            setValueDuplicate(value)
        }
    }

    const onChangeSliderHandler = (event: Event, newValue: number | number[]) => {
        onChangeValue(newValue as number);
    };

    const onBlurHandler = () => {
        onChangeValue(+valueDuplicate)
        setVisibilityValue(false)

    }

    const onFocusHandler = () => {
        setVisibilityValue(true)
        setValueDuplicate(value.toString())
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurHandler()
            inputRef.current?.blur()
        }
    }

    const finalClassName = `${styles.inputBlock} ${disabled ? styles.disabled : ''}`
    const finalClassNameLabel = `${classNameLabel ? classNameLabel : ''}`
    const valueInputDuplicate = valueInput ? valueInput : value
    const settingValueInput = valueUtils(valueInputDuplicate.toString())
    const settingValueDuplicate = valueUtils(valueDuplicate)
    const finalValueInput = currency ? settingValueInput + currency : settingValueInput
    const finalValueDuplicate = currency ? settingValueDuplicate + currency : settingValueDuplicate


    useEffect(() => {
        if (+valueDuplicate < min) {
            onChangeValue(min)
            setValueDuplicate(JSON.stringify(min))
        }
        if (+valueDuplicate > max) {
            onChangeValue(max)
            setValueDuplicate(JSON.stringify(max))
        }
    }, [value])

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
                value={visibilityValue ? finalValueDuplicate : finalValueInput}
                onChange={!blockInput ? onChangeInputHandler : () => {
                }}
                onBlur={!blockInput ? onBlurHandler : () => {
                }}
                onFocus={!blockInput ? onFocusHandler : () => {
                }}
                onKeyUp={!blockInput ? onKeyUpHandler : () => {
                }}
                ref={inputRef}
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

