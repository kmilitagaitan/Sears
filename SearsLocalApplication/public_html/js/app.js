/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('servicesroute', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/services', {templateUrl: '../partials/service.html',   controller: serviceListController}).
      when('/services/:serviceId', {templateUrl: '../html/detailservice.html', controller: serviceDetailController}).
      otherwise({redirectTo: '/services'});
}]);

