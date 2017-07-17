(function() {

  'use strict';

    // Pass the beersIndexCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('beersIndexCtrl', beersIndexCtrl);


    // Define the beersIndexCtrl
    function beersIndexCtrl(beersFactory) {


        // Inject with ng-annotate
        "ngInject";


        // Define beersIndex as this for ControllerAs and auto-$scope
        var beersIndex = this;


        // Define the beersIndex functions and objects that will be passed to the view
        beersIndex.beers = [];                                              // Array for list of beers


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */


        initLog();
        index();

        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the beersIndexCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('beersIndexCtrl init');
        }


        // Get all beers.
        function index() {

            return beersFactory.index().then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

            	// Assign data to array and return them
                beersIndex.beers = data.data;
	            return beersIndex.beers;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();
