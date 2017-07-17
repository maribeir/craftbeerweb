(function() {

  'use strict';

    // Pass the beersDestroyCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('beersDestroyCtrl', beersDestroyCtrl);


    // Define the beersDestroyCtrl
    function beersDestroyCtrl(beersFactory, $stateParams) {


        // Inject with ng-annotate
        "ngInject";


        // Define beersDestroy as this for ControllerAs and auto-$scope
        var beersDestroy = this;


        // Define the beersDestroy functions and objects that will be passed to the view
        beersDestroy.beer = {};                                                 // Object for show the beer
        beersDestroy.destroy = destroy;                                         // Delete a resource


        /*
        |--------------------------------------------------------------------------
        | Constructs function
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
        | Declaring all functions used in the beersDestroyCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('beersDestroyCtrl init');
        }


        // Delete a resource
        function destroy(id) {

            return beersFactory.destroy(id).then(function(data) {

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
                beersDestroy.beer = data;
                return beersDestroy.beer;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();
