import { combineReducers } from 'redux'
import chatReducer from './chatReducer';
import friendReducer from './friendsReducer';
import authReducer from './authReducer';
import friendReqReducer from './friendReqReducer'

export default combineReducers({
    chat: chatReducer,
    friends: friendReducer,
    auth: authReducer,
    friendRequests: friendReqReducer
})