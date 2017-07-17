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
