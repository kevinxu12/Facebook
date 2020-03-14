import axios from 'axios' 
class FriendRec{
    constructor() {
    }
    // fill this out later
    async makeNewFriendRequest(obj) {
        console.log("Sending new friend request from " + obj.sender + " to " + obj.username);
        const res = await axios.post('/api/sendFriendRequest', obj);
        // console.log("Creating new notification for friend request from" + obj.sender + " to " + obj.username);
        // var notobj = {
        //     recipient: obj.username,
        //     notification: obj.sender + " sent you a friend request!",
        //     date: new Date().toUTCString()
        // }
        // const res2 = await axios.post('/api/addNewRequestNotification', notobj);
        return res.data;
    }

    async getAllFriendRecommendations(obj) {
        console.log("Getting all friend recommendations for " + obj.username);
        const res = await axios.post('/api/getTopFriendRecommendations', obj);
        return res.data;
        // for now
        //return ["Matt", "TakiM", "vinkebot"];
    }
}

export default new FriendRec();