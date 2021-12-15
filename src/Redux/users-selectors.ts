import {AppStateType} from "./storeRedux";
import {usersType} from "./users-reducer";


export const getUsers = (state: AppStateType): usersType => {
    return state.usersPage.users
}
export const getPagesSize = (state: AppStateType): number => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType): number => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType): number => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType): boolean => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType): (boolean | number)[] => {
    return state.usersPage.followingInProgress
}