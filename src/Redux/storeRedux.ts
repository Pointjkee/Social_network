import {combineReducers, createStore} from "redux";
import {profilePageReducer} from "./profilePage-reducer";
import {messagesPageReducer} from "./messagesPage-reducer";
import {storeType} from "./store";

let reducers = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
})

let store:storeType = createStore(reducers)

export default store