import {usersType} from "../Redux/users-reducer";
import {profileType} from "../Redux/store";

const {default: axios} = require('axios');

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '1f886700-a829-4416-bf51-a1d8fa58d064'
    }
})

type UsersResponseType = {
    data: {
        error: string | null,
        items: usersType,
        totalCount: number,
    }
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response: UsersResponseType) => response.data)
    },
}

type followResponseType = {
    data: {
        data: {}
        messages: string[],
        resultCode: number,
    }
}

export const followAPI = {
    followHandler(id: number) {
        return instance.post(`follow/${id}`)
            .then((response: followResponseType) => response.data.resultCode)
    },
    unFollowHander(id: number) {
        return instance.delete(`follow/${id}`)
            .then((response: followResponseType) => response.data.resultCode)
    }
}
type responseType = {
    data: profileType
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
            .then((response: responseType) => response.data)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
        // .then((response: any) => response.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status})
            .then((response: any) => response.data)
    },
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logOut() {
        return instance.delete('auth/login')
    }
}

