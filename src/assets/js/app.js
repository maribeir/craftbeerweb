(function(){

	'use strict';

	// Define angular core.mocking module
	angular.module('core.mocking', ['ngMockE2E']);

})();
(function(){

	'use strict';

	// Define angular core.routing module
	angular.module('core.routing', ['ui.router']);

})();
(function() {

    'use strict';

    // Define angular core.validator module
    angular.module('core.validator', ['valdr']);

})();

(function(){

	'use strict';

	// Define angular app module
	angular.module('craftbeerweb', ['core.routing', 'core.mocking', 'core.validator', 'ui.router']);

})();

(function() {

  'use strict';

    // Pass the beersFactory to the app
    angular
        .module('craftbeerweb')
        .factory('beersFactory', beersFactory);


    // Define the beersFactory
    function beersFactory($http) {


        // Inject with ng-annotate
        "ngInject";


        // Define base URI for beer
        //var beerBase = '/api/beers/';
        var beerBase = "http://localhost:9000/beerhouse/beers"


        // Define the beer factory object to return
        var beersFactory = {

            index: index,
            show: show,
            store: store,
            update: update,
            destroy: destroy,

        };


        // Return the beer factory
        return beersFactory;


        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the beersFactory
        |
        */


        // Display a listing of beers.
        function index() {

            return $http.get(beerBase)
                        .then(function(data){ console.log('URL-GET: ' + data.config.url); return data; });
        }


        // Display a specified beer.
        function show(id) {

        	return $http.get(beerBase + "/" + id)
                        .then(function(data){ console.log('URL-GET: ' + data.config.url); return data.data; });
        }


        // Store a newly created beer in storage.
        function store(data) {

            return $http.post(beerBase, data)
                        .then(function(data){ console.log('URL-POST: ' + data.config.url); return data.data; });
        }


        // Update the specified beer in storage.
        function update(id, data) {

            return $http.put(beerBase + "/" + id, data)
                        .then(function(data){ console.log('URL-PUT: ' + data.config.url); return data.data; });
        }


        // Remove the specified beer from storage.
        function destroy(id) {

            return $http.delete(beerBase + "/"+ id)
                        .then(function(data){ console.log('URL-DELETE: ' + data.config.url);return data.data; });
        }

    }

})();

