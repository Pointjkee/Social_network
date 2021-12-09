import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Chat} from "./components/Chat/Chat";
import {BrowserRouter, Route} from 'react-router-dom';
import {News} from './components/News/News';
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from "react-redux";
import {compose} from 'redux';
import {initializeApp} from "./Redux/app-reducer";
import {AppStateType} from "./Redux/storeRedux";
import {Preloader} from "./components/Common/Preloader/Preloader";

type appPropsType = {
    initializeApp: any,
    initialized: boolean,
}

class App extends React.Component<appPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId' render={() => <ProfileContainer/>}/>
                        <Route path='/friends' render={() => <UsersContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </div>
                    <Chat/>
                </div>
            </BrowserRouter>
        );
    }
}

type mapStateToPropsType = {
    initialized: boolean
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }

}


export default compose(connect(mapStateToProps, {initializeApp}))(App)
