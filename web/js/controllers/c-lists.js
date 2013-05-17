function CreateListCtrl($scope, $http, $rootScope){

  $scope.createList = function() {
    // get the token key
    var encodedKey = encodeURIComponent(localStorage.token);
    // CreateList API
    var url = "http://cloudfish.herokuapp.com/shclists/createlist/"+$scope.myList+"/"+encodedKey;
    console.log("created the list" , encodedKey, url);
    $http.get(url).success(function(data) {
      console.log("response data", data);
      if (data.UniversalListResponse){
        console.log("success");
        alert("list "+$scope.myList+" created");
      }
      if (data.Error){
        console.log("failure");
        alert("failed to create list "+$scope.myList+" please try again");
      }
    });
  }
};


function ManageAllListsCtrl($scope, $rootScope, $http, $location){
  // hide the search bar for lists functions
  console.log('localStorage.appId = ',localStorage.appId);
  
  if (localStorage.deviceType != null) {
      $scope.deviceType = localStorage.deviceType;
  }
  
  if($rootScope.appId){
  } else {
    $rootScope.appId = localStorage.appId;
  }

  $("#swordfish-search").addClass("displayNone");
  // get the token key
  var encodedKey = encodeURIComponent(localStorage.token);
  console.log("key", encodedKey);
  // Get All Lists API
  var url = "http://cloudfish.herokuapp.com/shclists/allLists/"+encodedKey;
  console.log("get all lists api: ",url);
  $http.get(url).success(function(data) {
    if (data.UniversalLists) {
      $rootScope.getLists = data.UniversalLists.UniversalList;
      console.log("view all lists", $rootScope.getLists);
      $rootScope.getLists = data.UniversalLists.UniversalList;
    }else
      alert("failed to retrieve items please try again");      
    });
  
  $scope.expandViewList = function(index) {
    var itemIndex = index;
    $rootScope.listName = $rootScope.getLists[itemIndex].ListName[0];
    console.log("list name 1: ", $rootScope.listName);
    $location.path("lists/manageThis");
  }
  function startWipe(){
    // if(!startedCycle1){
      // console.log('START hero banner cycle plugin from bannerCtrl...');
      $(".scrollThis").touchwipe({
          preventDefaultEvents: false,
          wipeLeft: function() {
          alert ("swipe left");
          },
          wipeRight: function() {
          alert("swipe right");
          }
      });
      startedCycle1 = true;
    // }
    }
    setTimeout(startWipe, 500);
    // trying to figure out a way to hide search bar on the lists pages
   /* $scope.$on('$locationChangeStart', function (event, next, current) {
        console.log("next:",next);
        console.log("current",current);
        event.preventDefault();
        $("#search-bar").removeClass('displayNone');
        $location.url($location.url(next).hash());
        $rootScope.$apply();
    });
    */
    $scope.goBack = function() {
        window.history.back();
    };

    $scope.goToEditLists = function () {
        $location.path("lists/editAll");
    }

    $scope.goToLists = function () {
        $location.path("lists");
    }

    $scope.deleteList = function (listName) {
      console.log("delete list name is ", listName);
      var encodedKey = encodeURIComponent(localStorage.token);
      // delete List API
      var url = "http://cloudfish.herokuapp.com/shclists/allLists/"+listName+"/"+encodedKey;

      $http.get(url).success(function(data) {
        console.log("data for delete list ", data);
        $rootScope.getLists = data.UniversalLists.UniversalList;
      });
      
    }
};

function ViewItemListCtrl($scope, $rootScope, $http){
  // get the token key
  var encodedKey = encodeURIComponent(localStorage.token);
  //get list name
  var listName = $rootScope.listName;
  console.log("list name 2: ", listName);
  //call api for list
  var url = "http://cloudfish.herokuapp.com/shclists/list/"+listName+"/"+encodedKey;
  console.log("url: ", url);
  $http.get(url).success(function(data) {
    console.log("api called");
    if (data.UniversalListResponse) {
       console.log("data: ", data);
      console.log("length ",data.UniversalListResponse.itemsInList[0]);
      if(data.UniversalListResponse.itemsInList[0]!=="    0"){
        $scope.getItems = data.UniversalListResponse.Items[0].Item;
        $rootScope.listName = $scope.listName = listName;
        
        console.log("view all items", $scope.getItems);
      }else{
        alert("no items in list");
      } 
     
    }else{
        alert("failed to retrieve items please try again");
       
    }
  });
  $scope.goBack = function() {
    window.history.back();
  };
};

