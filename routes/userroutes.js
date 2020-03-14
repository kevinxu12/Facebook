var routes = function(usersDb) {

	// function to get all user info
	var getAllUserInfo = function (req, res) {
		var username = req.body.username;
		usersDb.getAllUserInfo(username, function(response) {
			res.send(response);
		})
	}

	// function to update status of user
	var updateStatus = function (req, res) {
		var username = req.body.username;
		var status = req.body.status;
		usersDb.updateStatus(username, status, function(response) {
			res.send(response);
		})
	}

	// function to get status of a user
	var getStatus = function (req, res) {
		var username = req.body.username;
		usersDb.getStatus(username, function(response) {
			res.send(response);
		})
	}

	var updateProfileAttribute = function (req, res) {
		var username = req.body.username;
		var field = req.body.field;
		var value = req.body.value;
		usersDb.updateProfileAttribute(username, field, value, function(response) {
			res.send(response);
		})
	}

	return {
		get_all_user_info: getAllUserInfo,
		update_status: updateStatus,
		get_status: getStatus,
		update_profile_attribute: updateProfileAttribute
	}
}

module.exports = routes;