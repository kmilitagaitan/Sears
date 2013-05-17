 var selectedStoreIndex;
 function LocalAdsCtrl($scope, $location,LocalAds,LocalAdsCurrentLocation,$rootScope){
     $scope.localAdsArray = [];
     $scope.currentLocation=LocalAdsCurrentLocation;
     $scope.currentStoreID=null;
     $scope.currentLocation.currentTemplate = $scope.currentLocation.listTemplateUrl;
     $scope.localAds= LocalAds.query();
     $scope.currentLocation.localAdsData=$scope.localAds;
     logininfo.memberzipCode = "";
     $scope.pStarImage = 'images/one_star.png';
     $scope.pstoregotomap = function(){
         $scope.changeToGoogleMap($scope.localAds.nearByStores.length);
     }
     $scope.initCap = function (str) {
         return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
     }

     $scope.formatZip = function (pcode) {
         if (pcode.length > 5)
             return pcode.substr(0,5) + "-" + pcode.substr(5,9);
         else
             return pcode;
     };
     $scope.gotologintray = function () {
         $(".account").click();
     };
     $scope.returnToIndex = function(){
         $location.path("/");
     }
     $scope.changeToGoogleMap = function(index){
         $scope.currentLocation.storeNumber=index;
         $scope.currentLocation.currentTemplate = $scope.currentLocation.googleMapTemplateUrl;
     }
     $scope.showlogin = "";
     $scope.showlogintrue = function(){
         $scope.showlogin = "true";
     }
     console.log(logininfo.memberzipCode);
     $scope.zipCodeTextLoc = {zip:''}
     LocalAds
         .get(function(locad){
             $scope.selectedStoreName = locad.perferedstore.storeName;
             for ( var i = 0; i < locad.nearByStores.length; i++) {
                 $scope.storeID = locad.nearByStores[i].storeId;
                 $scope.store_name = locad.nearByStores[i].storeName;
                 if (i == selectedStoreIndex)
                     $scope.selectedStoreName = locad.nearByStores[i].storeName;
             }

             if(locad.perferedStoreInd){
                 $scope.pre="on"
                 $scope.pname1 = locad.perferedstore.storeName;
                 $scope.pdistance1 = locad.perferedstore.distance;
                 $scope.paddress1 = locad.perferedstore.streetAddress;
                 $scope.pcity1 = locad.perferedstore.city;
                 $scope.pstate1 = locad.perferedstore.state;
                 $scope.pzip1 = locad.perferedstore.zipcode;
                 $scope.pphone1 = locad.perferedstore.phone;
                 $scope.ptotalInStock1 = locad.perferedstore.totalInStock;
                 $scope.plocation1 = locad.location;
             }
             switch (logininfo.acounttype)
             {
                 case "R":
                     $scope.isMember = "Login";
                     break;
                 case "M":
                     $scope.isMember = "Member";
                     break;
                 default :
                     $scope.isMember = "Guest";

            }


             if(logininfo.memberzipCode != ""){
                 $location.path("/local-ad-home");
             }
             else if(logininfo.memberzipCode == "")
                 $scope.showlist = 2;


         });
     $scope.locadlist = function() {
         if ($scope.zipCodeTextLoc.zip == 60602)
             $scope.showlist = 1;
         logininfo.memberzipCode=  $scope.zipCodeTextLoc.zip;
         $scope.cLocation =logininfo.memberzipCode;
     }
     $scope.changeZipLocation = function() {
         $scope.select=true;

     }
     $scope.locadlist1 = function() {
         if ($scope.zipCodeTextLoc.zip == 60602)
             $scope.selected = "true";
     }
     $scope.returnToList = function() {
         $scope.showlist=1;
         $scope.select=false;
     }
     $scope.returnToList1 = function() {
         $scope.showlist=3;
     }

     $scope.goLocalAdHome = function(storeID,$index){
         $rootScope.selectedStoreId =  storeID;
         $rootScope.storeIndex = $index;
         $location.path('/local-ad-home');
         selectedStoreIndex = $index;
     }
 }

