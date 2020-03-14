var routes = function(FriendRequests, User, Friend) {

	// function to return people who sent indicated user
	// a friend request - returns list of senders

	var getAllFriendReqs = function (username, callback) {
		console.log('Getting all users who sent ' + username + ' a friend request');
		FriendRequests.query(username).exec(function (err, response) {
			var length = response.Items.length;
			if (err) {
				console.log(err);
				callback(null);
			} else if (length > 0) {
				var users = [];
				for (var i = 0; i < length; i++) {
					var cnt = 0;
					var sender = response.Items[i].attrs.sender;
					(function(users, sender) {
						// sending whole user object
						User.get(sender, function(err, userInfo) {
							if (err) {
								
							} else {
								users.push(userInfo.attrs.username);
								console.log(users);
							}

							if (cnt === (length - 1)) {
								console.log("Got all users who sent " + username + " a friend request");
								callback(users);
							}
							console.log(cnt);
							cnt = cnt + 1;
						});
					})(users, sender);
				}
			} else {
				var users = [];
				console.log("Got all users who sent " + username + " a friend request");
				callback(users);
			}
		})
	}
	
	// function to get all friend requests you have sent someone 
	var getAllSentFriendReqs = function(username, callback) {
		console.log('Getting all users who ' + username + 'sent a friend request');
		FriendRequests.scan().where('sender').equals(username).exec((err, response) => {
			if (err) {
				console.log(err);
				callback(null); 
			} else {
				const pendingFriendRequests = response.Items.map((f) => f.attrs.username);
				callback(pendingFriendRequests);
			}
		})
	}

	// function to send friend request

	var sendFriendRequest = function (username, sender, callback) {
		console.log('Sending a friend requestion from ' + sender + ' to ' + username);
		var friendReq = {
			username: username,
			sender: sender
		}
		Friend.get({username: username, friendUsername: sender}, function(err, response) {
			console.log("ALREADY FRENT RESULT");
			console.log(response);
			if(err) {
				console.log(err);
				callback(null);
			} else if (response == null && username != sender) {
				FriendRequests.query(username).where('sender').equals(sender).exec(function(err, contains) {
					if (err) {
						console.log(err);
						callback(null);
					// changed the clause here because if something is not contained, contains will not be null
					// instead it will have an object of Items length 0;
					} else if (contains.Items.length == 0) {	
						FriendRequests.create([friendReq], function(err, response) {
							if (err) {
								console.log(err);
								callback(null);
							} else {
								console.log('Created friend request from ' + sender + ' to ' + username);
								callback(response);
							}
						})
					} else {
						//console.log(contains);
						console.log('Friend request already sent from ' + sender + ' to ' + username);
						callback("ALREADY SENT");
					}
				})
			} else {
				console.log("Already friends or cannot be friends with oneselves");
				callback("ALREADY FRIENDS");
			}
		})
		



	}

	var acceptFriendRequest = function(username, sender, callback) {
		console.log(username + " accepted " + sender + " friend request");
		FriendRequests.destroy({username: username, sender: sender}, function (err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Friend request is accepted');
				console.log('Creating new friendship in Friends database');
				var friendship1 = {
					username: username,
					friendUsername: sender
				}

				var friendship2 = {
					username: sender,
					friendUsername: username
				}

				Friend.create([friendship1, friendship2], function(err, friends) {
					if (err) {
						console.log(err);
						callback(null);
					} else {
						console.log('Added new friendship');
						callback("success");
					}
				})
			}
		})

	}

	var rejectFriendRequest = function(username, sender, callback) {
		console.log(username + " rejected " + sender + " friend request");
		FriendRequests.destroy({username: username, sender: sender}, function (err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Friend request is rejected');
				callback("success");
			}
		})
	}


	return {
		getAllFriendReqs : getAllFriendReqs,
		sendFriendRequest: sendFriendRequest,
		acceptFriendRequest: acceptFriendRequest,
		rejectFriendRequest: rejectFriendRequest,
		getAllSentFriendReqs: getAllSentFriendReqs,
		getAllSentFriendReqs
	}
}

module.exports = routes;