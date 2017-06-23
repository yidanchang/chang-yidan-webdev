(function () {
    angular
        .module('JobApp')
        .controller('followersController', followersController);

    function followersController($routeParams, $location, currentUser, employerService) {
        var model = this;

        model.userId = currentUser._id;
        model.follow = follow;
        model.unfollow = unfollow;
        model.amIfollowing = amIfollowing;
        model.logout = logout;

        function init() {
            employerService.findAllFollowers(model.userId).then(function (followers) {
                console.log(followers);
                model.followers = followers;
                if (followers.length === 0) {
                    model.message = "You have no followers.";
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

        function follow(userId) {
            var index = currentUser.followings.indexOf(userId);
            if(index === -1) {
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