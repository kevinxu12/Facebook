var routes = function(Notification, Friend) {

	// add a new notification
	var addNewNotification = function (username, date, notification, callback) {
		console.log('Adding new notification by ' + username);
		var notif = {
			username: username,
			date: date,
			notification: notification
		}
		Notification.create([notif], function (err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Added new notification by ' + username);
				callback(response);
			}
		})

	}

	// get all notifications from friends
	var getAllNotifications = function(username, callback) {
		console.log('Getting all notifications for ' + username);
		Friend.query(username).exec(function (err, response) {
			var length = response.Items.length;
			if (err) {
				console.log(err);
				callback(null);
			} else if (length > 0) {
				var notifications = [];
				for (var i = 0; i < length ; i++) {
					var cnt = 0;
					var friend = response.Items[i].attrs.friendUsername;
					console.log(friend);
					(function(notifications, friend) {
						Notification.query(friend).exec(function(err, notifs) {
							console.log("LISTING ALL NOTIFS" + notifs);
							if (err) {
								console.log(err);
								callback(null);
							} else if (friend == username) {
								;
							} else {
								for (var j = 0; j < notifs.Items.length; j++) {
									var notif = notifs.Items[j];
									console.log("SPECIFIC NOTIF" + notif);
									notifications.push(notif);
								}
							}

							if (cnt == (response.Items.length - 1)) {
								callback(notifications);
							}

							cnt = cnt + 1;

						});
					})(notifications, friend);
				}
			} else {
				var notifications = [];
				callback(notifications);
			}
		})


	}

	return {
		addNewNotification: addNewNotification,
		getAllNotifications: getAllNotifications
	}
}

module.exports = routes;