import {combineReducers, createStore} from "redux";
import {profilePageReducer} from "./profilePage-reducer";
import {messagesPageReducer} from "./messagesPage-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";



let reducers = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersReducer,
    auth: authReducer,
})
export type AppStateType = ReturnType<typeof reducers>

let store = createStore(reducers)

//@ts-ignore
window.store = store


export default store