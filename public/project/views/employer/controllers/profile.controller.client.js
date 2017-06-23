(function () {
    angular
        .module('JobApp')
        .controller('profileController', profileController);

    function profileController($location,
                               $routeParams,
                               currentUser,
                               employerService) {

        var model = this;

        // model.userId = $routeParams['userId'];
        // function init() {
        //     model.user = employerService.findUserById(model.userId);
        // }
        // init();
        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        // model.searchByUsername = searchByUsername;

        function init() {
            renderUser(currentUser);
            // employerService
            //     .findUserById(model.userId)
            //     .then(renderUser, userError);
        }
        init();

        // function searchByUsername(keyword) {
        //     if (typeof keyword === 'undefined' || keyword === '' || keyword === null) {
        //         model.error = "Search content cannot be empty!";
        //         return;
        //     }
        //     employerService.searchByUsername(keyword).then(function () {
        //         $location.url("/search/user/" + keyword);
        //     });
        // }

        function logout() {
            employerService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function deleteUser(user) {
            employerService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function updateUser(userId, user) {
            console.log(model.user.email);

            employerService
                .updateUser(userId, user)
                .then(function () {
                    model.message = "User has updated successfully!";
                });
            // if (typeof model.user.email === 'undefined') {
            //     $location.url('/user/' + model.user._id);
            //     model.message = "Fail to update this user!";
            // } else {
            //     employerService.updateUser(userId, user);
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