var routes = function(User) {

	// function to get all info for a user
	var getAllUserInfo = function(username, callback) {
		console.log('Getting info for ' + username);
		User.get(username, function(err, info) {
			if (err) {
				console.log(err);
				callback(null);
			} else if (info == null) {
				console.log('User does not exist');
			} else {
				//console.log(info);
				callback(info);
			}
		})
	}

	// function to update status of a user
	var updateStatus = function(username, status, callback) {
		console.log('Updating status for ' + username);
		User.update({username: username, status: status}, function(err, update) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Updated status of ' + username);
				callback(update);
			}
		})
	}

	var getStatus = function(username, callback) {
		console.log('Getting status for ' + username);
		User.get(username, function(err, data) {
			if (err) {
				console.log(err);
				callback(null);
			} else if (data == null) {
				console.log('User does not exist');
			} else {
				console.log(data);
				callback(data.attrs.status);
			}
		})
	}

	var updateProfileAttribute = function(username, field, value, callback) {
		console.log('Updating ' + field + ' for ' + username + ' to ' + value);
		var field = field;
		if (field === 'birthday') {
			User.update({username: username, birthday: value}, function (err, update) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Updated ' + field + ' for ' + username + ' to ' + value);
				callback(update);
			}
		});

		} else if (field === 'email') {
			User.update({username: username, email: value}, function (err, update) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Updated ' + field + ' for ' + username + ' to ' + value);
				callback(update);
			}
		});

		} else if (field === 'affiliation') {
			User.update({username: username, affiliation: value}, function (err, update) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Updated ' + field + ' for ' + username + ' to ' + value);
				callback(update);
			}
		});

		} else if (field ==='interest') {
			User.update({username: username, interest: value}, function (err, update) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Updated ' + field + ' for ' + username + ' to ' + value);
				callback(update);
			}
		});

		} else if (field === 'status') {
			User.update({username: username, status: value}, function (err, update) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Updated ' + field + ' for ' + username + ' to ' + value);
				callback(update);
			}
		});
		} else if (field === 'active') {
			User.update({username: username, active: value}, function (err, update) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Updated ' + field + ' for ' + username + ' to ' + value);
				callback(update);
			}
		});
		} else if (field ==='firstname') {
			User.update({username: username, firstname: value}, function (err, update) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Updated ' + field + ' for ' + username + ' to ' + value);
				callback(update);
			}
		});
		} else if (field === 'lastname') {
			User.update({username: username, lastname: value}, function (err, update) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Updated ' + field + ' for ' + username + ' to ' + value);
				callback(update);
			}
		});
		}
		
	}

	return {
		getAllUserInfo: getAllUserInfo,
		updateStatus: updateStatus,
		getStatus: getStatus,
		updateProfileAttribute: updateProfileAttribute
	}
}

module.exports = routes;