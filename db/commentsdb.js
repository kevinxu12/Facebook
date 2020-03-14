var routes = function(Comment) {

	// function to get all comments for a post
	var getAllComments = function (postID, date, callback) {
		console.log('Getting all comments for the post made by ' +
			'at ' + date);
		Comment.query(postID).filter('date').equals(date).exec(function(err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log(response);
				var postComments = [];
				for (var i = 0; i < response.Items.length; i++) {
					var comment = response.Items[i];
					postComments.push(comment);
				}
				callback(postComments);
			}
		})
	}

	// function to add new comment for a post
	var addNewComment = function(postID, postDate, creator, date, content, callback) {
		console.log('Adding new comment by ' + creator + ' at ' + date);
		var comment = {
			postID: postID,
			postDate: postDate,
			creator: creator,
			date: date,
			content: content
		}
		console.log(comment);
		Comment.create([comment], function(err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Added new comment by ' + creator + ' at ' + date);
				callback(response);
			}
		})
	}

	return {
		getAllComments: getAllComments,
		addNewComment: addNewComment
	}
}

module.exports = routes;