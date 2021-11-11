import {followAPI, usersAPI} from "../API/api";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'
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
export type setIsFetching = {
    type: 'TOGGLE_IS_FETCHING',
    isFetching: boolean
}
export type followingInProgress = {
    type: 'FOLLOWING_IN_PROGRESS',
    followingInProgress: boolean,
    userID: number,
}
type ActionsTypes = followACType | unFollowAC | usersAC | currentPageAC
    | setTotalUsersCountAC | setIsFetching | followingInProgress

export type usersType = Array<{
    id: number,
    photoUrl: string,
    followed: boolean,
    name: string,
    status: string,
    location: { city: string, country: string },
}>

type initialStateType = {
    users: usersType
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: (boolean | number)[]
}

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export const usersReducer = (state: initialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {

        case FOLLOW:
            return {
                ...state, users: state.users
                    .map(u => u.id === action.userID ? {...u, followed: true} : u)
            }
        case UNFOLLOW: {
            return {
                ...state, users: state.users
                    .map(u => u.id === action.userID ? {...u, followed: false} : u)
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
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state, followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)
            }
        }
    }
    return state
}

export const follow = (userID: number) => ({type: FOLLOW, userID})
export const unFollow = (userID: number) => ({type: UNFOLLOW, userID})
export const setUsers = (users: usersType) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalCount})
export const setIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const setFollowingInProgress = (followingInProgress: boolean, userID: number) => ({
    type: FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userID
})

type dataType = {
    error: string | null,
    items: usersType,
    totalCount: number,
}

// type dispatchType = (   (isFetching: boolean) => void ) => void

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(setIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then((data: dataType) => {
                dispatch(setCurrentPage(currentPage))
                dispatch(setIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
            })
    }
}
export const followThunkCreator = (userID: number) => {
    return (dispatch: any) => {

        dispatch(setFollowingInProgress(true, userID))
        followAPI.followHandler(userID)
            .then((resultCode: number) => {
                if (resultCode === 0) {
                    dispatch(follow(userID))
                }
                dispatch(setFollowingInProgress(false, userID))
            })
    }
}
export const unFollowThunkCreator = (userID: number) => {
    return (dispatch: any) => {

        dispatch(setFollowingInProgress(true, userID))
        followAPI.unFollowHander(userID)
            .then((resultCode: number) => {
                if (resultCode === 0) {
                    dispatch(unFollow(userID))
                }
                dispatch(setFollowingInProgress(false, userID))
            })
    }
}
