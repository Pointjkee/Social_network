import {connect} from "react-redux";
import {AppStateType} from "../../Redux/storeRedux";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unFollowAC, usersType} from "../../Redux/users-reducer";
import {Users} from "./Users";

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return{
        follow: (userID:number) => {
            dispatch(followAC(userID))
        },
        unFollow: (userID:number) => {
            dispatch(unFollowAC(userID))
        },
        setUsers: (users:usersType) => {
            dispatch(setUsersAC(users))
        }
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)