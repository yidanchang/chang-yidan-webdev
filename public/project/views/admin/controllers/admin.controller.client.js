(function () {
    angular
        .module('JobApp')
        .controller('adminController', adminController);

    function adminController(currentUser, employerService, $location) {
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