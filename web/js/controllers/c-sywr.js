/**
 * Created with JetBrains WebStorm.
 * User: Chao Yang
 * Date: 5/6/13
 * Time: 1:42 PM
 * To change this template use File | Settings | File Templates.
 */

function SYWR_Ctrl($scope){
    $scope.doSYWRLogin = function(){
        alert($scope.email+"   "+$scope.password);
    }
}