function googleMapCtrl($scope, $rootScope, $location,LocalAdsCurrentLocation){
    $scope.currentLocation=LocalAdsCurrentLocation;
    //alert(JSON.stringify($scope.currentLocation.localAdsData));

    $scope.returnToIndex = function(){
        $scope.currentLocation.currentTemplate = $scope.currentLocation.listTemplateUrl;
    }
//    $scope.changeZipLocation = function() {
//        $scope.select=true;
//
//    }
//    $scope.locadlist1 = function() {
//        if ($scope.zipCodeTextLoc.zip == 60602)
//            $scope.selected = "true";
//    }
//    $scope.returnToList = function() {
//        $scope.showlist=1;
//        $scope.select=false;
//    }
    $scope.myMarkers = [];
    $scope.stores = $scope.currentLocation.localAdsData;
    if($scope.currentLocation.storeNumber == $scope.stores.nearByStores.length &&logininfo.isSignedIn)
        $scope.interestStore=$scope.stores.perferedstore;
    else
        $scope.interestStore=$scope.stores.nearByStores[$scope.currentLocation.storeNumber];
    $scope.pstoreneeded =0;
    if($scope.stores.perferedStoreInd  && logininfo.isSignedIn)
        $scope.pstoreneeded =1;
    for(i=0;i<$scope.stores.nearByStores.length+$scope.pstoreneeded;i++){
        if(i<$scope.stores.nearByStores.length){
            var s = $scope.stores.nearByStores[i];
            var gc = new google.maps.Geocoder();
            gc.geocode({
                    address: s.streetAddress +','+ s.city + ',' + s.state +','+ s.country+','+ s.zipcode
                },
                function(gr,gs){
                    if(gs=="OK"){
                        var streetNumber=null;
                        for(k=0;k<gr[0].address_components.length;k++){
                            if(gr[0].address_components[k].types[0]=="street_number"){
                                streetNumber = gr[0].address_components[k].long_name;
                            }
                        }
                        //alert(JSON.stringify(gr[0].address_components));
                        $scope.myMarkers.push(new google.maps.Marker({
                            map: $scope.myMap,
                            position:gr[0].geometry.location,
                            icon: "images/googleMapsIcons/Pin.png",
                            street:streetNumber,
                            store:null
                        }));
                        //alert(JSON.stringify(gr[0]));
                    }   else{
                        alert("Failed to retrieve LatLng!");
                    }
                    if($scope.myMarkers.length==$scope.stores.nearByStores.length){
                        $scope.$emit("populateMarkerArrayDone",[]);
                    }
                });
        }
        else{
            var s = $scope.stores.perferedstore;
            var gc = new google.maps.Geocoder();
            gc.geocode({
                    address: s.streetAddress +','+ s.city + ',' + s.state +','+ s.country+','+ s.zipcode
                },
                function(gr,gs){
                    if(gs=="OK"){
                        var streetNumber=null;
                        for(k=0;k<gr[0].address_components.length;k++){
                            if(gr[0].address_components[k].types[0]=="street_number"){
                                streetNumber = gr[0].address_components[k].long_name;
                            }
                        }
                        //alert(JSON.stringify(gr[0].address_components));
                        $scope.myMarkers.push(new google.maps.Marker({
                            map: $scope.myMap,
                            position:gr[0].geometry.location,
                            icon: "images/googleMapsIcons/Pin.png",
                            street:streetNumber,
                            store:null
                        }));
                        //alert(JSON.stringify(gr[0]));
                    }   else{
                        alert("Failed to retrieve LatLng!");
                    }
                    if($scope.myMarkers.length==$scope.stores.nearByStores.length+1){
                        $scope.$emit("populateMarkerArrayDone",[]);
                    }
                });
        }
    }
    $scope.mapOptions = {
        center: new google.maps.LatLng(0,0,true),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    function calculateNewBound(A, B, C){
        var newBounds = new google.maps.LatLngBounds();
        var cLat = null;
        var cLng = null;
        if(Math.abs(A.lat()- C.lat())>Math.abs(B.lat()- C.lat())){
            cLat = A.lat();
        }else{
            cLat = B.lat();
        }

        if(Math.abs(A.lng()- C.lng())>Math.abs(B.lng()- C.lng())){
            cLng = A.lng();
        }else{
            cLng = B.lng();
        }
        newBounds.extend(new google.maps.LatLng(cLat,cLng,true));
        newBounds.extend(new google.maps.LatLng(2*C.lat()-cLat,2*C.lng()-cLng,true));
        console.log((2*C.lat()-cLat)+' '+(2*C.lng()-cLng));
        console.log(cLat+' '+cLng);
        return newBounds;
    }

    $scope.$on("populateMarkerArrayDone",function(){
          var bounds = new google.maps.LatLngBounds();
        for(var i = 0; i<$scope.myMarkers.length; i++){
            bounds.extend($scope.myMarkers[i].position);
        }
        //$scope.myMap.fitBounds(bounds);
        var mA = bounds.getNorthEast();
        var mB = bounds.getSouthWest();
        var gc = new google.maps.Geocoder();
        gc.geocode({
                address: "US, "+ $scope.currentLocation.zipCode
            },
            function(gr,gs){
                if(gs=="OK"){
                    $scope.myMap.fitBounds(calculateNewBound(mA,mB,gr[0].geometry.location));

                    $scope.myMap.panTo(gr[0].geometry.location);

                }   else{
                    alert("Failed to retrieve LatLng!");
                }

            });



//        var streetNum = $scope.interestStore.streetAddress.split(" ")[0];
//        for(i=0;i<$scope.myMarkers.length;i++){
//            if($scope.myMarkers[i].street==streetNum){
//
//                $scope.myMap.panTo($scope.myMarkers[i].position);
//                $scope.openMarkerInfo($scope.myMarkers[i],i);
//            }
//        }
    });

    angular.element(document).ready(function(){
        window.scrollTo(0,0);
        var height =  window.innerHeight-155;
        $('.map').css('height',height);
    });

    $scope.goLocalAdHome = function(storeID,$index){
        $rootScope.selectedStoreId =  storeID;
        $rootScope.storeIndex = $index;
        $location.path('/local-ad-home');
        selectedStoreIndex = $index;
    }

    $scope.openMarkerInfo = function(marker,index) {
        //alert(marker.street);
        if(marker.store==null){
            for(i=0;i<$scope.stores.nearByStores.length+1;i++){
                if(i==$scope.stores.nearByStores.length){
                    if(marker.street==$scope.stores.perferedstore.streetAddress.split(" ")[0]){
                        marker.store=$scope.stores.perferedstore;
                    }
                }
                else{
                    if(marker.street==$scope.stores.nearByStores[i].streetAddress.split(" ")[0]){
                        marker.store=$scope.stores.nearByStores[i];
                    }
                }
            }
        }
        $scope.currentStoreName=marker.store.storeName.toLowerCase().toProperCase();
        $scope.currentDistance=parseInt(marker.store.distance).toFixed(1);
        $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.getDistance = function(marker){
        var dms = new google.maps.DistanceMatrixService();
        dms.getDistanceMatrix({
                destinations:[marker.getPosition()],
                origins:[$scope.myMarkers[0].getPosition()],
                travelMode: google.maps.TravelMode.DRIVING,
                avoidHighways: false,
                avoidTolls: false},
            function(dmr, dms){
                if(dms == 'OK'){
                    $scope.currentDistance=(dmr.rows[0].elements[0].distance.value/1609.34).toFixed(1);
                }else{
                    alert(dms);
                }
            }
        );
    }


    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function(txt){
            if(txt.charAt(1)=='/'){
                return txt.toUpperCase();
            }else{
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }

        });
    };
}

