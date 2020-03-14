import { ADD_CHAT, REMOVE_CHAT, CLEAR_CHATS} from '../actions/types'
export default function(state = [], action) {
    switch (action.type) {
        case ADD_CHAT:
            const newChat = action.payload;
            if(state.every(x => newChat.name !== x.name)) {
                return [
                    ...state,
                    newChat
                ]
            }
            return state;
        case REMOVE_CHAT:
            const rChat = action.payload;
            return state.filter(x => rChat.name !== x.name);
        case CLEAR_CHATS: 
            return [];
        default: 
            return state;
    }
}