(function() {

  'use strict';

    // Pass the beersMock to the app
	angular
	    .module('craftbeerweb')
	    .run(beersMock);


	// Define the beersMock
    function beersMock(mockHelper) {


        // Inject with ng-annotate
        "ngInject";


        // Object for beer's mock
        var beers = {};


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */


    	setBeers();															            // Set the list of beer
    	mockHelper.configureMocks(getMocks()); 									        // Intercept all the api and add them to the httpBackend



	    /*
	    |--------------------------------------------------------------------------
	    | Functions
	    |--------------------------------------------------------------------------
	    |
	    | Declaring all functions used in the beersMock
	    |
	    */


		// Function for destroy beers API
		function destroyRespond(method, url, data, headers, params) {

            // Get the id param from url
            var id = url.split("/").pop();

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

                // Delete beer by id from beer's array
                for(var i = 0; i <= beers.length - 1; i++) {

                    // If beer exists
                    if(beers[i].id == id) {

                        // Delete  beer
                    	beers.splice(i, 1);

                        // Return the success header
                        return [header, {data: 'Beer removed'}];
                    }
                }

				// Return the error header
                return [header, {error: 'Beer not found'}];
			}

			// Return the error header
			return [header, {error:'Error in beer removing'}];
		}


		// Function for index beers API
		function indexRespond(method, url, data, headers, params) {

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

				// Return the success header
                return [header, {data: beers}];
			}

			// Return the error header
			return [header, {error:'Error while listing beers'}];
		}


		// Function for show beers API
		function showRespond(method, url, data, headers, params) {

            // Get the id param from url
            var id = url.split("/").pop();

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

                // Get beer by id from beer's array
                for(var i = 0; i <= beers.length - 1; i++) {

                    // If beer exists
                    if(beers[i].id == id) {

                        // Return the success header
                        return [header, {data: beers[i]}];
                    }
                }

                // Return the error header
    			return [header, {error:'Beer not found'}];
			}

			// Return the error header
			return [header, {error:'Error showing beer'}];
		}


		// Function for store beers API
		function storeRespond(method, url, data, headers, params) {

			// Get a random header
			var header = randomHeader();

            // If the result will be 200, execute the operation
			if(header == 200) {

                // Assign beer id - override if inserted
                data.id = beers.length;

                // Insert the new beer
                beers.push(data);

                // Return the success header
                return [header, {data: 'Beer stored'}];
            }

			// Return the error header
			return [header, {error:'Error storing the beer'}];
		}


		// Function for update beers API
		function updateRespond(method, url, data, headers, params) {

            // Get the id param from url
            var id = url.split("/").pop();

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

                // Get beer by id from beer's array
                for(var i = 0; i <= beers.length - 1; i++) {

                    // If beer exists
                    if(beers[i].id == id) {

                        // Override the beer
                    	beers[i] = data;

                        // Return the success header
                        return [header, {data: 'Beer updated'}];
                    }
                }

                // Return the error header
    			return [header, {error:'Beer not found'}];
			}

			// Return the error header
			return [header, {error:'Error updating beer'}];
		}


		// Basic algorithm for random headers
		function randomHeader(){

			// Generate a random number from 1 to 10
			var random = Math.floor((Math.random() * 10) + 1);

			// Return 500 if random is 10
			if(random == 10) {

				return 500;
			}

			// Return 404 if random is 9
			if(random == 9) {

				return 404;
			}

			// Return 200
			return 200;
		}


		// Function that pass the array that will create the httpBackend
	    function getMocks() {

	    	// Object to pass for fake API
			return [{

				label: 'destroy',
			    method: 'DELETE',
			    url: /\/api\/beers\/(d*)/,
			    params: ['id'],
			    respond: destroyRespond

			},{

				label: 'index',
			    method: 'GET',
			    url: '/api/beers/',
			    respond: indexRespond

			},{

				label: 'show',
			    method: 'GET',
			    url: /\/api\/beers\/(d*)/,
			    params: ['id'],
			    respond: showRespond

			},{

				label: 'store',
			    method: 'POST',
			    url: '/api/beers/',
			    respond: storeRespond

			},{

				label: 'update',
			    method: 'PUT',
			    url: /\/api\/beers\/(d*)/,
			    params: ['id'],
			    respond: updateRespond
			}];
		}

		// Function for set the array
		function setBeers() {

            beers = [{

                "id": 1,
                "name": "Eisenbahn",
                "ingredients": "Água, malte, lúpulo, trigo",
                "alcoholContent": "4.8",
                "price": 6,
                "category": "Weiz"
            },
            {
                "id": 2,
                "name": "Budweiser",
                "ingredients": "Água, malte, lúpulo, milho",
                "alcoholContent": "5",
                "price": 4,
                "category": "Stout"
            },
            {
                "id": 3,
                "name": "Skol",
                "ingredients": "Milho",
                "alcoholContent": "4",
                "price": 3,
                "category": "Pilsen"
            }];
		}
	}

})();

