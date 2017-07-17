(function() {

    'use strict';

    // Pass the beersValidator to the app
    angular
        .module('craftbeerweb')
        .run(beersValidator);


    // Define the beersValidator
    function beersValidator(validatorHelper) {


        // Inject with ng-annotate
        "ngInject";


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */


        validatorHelper.configureValidators(getValidators()); // Intercept all the api and add them to the httpBackend



        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the beersValidator
        |
        */



        // Function that pass the array that will create the model validator
        function getValidators() {

            // Object to pass with validation rules
            return {
                'beer': {
                    'name': {
                        'size': {
                            'min': 1,
                            'max': 50,
                            'message': 'Name must be between 1 and 50 characters.'
                        },
                        'required': {
                            'message': 'Name is required.'
                        }
                    },
                    'ingredients': {
                        'size': {
                            'min': 1,
                            'max': 200,
                            'message': 'Ingredients must be between 1 and 200 characters.'
                        },
                        'required': {
                            'message': 'Name is required.'
                        }
                    },
                    'alcoholContent': {
                        'required': {
                            'message': 'Alcohol Content is required.'
                        }
                    },
                    'price': {
                        'required': {
                            'message': 'Price is required.'
                        }
                    },
                    'category': {
                        'required': {
                            'message': 'Category is required.'
                        }
                    }
                }
            };

        }
    }

})();
