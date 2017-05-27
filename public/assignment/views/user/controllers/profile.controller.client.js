(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];
        function init() {
            model.user = userService.findUserById(model.userId);
        }
        init();

        model.updateUser = updateUser;

        function updateUser(userId, user) {
            if (typeof model.user.email === 'undefined') {
                $location.url('/user/' + model.user._id);
                model.message = "Fail to update this user!";
            } else {
                userService.updateUser(userId, user);
                model.message = "User has updated successfully!";
            }
        }
    }
})();