(function() {

  'use strict';

    // Pass the beersRoute to the app
	angular
	    .module('craftbeerweb')
	    .run(beersRoute);


	// Define the beersRoute
    function beersRoute(routerHelper) {


        // Inject with ng-annotate
        "ngInject";


    	// Intercept all the states and add them to the routing
    	routerHelper.configureStates(getStates());
    }


    // Define the getStates
    function getStates() {

		return [{

		    state: 'beers-index',
		    config: {
		        url: '/beers',
		        templateUrl: 'app/modules/beers/index/beers.index.html',
		        controller: 'beersIndexCtrl',
		        controllerAs: 'beersIndex'
		    }
		}, {
		    state: 'beers-store',
		    config: {
		        url: '/beers/store',
		        templateUrl: 'app/modules/beers/store/beers.store.html',
		        controller: 'beersStoreCtrl',
		        controllerAs: 'beersStore'
		    }
		}, {
		    state: 'beers-show',
		    config: {
		        url: '/beers/:id',
		        templateUrl: 'app/modules/beers/show/beers.show.html',
		        controller: 'beersShowCtrl',
		        controllerAs: 'beersShow'
		    }
		}, {
		    state: 'beers-update',
		    config: {
		        url: '/beers/:id/update',
		        templateUrl: 'app/modules/beers/update/beers.update.html',
		        controller: 'beersUpdateCtrl',
		        controllerAs: 'beersUpdate'
		    }
		}, {
		    state: 'beers-destroy',
		    config: {
		        url: '/beers/:id/delete',
		        templateUrl: 'app/modules/beers/destroy/beers.destroy.html',
		        controller: 'beersDestroyCtrl',
		        controllerAs: 'beersDestroy'
		    }
		}];
	}

})();

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

(function() {

  'use strict';

    // Pass the staticsRoute to the app
	angular
	    .module('craftbeerweb')
	    .run(staticsRoute);


	// Define the staticsRoute
    function staticsRoute(routerHelper) {


		// Inject with ng-annotate
		"ngInject";


    	// Intercept all the states and add them to the routing
    	routerHelper.configureStates(getStates());
    }


    // Define the getStates
    function getStates() {

		return [{

		    state: 'statics-home',
		    config: {
		        url: '/',
		        templateUrl: 'app/modules/statics/home/statics.home.html',
		        controller: 'staticsHomeCtrl',
		        controllerAs: 'staticsHome'
		    }
		}];
	}

})();

(function() {

  'use strict';

    // Pass the usersFactory to the app
    angular
        .module('craftbeerweb')
        .factory('usersFactory', usersFactory);


    // Define the usersFactory
    function usersFactory($http) {


        // Inject with ng-annotate
        "ngInject";


        // Define base URI for user user
        var userBase = '/api/users/';


        // Define the user factory object to return
        var usersFactory = {

            index: index,
            show: show,
            store: store,
            update: update,
            destroy: destroy,

        };


        // Return the user factory
        return usersFactory;


        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the usersFactory
        |
        */


        // Display a listing of users.
        function index() {

            return $http.get(userBase)
                        .then(function(data){ return data; });
        }


        // Display a specified user.
        function show(id) {

            return $http.get(userBase + id)
                        .then(function(data){ return data.data; });
        }


        // Store a newly created user in storage.
        function store(data) {

            return $http.post(userBase, data)
                        .then(function(data){ return data.data; });
        }


        // Update the specified user in storage.
        function update(id, data) {

            return $http.put(userBase + id, data)
                        .then(function(data){ return data.data; });
        }


        // Remove the specified user from storage.
        function destroy(id) {

            return $http.delete(userBase + id)
                        .then(function(data){ return data.data; });
        }

    }

})();

