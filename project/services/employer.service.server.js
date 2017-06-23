
module.exports = function (app) {
    var employerModel = require('../models/employer/employer.model.server');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/project/login', passport.authenticate('local'), login);
    app.get('/api/project/user/:userId', findUserById);
    app.get('/api/project/user', findAllUsers);
    app.post('/api/project/user', createUser);
    app.put('/api/project/user/:userId', updateUser);
    app.delete('/api/project/user/:userId', deleteUser);
    app.get('/api/project/loggedin', loggedin);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.get('/api/project/search/user/:keyword', searchByUsername);
    app.get('/api/project/user/:userId/followings', findAllFollowings);
    app.get('/api/project/user/:userId/followers', findAllFollowers);

    function findAllFollowings(req, res) {
        var userId = req.params.userId;
        employerModel.findUserById(userId)
            .then(function (user) {
                return employerModel.findAllFollowings(user.followings);
            }, function (err) {
                res.send(err);
            })
            .then(function (users) {
                res.json(users);
            });
    }

    function findAllFollowers(req, res) {
        var userId = req.params.userId;
        employerModel.findUserById(userId)
            .then(function (user) {
                return employerModel.findAllFollowers(user.followers);
            }, function (err) {
                res.send(err);
            })
            .then(function (users) {
                res.json(users);
            });
    }

    function searchByUsername(req,res) {
        var keyword = req.params['keyword'];
        employerModel
            .searchByUsername(keyword)
            .then(
                function(result) {
                    if (result) {
                        res.json(result);
                    } else {
                        res.status(402).send("No matched result in users.");
                    }
                }, function (err) {
                    res.status(404).send(err);
                });
    }

    function register(req, res) {
        var userObj = req.body;
        userObj.password = bcrypt.hashSync(userObj.password);
        employerModel
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
        employerModel
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
        employerModel
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
        employerModel
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
        employerModel
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
        employerModel
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
        employerModel
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
            employerModel
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
            employerModel
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
            employerModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
            // res.json(users);
        }
    }

};