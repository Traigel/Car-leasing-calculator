import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import styles from './SuperButton.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    disabledLoader?: boolean
}

export const SuperButton = ({disabledLoader, disabled, className, children, ...restProps}: SuperButtonPropsType) => {

    const finalClassName = `${disabled ? styles.fade : ''} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        >
            {disabledLoader && disabled ? <span className={styles.loader}></span> : children}
        </button>
    )
}