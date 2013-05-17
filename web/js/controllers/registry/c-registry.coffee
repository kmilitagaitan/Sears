class RegistryController
	constructor: ($scope, $http, dataset) -> 

	@resolve =  	
		dataset: ($http, $route) ->
			###
			if $route.current.params.feed
				decoded = decodeURIComponent($route.current.params.feed)
				$http.get(decoded).then (response) ->
	 				response.data
	 		###

window.RegistryController = RegistryController