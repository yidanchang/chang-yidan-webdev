(function () {
    angular
        .module("JobApp")
        .controller("searchUserController", searchUserController);

    function searchUserController(currentUser, $location, $routeParams, employerService) {
        var model = this;

        model.userId = currentUser._id;
        model.searchByUsername = searchByUsername;
        model.id = $routeParams.userId;
        model.amIfollowing = amIfollowing;
        model.follow = follow;
        model.unfollow = unfollow;
        model.logout = logout;

        function logout() {
            employerService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function amIfollowing(otherUserId) {
            return currentUser.followings.indexOf(otherUserId) > -1;
        }

        function searchByUsername(keyword) {
            if (typeof keyword === 'undefined' || keyword === '' || keyword === null) {
                model.error = "Search content cannot be empty!";
                model.result = null;
                return;
            }
            employerService.searchByUsername(keyword).then(function (response) {
                model.error = null;
                model.result = response;
                if (model.result.length === 0) {
                    model.error = 'Not found any related users!';
                    model.result = null;
                }
            });
        }

        function follow(userId) {
            var index = currentUser.followings.indexOf(userId);
            if (index === -1) {
                currentUser.followings.push(userId);
                employerService.updateUser(currentUser._id, currentUser)
                    .then(function () {
                        employerService.findUserById(userId).then(function (user) {
                            var index1 = user.followers.indexOf(currentUser._id);
                            if (index1 === -1) {
                                console.log(user.followers);
                                user.followers.push(currentUser._id);
                                console.log(user.followers);
                                employerService.updateUser(userId, user);
                            }
                        });
                    });
            }
        }

        function unfollow(userId) {
            var index = currentUser.followings.indexOf(userId);
            if (index !== -1) {
                currentUser.followings.splice(index, 1);
                employerService.updateUser(currentUser._id, currentUser).then(function () {
                    employerService.findUserById(userId).then(function (user) {
                        var index1 = user.followers.indexOf(currentUser._id);
                        if (index1 !== 1) {
                            user.followers.splice(index1, 1);
                            console.log(user.followers);
                            employerService.updateUser(userId, user);
                        }
                    });
                });
            }
        }
    }
})();
