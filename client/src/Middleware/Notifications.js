import axios from 'axios' 
class Notification {

    async addNewNotification(obj) {
        console.log("creating notification for " + obj.username);
        const res = await axios.post('/api/addNewNotification', obj);
        return res;
    }

    async getAllNotifications(obj) {
        console.log("Getting all notifications for " + obj.username);
        const res = await axios.post('/api/getAllNotifications', obj);
        const result = res.data;
        return result;
    }
}

export default new Notification();