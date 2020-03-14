var User = require('./../createTables');
var checkLogin = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.get(username, function(err, acc) {
        if (err) {
            res.send("error: error getting user in checkLogin. More information" + err);
        } else {
            if (acc) {
                console.log("successfully found user, now checking password")
                var storedPassword = acc.get('password');
                console.log(storedPassword);
                console.log(password);
                if (storedPassword === password) {
                    console.log("successful login. rerouting to feed");
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

var addNewUser = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    User.get(username, function(err, acc) {
        if (err) {
            res.send("error: error checking existing user in signup. More information" + err);
        } else {
            if (acc) {
                res.send("error: username already exists. Try again")
            } else {
                User.create({username: username, password: password, email: email}, function (err2, acc2) {
                    if (err2) {
                        res.send("error: error creating new user" + err2);
                    } else {
                        res.send("success");
                    }
                });
            }
        }
    })

}

var routes = {
    check_login: checkLogin,
    add_user: addNewUser
}

module.exports = routes;