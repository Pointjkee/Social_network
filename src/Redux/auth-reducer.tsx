import {authAPI} from "../API/api";
import {Dispatch} from "redux";

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    loginFailed: null,
}
type stateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    loginFailed: string | null,
}
type ActionsType = setUserDataAC | setLoginFailedType

export const authReducer = (state: stateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'auth/SET_USER_DATA': {
            console.log(action.data)
            return {
                ...state,
                ...action.data,
                isAuth: action.data.isAuth,
                login: action.data.login
            }
        }
        case 'auth/SET_LOGIN_FAILED': {
            return {
                ...state,
                loginFailed: action.error
            }
        }
    }
    return state
}

export type setUserDataAC = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {type: 'auth/SET_USER_DATA', data: {id, email, login, isAuth}} as const
}

export type setLoginFailedType = ReturnType<typeof setLoginFailed>
export const setLoginFailed = (error: string) => {
    return {type: 'auth/SET_LOGIN_FAILED', error} as const
}

export const authThunk = () => async (dispatch: Dispatch) => {
    let response = await authAPI.getAuth()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(authThunk())
    } else {
        dispatch(setLoginFailed(response.data.messages[0]))
    }
}

export const loginOut = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}