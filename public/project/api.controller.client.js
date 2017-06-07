(function () {
    angular
        .module('JobApp')
        .controller('apiController', apiController);

    function apiController() {

        var model = this;

        model.setDefaultSearches = setDefaultSearches;
        model.clearDefaults = clearDefaults;
        model.runSearch = runSearch;


        model.ind_pub = '9954334827924258';
        model.ind_el = 'indJobContent';
        model.ind_pf = '';
        model.ind_q = 'Developer';
        model.ind_l = 'Boston';
        model.ind_chnl = 'none';
        model.ind_n = 10;
        model.ind_d = 'https://www.indeed.com';
        model.ind_t = parseInt('40');
        model.ind_c = 30;
        model.ind_age = '1';
        model.ind_snp = '1';
        model.ind_iaTxt = 1;

        function setDefaultSearches() {
            var q = args['q'];
            var l = args['l'];
            var queryInputs = document.getElementsByClassName('q');

            for (var i = 0; i < queryInputs.length; i++) {
                queryInputs[i].value = q ? q : '';
            }

            var locInputs = document.getElementsByClassName('l');

            for (var i = 0; i < locInputs.length; i++) {
                locInputs[i].value = l ? l : '';
            }
        }

        var args = {};

        if (document.location.search.length > 0) {
            var q = document.location.search.substring(1).split('&');

            for (i = 0; i < q.length; i++) {
                var p = unescape(q[i]);

                if (p.indexOf('=') == -1) {
                    args[p.trim()] = true;
                } else {
                    var kv = p.split('=');
                    args[kv[0].trim()] = kv[1].trim();
                }
            }
        }

        function clearDefaults(which_form) {
            var formInputs = document.getElementsByClassName('indeed_jobform')[which_form].elements;

            for (var i = 0; i < formInputs.length; i++) {
                if (formInputs[i].value == 'title, keywords' ||
                    formInputs[i].value == 'city, state, or zip') {
                    formInputs[i].value = '';
                }
            }
        }

        function runSearch(which_form) {
            var formInputs = document.getElementsByClassName('indeed_jobform')[which_form].elements;

            for (var i = 0; i < formInputs.length; i++) {
                if (formInputs[i].name == 'q') {
                    window.ind_q = formInputs[i].value;
                } else if (formInputs[i].name == 'l') {
                    window.ind_l = formInputs[i].value;
                }
            }

            /* make the other form match */
            formInputs = document.getElementsByClassName('indeed_jobform')[which_form ? 0 : 1].elements;

            for (var i = 0; i < formInputs.length; i++) {
                if (formInputs[i].name == 'q') {
                    formInputs[i].value = window.ind_q;
                } else if (formInputs[i].name == 'l') {
                    formInputs[i].value = window.ind_l;
                }
            }
            document.cookie = 'IND_RQ=q=' + window.ind_q + '&l=' + window.ind_l;
            document.getElementById('results').style.opacity = 0.3;
            window.ind_nr = 1;
            window.indeedJobroll.getJobs(0);
            window.scrollTo(0, 0);
        }
    }
})();