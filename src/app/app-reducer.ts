const initialState = {
    status: "succeeded" as RequestStatusType
}

export const appReducer = (state = initialState, action: AppActionType): InitialStateAppType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}

// types
export type InitialStateAppType = typeof initialState
export type AppActionType = ReturnType<typeof setAppStatusAC>
export type RequestStatusType = 'succeeded' | 'loading'