(function () {
    angular
        .module('JobApp')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;
        model.login = login;

        function login(username, password) {
            // var found = userService.findUserByCredentials(username, password);
            //
            // if(found !== null) {
            //     $location.url('/user/' + found._id);
            // } else {
            //     model.message = "Sorry, " + username + " not found. Please try again!";
            // }
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                return;
            }
            if(password === null || password === '' || typeof password === 'undefined') {
                model.error = 'Password is required';
                return;
            }
            userService
                .login(username, password)
                // .findUserByCredentials(username, password)
                .then(function (found) {
                    if (found !== null) {
                        $location.url('/profile');
                    }
                }, function () {
                    model.error = "Sorry, " + username + " not found. Please try again!";
                });
        }
    }
})();