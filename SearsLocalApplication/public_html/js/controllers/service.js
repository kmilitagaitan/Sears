/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function serviceListController($scope,$http)
{
    $http.get('../services/services.json').success(function(data) 
    {
            $scope.services = data;
            
     });
}


function serviceDetailController($scope, $routeParams,$http) {
    alert('../services/' + $routeParams.serviceId + '.json');
    $http.get('../services/' + $routeParams.serviceId + '.json').success(function(data) {
    $scope.services = data;  
});
}
