import {AppThunk} from "../../common/types/types"
import {setAppStatusAC} from "../../app/app-reducer";
import {dataAPI} from "../../api/api";
import {errorHandlerUtil} from "../../common/utils/errors-utils";
import axios, {AxiosError} from "axios";

const initialState = {
    interestRate: 0.035,    // Процентная ставка
    price: 1000000,         // Стоимость автомобиля (1000000 - 6000000)
    percentages: 10,        // Проценты (Первоначальный взнос) (10-60)
    months: 1,              // Срок кредита в месяцах (1-60)
}

export const calculatorReducer = (state = initialState, action: CalculatorActionType): InitialStateCalculatorType => {
    switch (action.type) {
        case 'CALCULATOR/SET-PRICE':
            return {...state, price: action.value}
        case "CALCULATOR/SET-PERCENTAGE":
            return {...state, percentages: action.value}
        case "CALCULATOR/SET-MONTHS":
            return {...state, months: action.value}
        default:
            return state
    }
}

// actions
export const setPriceAC = (value: number) => {
    return {type: 'CALCULATOR/SET-PRICE', value} as const
}

export const setPercentagesAC = (value: number) => {
    return {type: 'CALCULATOR/SET-PERCENTAGE', value} as const
}

export const setMonthsAC = (value: number) => {
    return {type: 'CALCULATOR/SET-MONTHS', value} as const
}

// thunks
export const setDataTC = (data: DataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await dataAPI.setData(data)
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

// types
export type InitialStateCalculatorType = typeof initialState
export type CalculatorActionType =
    | ReturnType<typeof setPriceAC>
    | ReturnType<typeof setPercentagesAC>
    | ReturnType<typeof setMonthsAC>
export type DataType = {
    interestRate: number
    price: number
    percentages: number
    months: number
    initial: number
    monthlyFee: number
    amountDeal: number
}