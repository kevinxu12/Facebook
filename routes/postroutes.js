var routes = function(Post, postsDb) {

	// function that gets all posts that should be seen by a
	// certain user (posts made by friends)
	var getAllPosts = function (req, res) {
		var username = req.body.username;
		postsDb.getAllPosts(username, function(response) {
			//console.log(response);
			res.send(response);
		})

	}

	// function to add new post
	var addNewPost = function (req, res) {
		var creator = req.body.creator;
		var date = req.body.date;
		var recipient = req.body.recipient;
		var content = req.body.content;
		postsDb.addNewPost(creator, date, recipient, content, function(response) {
			console.log('Added new post for ' + creator + ' at ' + date);
			res.send(response);
		})
	}

	var deletePost = function(req, res) {
		var creator = req.body.creator;
		var postID = req.body.postID;
		postsDb.deletePost(creator, postID, function(response) {
			res.send(response);
		})
	}

	return {
		get_post : getAllPosts,
		add_new_post: addNewPost,
		delete_post: deletePost
	}
}

module.exports = routes;