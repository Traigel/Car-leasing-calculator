import React from 'react';
import styles from './NumberBoard.module.scss'

type NumberBoardPropsType = {
    title: string
    number: string | number
    currency: '₽' | '$'
    className?: string
}

export const NumberBoard = ({title, number, currency, className}: NumberBoardPropsType) => {
    return (
        <div className={`${styles.boardBlock} ${className}`}>
            <p>{title}</p>
            <span>{`${number} ${currency}`}</span>
        </div>
    )
}