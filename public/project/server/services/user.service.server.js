
module.exports = function (app) {
    var userModel = require('../models/user/user.model.server');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var FacebookStrategy = require('passport-facebook').Strategy;

    app.get('/auth/facebook',
        passport.authenticate('facebook',
            {scope: 'email'}
        ));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#!/profile',
            failureRedirect: '/assignment/#!/login'
        }));

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/assignment/user/:userId', findUserById);
    app.get('/api/assignment/user', findAllUsers);
    app.post('/api/assignment/user', createUser);
    app.put('/api/assignment/user/:userId', updateUser);
    app.delete('/api/assignment/user/:userId', deleteUser);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);

    function register(req, res) {
        var userObj = req.body;
        userObj.password = bcrypt.hashSync(userObj.password);
        userModel
            .createUser(userObj)
            .then(function (user) {
                req
                    .login(user, function (status) {
                        res.send(status);
                    });
            });
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedin(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                //     if (!user) {
                //         return done(null, false);
                //     }
                //     return done(null, user);
                // },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function login(req, res) {
        res.json(req.user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.send(status);
            });
        // for(var u in users) {
        //     if(users[u]._id === userId) {
        //         users.splice(u, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        userModel
            .updateUser(userId, user)
            .then(function (status) {
                res.send(status);
            });
        // for(var u in users) {
        //     if(users[u]._id === req.params.userId) {
        //         users[u] = user;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.send(err);
            });
        // user._id = (new Date()).getTime() + "";
        // users.push(user);
        // res.json(user);
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
        // for(var u in users) {
        //     if(users[u]._id === userId) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        if (username) {
            userModel
                .findUserByUsername(username)
                .then(function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                });
        }
        // if(username) {
        //     for(var u in users) {
        //         var user = users[u];
        //         if( user.username === username) {
        //             res.json(user);
        //             return;
        //         }
        //     }
        //     res.sendStatus(404);
        //     return;
        // }
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                });
        }
        // if(username && password) {
        //     for(var u in users) {
        //         var user = users[u];
        //         if( user.username === username &&
        //             user.password === password) {
        //             res.json(user);
        //             return;
        //         }
        //     }
        //     res.sendStatus(404);
        //     return;
        // }
    }

    function findAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
            // for(var u in users) {
            //     var user = users[u];
            //     if( user.username === username &&
            //         user.password === password) {
            //         res.json(user);
            //         return;
            //     }
            // }
            // res.sendStatus(404);
            // return;
        } else if (username) {
            findUserByUsername(req, res);
            // for(var u in users) {
            //     var user = users[u];
            //     if( user.username === username) {
            //         res.json(user);
            //         return;
            //     }
            // }
            // res.sendStatus(404);
            // return;
        } else {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
            // res.json(users);
        }
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        // var email = profile.emails[0].value;
                        // var emailParts = email.split("@");
                        var newFacebookUser = {
                            username: profile.displayName,
                            // firstName: profile.name.first_name,
                            // lastName:  profile.name.last_name,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }
}