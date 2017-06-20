(function(){
    angular
        .module('JobApp')
        .factory('employerService', employerService);

    function employerService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            login: login,
            logout: logout,
            loggedin: loggedin,
            register: register,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function register(userObj) {
            var url = "/api/project/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }
        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
            // user._id = (new Date()).getTime() + "";
            // user.created = new Date();
            // users.push(user);
            // return user;
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var user = users.find(function (user) {
            //     return user.username === username;
            // });
            // if(typeof user === 'undefined') {
            //     return null;
            // }
            // return user;
        }

        function findUserById(userId) {
            var url = "/api/project/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // for(var u in users) {
            //     if(users[u]._id === userId)
            //         return users[u];
            // }
            // return null;
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // for(var u in users) {
            //     var user = users[u];
            //     if( user.username === username &&
            //         user.password === password) {
            //         return user;
            //     }
            // }
            // return null;
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
            // for (var u in users) {
            //     if (users[u]._id === userId) {
            //         users[u] = user;
            //         return users[u];
            //     }
            // }
            // return null;
        }

        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
            // var user = findUserById(userId);
            // var index = users.indexOf(user);
            // users.splice(index, 1);
        }
    }
})();