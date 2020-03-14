import axios from 'axios' 
class FriendReq{
    constructor() {
    }
    async acceptFriendRequest(obj) {
        var response = await axios.post('/api/acceptFriendRequest', obj);
        return response.data;
    }

    async rejectFriendRequest(obj) {
        var response = await axios.post('/api/rejectFriendRequest', obj);
        return response.data;
    }
    // to do
    async getAllIncomingFriendRequests(obj) {
        console.log("getting all incoming friend requests");
        var response = await axios.post('/api/getAllFriendReqs', obj);
        console.log("succeeded in getting all incoming friends");
        // var sampleData = [
        //     "TakiM", "Matt"
        // ]
        return response.data;
    }

    async getAllSentFriendRequests(obj) {
        console.log("getting all outgoing friend requests");
        var response = await axios.post('/api/getSentFriendReqs', obj);
        console.log("Succeeded");
        return response.data;
    }
}

export default new FriendReq();