import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {AppRootActionsType} from "../types/types";

export const errorHandlerUtil = (e: any, dispatch: Dispatch<AppRootActionsType>) => {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data : err.message
        console.log(error)
    } else {
        console.log(`Native error ${err.message}`)
    }
}