var express = require('express');
const path = require('path')
var app = express();
//var session = require('express-session');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
// define/require all schemas here
var schemas = require('./createTableSchemas');
var friendRecFile = './adsorption/out/part-r-00000';
var visualizerView = 'friendvisualizer.ejs';
var User = schemas.User;
var Friend = schemas.Friend;
var Post = schemas.Post;
var Comment = schemas.Comment;
var FriendRequests = schemas.FriendRequests;
var Notification = schemas.Notification;

// define/require all helper dbs here
var friendsDb = require('./db/friendsdb')(Friend, User);
var postsDb = require('./db/postsdb')(Friend, Post);
var usersDb = require('./db/usersdb')(User);
var commentsDb = require('./db/commentsdb')(Comment);
var friendreqDb = require('./db/friendrequestdb')(FriendRequests, User, Friend);
var notificationDb = require('./db/notificationdb')(Notification, Friend);

//define require all routes here
var authRoutes = require('./routes/authroutes.js')(User);
var friendRoutes = require('./routes/friendroutes.js')(friendsDb);
var postRoutes = require('./routes/postroutes.js')(Post, postsDb);
var userRoutes = require('./routes/userroutes.js')(usersDb);
var commentRoutes = require('./routes/commentroutes.js')(commentsDb);
var friendRequestRoutes = require('./routes/friendrequestroutes.js')(friendreqDb);
var notificationRoutes = require('./routes/notificationroutes.js')(notificationDb);
var friendRecRoutes = require('./routes/friendrecroutes.js')(friendRecFile, User, Friend);
var friendVisRoutes = require('./routes/friendvisroutes.js')(User, Friend, visualizerView);
var chatroomRoutes = require('./routes/chatroomroutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 100000,
	    keys: ['key1', 'key2']
    })
);
app.use('/public', express.static('./public/'));
app.use(express.static(path.join(__dirname, 'client/build')))


// friend visualizer 

app.get('/friendvisualizer', friendVisRoutes.get_visualizer);
app.get('/friendvisualization', friendVisRoutes.init_visualization);
app.get('/getFriends/:user/:affiliation', friendVisRoutes.get_new_visualization);

// install the routes here
   app.post('/api/checklogin', authRoutes.check_login);
   app.post('/api/signup', authRoutes.add_user);
   app.post('/api/getAllUserInfo', userRoutes.get_all_user_info);
   app.post('/api/updateStatus', userRoutes.update_status);
   app.post('/api/getStatus', userRoutes.get_status);
   app.post('/api/getAllFriends', friendRoutes.get_all_friends);
   app.post('/api/getAllOnlineFriends', friendRoutes.get_all_online_friends);
   app.post('/api/addFriendship', friendRoutes.add_friendship);
   app.post('/api/getAllPosts', postRoutes.get_post);
   app.post('/api/addNewPost', postRoutes.add_new_post);
   app.post('/api/getAllComments', commentRoutes.get_all_comments);
   app.post('/api/addNewComment', commentRoutes.add_new_comment);
   app.post('/api/updateProfileAttribute', userRoutes.update_profile_attribute);
   app.post('/api/getTopFriendRecommendations', friendRecRoutes.get_top_friend_recs);
   app.post('/api/getFriendRecData', friendRecRoutes.get_friend_rec_data);
   app.post('/api/getAllNotifications', notificationRoutes.get_all_notifications);
   app.post('/api/addNewNotification', notificationRoutes.add_new_notification);
   app.post('/api/getAllFriendReqs', friendRequestRoutes.get_all_friend_reqs);
   app.post('/api/getAllSentFriendReqs', friendRequestRoutes.get_all_sent_friend_reqs);
   app.post('/api/sendFriendRequest', friendRequestRoutes.send_friend_request);
   app.post('/api/acceptFriendRequest', friendRequestRoutes.accept_friend_request);
   app.post('/api/rejectFriendRequest', friendRequestRoutes.reject_friend_request);
   app.get('/api/current_user', authRoutes.get_user);
   app.get('/api/logout', authRoutes.remove_user);
   app.post('/api/deletePost', postRoutes.delete_post);
   app.post('/api/getSentFriendReqs', friendRequestRoutes.get_all_sent_friend_reqs);
   app.get('/api/getChatrooms', chatroomRoutes.getChatrooms);
   app.post('/api/leaveChatroom', chatroomRoutes.leaveChat);
   app.post('/api/viewChat', chatroomRoutes.viewChat);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// run the server below
console.log('Author: Kevin Xu (xukevin)');
app.listen(8080);
console.log('Server running on port. Now open http://localhost:8080/ in your browser!');

// all chat logic is below 
const ClientManager = require('./server_socket/ClientManager');
const ChatroomManager = require('./server_socket/ChatroomManager');
const makeHandlers = require('./server_socket/handlers');

const clientManager = ClientManager()
const chatroomManager = ChatroomManager()

io.on('connection', (client) => {

    console.log('client connected...', client.id);

    // client.on('availableChats', () => {
    //     io.emit('availableChats', chatroomManager.getAvailableChatrooms())
    // })

    const {
        handleJoin,
        handleMessage
    } = makeHandlers(client, clientManager, chatroomManager);

    clientManager.addClient(client);

    client.on('join', handleJoin);

    client.on('message', handleMessage);

    client.on('error', () => {
        console.log('receieved error from client', client.id);
        console.log(err);
    })

    client.on('disconnect', () => {
        console.log('user disconnected');
    });

    // socket.on('chat messsage', handleMessage);
});


http.listen(1024, () => {
    console.log('socket is listening on port 1024');
});