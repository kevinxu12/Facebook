import { NEW_FRIEND_REQUEST} from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case NEW_FRIEND_REQUEST:
            return [...state, action.payload];
        default:
             return state;
    }
}