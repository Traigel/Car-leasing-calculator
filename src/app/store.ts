import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {calculatorReducer} from "../features/Calculator/calculator-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    calculator: calculatorReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))