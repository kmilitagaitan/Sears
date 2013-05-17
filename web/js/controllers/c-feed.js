// Generated by CoffeeScript 1.6.1
(function() {
  var FeedController;

  FeedController = (function() {

    function FeedController($scope, $location, $routeParams, dataset) {
      if ($routeParams.feed) {
        $scope.products = dataset.products;
      }
      $scope.changeView = function(view) {
        console.log("CHANGE VIEW!!", view);
        return $location.path("/details/guest/" + view);
      };
    }

    FeedController.resolve = {
      dataset: function($http, $route) {
        var decoded;
        if ($route.current.params.feed) {
          decoded = decodeURIComponent($route.current.params.feed);
          return $http.get(decoded).then(function(response) {
            return response.data;
          });
        }
      }
    };

    return FeedController;

  })();

  window.FeedController = FeedController;

}).call(this);