(function () {
    angular
        .module('JobApp')
        .controller('mainController', mainController);

    function mainController(currentUser, employerService, $location) {
        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            employerService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();