const bcrypt = require('bcryptjs')

var routes = function(User){
    var checkLogin = function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        console.log(req.body);
        User.get(username, async function(err, acc) {
            if(err) {
                res.send("error: error getting user in checkLogin. More information" + err);
            } else {
                if(acc) {
                    console.log("successfully found user, now checking password")
                    var storedPassword = acc.get('password');
                    console.log(storedPassword);
                    console.log(password);
                    const isMatch = await bcrypt.compare(password, storedPassword)
                    if(isMatch) {
                        console.log("successful login. rerouting to feed");
                        req.session.user = username;
                        res.send("success");
                    } else {
                        res.send("error: password mismatch");
                    }
                } else {
                      res.send("error: user not found")
                }
            }
        })
    }

    var addNewUser = async function (req, res) {
        console.log(req.body);
        var username = req.body.username;
        var email = req.body.email;
        var password = await bcrypt.hash(req.body.password, 8)
        var active = req.body.active;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var affiliation = req.body.affiliation;
        var interests = req.body.interests;
        var birthday = req.body.birthday;
        var status = req.body.status;
        User.get(username, function(err, acc) {
            if(err) {
                res.send("error: error checking existing user in signup. More information" + err);
            } else {
                if(acc) {
                    res.send("error: username already exists. Try again")
                } else {
                    var interestList = interests.split(',');
                    var user = {
                        username: username,
                        password: password,
                        email: email,
                        active: active,
                        firstname: firstname,
                        lastname: lastname,
                        affiliation: affiliation,
                        interests: interestList,
                        birthday: birthday,
                        status: status
                    };
                    User.create([user], function (err2, acc2) {
                        if(err2) {
                            res.send("error: error creating new user" + err2);
                        } else {
                            req.session.user = username;
                            res.send("success");
                        }
                    });
                }
            }
        })

    }

    var getUser = function (req, res) {
        console.log("Getting user" + req.session.user);
        res.send(req.session.user);
    }

    var removeUser = function(req, res) {
        console.log("removing user");
        req.session.user = "";
        res.send("successfully removed user");
    }

    return {
        check_login: checkLogin,
        add_user: addNewUser,
        get_user: getUser,
        remove_user: removeUser
    }
}

module.exports = routes;