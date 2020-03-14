import axios from 'axios' 
class Comment{
    constructor() {
    }

    async createComment (obj, callback) {
        console.log("creating comment");
        //console.log(obj);
        const res = await axios.post('/api/addNewComment', obj);
        callback(res);
    }

    async fetchCommentData (obj) {
        console.log("fetching comments");
        //console.log(obj);
        const res = await axios.post('/api/getAllComments', obj);
        var val = res.data;
        return val;
    }
}

export default new Comment();