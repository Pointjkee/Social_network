import {followAPI, usersAPI} from "../API/api";
import {Dispatch} from "redux";

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
        case 'users/FOLLOW':
            return {
                ...state, users: state.users
                    .map(u => u.id === action.userID ? {...u, followed: true} : u)
            }
        case 'users/UNFOLLOW': {
            return {
                ...state, users: state.users
                    .map(u => u.id === action.userID ? {...u, followed: false} : u)
            }
        }
        case 'users/SET_USERS': {
            return {...state, users: [...action.users]}
        }
        case 'users/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'users/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalCount}
        }
        case 'users/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'users/FOLLOWING_IN_PROGRESS': {
            return {
                ...state, followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        }
    }
    return state
}

export type followACType = ReturnType<typeof follow>
export type unFollowAC = ReturnType<typeof unFollow>
export type usersAC = ReturnType<typeof setUsers>
export type currentPageAC = ReturnType<typeof setCurrentPage>
export type setTotalUsersCountAC = ReturnType<typeof setTotalUsersCount>
export type setIsFetching = ReturnType<typeof setIsFetching>
export type followingInProgress = ReturnType<typeof setFollowingInProgress>

export const follow = (userID: number) => ({type: 'users/FOLLOW', userID} as const)
export const unFollow = (userID: number) => ({type: 'users/UNFOLLOW', userID} as const)
export const setUsers = (users: usersType) => ({type: 'users/SET_USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'users/SET_CURRENT_PAGE', currentPage} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', totalCount} as const)
export const setIsFetching = (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching} as const)
export const setFollowingInProgress = (followingInProgress: boolean, userID: number) => ({
    type: 'users/FOLLOWING_IN_PROGRESS',
    followingInProgress,
    userID
} as const)

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(setIsFetching(true))
    let response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setCurrentPage(currentPage))
    dispatch(setIsFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
}

const followUnFollowFlow = async (dispatch: Dispatch, userID: number, apiMethod: any, actionCreator: any) => {
    dispatch(setFollowingInProgress(true, userID))
    let resultCode = await apiMethod(userID)
    if (resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(setFollowingInProgress(false, userID))
}

export const followThunkCreator = (userID: number) => async (dispatch: Dispatch) => {
    let apiMethod = followAPI.followHandler.bind(followAPI)
    followUnFollowFlow(dispatch, userID, apiMethod, follow)
}

export const unFollowThunkCreator = (userID: number) => async (dispatch: Dispatch) => {
    let apiMethod = followAPI.unFollowHander.bind(followAPI)
    followUnFollowFlow(dispatch, userID, apiMethod, unFollow)
    }

