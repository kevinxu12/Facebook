var routes = function(friendsDb){
    // function that gets all friends for a given user. 
    // returns a list of usernames of friends
    var getAllFriendsRoute = function (req, res) {
        var username = req.body.username;
        friendsDb.getAllFriends(username, function(response) {
            res.send(response);
        })
    }
    // function that gets all online friends for a given user. 
    // returns a list of usernames of friends
    var getAllOnlineFriendsRoute = function (req, res) {
        var username = req.body.username;
        friendsDb.getAllOnlineFriends(username, function(response) {
            res.send(response);
        })
    }

    // function to add friendship into database
    var addFriendship = function (req, res) {
        var username = req.body.username;
        var friendUsername = req.body.friendUsername;
        friendsDb.addFriendship(username, friendUsername, function(response) {
            console.log(response);
            res.send(response);
        })
    }



    return {
        get_all_friends: getAllFriendsRoute,
        get_all_online_friends: getAllOnlineFriendsRoute,
        add_friendship: addFriendship
    }
}

module.exports = routes;