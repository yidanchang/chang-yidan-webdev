(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];
        // function init() {
        //     model.user = userService.findUserById(model.userId);
        // }
        // init();

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        function init() {
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);
        }
        init();

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function updateUser(userId, user) {
            console.log(model.user.email);

            userService
                .updateUser(userId, user)
                .then(function () {
                    model.message = "User has updated successfully!";
                });
            // if (typeof model.user.email === 'undefined') {
            //     $location.url('/user/' + model.user._id);
            //     model.message = "Fail to update this user!";
            // } else {
            //     userService.updateUser(userId, user);
            //     model.message = "User has updated successfully!";
            // }
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError () {
            model.error = "User not found";
        }
    }
})();