(function() {

  'use strict';

    // Pass the usersMock to the app
	angular
	    .module('craftbeerweb')
	    .run(usersMock);


	// Define the usersMock
    function usersMock(mockHelper) {


        // Inject with ng-annotate
        "ngInject";


        // Object for user's mock
        var users = {};


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */


    	setUsers();															            // Set the list of user
    	mockHelper.configureMocks(getMocks()); 									        // Intercept all the api and add them to the httpBackend



	    /*
	    |--------------------------------------------------------------------------
	    | Functions
	    |--------------------------------------------------------------------------
	    |
	    | Declaring all functions used in the usersMock
	    |
	    */


		// Function for destroy users API
		function destroyRespond(method, url, data, headers, params) {

            // Get the id param from url
            var id = url.split("/").pop();

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

                // Delete user by id from user's array
                for(var i = 0; i <= users.length - 1; i++) {

                    // If user exists
                    if(users[i].id == id) {

                        // Delete  user
                        users.splice(i, 1);

                        // Return the success header
                        return [header, {data: 'User removed'}];
                    }
                }

				// Return the error header
                return [header, {error: 'User not found'}];
			}

			// Return the error header
			return [header, {error:'Error in user removing'}];
		}


		// Function for index users API
		function indexRespond(method, url, data, headers, params) {

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

				// Return the success header
                return [header, {data: users}];
			}

			// Return the error header
			return [header, {error:'Error while listing users'}];
		}


		// Function for show users API
		function showRespond(method, url, data, headers, params) {

            // Get the id param from url
            var id = url.split("/").pop();

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

                // Get user by id from user's array
                for(var i = 0; i <= users.length - 1; i++) {

                    // If user exists
                    if(users[i].id == id) {

                        // Return the success header
                        return [header, {data: users[i]}];
                    }
                }

                // Return the error header
    			return [header, {error:'User not found'}];
			}

			// Return the error header
			return [header, {error:'Error showing user'}];
		}


		// Function for store users API
		function storeRespond(method, url, data, headers, params) {

			// Get a random header
			var header = randomHeader();

            // If the result will be 200, execute the operation
			if(header == 200) {

                // Assisgn user id - override if inserted
                data.id = users.length;

                // Insert the new user
                users.push(data);

                // Return the success header
                return [header, {data: 'User stored'}];
            }

			// Return the error header
			return [header, {error:'Error storing the user'}];
		}


		// Function for update users API
		function updateRespond(method, url, data, headers, params) {

            // Get the id param from url
            var id = url.split("/").pop();

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

                // Get user by id from user's array
                for(var i = 0; i <= users.length - 1; i++) {

                    // If user exists
                    if(users[i].id == id) {

                        // Override the user
                        users[i] = data;

                        // Return the success header
                        return [header, {data: 'User updated'}];
                    }
                }

                // Return the error header
    			return [header, {error:'User not found'}];
			}

			// Return the error header
			return [header, {error:'Error updating user'}];
		}


		// Basic algorithm for random headers
		function randomHeader(){

			// Generate a random number from 1 to 10
			var random = Math.floor((Math.random() * 10) + 1);

			// Return 500 if random is 10
			if(random == 10) {

				return 500;
			}

			// Return 404 if random is 9
			if(random == 9) {

				return 404;
			}

			// Return 200
			return 200;
		}


		// Function that pass the array that will create the httpBackend
	    function getMocks() {

	    	// Object to pass for fake API
			return [{

				label: 'destroy',
			    method: 'DELETE',
			    url: /\/api\/users\/(d*)/,
			    params: ['id'],
			    respond: destroyRespond

			},{

				label: 'index',
			    method: 'GET',
			    url: '/api/users/',
			    respond: indexRespond

			},{

				label: 'show',
			    method: 'GET',
			    url: /\/api\/users\/(d*)/,
			    params: ['id'],
			    respond: showRespond

			},{

				label: 'store',
			    method: 'POST',
			    url: '/api/users/',
			    respond: storeRespond

			},{

				label: 'update',
			    method: 'PUT',
			    url: /\/api\/users\/(d*)/,
			    params: ['id'],
			    respond: updateRespond
			}];
		}


		// Function for set the array
		function setUsers() {

            users = [{

                "id": 1,
                "name": "Mario",
                "surname": "Rossi"
            },
            {
                "id": 2,
                "name": "Luigi",
                "surname": "Verdi"
            },
            {
                "id": 3,
                "name": "Furio",
                "surname": "Bianchi"
            }];
		}
	}

})();

