// user funcctionalities
import axios from 'axios' 
class User{
    constructor() {
    }

    async getAllFriends(obj ) {
        console.log("fetching all friends for a user");
        //replace this with the info you want to send in req.body
        // var value = ['Matt', 'TakiM'];
        const res = await axios.post('/api/getAllFriends', obj);
        const value = res.data;
        return value;

    }
}

export default new User();