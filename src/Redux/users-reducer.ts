const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = 'SET_USERS'

export type followACType = {
    type: "FOLLOW",
    userID: number,
}
export type unFollowAC = {
    type: 'UNFOLLOW',
    userID: number,
}
export type usersAC = {
    type: 'SET_USERS'
    users: usersType
}
type ActionsTypes = followACType | unFollowAC | usersAC

export type usersType = Array<{
    id: number,
    photoUrl: string,
    followed: boolean,
    name: string,
    status: string,
    location: { city: string, country: string }
}>

type initialStateType = {
    users: usersType
}

let initialState = {
    users: [],
}

export const usersReducer = (state: initialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users
                    .map(u => u.id === action.userID ? {...u, followed: false} : u)
                /* .map(u => {
                     if (u.id === action.userID){
                         return {...u, followed:true}
                     }
                     return u
                 }*/
            }
        case UNFOLLOW: {
            return {
                ...state, users: state.users
                    .map(u => u.id === action.userID ? {...u, followed: true} : u)
            }
        }
        case SET_USERS: {
            return {...state, users: [ ...action.users]}
        }
    }
    return state
}

//action creator для dialogs.tsx

export const followAC = (userID: number) => ({type: FOLLOW, userID})
export const unFollowAC = (userID: number) => ({type: UNFOLLOW, userID})
export const setUsersAC = (users: usersType) => ({type: SET_USERS, users})