(function() {

  'use strict';

    // Pass the usersRoute to the app
	angular
	    .module('craftbeerweb')
	    .run(usersRoute);


	// Define the usersRoute
    function usersRoute(routerHelper) {


        // Inject with ng-annotate
        "ngInject";


    	// Intercept all the states and add them to the routing
    	routerHelper.configureStates(getStates());
    }


    // Define the getStates
    function getStates() {

		return [{

		    state: 'users-index',
		    config: {
		        url: '/users',
		        templateUrl: 'app/modules/users/index/users.index.html',
		        controller: 'usersIndexCtrl',
		        controllerAs: 'usersIndex'
		    }
		}, {
		    state: 'users-store',
		    config: {
		        url: '/users/store',
		        templateUrl: 'app/modules/users/store/users.store.html',
		        controller: 'usersStoreCtrl',
		        controllerAs: 'usersStore'
		    }
		}, {
		    state: 'users-show',
		    config: {
		        url: '/users/:id',
		        templateUrl: 'app/modules/users/show/users.show.html',
		        controller: 'usersShowCtrl',
		        controllerAs: 'usersShow'
		    }
		}, {
		    state: 'users-update',
		    config: {
		        url: '/users/:id/update',
		        templateUrl: 'app/modules/users/update/users.update.html',
		        controller: 'usersUpdateCtrl',
		        controllerAs: 'usersUpdate'
		    }
		}, {
		    state: 'users-destroy',
		    config: {
		        url: '/users/:id/delete',
		        templateUrl: 'app/modules/users/destroy/users.destroy.html',
		        controller: 'usersDestroyCtrl',
		        controllerAs: 'usersDestroy'
		    }
		}];
	}

})();

(function() {

    'use strict';

    // Pass the usersValidator to the app
    angular
        .module('craftbeerweb')
        .run(usersValidator);


    // Define the usersValidator
    function usersValidator(validatorHelper) {


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
        | Declaring all functions used in the usersValidator
        |
        */



        // Function that pass the array that will create the model validator
        function getValidators() {

            // Object to pass with validation rules
            return {
                'User': {
                    'lastName': {
                        'size': {
                            'min': 2,
                            'max': 10,
                            'message': 'Last name must be between 2 and 10 characters.'
                        },
                        'required': {
                            'message': 'Last name is required.'
                        }
                    },
                    'firstName': {
                        'size': {
                            'min': 2,
                            'max': 20,
                            'message': 'First name must be between 2 and 20 characters.'
                        }
                    }
                }
            };

        }
    }

})();

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

