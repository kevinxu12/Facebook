var routes = function(commentsDb) {

	// function to get all comments for a post
	var getAllComments = function (req, res) {
		var postID = req.body.postID;
		var date = req.body.date;
		commentsDb.getAllComments(postID, date, function(response) {
			res.send(response);
		})
	}

	// function to add new comment for a post
	var addNewComment = function(req, res) {
		var postID = req.body.postID;
		var postDate = req.body.postDate;
		var creator = req.body.creator;
		var date = req.body.date;
		var content = req.body.content;
		commentsDb.addNewComment(postID, postDate, creator, date, content, function(response) {
			console.log('Added new comment by ' + creator + ' at ' + date);
			res.send(response);
		})
	}

	return {
		get_all_comments: getAllComments,
		add_new_comment: addNewComment
	}
}

module.exports = routes;