import axios from 'axios' 
class Auth {
    constructor() {
        // changed just because
    }

    async login (obj, callback) {
        console.log("begin login sequence");
        console.log(obj);
        const res = await axios.post('/api/checklogin', obj);
        const value = res.data;
        // true for debugging
        // const value = "success"
        if(value === "success") {
            var obj2 = {
                username: obj.username,
                field: "active",
                value: "true"
            }
            const resActive = await axios.post('/api/updateProfileAttribute', obj2);
            localStorage.setItem("token", obj.username);
        }
        callback(value);
    }

    async logout(obj, callback) {
        var res = await axios.get('/api/logout');
        var obj2 = {
            username: obj.username,
            field: "active",
            value: "false"
        }
        const resActive = await axios.post('/api/updateProfileAttribute', obj2);
        console.log(res.data);
        localStorage.removeItem("token");
        callback();

    }

    async signup(obj, obj2, callback) {
        console.log("adding new user");
        console.log(obj);
        const res = await axios.post('/api/signup', obj);
        //const res2 = await axios.post('/api/addFriendship', obj2);
        const value = res.data;
        //const value2 = res2.data;
        //console.log("Result of friends" + value2);
        //if(value === "success" && value2) {
        //    localStorage.setItem("token", obj.username);
        //}
        if(value === "success") {
            var obj3 = {
                username: obj.username,
                field: "active",
                value: "true"
            }
            const resActive = await axios.post('/api/updateProfileAttribute', obj3);
            localStorage.setItem("token", obj.username);
        }
        callback(value);
    }
}

export default new Auth();