function LocalAdsHomeCtrl($scope, $location,LocalAd_category,$rootScope,LocalAdsWeekly,$dialog){



    $scope.localAdCats = [];
    var k_imageScroll;

    $scope.getCount = function(){
        return $scope.localAdCats.length;
    };

    /* $scope.goLocalAdHome = function(storeID,$index){
         $rootScope.selectedStoreId =  storeID;
         $rootScope.storeIndex = $index;
         $location.path('/local-ad-home');
         selectedStoreIndex = $index;
     }*/

    LocalAd_category
        .get(function(LocalAdCategory) {

            //alert($rootScope.selectedStoreId);

            $scope.coverImage = "images/localAd/localAd_Cover.png";
            for ( var i = 0; i < 200; i++) {
                $scope.cat_name =LocalAdCategory.LocalAd.DepartmentsList.Department[i].catname;
                $scope.cat_image =LocalAdCategory.LocalAd.DepartmentsList.Department[i].imageUrl;

                $scope.localAdCats.push({
                    catname : $scope.cat_name,
                    catImage : $scope.cat_image
                }) ;
            }

        });

    $scope.SYWR_Template = '<div class="SYWR_PopUpWindow">' +
        '<img src="//s1.sywcdn.net/static/img/fusion/logo-syw.png?123" style="background-color: #000000"></br>' +
        '<p>Member Exclusives</p><br>' +
        '<p>Members earn Points for every purchase that can be cashed in on future purchases. Plus, they enjoy these perks:</p></br>' +
        '<p>View future LocalAd offers today.</p>' +
        '<p> Shop Members Only offers and pricing.</p>' +
        '<p>Receive personalized coupons and offers.</p>' +
        '<input type="checkbox" class="SYWR_Checkbox" ng-model="SYWR_Show" />' +
        '<p>Do Not Show Again.</p>'+
        '<button ng-click="goToSYWRLoginPage()" class="btn btn-primary SYWR_LogInButton">Sign in or Join</button>'+
        '<button ng-click="close(SYWR_Show)" class="btn btn-primary SYWR_CloseButton" >Close</button>'+
        '</div>';

    $scope.opts = {
        modalClass:'SYWRP-modal',
        backdropClass:'SYWRP-modal-backdrop',
        transitionClass:'SYWRP-fade',
        triggerClass:'SYWRP-in',
        dialogOpenClass:'SYWRP-modal-open',
        backdrop: true,
        modalFade:true,
        backdropFade:true,
        keyboard: true,
        backdropClick: true,
        template: $scope.SYWR_Template , // OR: templateUrl: 'path/to/view.html',
        controller: 'SYWR_PopUpWindowController'
    };


    $scope.openSYWRPopUp =  function(){
        //alert("Open SWYR PopUp Window.");
        if(localStorage.getItem('SYWR_Show')==undefined){
            console.log('SYWR is not defined, we will define it as false the first time.');
            localStorage.setItem('SYWR_Show','false');
        }
        var show = localStorage.getItem('SYWR_Show');
        console.log('SYWR: ' + show);
        var d = $dialog.dialog($scope.opts);
        d.open().then(function(result){
            //To do
        });
    };

    $scope.returnToTheList = function(){
        //window.history.back();
        $location.path('/local-ads-tapzip');
    }
    // US
    LocalAdsWeekly.get(function(localAdsWeekly){

         $scope.localAdsTopWeekly =[];
         for( var i = 0; i < localAdsWeekly.LocalAd.ItemsList.Items.length; i++){
             $scope.item_title = localAdsWeekly.LocalAd.ItemsList.Items[i].itemtitle;
             $scope.item_image = localAdsWeekly.LocalAd.ItemsList.Items[i].itemimage;
             $scope.regular_adprice = localAdsWeekly.LocalAd.ItemsList.Items[i].regularadprice;
             $scope.sale_price = localAdsWeekly.LocalAd.ItemsList.Items[i].saleprice;


             $scope.localAdsTopWeekly.push({
                 itemTitle : $scope.item_title ,
                 itemImage :  $scope.item_image ,
                 itemRegularAdPrice : $scope.regular_adprice ,
                 salePrice :  $scope.sale_price
             });
         }
     });
     $scope.showTopWeeklyDealsList = function(){
         $scope.select=true;
     }

     $scope.initCap = function (str) {
         return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
     }

     $scope.returnToTheList = function(){
         $location.path("/local-ads-tapzip");
     }
     $scope.returnToList1 = function() {
         $scope.showlist=3;
     }
 }

function SYWR_PopUpWindowController($scope, dialog, $location){

        //$scope.SYWR_Show = localStorage['SYWR_Show'];
        if(localStorage['SYWR_Show']=='true'){
                 $scope.SYWR_Show = true;

         }else{
            $scope.SYWR_Show = false;

         }

        console.log($scope.SYWR_Show);

        $scope.close = function(result){

             //Call function dialog.close.

              if($scope.SYWR_Show==true){

                     localStorage.setItem('SYWR_Show','true');

                     console.log("SYWR_Show is set to true");

                } else {

                   localStorage.setItem('SYWR_Show','false');

                      console.log("SYWR_Show is set to false");

                }



              dialog.close(result);



        };

        $scope.goToSYWRLoginPage = function(){

             if($scope.SYWR_Show==true){
                 localStorage.setItem('SYWR_Show','true');

                 console.log("SYWR_Show is set to true");

             }else{
                 localStorage.setItem('SYWR_Show','false');

                 console.log("SYWR_Show is set to false");

             }

             window.scrollTo(0,0);

             $('.account').click();

             dialog.close();

        }

}
