module.exports = function (app) {
    var employerModel = require('../models/employer/employer.model.server');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#!/profile',
            failureRedirect: '/project/#!/login'
        }));


    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    //
    // 662481131444-eqr53r5n2oarvuas8n0i0m4utj1043v9.apps.googleusercontent.com
    //
    // RsXBw1YBJeArRJtarpzd1V8Z


    app.post('/api/project/login', passport.authenticate('local'), login);
    app.get('/api/project/user/:userId', findUserById);
    app.get('/api/project/user', isAdmin, findAllUsers);
    app.post('/api/project/user', isAdmin, createUser);
    app.put('/api/project/user/:userId', updateUser);
    app.delete('/api/project/user/:userId', isAdmin, deleteUser);
    app.get('/api/project/loggedin', loggedin);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.post('/api/project/unregister', unregister);
    app.get('/api/project/search/user/:keyword', searchByUsername);
    app.get('/api/project/user/:userId/followings', findAllFollowings);
    app.get('/api/project/user/:userId/followers', findAllFollowers);
    app.get('/api/project/checkAdmin', checkAdmin);

    function isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    function checkAdmin(req, res) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

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

    function searchByUsername(req, res) {
        var keyword = req.params['keyword'];
        employerModel
            .searchByUsername(keyword)
            .then(
                function (result) {
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

    function unregister(req, res) {
        employerModel
            .deleteUser(req.user._id)
            .then(function (user) {
                req.logout();
                res.sendStatus(200);
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
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        user.password = bcrypt.hashSync(user.password);
        employerModel
            .updateUser(userId, user)
            .then(function (status) {
                res.send(status);
            });
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        employerModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.send(err);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        employerModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
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
    }

    function findAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        } else {
            employerModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
        }
    }

    function googleStrategy(token, refreshToken, profile, done) {
        employerModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return employerModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }
};