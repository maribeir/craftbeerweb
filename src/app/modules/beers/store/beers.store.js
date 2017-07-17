(function() {

  'use strict';

    // Pass the beersStoreCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('beersStoreCtrl', beersStoreCtrl);


    // Define the beersStoreCtrl
    function beersStoreCtrl(beersFactory) {


        // Inject with ng-annotate
        "ngInject";


        // Define beersStore as this for ControllerAs and auto-$scope
        var beersStore = this;


        // Define the beersStore functions and objects that will be passed to the view
        beersStore.store = store;                                           // Store a resource
        beersStore.beer = {};                                               // Object for show the beer
        beersStore.beer.id = null;

        /*
        |--------------------------------------------------------------------------
        | Constructs function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */


        initLog();


        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the beersStoreCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('beersStoreCtrl init');
        }


        // Create a resource
        function store(data) {
    		
        	return beersFactory.store(data).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

            }, function(beerModel) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();
