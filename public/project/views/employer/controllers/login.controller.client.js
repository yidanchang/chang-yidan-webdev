(function () {
    angular
        .module('JobApp')
        .controller('loginController', loginController);

    function loginController($location, employerService) {

        var model = this;
        model.login = login;

        function login(username, password) {
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                return;
            }
            if(password === null || password === '' || typeof password === 'undefined') {
                model.error = 'Password is required';
                return;
            }
            employerService
                .login(username, password)
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