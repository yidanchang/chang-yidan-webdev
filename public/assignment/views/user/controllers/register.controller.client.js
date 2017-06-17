(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                return;
            }

            if(password === null || password === '' || typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }
            if(password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.error = "Verify Password field is required";
                return;
            }
            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "Password and Verify Password must match";
                return;
            }
            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        return userService
                            .register(newUser)
                            .then(function (user) {
                                $location.url('/profile');
                            })
                    });

            // var found = userService.findUserByUsername(username);
            //
            // if(found !== null) {
            //     model.error = "Sorry, that username is taken";
            // } else {
            //     var newUser = {
            //         username: username,
            //         password: password
            //     };
            //     newUser = userService.createUser(newUser);
            //     $location.url('/user/' + newUser._id);
            // }
        }
    }
})();