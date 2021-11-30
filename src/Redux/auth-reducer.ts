import {authAPI} from "../API/api";

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}
type stateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type ActionsType = setUserDataAC

export const authReducer = (state: stateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: action.data.isAuth,
            }
        }

    }
    return state
}
export type setUserDataAC = {
    type: 'SET_USER_DATA',
    data: {
        id: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    }
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataAC => {
    return {type: SET_USER_DATA, data: {id, email, login, isAuth}}
}
type authType = {
    data: {
        data: {
            id: number | null,
            email: string,
            login: string,
        },
        resultCode: number,
        messages: string[]
    }
}

export const authThunk = () => (dispatch: any) => {
    return authAPI.getAuth()
        .then((response: authType) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(response.data.data.id, response.data.data.email, response.data.data.login, true))
            }
        })
}

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    return authAPI.login(email, password, rememberMe)
        .then((response: authType) => {
            if (response.data.resultCode === 0) {
                dispatch(authThunk())
            }
        })
}

export const loginOut = () => (dispatch: any) => {
    return authAPI.logOut()
        .then((response: authType) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}