import {combineReducers, createStore} from "redux";
import {profilePageReducer} from "./profilePage-reducer";
import {messagesPageReducer} from "./messagesPage-reducer";



let reducers = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
})
export type AppStateType = ReturnType<typeof reducers>

let store = createStore(reducers)


export default store