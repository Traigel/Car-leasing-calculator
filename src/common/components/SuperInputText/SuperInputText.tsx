import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import Slider from "@mui/material/Slider";
import styles from './SuperInputText.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    title: string
    label: string | number
    classNameLabel?: string
}

export const SuperInputText = ({
                                   classNameLabel,
                                   label,
                                   title,
                                   className,
                                   disabled,
                                   ...restProps
                               }: SuperInputTextPropsType) => {

    const finalClassName = `${styles.inputBlock} ${disabled ? styles.disabled : ''}`
    const finalClassNameLabel = `${classNameLabel ? classNameLabel : ''}`
    const styleSlider = {
        color: '#FF9514',
        '& .MuiSlider-rail': {
            opacity: '0,5',
        },
        '& .MuiSlider-track': {
            border: 'none',
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
                type={'text'}
                className={className}
                disabled={disabled}
                {...restProps}
            />
            <p className={finalClassNameLabel}>{label}</p>
            <Slider
                defaultValue={30}
                sx={styleSlider}
            />
        </div>

    )
}

