import {applyMiddleware, combineReducers, createStore} from "redux";
import {profilePageReducer} from "./profilePage-reducer";
import {messagesPageReducer} from "./messagesPage-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import {appReducer} from "./app-reducer";


let reducer = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,

})
export type AppStateType = ReturnType<typeof reducer>

let store = createStore(reducer, applyMiddleware(thunkMiddleware))

//@ts-ignore
window.store = store


export default store



