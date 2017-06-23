(function () {
    angular
        .module('JobApp')
        .controller('navbarController', navbarController);

    function navbarController(currentUser, employerService, $location) {
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