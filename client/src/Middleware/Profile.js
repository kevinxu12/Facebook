import axios from 'axios' 
class Profile{
    constructor() {
    }

    async getAllUserInfo(obj) {
        console.log("Getting all user info");
        const res = await axios.post('/api/getAllUserInfo', obj);
        console.log(res);
        return res;
    }

    async updateProfile (obj, callback) {
        console.log("updating profile");
        console.log(obj);
        const res = await axios.post('/api/updateProfileAttribute', obj);
        console.log(res);
        return res;
    }
}

export default new Profile();