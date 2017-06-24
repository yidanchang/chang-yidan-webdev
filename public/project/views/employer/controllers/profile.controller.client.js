(function () {
    angular
        .module('JobApp')
        .controller('profileController', profileController);

    function profileController($location,
                               currentUser,
                               employerService) {

        var model = this;

        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.logout = logout;
        model.unregister = unregister;
        model.isAdmin = false;

        function init() {
            renderUser(currentUser);
        }
        init();


        function logout() {
            employerService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function unregister() {
            employerService
                .unregister()
                .then(function () {
                    $location.url('/');
                })
        }

        function updateUser(userId, user) {
            employerService
                .updateUser(userId, user)
                .then(function () {
                    model.message = "User has updated successfully!";
                });
        }

        function renderUser (user) {
            model.user = user;
            if (currentUser.roles.indexOf('ADMIN') > -1) {
                model.isAdmin = true;
            }
        }

        function userError () {
            model.error = "User not found";
        }
    }
})();