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
                "alcoholContent": "5",
                "price": 4.0,
                "category": "Weiss"
            },
            {
                "id": 2,
                "name": "Budweiser",
                "ingredients": "Água, malte, lúpulo, milho",
                "alcoholContent": "4",
                "price": 3,
                "category": "Stout"
            },
            {
                "id": 3,
                "name": "Skol",
                "ingredients": "Milho",
                "alcoholContent": "4",
                "price": 2,
                "category": "Pilsen"
            }];
		}
	}

})();
