var routes = function(Friend, Post){
    // lets change this function only return 10 post
    // function that returns list of post objects 
    // for a specific user 
    var getAllPosts = function (username, callback) {
        console.log('Getting all posts for ' + username);
        Post.scan().exec(function(err, posts) {
            var postObj = [];
            var length = posts.Items.length;
            if(length > 0) {
                for (var i = 0; i < length; i++) {
                    var post = posts.Items[i];
                    var friend = posts.Items[i].attrs.creator;
                    var j = 0;
                    if(friend === username) {
                        postObj.push(post);
                    }
                    (function(postObj,post) {
                        Friend.query(username).where('friendUsername').equals(friend).exec(function(err, response) {
                            if(response) {
                                if (response.Items.length != 0) {
                                    console.log("Friend matches");
                                    postObj.push(post);
                                } 
                                
                            }
                            j = j + 1;
                            if(j === (posts.Items.length - 1)) {
                                //console.log(postObj);
                                callback(postObj);
                            }
                            
                        });
                    }
                    )(postObj, post);
                }
            } else {
                console.log("Returning empty posts");
                callback(postObj);
            }
        }); 
    }

    // function to make a post
    var addNewPost = function (creator, date, recipient, content, callback) {
        console.log('Adding new post for ' + creator + " at " + date);
        var post = {
            creator: creator,
            date: date, 
            recipient: recipient,
            content: content
        }
        Post.create([post], function(err, response) {
            if (err) {
                console.log(err);
                callback(null);
            } else {
                console.log('Added new post for ' + creator + ' at ' + date);
                callback(post);
            }
        })
    }

    // function to delete a post
    var deletePost = function(creator, postID, callback) {
        console.log("Deleting the post created by " + creator + " with post ID " + postID)
        Post.destroy({creator: creator, postID: postID}, function(err, response) {
            if(err) {
                console.log(err);
                callback(null);
            } else {
                console.log("Deleted post");
                callback("success");
            }
        })

    }


    return {
        getAllPosts: getAllPosts,
        addNewPost: addNewPost,
        deletePost: deletePost
    }
}

module.exports = routes;