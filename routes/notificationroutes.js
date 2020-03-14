var routes = function(notificationDb) {

	var addNewNotification = function (req, res) {
		var username = req.body.username;
		var date = req.body.date;
		var notification = req.body.notification;
		notificationDb.addNewNotification(username, date, notification, function(response) {
			res.send(response);
		})
	}

	var getAllNotifications = function (req, res) {
		var username = req.body.username;
		notificationDb.getAllNotifications(username, function(response) {
			res.send(response);
		})
	}

	return {
		add_new_notification: addNewNotification,
		get_all_notifications: getAllNotifications
	}
}

module.exports = routes;