(function () {
    angular
        .module('JobApp')
        .controller('adminUserController', adminUserController);

    function adminUserController(currentUser, employerService, $location) {
        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.edit = false;
        model.editUser = editUser;
        model.updateUser = updateUser;
        model.cancel = cancel;

        function init() {
            findAllUsers();
        }

        init();

        function findAllUsers() {
            employerService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                })
        }

        function cancel() {
            model.edit = false;
        }

        function updateUser(user) {
            if (user.roles) {
                if (user.roles.indexOf('ADMIN') > -1) {
                    user.roles = ['USER', 'ADMIN'];
                } else {
                    user.roles = ['USER'];
                }
            } else {
                user.roles = ['USER'];
            }
            employerService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function createUser(user) {
            employerService.findUserByUsername(user.username).then(function () {
                model.error = "This username has existed!";
            }, function() {
                employerService
                    .createUser(user)
                    .then(findAllUsers)
                    .then(function () {
                        model.error = null;
                    });
            })
        }

        function editUser(user) {
            model.edit = true;
            model.user = angular.copy(user);
        }

        function deleteUser(user) {
            employerService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function logout() {
            employerService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();