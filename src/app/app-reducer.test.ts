import {appReducer, InitialStateAppType, setAppStatusAC} from "./app-reducer";

let state: InitialStateAppType

beforeEach(() => {
    state = {
        status: 'succeeded'
    }
})

test('set status', () => {
    const appReducerTest = appReducer(state, setAppStatusAC('loading'))
    expect(appReducerTest.status).toBe('loading')
})