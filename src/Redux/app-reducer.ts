import {authThunk} from "./auth-reducer";

const initialState = {
    initialized: false
}
type initialType = {
    initialized: boolean
}
type actionType = initialACType

export const appReducer = (state: initialType = initialState, action: actionType): initialType => {
    switch (action.type) {
        case 'app/SET_INITIALIZED': {
            return {...state, initialized: true}
        }
        default:
            return state
    }
}
type initialACType = ReturnType<typeof initialAC>

const initialAC = () => {
    return {
        type: 'app/SET_INITIALIZED',
    } as const
}

export const initializeApp = () => async (dispatch: any) => {
    dispatch(authThunk())
        .then(() => {
            dispatch(initialAC())
        })
}