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
    fullName: string,
    status: string,
    location: { city: string, country: string }
}>

type initialStateType = {
    users: usersType
}

let initialState = {
    users: [
        {
            id: 1,
            photoUrl: 'https://pbs.twimg.com/profile_images/1222646977332174849/xWcD6t_Q.jpg',
            followed: true,
            fullName: 'Denis',
            status: 'Im learning',
            location: {city: "Minsk", country: 'Belarus'}
        },
        {
            id: 2,
            photoUrl: 'https://pbs.twimg.com/profile_images/1222646977332174849/xWcD6t_Q.jpg',
            followed: false,
            fullName: 'GLeb',
            status: 'Im learning too',
            location: {city: "Ostrovec", country: 'Belarus'}
        },
        {
            id: 3,
            photoUrl: 'https://pbs.twimg.com/profile_images/1222646977332174849/xWcD6t_Q.jpg',
            followed: false,
            fullName: 'Alex',
            status: 'Im working',
            location: {city: "Grodno", country: 'Belarus'}
        }
    ],
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
            return {...state, users: [...state.users, ...action.users]}
        }
    }
    return state
}

//action creator для dialogs.tsx

export const followAC = (userID: number) => ({type: FOLLOW, userID})
export const unFollowAC = (userID: number) => ({type: UNFOLLOW, userID})
export const setUsersAC = (users: usersType) => ({type: SET_USERS, users})

