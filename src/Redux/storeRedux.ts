import {combineReducers, createStore} from "redux";
import {profilePageReducer} from "./profilePage-reducer";
import {messagesPageReducer} from "./messagesPage-reducer";
import {usersReducer} from "./users-reducer";



let reducers = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersReducer
})
export type AppStateType = ReturnType<typeof reducers>

let store = createStore(reducers)

//@ts-ignore
window.store = store


export default store