(function () {
    angular
        .module('JobApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            // .when("/", {
            //     templateUrl: 'views/common/navbar-top.view.client.html',
            //     controller: 'navbarController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkCurrentUser
            //     }
            // })
            .when('/indeedSearch', {
                templateUrl: 'views/indeedSearch/templates/indeed-search.view.client.html',
                controller: 'indeedController',
                controllerAs: 'model'
            })
            .when('/search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/about', {
                templateUrl: 'views/home/about.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/login', {
                templateUrl: 'views/employer/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/employer/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/employer/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/posting', {
                templateUrl: 'views/posting/templates/posting-list.view.client.html',
                controller: 'postingListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:userId/posting', {
                templateUrl: 'views/posting/templates/posting-list.view.client.html',
                controller: 'postingListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/posting/new', {
                templateUrl: 'views/posting/templates/posting-new.view.client.html',
                controller: 'postingNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/posting/:postingId/details', {
                templateUrl: 'views/posting/templates/posting-details.view.client.html',
                controller: 'postingDetailsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/posting/:postingId', {
                templateUrl: 'views/posting/templates/posting-edit.view.client.html',
                controller: 'postingEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/search/user', {
                templateUrl: 'views/search/templates/searchUser.view.client.html',
                controller: 'searchUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/search/posting', {
                templateUrl: 'views/search/templates/searchPosting.view.client.html',
                controller: 'searchPostingController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/followings', {
                templateUrl: 'views/follow/templates/following.view.client.html',
                controller: 'followingController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/followers', {
                templateUrl: 'views/follow/templates/followers.view.client.html',
                controller: 'followersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            // .when('/indeedSearch', {
            //     templateUrl: 'views/indeedSearch/templates/indeed-search.view.client.html',
            //     controller: 'indeedController',
            //     controllerAs: 'model'
            // })
            // .when('/website', {
            //     templateUrl: 'views/website/templates/website-list.view.client.html',
            //     controller: 'websiteListController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
            // .when('/website/new', {
            //     templateUrl: 'views/website/templates/website-new.view.client.html',
            //     controller: 'websiteNewController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
            // .when('/website/:websiteId', {
            //     templateUrl: 'views/website/templates/website-edit.view.client.html',
            //     controller: 'websiteEditController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
            // .when('/website/:websiteId/page', {
            //     templateUrl: 'views/page/templates/page-list.view.client.html',
            //     controller: 'pageListController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
            // .when('/website/:websiteId/page/new', {
            //     templateUrl: 'views/page/templates/page-new.view.client.html',
            //     controller: 'pageNewController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
            // .when('/website/:websiteId/page/:pageId', {
            //     templateUrl: 'views/page/templates/page-edit.view.client.html',
            //     controller: 'pageEditController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
            // .when('/website/:websiteId/page/:pageId/widget', {
            //     templateUrl: 'views/widget/templates/widget-list.view.client.html',
            //     controller: 'widgetListController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
            // .when('/website/:websiteId/page/:pageId/widget/new', {
            //     templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
            //     controller: 'widgetNewController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
            // .when('/website/:websiteId/page/:pageId/widget/:widgetId', {
            //     templateUrl: 'views/widget/templates/widget-edit.view.client.html',
            //     controller: 'widgetEditController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
            // .when('/website/:websiteId/page/:pageId/widget/:widgetId/search', {
            //     templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
            //     controller: 'flickrController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
    }

    function checkLoggedIn(employerService, $q, $location) {
        var deferred = $q.defer();

        employerService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(employerService, $q, $location) {
        var deferred = $q.defer();

        employerService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                    // $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
})();