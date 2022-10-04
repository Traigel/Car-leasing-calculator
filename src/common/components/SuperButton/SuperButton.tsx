import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import styles from './SuperButton.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const SuperButton = ({disabled, className, children, ...restProps}: DefaultButtonPropsType) => {

    const finalClassName = `${styles.button} ${disabled ? styles.fade : ''} ${className}`

    return (
        <button
            className={finalClassName}
            disabled={disabled}
            {...restProps}
        >
            {disabled ? <span className={styles.loader}></span> : children}
        </button>
    )
}