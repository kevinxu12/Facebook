// solely for testing backend functionalities
import axios from 'axios' 
class Test{
    constructor() {
    }

    async testPostCall() {
        console.log("fetching test post");
        //replace this with the info you want to send in req.body
        var obj = {postID: '234sdf23f', postDate: '12/2/2019', creator: 'matt', date: '12/2/2019', content: 'I LOVE NETS'};
        // replace this with the api call you're testing

        //const res = await axios.post('/api/addNewComment', obj);
        //const res = axios.get('/api/friendvisualizer');
        //const value = res.data;
        //console.log(res);

        //const res = await axios.post('/api/checklogin', obj);
        //const value = res.data;
        // fake data for now
        //console.log(res);
    }
}

export default new Test();