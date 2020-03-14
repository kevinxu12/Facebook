import {SET_FRIENDS, GET_FRIENDS} from '../actions/types'
export default function(state = [], action) {
    switch (action.type) {
        case SET_FRIENDS:
            console.log(action.payload);
            return action.payload
        case GET_FRIENDS:
            return state;
        default: 
            return state;
    }
}