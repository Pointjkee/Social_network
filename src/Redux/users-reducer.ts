const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'

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
export type currentPageAC = {
    type: 'SET_CURRENT_PAGE',
    currentPage: number
}
export type setTotalUsersCountAC = {
    type: 'SET_TOTAL_USERS_COUNT',
    totalCount: number
}
type ActionsTypes = followACType | unFollowAC | usersAC | currentPageAC | setTotalUsersCountAC

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
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
}

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
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
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
    }
    return state
}

//action creator для dialogs.tsx

export const followAC = (userID: number) => ({type: FOLLOW, userID})
export const unFollowAC = (userID: number) => ({type: UNFOLLOW, userID})
export const setUsersAC = (users: usersType) => ({type: SET_USERS, users})
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCountAC = (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalCount})