(function() {

  'use strict';

    // Pass the beersShowCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('beersShowCtrl', beersShowCtrl);


    // Define the beersShowCtrl
    function beersShowCtrl(beersFactory, $stateParams) {


        // Inject with ng-annotate
        "ngInject";


        // Define beersShow as this for ControllerAs and auto-$scope
        var beersShow = this;


        // Define the beersShow functions and objects that will be passed to the view
        beersShow.beer = {};                                                // Object for show the beer


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
        | Declaring all functions used in the beersShowCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('beersShowCtrl init');
        }


        // Get the beer
        function show(id) {

            return beersFactory.show(id).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

            	// Assign data to array and return them
                beersShow.beer = data;
	            return beersShow.beer;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();

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

(function(){

	'use strict';

	// Pass the mockHelperProvider to the app
	angular
		.module('core.mocking')
		.provider('mockHelper', mockHelperProvider);


    // Define the mockHelperProvider
	function mockHelperProvider() {


		// Holds the service factory function
		this.$get = MockHelper;


		// Define the mockHelperProvider
		function MockHelper($httpBackend) {


			// Inject with ng-annotate
			"ngInject";


			// Pass through this extension
			$httpBackend.whenGET(/\.html$/).passThrough();
			$httpBackend.whenGET(/\.png$/).passThrough();
			$httpBackend.whenGET(/\.svg$/).passThrough();
			$httpBackend.whenGET(/\.jpg$/).passThrough();
			$httpBackend.whenGET(/\.jpeg$/).passThrough();
			$httpBackend.whenGET(/\.css$/).passThrough();


			// Define the object to return
			var service = {

				configureMocks: configureMocks,		// Configure all the states for the route
			};


			// Return the object
			return service;


	        /*
	        |--------------------------------------------------------------------------
	        | Functions
	        |--------------------------------------------------------------------------
	        |
	        | Declaring all functions used in the MockHelper
	        |
	        */


			// Configure all the mocks for the route
			function configureMocks(mocks) {

				// Foreach mocks, create a fake backend interaction
				mocks.forEach(function(mock){

					$httpBackend.when(mock.method, mock.url).respond(mock.respond);
				});
			}
		}
	}

})();

(function(){

	'use strict';

	// Pass the routerHelperProvider to the app
	angular
		.module('core.routing')
		.provider('routerHelper', routerHelperProvider);


    // Define the routerHelperProvider
	function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {


		// Inject with ng-annotate
		"ngInject";


		// Holds the service factory function
		this.$get = RouterHelper;


		// Declare html5Mode true for a clean url
		$locationProvider.html5Mode(true);


		// Declare strict to false for remove trailing slash
		$urlMatcherFactoryProvider.strictMode(false);


		// Declare the otherwise, go here if no state is found
		$urlRouterProvider.otherwise('/404');


		// Define the routerHelperProvider
		function RouterHelper($state) {


			// Define the object to return
			var service = {

				configureStates: configureStates,			// Configure all the states for the route
				getStates: getStates 						// Return the lists of states

			};


			// Return the object
			return service;


	        /*
	        |--------------------------------------------------------------------------
	        | Functions
	        |--------------------------------------------------------------------------
	        |
	        | Declaring all functions used in the RouterHelper
	        |
	        */


			// Configure all the states for the route
			function configureStates(states) {

				// Add to the routing the state passed trought array of objects
				states.forEach(function(state) {

					$stateProvider.state(state.state, state.config);

				});
			}


			// Return the lists of states
			function getStates() {

				return $state.get();
			}
		}
	}

})();

(function() {

    'use strict';

    // Pass the validatorHelperProvider to the app
    angular
        .module('core.validator')
        .provider('validatorHelper', validatorHelperProvider);


    // Define the validatorHelperProvider
    function validatorHelperProvider(valdrProvider, valdrMessageProvider) {


        // Inject with ng-annotate
        "ngInject";


        // Holds the service factory function
        this.$get = validatorHelper;


        // Define the validatorHelperProvider
        function validatorHelper() {


            valdrMessageProvider.setTemplate('<div class="valdr-message">{{ violation.message }}</div>');

            // Define the object to return
            var service = {

                configureValidators: configureValidators, // Configure all models to validate
            };


            // Return the object
            return service;


            /*
            |--------------------------------------------------------------------------
            | Functions
            |--------------------------------------------------------------------------
            |
            | Declaring all functions used in the ValidatorHelper
            |
            */


            // Configure all the validators for the models
            function configureValidators(validator) {

                valdrProvider.addConstraints(validator);
            }
        }
    }

})();

(function() {

  'use strict';

    // Pass the staticsHomeCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('staticsHomeCtrl', staticsHomeCtrl);


    // Define the staticsHomeCtrl
    function staticsHomeCtrl() {


        // Inject with ng-annotate
        "ngInject";


        // Define staticsHome as this for ControllerAs and auto-$scope
        var staticsHome = this;
            staticsHome.title =    "AngularJS-boilerplate";
            staticsHome.content =  "A micro AngularJS boilerplate for start projects with mocking and routing modules ready, based on John Papa's style guide";


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
        | Declaring all functions used in the staticsHomeCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('staticsHomeCtrl init');
        }
    }

})();

(function() {

  'use strict';

    // Pass the usersDestroyCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('usersDestroyCtrl', usersDestroyCtrl);


    // Define the usersDestroyCtrl
    function usersDestroyCtrl(usersFactory, $stateParams) {


        // Inject with ng-annotate
        "ngInject";


        // Define usersDestroy as this for ControllerAs and auto-$scope
        var usersDestroy = this;


        // Define the usersDestroy functions and objects that will be passed to the view
        usersDestroy.user = {};                                                 // Object for show the user
        usersDestroy.destroy = destroy;                                         // Delete a resource


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
        | Declaring all functions used in the usersDestroyCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('usersDestroyCtrl init');
        }


        // Delete a resource
        function destroy(id) {

            return usersFactory.destroy(id).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

            }, function(data) {

            	// Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }


        // Get the user
        function show(id) {

            return usersFactory.show(id).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

                // Assign data to array and return them
                usersDestroy.user = data;
                return usersDestroy.user;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();

(function() {

  'use strict';

    // Pass the usersIndexCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('usersIndexCtrl', usersIndexCtrl);


    // Define the usersIndexCtrl
    function usersIndexCtrl(usersFactory) {


        // Inject with ng-annotate
        "ngInject";


        // Define usersIndex as this for ControllerAs and auto-$scope
        var usersIndex = this;


        // Define the usersIndex functions and objects that will be passed to the view
        usersIndex.users = [];                                              // Array for list of users


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
        | Declaring all functions used in the usersIndexCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('usersIndexCtrl init');
        }


        // Get all users.
        function index() {

            return usersFactory.index().then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

            	// Assign data to array and return them
	            usersIndex.users = data.data;
	            return usersIndex.users;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();

(function() {

  'use strict';

    // Pass the usersShowCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('usersShowCtrl', usersShowCtrl);


    // Define the usersShowCtrl
    function usersShowCtrl(usersFactory, $stateParams) {


        // Inject with ng-annotate
        "ngInject";


        // Define usersShow as this for ControllerAs and auto-$scope
        var usersShow = this;


        // Define the usersShow functions and objects that will be passed to the view
        usersShow.user = {};                                                // Object for show the user


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
        | Declaring all functions used in the usersShowCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('usersShowCtrl init');
        }


        // Get the user
        function show(id) {

            return usersFactory.show(id).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

            	// Assign data to array and return them
	            usersShow.user = data;
	            return usersShow.user;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();

(function() {

  'use strict';

    // Pass the usersStoreCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('usersStoreCtrl', usersStoreCtrl);


    // Define the usersStoreCtrl
    function usersStoreCtrl(usersFactory) {


        // Inject with ng-annotate
        "ngInject";


        // Define usersStore as this for ControllerAs and auto-$scope
        var usersStore = this;


        // Define the usersStore functions and objects that will be passed to the view
        usersStore.store = store;                                           // Store a resource


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
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
        | Declaring all functions used in the usersStoreCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('usersStoreCtrl init');
        }


        // Delete a resource
        function store(data) {

            return usersFactory.store(data).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();

(function() {

  'use strict';

    // Pass the usersUpdateCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('usersUpdateCtrl', usersUpdateCtrl);


    // Define the usersUpdateCtrl
    function usersUpdateCtrl(usersFactory, $stateParams) {


        // Inject with ng-annotate
        "ngInject";


        // Define usersUpdate as this for ControllerAs and auto-$scope
        var usersUpdate = this;


        // Define the usersUpdate functions and objects that will be passed to the view
        usersUpdate.user = {};                                                  // Object for show the user
        usersUpdate.update = update;                                            // Update a resource


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
        | Declaring all functions used in the usersUpdateCtrl
        |
        */


        // Sample for init function
        function initLog() {

            console.log('usersUpdateCtrl init');
        }


        // Delete a resource
        function update(id, data) {

            return usersFactory.update(id, data).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }


        // Get the user
        function show(id) {

            return usersFactory.show(id).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

                // Assign data to array and return them
                usersUpdate.user = data;
                return usersUpdate.user;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();
