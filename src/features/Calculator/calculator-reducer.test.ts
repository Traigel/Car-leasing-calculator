import {
    calculatorReducer,
    InitialStateCalculatorType,
    setMonthsAC,
    setPercentagesAC,
    setPriceAC
} from "./calculator-reducer";

let state: InitialStateCalculatorType

beforeEach(() => {
    state = {
        interestRate: 0.035,
        price: 1000000,
        percentages: 10,
        months: 1,
    }
})

test('set price', () => {
    const calculatorReducerTest = calculatorReducer(state, setPriceAC(2000000))
    expect(calculatorReducerTest.price).toBe(2000000)
})

test('set percentages', () => {
    const calculatorReducerTest = calculatorReducer(state, setPercentagesAC(40))
    expect(calculatorReducerTest.percentages).toBe(40)
})

test('set months', () => {
    const calculatorReducerTest = calculatorReducer(state, setMonthsAC(15))
    expect(calculatorReducerTest.months).toBe(15)
})