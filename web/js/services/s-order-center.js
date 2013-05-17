angular.module('orderCenterServices', []).
factory('OrderCenter', function($http){
    function orderCenter() {
        this.getOrders = function(successHandler, errorHandler, currentPage, totalOnlinePage, totalInStorePage) {
            console.log ("order center service current Page", currentPage);
            console.log ("order center service total OPage", totalOnlinePage);
            console.log ("order center service total SPage", totalInStorePage);

            $http({method: 'GET', url: 'data/SALOrderCenterResponse.json'}).success(successHandler).error(errorHandler)
        };
    };
    return new orderCenter();
});