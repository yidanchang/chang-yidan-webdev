(function () {
    angular
        .module('JobApp')
        .controller('registerController', registerController);

    function registerController($location, employerService) {

        var model = this;

        model.register = register;

        function register(username, password, password2, company, job_position) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                return;
            }

            if(password === null || password === '' || typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }
            if(password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.error = "Verify Password field is required";
                return;
            }
            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "Password and Verify Password must match";
                return;
            }
            if(company === null || company === '' || typeof company === 'undefined') {
                model.error = "Company is required";
                return;
            }
            if(job_position === null || job_position === '' || typeof job_position === 'undefined') {
                model.error = "Job position is required";
                return;
            }
            employerService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password,
                            company: company,
                            job_position: job_position
                        };
                        return employerService
                            .register(newUser)
                            .then(function (user) {
                                console.log('1');
                                $location.url('/profile');
                            })
                    });
        }
    }
})();