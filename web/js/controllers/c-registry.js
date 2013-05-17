function ViewRegistryCtrl($scope, $rootScope, $http){
  // get the token key
  var encodedKey = encodeURIComponent(localStorage.token);
  //call api for list
  var url = "http://cloudfish.herokuapp.com/giftregistry/viewall";
  $http.get(url).success(function(data) {
    console.log("data back",data);
    if (data.Registry) {
      // $rootScope.getLists = data.Registry.RegistryName;
      $scope.giftRegistries = data.Registry;
      // for (var i = 0; i < data.Registry.length; i++) {
      //   console.log("RegistryNames"+data.Registry[i].RegistryName);
      // };
      // console.log("view all lists"+data.Registry);
    }else{
      alert("failed to retrieve items please try again");      
    }
  });
  $scope.goBack = function() {
    window.history.back();
  };
}