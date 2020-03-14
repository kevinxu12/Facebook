import axios from 'axios' 
class ChatBar{
    constructor() {
    }
    // need to test this
    async fetchAllOnlineFriends(obj) {
        console.log("fetching chat bar info");
        console.log(obj);
        const res = await axios.post('/api/getAllOnlineFriends', obj);
        return res.data;
    }

    async getChatrooms() {
        console.log("fetching chatrooms");
        const res = await axios.get('/api/getChatrooms');
        return res.data;
    }

    async viewChatroom(obj) {
        const res = await axios.post('/api/viewChat', obj);
        return res.data;
    }
}

export default new ChatBar();