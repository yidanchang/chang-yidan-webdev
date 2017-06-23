(function () {
    angular
        .module('JobApp')
        .controller('followingController', followingController);

    function followingController($routeParams, $location, currentUser, employerService) {
        var model = this;

        model.userId = currentUser._id;
        model.unfollow = unfollow;
        model.amIfollowing = amIfollowing;
        model.logout = logout;

        function init() {
            employerService.findAllFollowings(model.userId).then(function (followings) {
                console.log(followings);
                model.followings = followings;
                if (followings.length === 0) {
                    model.message = "You have no followings.";
                }
            });
        }

        init();

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

        function unfollow(userId) {
            var index = currentUser.followings.indexOf(userId);
            if (index !== -1) {
                currentUser.followings.splice(index, 1);
                employerService.updateUser(currentUser._id, currentUser).then(function () {
                    init();
                    employerService.findUserById(userId).then(function (user) {
                        var index1 = user.followers.indexOf(currentUser._id);
                        if (index1 !== 1) {
                            user.followers.splice(index1, 1);
                            console.log(user.followers);
                            employerService.updateUser(userId, user);
                        }
                    });
                })
            }

        }
    }
})();