var routes = function(Friend, User){
    // function that gets all friends for a given user. 
    // returns a list of usernames of friends
    var getAllFriends = function (username, callback) {
        console.log('Getting all friends for ' + username);
        Friend.query(username).exec(function(err, response) {
            if (err) {
                console.log(err);
                callback(null);
            } else {
                var friendUsernames = [];
                console.log(response);
                for (var i = 0; i < response.Items.length; i++) {
                    console.log(response.Items[i].attrs);
                    friendUsernames.push(response.Items[i].attrs.friendUsername);
                }
                console.log(friendUsernames);
                callback(friendUsernames);
            }
            
        });
        
        
    }

    const userOnline = async (username) => {
        return await new Promise((resolve, reject) => {
            User.query(username).exec((err, response) => {
                if (err) reject(err);
                if (response.Items.length > 0 && response.Items[0].attrs.active === 'true') {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        })
    }

    // get all friends who are online
    const getAllOnlineFriends = async (username, callback) => {
        const friends = await new Promise((resolve, reject) => {
            Friend.query(username).exec((err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response.Items);
                }
            })
        });
        const activeFriendUsernames = [];
        for (const friend of friends) {
            if (await userOnline(friend.attrs.friendUsername)) {
                activeFriendUsernames.push(friend.attrs.friendUsername);
            }
        }
        callback(activeFriendUsernames);
    }

    // function to add friend into database
    var addFriendship = function(username, friendUsername, callback) {
        console.log('Adding ' + username + 'and ' + friendUsername);
        var friendship1 = {username: username, friendUsername: friendUsername};
        var friendship2 = {username: friendUsername, friendUsername: username};
        Friend.create([friendship1, friendship2], function(err, response) {
            if (err) {
                console.log(err);
                callback(null);
            } else {
                console.log('Created friendship between ' + username + 'and ' + friendUsername);
                callback(response);
            }
        })
    }

    return {
        getAllFriends: getAllFriends,
        getAllOnlineFriends: getAllOnlineFriends,
        addFriendship: addFriendship
    }
}

module.exports = routes;