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
                isAuth: true,
            }
        }

    }
    return state
}
export type setUserDataAC = {
    type: 'SET_USER_DATA',
    data: {
        id: number,
        email: string,
        login: string,
    }
}
export const setAuthUserData = (id: number, email: string, login: string): setUserDataAC => {
    return {type: SET_USER_DATA, data: {id, email, login}}
}

