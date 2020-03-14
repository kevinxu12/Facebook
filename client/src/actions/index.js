import axios from 'axios'
import { ADD_CHAT, REMOVE_CHAT, CLEAR_CHATS, SET_FRIENDS, GET_FRIENDS, FETCH_USER, NEW_FRIEND_REQUEST} from './types';

// adds a chat with another person to a local state
export const addChat = (sender, members) => async dispatch => {
    const name = members.sort().join(', ');
    const data = {name, sender, members};
    dispatch({ type: ADD_CHAT, payload: data});
}

// removes a chat from the local state
export const removeChat = (name) => async dispatch => {
    var data = {name};
    dispatch({type: REMOVE_CHAT, payload: data});
}

// using cookies, get who is currently signed in
export const fetchUser = () => async dispatch  => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data }); 
};

// make a new friend reqeust and set it in global state
export const addNewFriendRequest = (username) => async dispatch => {
    dispatch({type: NEW_FRIEND_REQUEST, payload: username});
}

// set your current friends
export const setFriends = (options) => async dispatch => {
    var data = options;
    dispatch({type: SET_FRIENDS, payload: data});
}

// get your current friends
export const getFriends = () => async dispatch => {
    dispatch({type: GET_FRIENDS});
}

// clear all live chats
export const clearChats = () => async dispatch => {
    dispatch({ type: CLEAR_CHATS});
}

