var routes = function(file, User, Friend) {

	var fs = require("fs");

	// read in data from data sets into txt file to run map reduce on
	var getFriendRecData = function (req, res) {
		var content = "";
		User.scan().exec(function (err, response) {
			if (err) {
				console.log(err);
				res.send(null);
			} else {
				var logger = fs.createWriteStream('input.txt', {
					flags: 'a'
				});
				var users = "";
				for (var i = 0; i < response.Items.length; i++) {
					var user = response.Items[i];
					console.log(user);
					var username = response.Items[i].attrs.username;
					var affiliation = response.Items[i].attrs.affiliation;
					var stringToAdd = "" + username + ":" + affiliation;
					for (var a = 0; a < response.Items[i].attrs.interests.length; a++) {
						stringToAdd = stringToAdd + "," + response.Items[i].attrs.interests[a];
					}
					var cnt = 0;
					(function(users, username, stringToAdd) {
						Friend.query(username).exec(function (err, userFriends) {
							if (err) {
								console.log(err);
								res.send(null);
							} else {
								for (var j = 0; j < userFriends.Items.length; j++) {
									var friend = userFriends.Items[j].attrs.friendUsername;
									if (friend != username) {
										stringToAdd = stringToAdd + "," + friend;
									}
								}

								users = users + stringToAdd + "\n";
								console.log(users);
								var data = fs.readFileSync('input.txt', 'utf8')
								var matchString = username + ":";
								if ((data.toString().match(/matchString/g) || []).length == 0) {
									logger.write(users);
									cnt++;
								} 
								var dataFinal = fs.readFileSync('input.txt', 'utf8')
								console.log('in file');
								console.log(dataFinal.toString());
								console.log('in file');
								if ((dataFinal.toString().match(/\n/g) || []).length == response.Items.length) {
									res.send('done');
								}

								if (cnt == response.Items.length) {
									res.send('done');
								}
								
								// console.log(response.Items.length);
								// console.log((users.match(/\n/g) || []).length);
								// if ((users.match(/\n/g) || []).length == response.Items.length) {
								// 	fs.writeFileSync('input.txt', users);
								// 	res.send(users);
								// }

								
							}
						})
					})(users, username, stringToAdd);


								
				}


			}
			
		})
	}


	// return top 5 friend recommendations
	var getTopFriendRecommendations = function (req, res) {
		var username = req.body.username;
		var text = fs.readFileSync(file);
		var textByLine = text.toString().split("\n");
		var friendsAndWeights = [];

		for (var i = 0; i < textByLine.length; i++) {
			var user = textByLine[i].split("\t")[0];
			if (user == username) {
				friendsAndWeights = textByLine[i].split("\t")[1].split(";");
				break;
			}
		}

		var friendRecs = [];
		var length = Math.min(friendsAndWeights.length, 5);
		for (var j = 1; j < length; j++) {
			var friend = friendsAndWeights[j].toString().split(",")[0];
	 		friendRecs.push(friend);
		}

		res.send(friendRecs);
	}


	return {
		get_friend_rec_data: getFriendRecData,
		get_top_friend_recs: getTopFriendRecommendations

	}
}

module.exports = routes;