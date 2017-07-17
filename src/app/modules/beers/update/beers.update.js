(function() {

  'use strict';

    // Pass the beersUpdateCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('beersUpdateCtrl', beersUpdateCtrl);


    // Define the beersUpdateCtrl
    function beersUpdateCtrl(beersFactory, $stateParams) {


        // Inject with ng-annotate
        "ngInject";


        // Define beersUpdate as this for ControllerAs and auto-$scope
        var beersUpdate = this;


        // Define the beersUpdate functions and objects that will be passed to the view
        beersUpdate.beer = {};                                                  // Object for show the beer
        beersUpdate.update = update;                                            // Update a resource


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */


        initLog();
        show($stateParams.id);


        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the beersUpdateCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('beersUpdateCtrl init');
        }


        // Delete a resource
        function update(id, data) {

            return beersFactory.update(id, data).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }


        // Get the beer
        function show(id) {

            return beersFactory.show(id).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

                // Assign data to array and return them
                beersUpdate.beer = data;
                return beersUpdate.beer;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();
