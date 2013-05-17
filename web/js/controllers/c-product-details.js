var partNo;
var productData;
var videos;

function PerformanceCtrl($scope, $injector, $compile, $rootScope) {
    var test = "this controller is created for the performance measurement purpose";
    var aop = $injector.get('aopService');
    var LogToServer = $injector.get('logService');

    function aspect(joinPoint, advice, type) {
        this.joinPoint = joinPoint;
        this.advice = advice;
        this.type = type;
    }


    var logStartTime = function (args) {
//      alert("About to execute dummyFunction on element with id '" + args[0] + "'");
        var currentTime = new Date();
        LogToServer.sendLog("INFO", currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds(), "dummyFunction in " + "dummyService" + " starts at ");

    }
    var logEndTime = function (returnVal) {
//      alert("About to execute dummyFunction on element with id '" + args[0] + "'");
        var currentTime = new Date();
        LogToServer.sendLog("INFO", currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds(), "dummyFunction in " + "dummyService" + "  ends at ");

    }
    var myAspectBefore = new aspect('dummyFunction', logStartTime, "before");
    var myAspectAfter = new aspect('dummyFunction', logEndTime, "after");

    aop.injectToService("dummyService", myAspectBefore);
    aop.injectToService("dummyService", myAspectAfter)


    function aspectForWatch(watchExp, advices, types) {
        this.watchExp = watchExp;
        this.advices = advices;
        this.types = types;
    }

    var logStartTime = function (args) {
        var currentTime = new Date();
        LogToServer.sendLog("INFO", currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds(), "listener function for watchExp: imgSrc starts at ");
    }
    var logEndTime = function (returnVal) {
        var currentTime = new Date();
        LogToServer.sendLog("INFO", currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds(), "listener function for watchExp: imgSrc ends at ");
    }

    var logEndTime1 = function (returnVal) {
        var currentTime = new Date();
        LogToServer.sendLog("INFO", currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds(), "listener1 function for watchExp: imgSrc ends at ");
    }
    var myAspectForWatch = new aspectForWatch('imgSrc', [logStartTime, logEndTime], ["before", "after"]);


    aop.injectToDirective(myAspectForWatch);


}

function RoutCtrl($scope, $routeParams, $location, isGuest, PDPDetail, $rootScope) {
    if ($routeParams.guest == 'guest') {
        isGuest.isGuestService.isGuestsss = true;
//        if ($routeParams.productLine == 'hard') {
//            isGuest.isGuestService.isGuestsss =true;
//            //$location.path('edit');
//        }
//
//        if ($routeParams.productLine == 'soft') {
//            isGuest.isGuestService.isGuestsss =false;
//            //$location.path('edit');
//        }
//        $location.path('edit');
    }

    if ($routeParams.guest == 'user') {
        isGuest.isGuestService.isGuestsss = false;
        //$location.path('edit');
    }

    if ($routeParams.productLine == 'hard') {
        isGuest.isGuestService.isHard = true;
        //$location.path('edit');
    }

    if ($routeParams.productLine == 'soft') {
        isGuest.isGuestService.isHard = false;
        //$location.path('edit');
    }
    else if ($routeParams.productLine != 'undefined') {
        partNo = $routeParams.productLine;
        $rootScope.partNo = $routeParams.productLine;
        isGuest.isGuestService.productID = $routeParams.productLine;
        //$location.path('edit');
    }
    else {
        partNo = null;
    }

    var queryObj;
    if (partNo === 'hard' || partNo === 'soft') {
        queryObj = Product;
        $scope.partNo = partNo;
    }
    else {
        queryObj = PDPDetail;
        $scope.partNo = partNo;
    }
    //  $scope.product = queryObj.query(function(data){
    $scope.product = queryObj.get({productLine: $scope.partNo, showSpecInd: true}, function (data) {
        productData = data;
        // store catEntryId required for Add to List from PDP page
        console.log("product json respone", productData.productDetail.softhardProductdetails[0].catEntryId);
        $rootScope.catId = productData.productDetail.softhardProductdetails[0].catEntryId;
        $rootScope.partNum = productData.productDetail.softhardProductdetails[0].partNumber;

        //$rootScope.catEntryId = productData.productDetail.softhardProductdetails.catEntryValues[0].catEntryId[0];
        $rootScope.arrivalMethods = productData.productDetail.softhardProductdetails[0].arrivalMethods;


        $.get('data/videos.xml', function (xml) {
            videos = $.xml2json(xml);
            $scope.$apply($scope.$broadcast('api_ready'));
        });


    });


}


function ProductDetailCtrl($scope, $rootScope, isGuest, $location, socialShare, $http) {

    $scope.$on('api_ready', function () {
        $scope.whenApiReady(productData);
        $scope.setAddress();
    });

    $scope.whenApiReady = function (data) {
        $scope.product = data;

        //   $scope.isnonMember = true;
        //  $scope.isGuest =false;
        //social btns
        socialShare.shareService.price = data.productDetail.softhardProductdetails[0].salePrice;
        socialShare.shareService.nameofProd = data.productDetail.softhardProductdetails[0].descriptionName;
        $scope.shareopen = "views/share.html";
        socialShare.shareService.winLoc = window.location.toString();

        $scope.oneAtATime = false;

        // catEntryId
        if ((data.productDetail.softhardProductdetails.productVariant === "NONVARIATION")
            && (data.productDetail.softhardProductdetails.webStatusInd === true)) {
            $rootScope.catEntryId = data.productDetail.softhardProductdetails.catEntryValues[0].catEntryId[0];
        }

        $rootScope.arrivalMethods = data.productDetail.softhardProductdetails[0].arrivalMethods;
        $rootScope.itemInStock = data.productDetail.softhardProductdetails[0].inStockInd;
        $rootScope.webStatusInd = data.productDetail.softhardProductdetails[0].webStatusInd;

        $scope.isdealofday = "notdeal";
        if (!(data.productDetail.softhardProductdetails.dealOfDay == "FALSE")) {
            $scope.isdealofday = "isdeal";
        }

        $scope.usertype = "member";

        var isGuest = true;
        var isnonMember = false;
        if (isGuest) {
            $scope.usertype = "guest";
        } else if (isnonMember) {
            $scope.usertype = "nonMember";
        }
        $scope.sywrprice = "sywrprice";
        var sywrpricing = data.productDetail.softhardProductdetails[0].SYWRPrice;
        //var saleprice=50;

        //$scope.sale=  saleprice;
        var craftmanpricing = data.productDetail.softhardProductdetails[0].craftmanClubPrice;
        //var craftmanpricing = 55.99;
        $scope.craft = craftmanpricing;
        var saleprice = data.productDetail.softhardProductdetails[0].salePrice;
        var regularprice = data.productDetail.softhardProductdetails[0].regularPrice;

        var shopyourwayprice = true;
        var craftclubprice = true;

        $scope.pricing = "normalprice";
        if (saleprice < regularprice) {
            $scope.pricing = "showsaleprice";
        } else {
            $scope.pricing = "showregularprice";
        }

        $scope.memberpricing = "memberprice";

        if ((!!sywrpricing)) {
            if (!!craftmanpricing) {
                if ((sywrpricing < saleprice) && (sywrpricing < craftmanpricing) && (sywrpricing < regularprice)) {
                    $scope.memberpricing = "showsywrprice";
                } else if ((craftmanpricing < saleprice) && (craftmanpricing < regularprice)) {
                    $scope.memberpricing = "showcraftsmanprice";
                } else if (craftmanpricing < regularprice) {
                    $scope.memberpricing = "showcraftsmanprice";

                }
            } else if ((sywrpricing < saleprice) && (sywrpricing < regularprice)) {
                $scope.memberpricing = "showsywrprice";
            } else if (sywrpricing < regularprice) {
                $scope.memberpricing = "showsywrprice";
            } else {
                $scope.memberpricing = "showregularprice";
            }
        }

        if (!!craftmanpricing) {
            if (!!sywrpricing) {
                if ((craftmanpricing < sywrpricing) && (craftmanpricing < saleprice)) {
                    $scope.memberpricing = "showcraftsmanprice";
                }
            } else if ((craftmanpricing < saleprice) & (craftmanpricing < regularprice)) {
                $scope.memberpricing = "showcraftsmanprice";
            } else if (craftmanpricing < regularprice) {

                $scope.memberpricing = "showcraftsmanprice";


            }
        }

        var arrival = data.productDetail.softhardProductdetails[0].arrivalMethods[0];
        console.log("arrival" + arrival);
        $scope.arrival = "arrivalmethods";
        if (arrival == 'Delivery') {
            $scope.arrival = "delivery";
        } else if (arrival == 'Ship') {
            $scope.arrival = "shipping";
        }


        $scope.avgRating = data.productDetail.softhardProductdetails[0].rating;

        if ($scope.avgRating == 5) {
            $scope.imageSource = 'images/reviews/star_5.png';
            //$scope.totalfivestars+=$scope.avgRating;// (check)
        }
        else if ($scope.avgRating == 4.5)
            $scope.imageSource = 'images/reviews/star_4.png';
        else if ($scope.avgRating == 4)
            $scope.imageSource = 'images/reviews/star_4.png';
        else if ($scope.avgRating == 3.5)
            $scope.imageSource = 'images/reviews/star_3.png';
        else if ($scope.avgRating == 3)
            $scope.imageSource = 'images/reviews/star_3.png';
        else if ($scope.avgRating == 2.5)
            $scope.imageSource = 'images/reviews/star_2.png';
        else if ($scope.avgRating == 2)
            $scope.imageSource = 'images/reviews/star_2.png';
        else if ($scope.avgRating == 1.5)
            $scope.imageSource = 'images/reviews/star_1.png';
        else if ($scope.avgRating == 1)
            $scope.imageSource = 'images/reviews/star_1.png';
        else if ($scope.avgRating == 0.5)
            $scope.imageSource = 'images/reviews/star_0.png';
        else if ($scope.avgRating == 0.0)
            $scope.imageSource = 'images/reviews/star_0.png';

        $scope.gotoReviews = function () {

            $location.path("/reviews")
        }
        var coupons = ""; //hardcoded check for api
        $scope.coupon = coupons;
        $scope.coupons = "coupon";
        if (coupons > 0) {
            $scope.coupons = "couponavailable";
        } else {
            $scope.coupons = "couponunavailable";
        }
        var sywrpoints = data.productDetail.softhardProductdetails[0].SYWRPoints;
        var bonuspoints = "";//hardcoded look for api
        $scope.bonuspoints = bonuspoints;

        $scope.sywrpoints = "points";
        if ((!!sywrpoints) && (!!bonuspoints)) {
            $scope.sywrpoints = "pointsearned";
        }
        if (!!sywrpoints) {
            $scope.sywrpoints = "sywrpointsearned";
        }
        if (!!bonuspoints) {
            $scope.sywrpoints = "bonuspointsearned";
        }

        $scope.storeButtonstatus = "";
        $scope.disablebutton = false;
        $scope.locationInfo = false;
        //$scope.locationInfo = true;
        $scope.storeNearBy = false;
        //$scope.storeNearBy = true;

        $scope.webavailability = "webstock";
        var instock = data.productDetail.softhardProductdetails[0].webStatusInd;
        if (instock) {
            $scope.webavailability = "webinstock";
        } else if (!(instock)) {
            $scope.webavailability = "weboutofstock";
        }

        $scope.storeavailabilty = "storeStock";
        var storestock = data.productDetail.softhardProductdetails[0].inStockInd;
        var variantSate = data.productDetail.softhardProductdetails[0].productVariant;

        //var storestock = true;
        // var variantSate =   "NONVARIATION";


        if (storestock) {
            $scope.storeavailabilty = "instoreStock";
        } else if (!(storestock)) {
            $scope.storeavailabilty = "instoreoutofStock";
        }

        $scope.formatHeading = function (strHead, brandLength, totalLength) {
            //alert(brandLength + strHead.length);
            if ((brandLength + strHead.length) > totalLength)
                return strHead.substring(0, totalLength - brandLength - 4) + '...';
            else
                return strHead;
        }

        //Check whether there is specifications available or not
        var haveSpecifications;
        //  var noOfSpecifications = data.productDetail.softhardProductdetails[0].specifications.length;
        var noOfSpecifications = data.productDetail.softhardProductdetails[0].specification;
        //   if (noOfSpecifications > 1)

        if (noOfSpecifications != undefined)
            $scope.haveSpecifications = "true";
        else
            $scope.haveSpecifications = "false";


        $scope.storeavailabilty_button = "storeStockStatus";

        if (variantSate == "NONVARIATION") {
            if (!(storestock)) {
                $scope.storeavailabilty_button = "v_spT_loF_VF";
                //$scope.storeButtonstatus = "Not sold in stores";
                $scope.disablebutton = true;
            } else if (storestock) {
                $scope.storeButtonstatus = "";
                $scope.storeavailabilty_button = "v_spF";
            }
        }
        else if (variantSate == "VARIATION") {
            if (!(storestock)) {
                $scope.storeavailabilty_button = "v_spT_loF_VF";
                $scope.disablebutton = true;
            }
            else if (storestock) {

                if ($scope.locationInfo == false && $rootScope.variant_selected === false) {
                    // $scope.storeavailabilty_button = "v_spT_loF_VF";
                    $scope.storeavailabilty_button = "v_spT_loF_VF";
                    $scope.disablebutton = true;
                    $scope.storeButtonstatus = "Select Color/Size to check for item availability";

                }
                else if ($scope.locationInfo == true && $rootScope.variant_selected === false) {
                    // $scope.storeavailabilty_button = "v_spT_loT_VF";
                    $scope.storeavailabilty_button = "v_spT_loF_VF";
                    $scope.disablebutton = true;
                    $scope.storeButtonstatus = "Select Color/Size to check for item availability";

                }

            }
        }

        $scope.checkProductAvailability = function () {
            if (variantSate == "VARIATION" && storestock) {
                if ($scope.locationInfo == false && $rootScope.variant_selected === true) {

                    $scope.storeavailabilty_button = "v_spF";
                    $scope.storeButtonstatus = "";
                }
                else if ($scope.locationInfo == true && $rootScope.variant_selected === true) {

                    if ($scope.storeNearBy == false) {
                        $scope.storeavailabilty_button = "v_spF";
                        $scope.storeButtonstatus = "";
                        //$scope.disablebutton = false;
                    } else if ($scope.storeNearBy == true) {
                        $scope.storeavailabilty_button = "v_spF";
                        $scope.storeButtonstatus = "";
                        //$scope.disablebutton = false;
                    }
                    // $scope.storeavailabilty_button = "v_spT_loT_VT";

                    // alert($scope.disablebutton);
                }

            }
        }

        $scope.$on('VariantChangedEvent', function () {
            $scope.checkProductAvailability();

        });


        $scope.shippingavailabilty = "shipping";
        var freeshipping = data.productDetail.softhardProductdetails[0].freeShippingEligInd;
        if (freeshipping) {
            $scope.shippingavailabilty = "freeshipping";
        } else if (!(freeshipping)) {
            $scope.shippingavailabilty = "no-freeshipping";
        }

        $scope.b2b3products = "bproducts";
        if ((instock) || (storestock)) {
            $scope.b2b3products = "NonB2B3products";
        } else {
            $scope.b2b3products = "B2B3products";
        }

//         $scope.enterZipHere = function () {
//
//             $location.path("/enterZip")
//         };
        $scope.gotologintray = function () {
            $(".account").click();
        };

        $scope.shortDescription = data.productDetail.softhardProductdetails[0].shortDescription;
        $scope.longDescription = data.productDetail.softhardProductdetails[0].longDescription;

        //$scope.isGuest= isGuest.isGuestService.isGuestsss;//here isGuest is false
        //  alert("isGuest:"+ isGuest.isGuestService.isGuestsss);
        $scope.addtocartfootertemplate = '/views/product-details/floating-addtocart-footer.html';
    }

    $scope.setAddress = function () {
        $http.get('data/saved-address.json').success(function (data) {
            var len = data.length;
            for (var index = 0; index < len; index++) {
                var address = data[index];
                if (address.express === "YES")
                    logininfo.membersavedaddress = data[index];
            }
        });
    };

    $scope.changeToGoogleMap = function () {
        $location.path("/availableStoresGoogleMapView");
    }
    $scope.changeToList = function () {
        $location.path("/availableStores");
    }


}

function GalleryController($scope, ImageService, $location, dummyService) {
    dummyService.dummyFunction();
    $scope.returnIndex = function () {
        $location.path("/");
    }

    $scope.selectedImage = {};

    $scope.threePhotos = [];
    $scope.zoomImages = [];
    $scope.zoomItems;

    $scope.photos = [];
    $scope.photosURL = [];

    $scope.processResults = function (data) {
        //$scope.photos = data.photos;
        if (partNo === 'hard' || partNo === 'soft') {
            $scope.photos = data.productDetails.images.image;

            $scope.zoomItems = data.productDetails.images.image;
            $scope.zoomImages.push({img: $scope.zoomItems});
            $scope.selectedImage = $scope.zoomImages[0];

        } else {
            if (data.productDetail.softhardProductdetails[0].imageUrls.length == 0) {
                $scope.photos.push(data.productDetail.softhardProductdetails[0].mainImageUrl);
            } else {
                $scope.photos = data.productDetail.softhardProductdetails[0].imageUrls;
            }
            if (data.productDetail.softhardProductdetails[0].imageUrls.length > 0) {
                for (var i = 0; i < data.productDetail.softhardProductdetails[0].imageUrls.length; i++) {
                    $scope.zoomItems = data.productDetail.softhardProductdetails[0].imageUrls[i];
                    $scope.zoomImages.push({img: $scope.zoomItems});
                }
            } else {
                $scope.zoomItems = data.productDetail.softhardProductdetails[0].mainImageUrl;
                $scope.zoomImages.push({img: $scope.zoomItems});
            }
        }

        for (var photoIndex = 0; photoIndex < $scope.photos.length; photoIndex++) {
            $scope.photos[photoIndex] = $scope.photos[photoIndex] + '?hei=289&wid=300';
        }
        ;

        if ($scope.photos.length > 0) {
            $scope.selectedImage = $scope.photos[0];
        }
        if (partNo == "04672039000P") {
            videoarray = videos.reviews.review_item;
            for (i = 0; i < videoarray.length; i++) {
                $scope.photos.push(videoarray[i]);
            }
            $scope.threePhotos = $scope.photos.slice(0, 3);
            $scope.moveLeft();
        } else {
            if ($scope.photos.length >= 3) {
                $scope.threePhotos = $scope.photos.slice(0, 3);
                $scope.moveLeft();
            } else if ($scope.photos.length == 2) {
                $scope.threePhotos = $scope.photos.slice(0, 2);
                $scope.moveLeft();
             }else if($scope.photos.length == 1){
                $scope.threePhotos = $scope.photos.slice(0, 1);
                $scope.moveLeft();
            }
        }
    };

    $scope.getPhotos = function () {
        $scope.product = $scope.$parent.product;
        $scope.processResults($scope.product);

    };

    $scope.selectedImageIndex = function () {
        for (index = 0; index < $scope.photos.length; index++) {
            if ($scope.photos[index] == $scope.selectedImage) {
                return index;
            }
        }

    };
    $scope.moveLeft = function () {
        if ($scope.photos.length == 1) {
            $scope.threePhotos = ["", $scope.photos[0], ""];
        } else if($scope.photos.length == 2){
            var current = $scope.selectedImageIndex();
            if(current > 0 ){
                $scope.selectedImage = $scope.photos[0];
                $scope.threePhotos[0]=$scope.photos[0];
                $scope.threePhotos[1]=$scope.photos[1];
                $scope.threePhotos[2]=$scope.photos[0];
            }else{
                $scope.selectedImage = $scope.photos[$scope.photos.length-1];
                $scope.threePhotos[0]=$scope.photos[$scope.photos.length-1];
                $scope.threePhotos[1]=$scope.photos[0];
                $scope.threePhotos[2]=$scope.photos[$scope.photos.length-1];
            }
        }else {
            var current = $scope.selectedImageIndex();
            if (current > 0) {
                $scope.threePhotos.pop();
                $scope.threePhotos.unshift($scope.photos[current - 1]);
                $scope.selectedImage = $scope.photos[current - 1];
            } else {
                $scope.selectedImage = $scope.photos[$scope.photos.length - 1];
                $scope.threePhotos[0] = $scope.photos[$scope.photos.length - 1];
                $scope.threePhotos[1] = $scope.photos[0];
                $scope.threePhotos[2] = $scope.photos[1];
            }
        }
    }

    $scope.moveRight = function () {
        if ($scope.photos.length == 1) {
            $scope.threePhotos = ["", $scope.photos[0], ""];
        } else if($scope.photos.length == 2){
            var current = $scope.selectedImageIndex();
            if(current > 0 ){
                $scope.selectedImage = $scope.photos[0];
                $scope.threePhotos[0]=$scope.photos[0];
                $scope.threePhotos[1]=$scope.photos[1];
                $scope.threePhotos[2]=$scope.photos[0];
            }else{
                $scope.selectedImage = $scope.photos[$scope.photos.length-1];
                $scope.threePhotos[0]=$scope.photos[$scope.photos.length-1];
                $scope.threePhotos[1]=$scope.photos[0];
                $scope.threePhotos[2]=$scope.photos[$scope.photos.length-1];
            }
        }else {
            var current = $scope.selectedImageIndex();
            if (current < $scope.photos.length - 1) {
                $scope.selectedImage = $scope.photos[current + 1];
                $scope.threePhotos.shift();
                if (current + 3 > $scope.photos.length - 1) {
                    $scope.threePhotos.push($scope.photos[(current + 3) - $scope.photos.length]);
                } else {
                    $scope.threePhotos.push($scope.photos[(current + 3)]);

                }
            } else {
                $scope.selectedImage = $scope.photos[0];
                $scope.threePhotos[0] = $scope.photos[0];
                $scope.threePhotos[1] = $scope.photos[1];
                $scope.threePhotos[2] = $scope.photos[2];
            }
        }
    }
    $scope.$on('api_ready', function () {
        $scope.getPhotos();
    });

    $("#thumbContainer").touchwipe({
        preventDefaultEvents: false,
        wipeLeft: function () {
            $scope.$apply(function () {
                $scope.moveRight();
            });
        },
        wipeRight: function () {
            $scope.$apply(function () {
                $scope.moveLeft();
            });

        }
    });
//      document.getElementById("thumbContainer").addEventListener('touchmove', function(e) {
//          alert("zzz");
//          $scope.$apply(function(){
//              $scope.Left();
//          });
//        }, true);
}
function MarketPlaceCtrl($scope, MarketPlace, $location) {
    $scope.marketplace = MarketPlace.query();
    $scope.myOrder = 'value1';
    $scope.selected1 = true;
    $scope.right = {"t": "-value1", "f": "value1", "state": "-value1", "view": "▾", "tView": "▾", "fView": "▴"};
    $scope.left = {"t": "-value1", "f": "value1", "state": "-value1", "view": "▾", "tView": "▾", "fView": "▴"};
    $scope.myArray = [];
    $scope.max = 0;

    MarketPlace
        .get(function (marketplacedata) {
            $scope.partNumber = marketplacedata.productDetail.softhardProductdetails.partNumber;

            $scope.min = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[0].price;
            for (var i = 0; i < (marketplacedata.productDetail.softhardProductdetails.fbmMerchants).length; i++) {

                $scope.userName = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].fulfillmentMessage;
                $scope.summary = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].itemName;
                $scope.publisheDate = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].merchantType;
                $scope.value = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].price;
                $scope.helpful = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].soldBy;
                $scope.ratingImg = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].merchantRate;
                $scope.shipPrice = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].shipPrice;
                $scope.ratingNumber = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].ratingNumber;
                if ($scope.value < $scope.min)
                    $scope.min = $scope.value;
                if ($scope.value > $scope.max)
                    $scope.max = $scope.value;
                if ($scope.ratingImg == 5)
                    $scope.imageSrc = 'images/reviews/star_5.png';
                else if ($scope.ratingImg == 4.5)
                    $scope.imageSrc = 'images/reviews/star_4.png';
                else if ($scope.ratingImg == 4)
                    $scope.imageSrc = 'images/reviews/star_4.png';
                else if ($scope.ratingImg == 3.5)
                    $scope.imageSrc = 'images/reviews/star_3.png';
                else if ($scope.ratingImg == 3)
                    $scope.imageSrc = 'images/reviews/star_3.png';
                else if ($scope.ratingImg == 2.5)
                    $scope.imageSrc = 'images/reviews/star_2.png';
                else if ($scope.ratingImg == 2)
                    $scope.imageSrc = 'images/reviews/star_2.png';
                else if ($scope.ratingImg == 1.5)
                    $scope.imageSrc = 'images/reviews/star_1.png';
                else if ($scope.ratingImg == 1)
                    $scope.imageSrc = 'images/reviews/star_1.png';
                else if ($scope.ratingImg == 0.5)
                    $scope.imageSrc = 'images/reviews/star_0.png';
                else if ($scope.ratingImg == 0.0)
                    $scope.imageSrc = 'images/reviews/star_0.png';
                if (marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].soldBy == "Sears") {
                    $scope.SearsRating = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].ratingNumber;
                    $scope.imageSource = $scope.imageSrc;
                    $scope.SearsPrice = marketplacedata.productDetail.softhardProductdetails.fbmMerchants[i].price;
                }
                if ($scope.userName.substring(0, 8) == "In Stock") {
                    $scope.myArray.push({
                        review1: $scope.userName,
                        summary1: $scope.summary,
                        publishedDate1: $scope.publisheDate,
                        value1: $scope.value,
                        helpful1: $scope.helpful,
                        imageSrc1: $scope.imageSrc,
                        rating: $scope.ratingNumber,
                        shipPrice1: $scope.shipPrice,
                        str: "false"
                    });
                }


            }
            $scope.arraySize = $scope.myArray.length;
            /*
             $scope.objsInArr1 = false;
             $scope.flip_button = function($event, id, $index, name) {
             var checkbox = $event.target;
             var action = (checkbox.checked ? 'add' : 'remove');
             if (checkbox.checked) {
             for (var i=0; i <$scope.myArray.length; i++) {
             if (i === $index) continue;
             $scope.myArray[i].str = false;
             if($scope.helpful1 != name){
             $scope.objsInArr1 = false
             } else if($scope.helpful1 == name){
             $scope.myArray[0].str = false;


             }
             $scope.selected1  = false;
             }
             } else if(checkbox.checked == false){
             $scope.selected1  = true;
             }

             };
             */


        });
    $scope.goto = function (x) {
        $location.path("/details/guest/" + $scope.partNumber)
    }
}
function MarketCtrl($scope, $location) {
    $scope.gotomarketplace = function () {
        $location.path("/marketplace.html");
    };
}


function ImageRatingCtrl($rootScope, $scope, Reviews, $location, $filter) {
//	$scope.reviews = Reviews.query();
    $scope.myArray = [];
    $scope.isCollapsed = true;
    $scope.myOrder = '-helpful1';
    $scope.left = {"t": "-helpful1", "f": "-helpful1", "state": "-helpful1", "view": "Most Helpful", "tView": "Most Helpful", "fView": "Most Helpful"};
    $scope.middle = {"t": "-convertedDate", "f": "publishedDate1", "state": "-convertedDate", "view": "▾", "tView": "▾", "fView": "▴"};
    $scope.right = {"t": "-value1", "f": "value1", "state": "-value1", "view": "▾", "tView": "▾", "fView": "▴"};


    // $scope.$watch('$rootScope.mm', function(newValue, oldValue) {
    // alert("tt"); });

    Reviews
        .get({productLine: $rootScope.partNo}, function (ratingForImage) {
            $scope.reviews = ratingForImage;
            for (var i = 0; i < (ratingForImage.data.reviews).length; i++) {

                $scope.userName = ratingForImage.data.reviews[i].author.screenName;
                $scope.summary = ratingForImage.data.reviews[i].reviewSummary;
                $scope.publisheDate = ratingForImage.data.reviews[i].publishedDate;
                $scope.value = ratingForImage.data.reviews[i].attributeRating[0].attributeValue;
                $scope.helpful = ratingForImage.data.reviews[i].helpfulCount;
                $scope.ratingImg = ratingForImage.data.reviews[i].attributeRating[0].attributeValue;
                $scope.content = ratingForImage.data.reviews[i].reviewContent;
                $scope.recommended = ratingForImage.data.reviews[i].recommendedInt;
                $scope.cityname = ratingForImage.data.reviews[i].author.city;
                $scope.statename = ratingForImage.data.reviews[i].author.state;

                if ($scope.recommended == true)
                    $scope.recommendation = "I would recommend this product to a friend";
                else $scope.recommendation = "notrecommend";

                if ($scope.ratingImg == 5)
                    $scope.imageSrc = 'images/reviews/star_5.png';
                else if ($scope.ratingImg == 4.5)
                    $scope.imageSrc = 'images/reviews/star_4.png';
                else if ($scope.ratingImg == 4)
                    $scope.imageSrc = 'images/reviews/star_4.png';
                else if ($scope.ratingImg == 3.5)
                    $scope.imageSrc = 'images/reviews/star_3.png';
                else if ($scope.ratingImg == 3)
                    $scope.imageSrc = 'images/reviews/star_3.png';
                else if ($scope.ratingImg == 2.5)
                    $scope.imageSrc = 'images/reviews/star_2.png';
                else if ($scope.ratingImg == 2)
                    $scope.imageSrc = 'images/reviews/star_2.png';
                else if ($scope.ratingImg == 1.5)
                    $scope.imageSrc = 'images/reviews/star_1.png';
                else if ($scope.ratingImg == 1)
                    $scope.imageSrc = 'images/reviews/star_1.png';
                else if ($scope.ratingImg == 0.5)
                    $scope.imageSrc = 'images/reviews/star_0.png';
                else if ($scope.ratingImg == 0.0)
                    $scope.imageSrc = 'images/reviews/star_0.png';

                var m = Date.now();
                $scope.v = {
                    mDt: m
                }

                var newDate = $scope.publishedDate;
                $scope.outputDate = $filter('date')(new Date(newDate),
                    'yyyy');
                // $scope.todaysDate = $filter('date')(new Date(m),
                // 'MM/yyyy');


                $scope.myArray.push({
                    review1: $scope.userName,
                    summary1: $scope.summary,
                    publishedDate1: $scope.publisheDate,
                    imageSource1: $scope.imageSrc,
                    convertedDate: $scope.outputDate,
                    // todaysDate1 : $scope.todaysDate,
                    content1: $scope.content,
                    value1: $scope.value,
                    helpful1: $scope.helpful,
                    recommended1: $scope.recommendation,
                    cityname1: $scope.cityname,
                    statename1: $scope.statename
                });

            }


        });

    $scope.expan = function () {

        $('#contentaaa').css({
            "content": "..",
            "height": "auto"


        });


    }
    $scope.decide = function (content) {
        if (content.length > 100) {
            return true;
        } else return false;
    }

    $scope.showcontent = function (index) {

        var linkdiv = $(".show-more")[index];
        //var linktotal=$link(index) ;
        var $content = $(".text-content")[index];
        // var contenttext=$content(index);
        var linkText = $(linkdiv).text();

        $($content).toggleClass("short-text, full-text");

        $(linkdiv).children('a').text($scope.getShowLinkText(linkText));

        return false;
    };

    $scope.getShowLinkText = function (currentText) {
        var newText = '';

        if (currentText.toUpperCase().indexOf('MORE') >= 0) {
            newText = "See less";
        } else {
            newText = "See more";
        }

        return newText;
    }


    $scope.gotoReviews = function (name, index) {
        $location.path("/reviews");

        // alert(name);
        // alert($scope.myArray[index].review1);

        for (var i = 0; i < $scope.myArray.length; i++) {
            if ($scope.myArray[i].review1 == name) {
                // alert(i);
                $rootScope.myIndex = i;
            }

        }

    }
}

function ReviewDetailsCtrl($rootScope, $scope, Reviews, $location, $filter) {
    $
        .getJSON(
        'data/productreviews.json',
        function (data) {
            $scope
                .$apply(function ($rootScope) {
                    $scope.reviewUser = data.data.reviews[$rootScope.myIndex].author.screenName;
                    $scope.reviewDetails = data.data.reviews[$rootScope.myIndex].content;
                });
        });

}

function RatingCtrl($scope, Reviews, $location, $rootScope, isGuest) {
//    $scope.reviews = Reviews.query();
    Reviews.get({productLine: $rootScope.partNo}, function (rating) {
        $scope.reviews = rating;
        var reviewcount = rating.data.summary.reviewCount;

        $scope.showreviews = "reviews";

        if (reviewcount == 0) {
            $scope.showreviews = "donotshowthereviews";

        } else if (reviewcount >= 1) {
            $scope.showreviews = "showthereviews";
        }
        var ratingcount = rating.data.reviews.length;
        console.log("length" + ratingcount);
        $scope.ratings = "rating";
        if (ratingcount > 3) {
            $scope.ratings = "viewallthereviews";
        } else {
            $scope.ratings = "donotviewallthereviews";
        }

        $scope.avgRating = rating.data.summary.overallRating;

        if ($scope.avgRating == 5) {
            $scope.imageSource = 'images/reviews/star_5.png';
            //$scope.totalfivestars+=$scope.avgRating;// (check)
        }
        else if ($scope.avgRating == 4.5)
            $scope.imageSource = 'images/reviews/star_4.png';
        else if ($scope.avgRating == 4)
            $scope.imageSource = 'images/reviews/star_4.png';
        else if ($scope.avgRating == 3.5)
            $scope.imageSource = 'images/reviews/star_3.png';
        else if ($scope.avgRating == 3)
            $scope.imageSource = 'images/reviews/star_3.png';
        else if ($scope.avgRating == 2.5)
            $scope.imageSource = 'images/reviews/star_2.png';
        else if ($scope.avgRating == 2)
            $scope.imageSource = 'images/reviews/star_2.png';
        else if ($scope.avgRating == 1.5)
            $scope.imageSource = 'images/reviews/star_1.png';
        else if ($scope.avgRating == 1)
            $scope.imageSource = 'images/reviews/star_1.png';
        else if ($scope.avgRating == 0.5)
            $scope.imageSource = 'images/reviews/star_0.png';
        else if ($scope.avgRating == 0.0)
            $scope.imageSource = 'images/reviews/star_0.png';


    });
    $scope.gotoReviews = function () {

        $location.path("/reviews")
    }
    $scope.gotoReview = function () {
        $location.path("/details/guest/" + isGuest.isGuestService.productID);
    };


}

function ReviewsCtrl($scope, $rootScope, Reviews, $location, $filter) {

    $scope.myArray = [];
    $scope.isCollapsed = true;
    $scope.myOrder = '-helpful1';
    $scope.left = {"t": "-helpful1", "f": "-helpful1", "state": "-helpful1", "view": "Most Helpful", "tView": "Most Helpful", "fView": "Most Helpful"};
    $scope.middle = {"t": "-convertedDate", "f": "convertedDate", "state": "-convertedDate", "view": "▼", "tView": "▼", "fView": "▲"};
    $scope.right = {"t": "-value1", "f": "value1", "state": "-value1", "view": "▼", "tView": "▼", "fView": "▲"};


    // $scope.$watch('$rootScope.mm', function(newValue, oldValue) {
    // alert("tt"); });

    Reviews
        .get({productLine: $rootScope.partNo}, function (ratingForImage) {
            $scope.reviews = ratingForImage;
            for (var i = 0; i < (ratingForImage.data.reviews).length; i++) {

                $scope.userName = ratingForImage.data.reviews[i].author.screenName;
                $scope.summary = ratingForImage.data.reviews[i].reviewSummary;
                $scope.publishedDate = ratingForImage.data.reviews[i].publishedDate;
                $scope.value = ratingForImage.data.reviews[i].attributeRating[0].attributeValue;
                $scope.helpful = ratingForImage.data.reviews[i].helpfulCount;
                $scope.ratingImg = ratingForImage.data.reviews[i].attributeRating[0].attributeValue;
                $scope.content = ratingForImage.data.reviews[i].reviewContent;
                $scope.recommended = ratingForImage.data.reviews[i].recommendedInt;
                $scope.cityname = ratingForImage.data.reviews[i].author.city;
                $scope.statename = ratingForImage.data.reviews[i].author.state;

                if ($scope.recommended == true)
                    $scope.recommendation = "I would recommend this product to a friend";
                else $scope.recommendation = "";

                if ($scope.ratingImg == 5)
                    $scope.imageSrc = 'images/reviews/star_5.png';
                else if ($scope.ratingImg == 4.5)
                    $scope.imageSrc = 'images/reviews/star_4.png';
                else if ($scope.ratingImg == 4)
                    $scope.imageSrc = 'images/reviews/star_4.png';
                else if ($scope.ratingImg == 3.5)
                    $scope.imageSrc = 'images/reviews/star_3.png';
                else if ($scope.ratingImg == 3)
                    $scope.imageSrc = 'images/reviews/star_3.png';
                else if ($scope.ratingImg == 2.5)
                    $scope.imageSrc = 'images/reviews/star_2.png';
                else if ($scope.ratingImg == 2)
                    $scope.imageSrc = 'images/reviews/star_2.png';
                else if ($scope.ratingImg == 1.5)
                    $scope.imageSrc = 'images/reviews/star_1.png';
                else if ($scope.ratingImg == 1)
                    $scope.imageSrc = 'images/reviews/star_1.png';
                else if ($scope.ratingImg == 0.5)
                    $scope.imageSrc = 'images/reviews/star_0.png';
                else if ($scope.ratingImg == 0.0)
                    $scope.imageSrc = 'images/reviews/star_0.png';

                var m = Date.now();
                $scope.v = {
                    mDt: m
                }

                var newDate = $scope.publishedDate;
                $scope.outputDate = $filter('date')(new Date(newDate), 'yyyy/MM/dd');

                $scope.myArray.push({
                    review1: $scope.userName,
                    summary1: $scope.summary,
                    publishedDate1: $scope.publishedDate,
                    imageSource1: $scope.imageSrc,
                    convertedDate: $scope.outputDate,
                    // todaysDate1 : $scope.todaysDate,
                    content1: $scope.content,
                    value1: $scope.value,
                    helpful1: $scope.helpful,
                    recommended1: $scope.recommendation,
                    cityname1: $scope.cityname,
                    statename1: $scope.statename
                });

            }
            console.log('Array Length: ' + $scope.myArray.length);

            $scope.avgRating = ratingForImage.data.summary.overallRating;

            if ($scope.avgRating == 5) {
                $scope.imageSource = 'images/reviews/star_5.png';
                //$scope.totalfivestars+=$scope.avgRating;// (check)
            }
            else if ($scope.avgRating == 4.5)
                $scope.imageSource = 'images/reviews/star_4.png';
            else if ($scope.avgRating == 4)
                $scope.imageSource = 'images/reviews/star_4.png';
            else if ($scope.avgRating == 3.5)
                $scope.imageSource = 'images/reviews/star_3.png';
            else if ($scope.avgRating == 3)
                $scope.imageSource = 'images/reviews/star_3.png';
            else if ($scope.avgRating == 2.5)
                $scope.imageSource = 'images/reviews/star_2.png';
            else if ($scope.avgRating == 2)
                $scope.imageSource = 'images/reviews/star_2.png';
            else if ($scope.avgRating == 1.5)
                $scope.imageSource = 'images/reviews/star_1.png';
            else if ($scope.avgRating == 1)
                $scope.imageSource = 'images/reviews/star_1.png';
            else if ($scope.avgRating == 0.5)
                $scope.imageSource = 'images/reviews/star_0.png';
            else if ($scope.avgRating == 0.0)
                $scope.imageSource = 'images/reviews/star_0.png';


        });

    $scope.expan = function () {

        $('#contentaaa').css({
            "content": "..",
            "height": "auto"


        });


    }
    $scope.decide = function (content) {
        if (content.length > 100) {
            return true;
        } else return false;
    }

    $scope.showcontent = function (index) {

        var linkdiv = $(".show-more")[index];
        //var linktotal=$link(index) ;
        var $content = $(".text-content")[index];
        // var contenttext=$content(index);
        var linkText = $(linkdiv).text();

        $($content).toggleClass("short-text, full-text");

        $(linkdiv).children('a').text($scope.getShowLinkText(linkText));

        return false;
    };

    $scope.getShowLinkText = function (currentText) {
        var newText = '';

        if (currentText.toUpperCase() === "SEE MORE") {
            newText = "See less";
        } else {
            newText = "See more";
        }

        return newText;
    }

}


function PdpRecommendationsCtrl($scope, PdpRecommendations, isGuest, $location) {

    if (isGuest.isGuestService.productID == "02073099000P") {
        $scope.template = "";


    } else {
        $scope.template = 'views/product-details/product-details.html';
    }


    $scope.twoPhotos = [];

    $scope.photos = [];

    $scope.processResults = function (data) {

        $scope.photos = data.Recommendations;
        if ($scope.photos.length > 0) {
            $scope.selectedImage = $scope.photos[0];
        }
        $scope.twoPhotos = $scope.photos.slice(0, 2);

    };

    $scope.getPhotos = function () {

//        $scope.product = PdpRecommendations.query($scope.processResults);
        $scope.product = PdpRecommendations.get({productLine: $scope.partNo}, function (data) {
            $scope.processResults(data);
        });
    };

    $scope.selectImg = function (index) {
        $scope.selectedImage = $scope.photos[$index];
        var current = $scope.selectedImageIndex();
        if (current < $scope.photos.length - 1) {
            $scope.twoPhotos.shift();
            if (current + 2 > $scope.photos.length - 1) {
                $scope.twoPhotos.push($scope.photos[(current + 2) - $scope.photos.length]);
            } else {
                //$scope.twoPhotos.push($scope.photos[(current+2)]);
            }
        }
    };

    $scope.selectedImageIndex = function () {
        for (index = 0; index < $scope.photos.length; index++) {
            if ($scope.photos[index] == $scope.selectedImage) {
                return index;
            }
        }

    };
    $scope.moveLeft = function () {

        var current = $scope.selectedImageIndex();
        if (current > 0) {
            $scope.twoPhotos.pop();
            $scope.twoPhotos.unshift($scope.photos[current - 1]);
            $scope.selectedImage = $scope.photos[current - 1];
        } else {
            $scope.selectedImage = $scope.photos[$scope.photos.length - 1];
            $scope.twoPhotos[0] = $scope.photos[$scope.photos.length - 1];
            $scope.twoPhotos[1] = $scope.photos[0];
            //$scope.twoPhotos[2]=$scope.photos[1];
        }
    }

    $scope.moveRight = function () {
        var current = $scope.selectedImageIndex();
        if (current < $scope.photos.length - 1) {
            $scope.selectedImage = $scope.photos[current + 1];
            $scope.twoPhotos.shift();
            if (current + 2 > $scope.photos.length - 1) {
                $scope.twoPhotos.push($scope.photos[(current + 2) - $scope.photos.length]);
            } else {
                $scope.twoPhotos.push($scope.photos[(current + 2)]);

            }
        } else {
            $scope.selectedImage = $scope.photos[0];
            $scope.twoPhotos[0] = $scope.photos[0];
            $scope.twoPhotos[1] = $scope.photos[1];
            //$scope.twoPhotos[2]=$scope.photos[2];
        }
    }

    $scope.getPhotos();

    $("#thumbContainer-dsp").touchwipe({
        preventDefaultEvents: false,
        wipeLeft: function () {
            $scope.$apply(function () {
                $scope.moveRight();
            });
        },
        wipeRight: function () {
            $scope.$apply(function () {
                $scope.moveLeft();
            });

        }
    });

}

PdpRecommendationsCtrl.$inject = ['$scope', 'PdpRecommendations', 'isGuest'];

function ColorSizeController($scope, ImageService, $location, isGuest) {

    if (isGuest.isGuestService.productID == "007VA55348912P") {
        $scope.template = 'views/product-details/colorsize.html';
    } else {
        $scope.template = 'views/product-details/colorsize_hard.html';
    }
}


function EnterZipCtrl($scope, $location) {
    $scope.enterZipHere = function () {

        $location.path("/enterZip")
    }

}

function AvailableStoresCtrl($scope, $location) {

    $scope.availableStores = function () {
        if ($scope.zipCodeText == 60602 || (($scope.zipCodeText).toUpperCase() == "IL") || (($scope.zipCodeText).toUpperCase() == "CHICAGO")) {
            $location.path("/availableStores")
        }

        else {

            alert("Wrong zip code");
        }
    }

}

//function EnterZipCtrl($scope,$dialog) {
//
//
//    $scope.opts = {
//
//        //template:  t,
//        templateUrl: 'views/product-details/store_pickup_zip.html',
//        controller: 'AvailableStoresCtrl'
//    };
//
//
//    $scope.enterZipHere = function() {
//
//        var d = $dialog.dialog($scope.opts);
//        d.open();
//    }
//
//}
//
//function AvailableStoresCtrl($scope, dialog, $location){
//    $scope.close = function(){
//        dialog.close();
//    };
//
//    $scope.availableStores = function() {
//        // alert($scope.zipCodeText);
//
//
//        if ($scope.zipCodeText == 60602 || (($scope.zipCodeText).toUpperCase()=="IL") ||(($scope.zipCodeText).toUpperCase()=="CHICAGO")) {
//
//
//            $location.path("/availableStores")
//
//        }
//
//        else {
//
//            alert("Wrong zip code");
//        }
//    }
//}


function InfiniteScrolleCtrl($scope, StoreDetails, $location, $rootScope, $filter, availableStoresSharedData) {
    $scope.sharedData = availableStoresSharedData;
    $scope.location = $scope.sharedData.location;
    $scope.stores = StoreDetails.query();
    $scope.allStoresDetails = $scope.sharedData.allStoresDetails;
    $scope.preferredStore = $scope.sharedData.preferredStore;


    $scope.display_limit = 8;
    $scope.isCollapsed = true;
    $scope.addToCart = true;
    //$scope.addToCart = false;
    $scope.state = $scope.sharedData.state;

    $scope.Dayslist = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    //$scope.addToCart = false;
    $scope.startorend = true;
    $scope.storeweekhours = "";//holds all hours for the week in a string
    $scope.storeweekhoursn = "";//holds all hours for the week in a string
    $scope.storeweekhoursp = "";//holds all hours for the week in a string
    $scope.storehourslist = [];//array for setting up storeweekhours

    $scope.imageSrs = 'images/Down_Arrow.png';
    $scope.pimageSrs = 'images/Down_Arrow.png';
    $scope.pStarImage = 'images/one_star.png';
    $scope.bgcolor = '#f6f6f6';
    $scope.bgcolor_panel = '#f6f6f6';
    //$scope.bgcolor1 =  '#0677af' ;
    $scope.bgcolor1 = '-webkit-linear-gradient(top, #0088cc, #0055cc)';
    //$scope.bgcolor1 =  '-moz-linear-gradient(center top , rgb(0, 136, 204), rgb(0, 85, 204))' ;
    $scope.bgcolor = 'white';
    $scope.textColor_w = '#ffffff';
    $scope.textColor_b = '#000000';
    $scope.borderColor = '#f6f6f6';


    if ($scope.allStoresDetails.length == 0) {
        StoreDetails
            .get(function (storeDetails) {

                var m = Date.now();
                $scope.v = {
                    mDt: m
                }
                $scope.today = $filter('date')(new Date(m), 'EEE');


                (function () {
                    for (var i = 0; i < storeDetails.nearByStores.length; i++) {

                        $scope.login = true;
                        // $scope.login = false;

                        $scope.name = storeDetails.nearByStores[i].storeName;
                        $scope.distance = storeDetails.nearByStores[i].distance;
                        $scope.city = storeDetails.nearByStores[i].city + " ,";
                        $scope.zip = storeDetails.nearByStores[i].state + " "
                            + storeDetails.nearByStores[i].zipcode;

                        $scope.availability = storeDetails.nearByStores[i].allItemsAvaiable;
                        $scope.address = storeDetails.nearByStores[i].streetAddress;
                        $scope.phone = storeDetails.nearByStores[i].phone;
                        $scope.location.s = storeDetails.location;
                        $scope.totalInStock = storeDetails.nearByStores[i].totalInStock;

                        $scope.storeHoursSun = (storeDetails.nearByStores[i].StoreDetails.Sunday).replace("to", "-");
                        $scope.storehourslist[0] = $scope.storeHoursSun;
                        $scope.storeHoursMon = (storeDetails.nearByStores[i].StoreDetails.Monday).replace("to", "-");
                        $scope.storehourslist[1] = $scope.storeHoursMon;
                        $scope.storeHoursTue = (storeDetails.nearByStores[i].StoreDetails.Tuesday).replace("to", "-");
                        $scope.storehourslist[2] = $scope.storeHoursTue;
                        $scope.storeHoursWed = (storeDetails.nearByStores[i].StoreDetails.Wednesday).replace("to", "-");
                        $scope.storehourslist[3] = $scope.storeHoursWed;
                        $scope.storeHoursThu = (storeDetails.nearByStores[i].StoreDetails.Thursday).replace("to", "-");
                        $scope.storehourslist[4] = $scope.storeHoursThu;
                        $scope.storeHoursFri = (storeDetails.nearByStores[i].StoreDetails.Friday).replace("to", "-");
                        $scope.storehourslist[5] = $scope.storeHoursFri;
                        $scope.storeHoursSat = (storeDetails.nearByStores[i].StoreDetails.Saturday).replace("to", "-");
                        $scope.storehourslist[6] = $scope.storeHoursSat;
                        $scope.storeweekhours = "";
                        output(0); //calls void function that sets up  $scope.storeweekhours a string that holds all the hours for the week

                        $scope.storeweekhoursn = $scope.storeweekhours;
                        $scope.storeweekdaysn = $scope.storedayhours;


                        $scope.pstoreHoursSun = (storeDetails.perferedstore.StoreDetails.Sunday).replace("to", "-");
                        $scope.storehourslist[0] = $scope.pstoreHoursSun;
                        $scope.pstoreHoursMon = (storeDetails.perferedstore.StoreDetails.Monday).replace("to", "-");
                        $scope.storehourslist[1] = $scope.pstoreHoursMon;
                        $scope.pstoreHoursTue = (storeDetails.perferedstore.StoreDetails.Tuesday).replace("to", "-");
                        $scope.storehourslist[2] = $scope.pstoreHoursTue;
                        $scope.pstoreHoursWed = (storeDetails.perferedstore.StoreDetails.Wednesday).replace("to", "-");
                        $scope.storehourslist[3] = $scope.pstoreHoursWed;
                        $scope.pstoreHoursThu = (storeDetails.perferedstore.StoreDetails.Thursday).replace("to", "-");
                        $scope.storehourslist[4] = $scope.pstoreHoursThu;
                        $scope.pstoreHoursFri = (storeDetails.perferedstore.StoreDetails.Friday).replace("to", "-");
                        $scope.storehourslist[5] = $scope.pstoreHoursFri;
                        $scope.pstoreHoursSat = (storeDetails.perferedstore.StoreDetails.Saturday).replace("to", "-");
                        $scope.storehourslist[6] = $scope.pstoreHoursSat;
                        output(0); //calls void function that sets up  $scope.storeweekhours a string that holds all the hours for the week
                        $scope.preferredStore.storeDayHour = $scope.storeweekhours;
                        $scope.preferredStore.storeDays = $scope.storedayhours;

                        //For Today's time
                        switch ($scope.today) {
                            case "Sun":
                            {
                                $scope.storeHours = $scope.storeHoursSun;
                                $scope.preferredStore.storeHour = $scope.pstoreHoursSun;
                            }
                                break;
                            case "Mon":
                            {
                                $scope.storeHours = $scope.storeHoursMon;
                                $scope.preferredStore.storeHour = $scope.pstoreHoursMon;
                            }
                                break;
                            case "Tue":
                            {
                                $scope.storeHours = $scope.storeHoursTue;
                                $scope.preferredStore.storeHour = $scope.pstoreHoursTue;
                            }
                                break;
                            case "Wed":
                            {
                                $scope.storeHours = $scope.storeHoursWed;
                                $scope.preferredStore.storeHour = $scope.pstoreHoursWed;
                            }
                                break;
                            case "Thu":
                            {
                                $scope.storeHours = $scope.storeHoursThu;
                                $scope.preferredStore.storeHour = $scope.pstoreHoursThu;
                            }
                                break;
                            case "Fri":
                            {
                                $scope.storeHours = $scope.storeHoursFri;
                                $scope.preferredStore.storeHour = $scope.pstoreHoursFri;
                            }
                                break;
                            case "Sat":
                            {
                                $scope.storeHours = $scope.storeHoursSat;
                                $scope.preferredStore.storeHour = $scope.pstoreHoursSat;
                            }
                                break;
                        }


                        //Start For Prefered Store

                        $scope.preferredStore.perferedStoreInd = storeDetails.perferedStoreInd;


                        if ($scope.preferredStore.perferedStoreInd == true) {
                            $scope.preferredStore.storeName = storeDetails.perferedstore.storeName;
                            $scope.preferredStore.storeDistance = storeDetails.perferedstore.distance;
                            $scope.preferredStore.storeAvailability = storeDetails.perferedstore.allItemsAvaiable;
                            $scope.preferredStore.storeAddress = storeDetails.perferedstore.streetAddress;
                            $scope.preferredStore.storeCity = storeDetails.perferedstore.city + " ,";
                            $scope.preferredStore.storeZip = storeDetails.perferedstore.state
                                + " " + storeDetails.perferedstore.zipcode;
                            $scope.preferredStore.storePhone = storeDetails.perferedstore.phone;
                            $scope.preferredStore.storeStock = storeDetails.perferedstore.totalInStock;
                            $scope.preferredStore.storeLocation = storeDetails.location;

                            if ($scope.preferredStore.storeStock == 0
                                && $scope.login == true) {

                                $scope.preferredStore.storeshipment = "Out of stock";
                                $scope.preferredStore.g_color = '#FF0000';
                                $scope.preferredStore.g_image = 'images/out_of_stock.png';

                            }


                            else if ($scope.preferredStore.storeStock > 0 && $scope.preferredStore.storeStock < 5
                                && $scope.login == true) {
                                $scope.preferredStore.g_color = '#FF9900';
                                $scope.preferredStore.storeshipment =
                                    +$scope.preferredStore.storeStock
                                        + " Available";
                                $scope.preferredStore.g_image = 'images/alert_stock.png';
                            }

                            else {
                                $scope.preferredStore.g_color = '#339933';
                                $scope.preferredStore.storeshipment = "In Stock";
                                $scope.preferredStore.g_image = 'images/in_stock.png';
                            }

                        }

                        //End For Prefered Store


                        if ($scope.totalInStock == 0) {
                            $scope.shipment = "Out of stock";
                            $scope.stockColor = '#FF0000';
                            $scope.g_imageSrs = 'images/out_of_stock.png';
                        }


                        else if ($scope.totalInStock > 0 && $scope.totalInStock < 5
                            && $scope.login == true) {
                            $scope.shipment =
                                +$scope.totalInStock
                                    + " Available";
                            $scope.stockColor = '#FF9900';
                            $scope.g_imageSrs = 'images/alert_stock.png';
                        }

                        else {
                            $scope.stockColor = '#339933';
                            $scope.shipment = "In Stock"
                            $scope.g_imageSrs = 'images/in_stock.png';
                        }


                        //Button in the store list
                        if ($scope.addToCart == true) {
                            $scope.addOrSelect = "Add to Cart"
                        }

                        else {
                            $scope.addOrSelect = "Select Store"
                        }

                        //collapsed and expand image


                        $scope.preferredStore.str = false;

                        $scope.allStoresDetails.push({

                            storeName: $scope.name,
                            storeAddress: $scope.address,
                            storePhone: $scope.phone,
                            storeDistance: $scope.distance,
                            storeCity: $scope.city,
                            storeZip: $scope.zip,
                            storeshipment: $scope.shipment,
                            storeLocation: $scope.location,
                            storeAvailability: $scope.availability,
                            storeStock: $scope.totalInStock,
                            storeHour: $scope.storeHours,
                            storeDays: $scope.storeweekdaysn,
                            storeDayHour: $scope.storeweekhoursn,
                            g_image: $scope.g_imageSrs,
                            g_color: $scope.stockColor,
                            str: "false"

                        });


                    }


                })()


            });
    }

    $scope.isAvailable = function (store) {
        // return user.convertedDate == user.todaysDate1;

        if (store.storeStock > 0) {
            return true;
        }

//         else if(){
//
//         }

        //return (store.storeStock > 0);
    };


    //Sort and setup store hours by day
    function dayvalue(x) {
        switch (x) {
            case 1:
                $scope.day = "Mon";
                break;
            case 2:
                $scope.day = "Tue";
                break;
            case 3:
                $scope.day = "Wed";
                break;
            case 4:
                $scope.day = "Thu";
                break;
            case 5:
                $scope.day = "Fri";
                break;
            case 6:
                $scope.day = "Sat";
                break;
            default:
                $scope.day = "Sun";

        }
    }

    function output(x) {
        dayvalue(x);
        if (x < 6)    //deals with last
        {
            if (x == 0)    //deals with zero
            {

                $scope.storedayhours = $scope.day;

                if ($scope.storehourslist[x] == $scope.storehourslist[x + 1]) {
                    $scope.startorend = true;
                    $scope.storeweekdays = $scope.storedayhours;
                }
                else {
                    $scope.startorend = false;
                    $scope.storedayhours = $scope.storedayhours + " \n";
                    $scope.storeweekhours = $scope.storehourslist[x] + "\n";
                }
                x = x + 1;
                output(x);
            }
            else {
                if ($scope.storehourslist[x] == $scope.storehourslist[x + 1] && $scope.storehourslist[x] == $scope.storehourslist[x - 1]) {
                    x = x + 1;
                    output(x);
                }
                else {
                    if ($scope.startorend) {
                        $scope.storedayhours = $scope.storedayhours + "-" + $scope.day + " \n";
                        $scope.storeweekhours = $scope.storeweekhours + $scope.storehourslist[x] + "\n";
                        $scope.startorend = false;

                    }
                    else {
                        if ($scope.storehourslist[x] == $scope.storehourslist[x + 1]) {
                            $scope.storedayhours = $scope.storedayhours + $scope.day;
                            $scope.startorend = true;
                        }
                        else {
                            $scope.startorend = false;
                            $scope.storedayhours = $scope.storedayhours + $scope.day + " \n";
                            $scope.storeweekhours = $scope.storeweekhours + $scope.storehourslist[x] + "\n";
                        }

                    }

                    x = x + 1;
                    output(x);
                }
            }
        }
        else {
            if ($scope.startorend) {
                $scope.storedayhours = $scope.storedayhours + "-" + $scope.day + " ";
                $scope.storeweekhours = $scope.storeweekhours + $scope.storehourslist[x];

            }
            else {
                $scope.storedayhours = $scope.storedayhours + $scope.day + " ";
                $scope.storeweekhours = $scope.storeweekhours + $scope.storehourslist[x];

            }


        }
    }

    $scope.storeButtonCl = function (sel) {


        if (sel == 2) {
            //$scope.bgcolor2 = '#0677af';
            $scope.bgcolor2 = ' -webkit-linear-gradient(top, #0088cc, #0055cc)';
            $scope.bgcolor1 = 'white';
            $scope.textColor_w = '#000000';
            $scope.textColor_b = '#ffffff';

        }
        else if ((sel == 1)) {
            //$scope.bgcolor1 = '#0677af';
            $scope.bgcolor1 = ' -webkit-linear-gradient(top, #0088cc, #0055cc)';
            $scope.bgcolor2 = 'white';
            $scope.textColor_w = '#ffffff';
            $scope.textColor_b = '#000000';
        }


    }


    //fliping button start


    $scope.flip_button = function ($event, id, $index, name) {
        var checkbox = $event.target;
        $scope.state.stusAddToCart = false;
        //$rootScope.storeIndex = $index;
        var action = (checkbox.checked ? 'add' : 'remove');
        if (checkbox.checked) {
            $scope.state.intrestedStore = $scope.allStoresDetails[$index];
            for (var i = 0; i < $scope.allStoresDetails.length; i++) {
                if (i === $index) continue;
                $scope.allStoresDetails[i].str = false;

                if ($scope.allStoresDetails[$index].storeStock == 0 || $scope.preferredStore.storeStock == 0) {
                    $scope.state.buttontype = 'outOfStock';
                    $scope.state.stusAddToCart = true;
                }

                else if ($scope.allStoresDetails[$index].storeStock != 0 || $scope.preferredStore.storeStock != 0) {
                    $scope.state.buttontype = 'inStock';
                }

                if ($scope.preferredStore.storeName != name) {
                    $scope.preferredStore.str = false;
                } else if ($scope.preferredStore.storeName == name) {
                    $scope.allStoresDetails[0].str = false;
                }
                $scope.state.selected1 = false;
            }
        } else if (checkbox.checked == false) {
            $scope.state.intrestedStore = null;
            $scope.state.selected1 = true;
        }

    };


    $scope.initCap = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    $scope.formatZip = function (pcode) {
        if (pcode.length > 5)
            return pcode.substr(0, 8) + "-" + pcode.substr(8, 12);
        else
            return pcode;
    };


    //------------------------>

    $scope.gotoStoreDetails = function (name, index) {
        $location.path("/storeDetails");

        // alert(name);
        // alert($scope.myArray[index].review1);

        for (var i = 0; i < $scope.allStoresDetails.length; i++) {
            if ($scope.allStoresDetails[i].storeName == name) {
                alert($scope.allStoresDetails[i].storeName);
                $rootScope.myIndex = i;
            }
            else if ($scope.pname == name) {
                alert(name);
                $rootScope.preferredStore = name;
            }

        }

    }


}

function InfiniteScrolleGoogleMapCtrl($scope, StoreDetails, $window, $location, $rootScope, $filter, availableStoresSharedData, $compile) {
    $scope.sharedData = availableStoresSharedData;
    $scope.location1 = $scope.sharedData.location;
    $scope.allStoresDetails = $scope.sharedData.allStoresDetails;
    $scope.preferredStore = $scope.sharedData.preferredStore;
    $scope.state = $scope.sharedData.state;
    $scope.display_limit = 8;
    $scope.isCollapsed = true;
    $scope.addToCart = true;

    $scope.imageSrs = 'images/Down_Arrow.png';
    $scope.pimageSrs = 'images/Down_Arrow.png';
    $scope.pStarImage = 'images/one_star.png';
    $scope.bgcolor = '#f6f6f6';
    $scope.bgcolor_panel = '#f6f6f6';
    //$scope.bgcolor1 =  '#0677af' ;
    $scope.bgcolor1 = '-webkit-linear-gradient(top, #0088cc, #0055cc)';
    //$scope.bgcolor1 =  '-moz-linear-gradient(center top , rgb(0, 136, 204), rgb(0, 85, 204))' ;
    $scope.bgcolor = 'white';
    $scope.textColor_w = '#ffffff';
    $scope.textColor_b = '#000000';
    $scope.borderColor = '#f6f6f6';
    //$scope.addToCart = false;


    $scope.Dayslist = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    $scope.isAvailable = function (store) {
        // return user.convertedDate == user.todaysDate1;

        if (store.storeStock > 0) {
            return true;
        }

//         else if(){
//
//         }

        //return (store.storeStock > 0);
    };


    //Sort and setup store hours by day
    function dayvalue(x) {
        switch (x) {
            case 1:
                $scope.day = "Mon";
                break;
            case 2:
                $scope.day = "Tue";
                break;
            case 3:
                $scope.day = "Wed";
                break;
            case 4:
                $scope.day = "Thu";
                break;
            case 5:
                $scope.day = "Fri";
                break;
            case 6:
                $scope.day = "Sat";
                break;
            default:
                $scope.day = "Sun";

        }
    }

    function output(x) {
        dayvalue(x);
        if (x < 6)    //deals with last
        {
            if (x == 0)    //deals with zero
            {

                $scope.storedayhours = $scope.day;

                if ($scope.storehourslist[x] == $scope.storehourslist[x + 1]) {
                    $scope.startorend = true;
                    $scope.storeweekdays = $scope.storedayhours;
                }
                else {
                    $scope.startorend = false;
                    $scope.storedayhours = $scope.storedayhours + " \n";
                    $scope.storeweekhours = $scope.storehourslist[x] + "\n";
                }
                x = x + 1;
                output(x);
            }
            else {
                if ($scope.storehourslist[x] == $scope.storehourslist[x + 1] && $scope.storehourslist[x] == $scope.storehourslist[x - 1]) {
                    x = x + 1;
                    output(x);
                }
                else {
                    if ($scope.startorend) {
                        $scope.storedayhours = $scope.storedayhours + "-" + $scope.day + " \n";
                        $scope.storeweekhours = $scope.storeweekhours + $scope.storehourslist[x] + "\n";
                        $scope.startorend = false;

                    }
                    else {
                        if ($scope.storehourslist[x] == $scope.storehourslist[x + 1]) {
                            $scope.storedayhours = $scope.storedayhours + $scope.day;
                            $scope.startorend = true;
                        }
                        else {
                            $scope.startorend = false;
                            $scope.storedayhours = $scope.storedayhours + $scope.day + " \n";
                            $scope.storeweekhours = $scope.storeweekhours + $scope.storehourslist[x] + "\n";
                        }

                    }

                    x = x + 1;
                    output(x);
                }
            }
        }
        else {
            if ($scope.startorend) {
                $scope.storedayhours = $scope.storedayhours + "-" + $scope.day + " ";
                $scope.storeweekhours = $scope.storeweekhours + $scope.storehourslist[x];

            }
            else {
                $scope.storedayhours = $scope.storedayhours + $scope.day + " ";
                $scope.storeweekhours = $scope.storeweekhours + $scope.storehourslist[x];

            }


        }
    }

    //alert($rootScope.storeIndex);
//    if($scope.allStoresDetails[$rootScope.storeIndex].storeStock == 0 ||$scope.preferredStore.storeStock==0){
//        $scope.state.buttontype = 'outOfStock';
//        $scope.state.stusAddToCart = true;
//    }
//
//    else if($scope.allStoresDetails[$rootScope.storeIndex].storeStock != 0 ||$scope.preferredStore.storeStock!=0){
//        $scope.state.buttontype = 'inStock';
//    }


    $scope.initCap = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    $scope.formatZip = function (pcode) {
        if (pcode.length > 5)
            return pcode.substr(0, 8) + "-" + pcode.substr(8, 12);
        else
            return pcode;
    };


    $scope.storeButtonCl = function (sel) {


        if (sel == 2) {
            //$scope.bgcolor2 = '#0677af';
            $scope.bgcolor2 = ' -webkit-linear-gradient(top, #0088cc, #0055cc)';
            $scope.bgcolor1 = 'white';
            $scope.textColor_w = '#000000';
            $scope.textColor_b = '#ffffff';

        }
        else if ((sel == 1)) {
            //$scope.bgcolor1 = '#0677af';
            $scope.bgcolor1 = ' -webkit-linear-gradient(top, #0088cc, #0055cc)';
            $scope.bgcolor2 = 'white';
            $scope.textColor_w = '#ffffff';
            $scope.textColor_b = '#000000';
        }


    }


    //fliping button start


    $scope.flip_button = function (check, id, $index, name) {
        //var checkbox = $event.target;
//var action = (checkbox.checked ? 'add' : 'remove');


        if (check == true) {

            for (var i = 0; i < $scope.allStoresDetails.length; i++) {
                if ($scope.allStoresDetails[i].storeName != name) {
                    $scope.allStoresDetails[i].str = false;
                } else {
                    $scope.state.intrestedStore = $scope.allStoresDetails[i];
                    $scope.state.intrestedStore.str = true;
                }


            }
            if ($scope.preferredStore.storeName != name) {
                $scope.preferredStore.str = false;
            } else {
                $scope.state.intrestedStore = $scope.preferredStore;
                $scope.preferredStore.str = true;
            }
            $scope.state.selected1 = false;

            if ($scope.state.intrestedStore.storeStock == 0) {
                $scope.state.buttontype = 'outOfStock';
                $scope.state.stusAddToCart = true;
            }

            else if ($scope.state.intrestedStore.storeStock != 0) {
                $scope.state.buttontype = 'inStock';
            }


        } else if (check == false) {
            $scope.state.intrestedStore = null;
            $scope.preferredStore.str = false;
            for (var i = 0; i < $scope.allStoresDetails.length; i++) {

                $scope.allStoresDetails[i].str = false;

            }
            $scope.state.selected1 = true;
        }
        $scope.$apply();

    };


    //Flipping button end


    //------------------------>

    $scope.gotoStoreDetails = function (name) {


        // alert(name);
        // alert($scope.myArray[index].review1);

        for (var i = 0; i < $scope.allStoresDetails.length; i++) {
            if ($scope.allStoresDetails[i].storeName == name) {
                alert($scope.allStoresDetails[i].storeName);
                $rootScope.myIndex = i;
            }
            else if ($scope.pname == name) {
                alert(name);
                $rootScope.preferredStore = name;
            }

        }


    };


    //Google Map

    $scope.mapOptions = {
        center: new google.maps.LatLng(41.883473, -87.629127, true),
        //center: new google.maps.LatLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.myMarkers = [];
    $scope.maxNumOfMarkers = 0;
    //PreferredStore
    if ($scope.preferredStore.perferedStoreInd == true) {


        $scope.maxNumOfMarkers = $scope.allStoresDetails.length + 1;
        var gc = new google.maps.Geocoder();
        gc.geocode({
                address: $scope.preferredStore.storeAddress + ',' + $scope.preferredStore.storeCity
            },
            function (gr, gs) {
                if (gs == "OK") {
                    var streetNumber = null;
                    for (k = 0; k < gr[0].address_components.length; k++) {
                        if (gr[0].address_components[k].types[0] == "street_number") {
                            streetNumber = gr[0].address_components[k].long_name;
                        }
                    }
                    //alert(JSON.stringify(gr[0].address_components));
                    $scope.preferredStore.isPreferredStore = true;
                    $scope.myMarkers.push(new google.maps.Marker({
                        map: $scope.myMap,
                        position: gr[0].geometry.location,
                        icon: "images/googleMapsIcons/Pin.png",
                        street: streetNumber,
                        store: $scope.preferredStore
                    }));
                    //alert(JSON.stringify(gr[0]));
                } else {
                    console.log("Failed to retrieve LatLng!");
                }
                if ($scope.myMarkers.length == $scope.maxNumOfMarkers) {
                    $scope.$emit("populateMarkerArrayDone1", []);
                }
            });
    } else {
        $scope.maxNumOfMarkers = $scope.allStoresDetails.length;
    }

    //NearByStore
    for (i = 0; i < $scope.allStoresDetails.length; i++) {
        var s = $scope.allStoresDetails[i];
        //alert(JSON.stringify(s));
        var gc = new google.maps.Geocoder();
        gc.geocode({
                address: s.storeAddress + ',' + s.storeCity
            },
            function (gr, gs) {
                if (gs == "OK") {
                    var streetNumber = null;
                    for (k = 0; k < gr[0].address_components.length; k++) {
                        if (gr[0].address_components[k].types[0] == "street_number") {
                            streetNumber = gr[0].address_components[k].long_name;
                        }
                    }
                    //alert(JSON.stringify(gr[0].address_components));
                    var cStoreIndex = 0;
                    for (var i = 0; i < $scope.allStoresDetails.length; i++) {
                        if ($scope.allStoresDetails[i].storeAddress.split(" ")[0] == streetNumber) {
                            cStoreIndex = i;
                            $scope.allStoresDetails[i].isPreferredStore = false;
                            break;
                        }
                    }
                    $scope.myMarkers.push(new google.maps.Marker({
                        map: $scope.myMap,
                        position: gr[0].geometry.location,
                        icon: "images/googleMapsIcons/Pin.png",
                        street: streetNumber,
                        store: $scope.allStoresDetails[cStoreIndex]
                    }));
                    //alert(JSON.stringify(gr[0]));
                } else {
                    console.log("Failed to retrieve LatLng!");
                }
                if ($scope.myMarkers.length == $scope.maxNumOfMarkers) {

                    $scope.$emit("populateMarkerArrayDone1", []);
                }
            });

    }

    $scope.infoWin = null;

    $scope.openMarkerInfo = function (marker, index, evt) {
        //$event.preventDefault();
        //$event.stopPropagation();
        //alert(marker.street);
        //evt.preventDefault();
        //evt.stopPropagation();
        //alert(evt);
        if ($scope.infoWin != null) {
            $scope.infoWin.close();
        }
        $scope.currentStore = marker.store;
        //$compile($("#infoTemp").contents)(scope);
        var isChecked = "";
        var formatedStoreName = $scope.initCap($scope.currentStore.storeName);
        var imageNeedToShow = "";
        var phone = $scope.currentStore.storePhone;
        var formattedPhone = '(' + phone.substr(1, 3) + ')' + phone.substr(4, 3) + '-' + phone.substr(7, 4);
        var storeAddress = $scope.initCap($scope.currentStore.storeAddress);
        var storeCity = $scope.initCap($scope.currentStore.storeCity) + $scope.formatZip($scope.currentStore.storeZip);
        //alert($scope.currentStore.str);
        if ($scope.currentStore.str == true) {
            isChecked = "checked";
        }
        if ($scope.currentStore.isPreferredStore == true) {
            imageNeedToShow = '<img class="prefered_store" src="' + $scope.pStarImage + '">';
        }
        var contentString = '<div style="overflow: hidden;height:100px;width:250px" class="infoContainer">' +
            '        <div class="wrapper_store" style="background-color: #ffffff">' +
            '            <div class="left_store" style="width: 90% !important;">' +
            '                <div style="width: 100%">' +
            '                    <div style="width: 8%;float: left" >' +
            ' <input style="background-color: darkgreen; color: #ffffff"  type="checkbox" class="googleMapCheckBox" name="selected" ng-model="$scope.currentStore.str" ' + isChecked + '/>' +
            '                    </div>' +
            '                    <div style="width: 52%;float: left">' +
            imageNeedToShow +
            '                            <div class="store_name">' + formatedStoreName + '</div>' +
            '                        </div>' +
            '                        <div style="width: 40%; float: right">' +
            '                            <img class="store_availability" src="' + $scope.currentStore.g_image + '"><span class="store_shipment" style="{\'color\':stockColor1}">' + $scope.currentStore.storeshipment + '</span></div>' +
            '            </div> <br>' +
            '                        <div class="store_hr_dis">' +
            ' <p class="store_hours">Today\'s Hours: ' + $scope.currentStore.storeHour + '</p>' +
            '            <p class="store_distance">' + (parseFloat($scope.currentStore.storeDistance)).toFixed(1) + ' miles away</p>' +
            '                        </div>' +
            '                    </div>' +
            '                        <div ng-init="isCollapsed=true;" class="right_store, googleMapArrow" style="float: left; width: 10% !important;height: 100px;border-left:thin solid #D7D0D0; "  click=" isCollapsed = !isCollapsed ;" style="{\'background-color\':p_bgcolor_panel}">' +
            '                            <div >' +
            '            <img ng-show="isCollapsed" class="store_arrow" src="images/Down_Arrow.png" >' +
            '                                      <br>' +
            '                                        </div>' +
            '                                    </div>' +
            '                                </div><hr style="background-color: #ffffff; margin: 0;">' +
            '                                <div collapse="isCollapsed"  style="background-color: #ffffff;width: 100%;padding-left: 5%;padding-right: 5%">' +
            '                                <div class="wrapper_store" >' +
            '                                        <div class="left_store">' +
            '                                        Phone' +
            '                                    </div>' +
            '                                        <div class="right_store" style="padding-left: 10px;font-size: small;">' +
            '                                            <a href="tel:' + phone + '">' + formattedPhone + '</span> </a><hr>' +
            '                                    </div>' +
            '                                    </div>' +
            '                                <div class="wrapper_store">' +
            '         <div class="left_store">' +
            '                                        Address' +
            '                                        </div>' +
            '                                        <div class="right_store" style="padding-left: 10px;font-size: small;">' +
            '                                            <a href="/#/storeDetails" class="GoToStoreInfoWindow">' + storeAddress + '<br> ' + storeCity + '</a><hr>' +
            '                                            </div>' +
            '                                            </div>' +
            '                                      <div class="wrapper_store">' +
            '               <div class="left_store">' +
            '                                           Hours' +
            '                                                </div>' +
            '        <div class="right_store" style="padding-left: 10px;">' +
            '                                                    <div class="wrapper_store" style="max-height:60px">' +
            '                                                          <div class="left_store"style="width: 40%!important;font-size: small;">' +
            '                                                            <pre class="store_hours_in" style="padding: 0px;">' + $scope.currentStore.storeDays + '</pre>' +
            '    </div>' +
            '                                                        <div class="right_store" style="width: 60%!important;font-size: small;">' +
            '                                                            <pre  class="store_hours_in" style="padding: 0px;">' + $scope.currentStore.storeDayHour + '</pre>' +
            '                                                        </div>' +
            '                                                    </div>' +
            '                                                       </div>' +
            '                                            </div>' +
            '                         <!--<button class="cart_store_buttons"> ' + $scope.addOrSelect + ' </button>--><br><hr>' +
            '                                        </div>' +
            '                                        </div>';

        $scope.infoWin = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 300
        });

        $scope.infoWin.open($scope.myMap, marker);

        $scope.$emit("newInfoWindowOpened", []);
    };

    $scope.$on("newInfoWindowOpened", function () {
        google.maps.event.addListenerOnce($scope.infoWin, 'domready', function () {
            $('.googleMapArrow').click(function () {

                $('.infoContainer').parent().css("overflow", "initial").parent().css("overflow", "initial");
                var con = $('.infoContainer');
                if (con.height() > 150) {
                    $(".store_arrow").attr("src", "images/Down_Arrow.png");
                    con.animate({height: '100px'});
                } else {
                    $(".store_arrow").attr("src", "images/Up_Arrow.png");
                    con.animate({height: '340px'});
                }


            });


            $('.googleMapCheckBox').change(function () {
                var check = this.checked;

                $scope.flip_button(check, 0, 0, $scope.currentStore.storeName);

            });

            $('.GoToStoreInfoWindow').click(function () {
                $scope.gotoStoreDetails($scope.currentStore.storeName);
            });

        })
    });

    $scope.$on("populateMarkerArrayDone1", function () {

        if ($scope.state.selected1 == false) {
            if ($scope.preferredStore.str == true) {
                for (var i = 0; i < $scope.myMarkers.length; i++) {
                    if ($scope.myMarkers[i].store.perferedStoreInd == null) continue;
                    $scope.myMap.panTo($scope.myMarkers[i].position);
                    $scope.openMarkerInfo($scope.myMarkers[i], i);
                    break;
                }
            } else {

                for (var i = 0; i < $scope.myMarkers.length; i++) {
                    if ($scope.myMarkers[i].store.str == true) {
                        $scope.myMap.panTo($scope.myMarkers[i].position);
                        $scope.openMarkerInfo($scope.myMarkers[i], i);
                        break;
                    }
                }
            }
        } else {
            var minIndex = 0;
            var distance = 10000000;
            for (var i = 0; i < $scope.myMarkers.length; i++) {
                if ($scope.myMarkers[i].store.storeDistance < distance) {
                    distance = $scope.myMarkers[i].store.storeDistance;
                    minIndex = i;
                }
            }

            $scope.myMap.panTo($scope.myMarkers[minIndex].position);
            $scope.openMarkerInfo($scope.myMarkers[minIndex], minIndex);
        }

    });


    $scope.closeMarkerInfo = function (event) {
        //$scope.myInfoWindow.setMap(null);
        //$scope.myInfoWindow=null;
    }

    $scope.getDistance = function (marker) {
        var dms = new google.maps.DistanceMatrixService();
        dms.getDistanceMatrix({
                destinations: [marker.getPosition()],
                origins: [$scope.myMarkers[0].getPosition()],
                travelMode: google.maps.TravelMode.DRIVING,
                avoidHighways: false,
                avoidTolls: false},
            function (dmr, dms) {
                if (dms == 'OK') {
                    $scope.currentDistance = (dmr.rows[0].elements[0].distance.value / 1609.34).toFixed(1);
                } else {
                    alert(dms);
                }
            }
        );
    }


    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
            if (txt.charAt(1) == '/') {
                return txt.toUpperCase();
            } else {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }

        });
    };

    $scope.toggleImage = function (isC) {
        $scope.pImageSrc = (!isC) ? "images/Down_Arrow.png" : "images/Up_Arrow.png";

    }


}

function VideoNavigationController($scope, $location) {

    $scope.gotoVideoReviews = function () {
        $location.path("/video-reviews")
    }
}
function VideoReviewCtrl($scope, $rootScope, $location) {
    var k_videoScroll;
    $(document).ready(function () {
        $.get('data/exposample.xml', function (xml) {
            var video = $.xml2json(xml);
            $scope.videoList = [];
            $scope.trimTitle = function (text, end) {
                var length = 35;
                if (end === undefined)
                    end = "...";
                if (text.length <= length || text.length - end.length <= length) {
                    return text;
                }
                else {
                    return String(text).substring(0, length - end.length) + end;
                }
            }
            $scope.getCount = function () {
                return $scope.videoList.length;
            };
            videoarray = video.reviews.review_item;
            $scope.videoReviewNumbers = videoarray.length;
            for (i = 0; i < videoarray.length; i++) {
                updatedTitle = $scope.trimTitle(videoarray[i].review_title);
                $scope.videoList.push({image: videoarray[i].video_thumb_URL, url: videoarray[i].video_URL,
                    userName: videoarray[i].username, uploadedDate: videoarray[i].date, title: updatedTitle,
                    titleDesc: videoarray[i].review_title});
            }
            $scope.imageCount = $scope.getCount();
        });
    });
}

function StoreDetailsCtrl($rootScope, $scope) {

    $
        .getJSON(
        'data/a_b.json',
        function (data) {
            $scope
                .$apply(function ($rootScope) {

                    if ($rootScope.preferredStore == data.perferedstore.storeName) {

                        $scope.storeName1 = data.perferedstore.storeName;
                        $scope.storeAddress1 = data.perferedstore.streetAddress;
                        $scope.storePhone1 = data.perferedstore.phone;
                        $scope.storeHour = data.perferedstore.StoreDetails.StoreHours;
                        $scope.storeHoursMon = data.perferedstore.StoreDetails.Monday;
                        $scope.storeHoursTue = data.perferedstore.StoreDetails.Tuesday;
                        $scope.storeHoursWed = data.perferedstore.StoreDetails.Wednesday;
                        $scope.storeHoursThu = data.perferedstore.StoreDetails.Thursday;
                        $scope.storeHoursFri = data.perferedstore.StoreDetails.Friday;
                        $scope.storeHoursSat = data.perferedstore.StoreDetails.Saturday;
                        $scope.storeHoursSun = data.perferedstore.StoreDetails.Sunday;

                    } else {

                        $scope.storeName1 = data.nearByStores[$rootScope.myIndex].storeName;
                        $scope.storeAddress1 = data.nearByStores[$rootScope.myIndex].streetAddress;
                        $scope.storePhone1 = data.nearByStores[$rootScope.myIndex].phone;
                        $scope.storeHour = data.nearByStores[$rootScope.myIndex].StoreDetails.StoreHours;
                        $scope.storeHoursMon = data.nearByStores[$rootScope.myIndex].StoreDetails.Monday;
                        $scope.storeHoursTue = data.nearByStores[$rootScope.myIndex].StoreDetails.Tuesday;
                        $scope.storeHoursWed = data.nearByStores[$rootScope.myIndex].StoreDetails.Wednesday;
                        $scope.storeHoursThu = data.nearByStores[$rootScope.myIndex].StoreDetails.Thursday;
                        $scope.storeHoursFri = data.nearByStores[$rootScope.myIndex].StoreDetails.Friday;
                        $scope.storeHoursSat = data.nearByStores[$rootScope.myIndex].StoreDetails.Saturday;
                        $scope.storeHoursSun = data.nearByStores[$rootScope.myIndex].StoreDetails.Sunday;
                    }

                    //alert($scope.storeHoursFri);
                });
        });

}

function PDP_VariantCtrl($scope, $http, $rootScope) {
    var watchListArray
    var aValsArray
    var imgArrayBig
    var aValsWaistSizes
    var aValsInseamSizes
    var aValsExtented;
    var sizeArr;
    var colorUrlArr;
    var colorUrlArrBig;
    var colorImageUrlMain;
    var wstSizeArr;
    var colorNameArr;
    $rootScope.variant_selected = false;

    $http.get('data/productDetailJeans.json').success(function (data) {
        var productDetails = data;

        $scope.shortDescription = productDetails.productDetail.softhardProductdetails.shortDescription;
        $scope.longDescription = productDetails.productDetail.softhardProductdetails.longDescription;
        $scope.descrName = productDetails.productDetail.softhardProductdetails.descriptionName;
        $scope.modelSelected = productDetails.productDetail.softhardProductdetails.mainImageUrl;
        $scope.price = productDetails.productDetail.softhardProductdetails.salePrice;
        $scope.skulist = productDetails.productDetail.softhardProductdetails.productVariants.prodList[0].prodVarList.prodVar.skuList;

        $scope.prodCount = productDetails.productDetail.softhardProductdetails.productVariants.prodList.length;

        //alert("data read_1");
        ///////    ALl that we need for variance selection/option
        $scope.attCount = productDetails.productDetail.softhardProductdetails.productVariants.prodList[0].noOfAttributes;
        $scope.attDetails = productDetails.productDetail.softhardProductdetails.productVariants.prodList[0].prodVarList.prodVar.attList[0]; // this is an array of all proerty
        $scope.attName = productDetails.productDetail.softhardProductdetails.productVariants.prodList[0].attNames; //this is the array of names.


        //////////////end of  ALl that we need for variance selection/option    //////

        //alert("data read_2");
        $scope.colorName = $scope.attName[0];
//        $scope.waistSelected = "30";
        /// loop through the attribute;

        ////////////////////////create an object to use one ng-repeat ///////////////////////////////////////
//        varOptObj= new Object() ;
//        varOptObj.option="";
//        varOptObj.optArray=[];
//        varOptObj.value="";

        ////////////////////end of object creation /////////////////////

        var x = "";
        selVarOpt = [];
        combinedObjArray = [];
        colorUrlArray = [];
        for (varOpt = 0; varOpt < $scope.attDetails.aVals.length; varOpt++) {
            var cssName = "css";
            var x = new Object();


            x.value = $scope.attDetails.aVals[varOpt].aVal[0];
            x.optArray = $scope.attDetails.aVals[varOpt];
            x.option = $scope.attName[varOpt];
            x.css = cssName.concat($scope.attName[varOpt]);
            x.selected = x.value;//rosen
            combinedObjArray.push(x);
            if (x.option == 'Color') {

                for (colUrl = 0; colUrl < $scope.attDetails.colorSwatchList.length; colUrl++) {
                    var y = new Object();
                    y.colName = $scope.attDetails.colorSwatchList[colUrl].colorName;
                    y.colImgUrl = $scope.attDetails.colorSwatchList[colUrl].colorImageUrl;
                    y.colMainImgUrl = $scope.attDetails.colorSwatchList[colUrl].mainImageColor;
                    colorUrlArray.push(y);

                }
                $scope.colorUrl = colorUrlArray;
            }
        }
        $scope.VarSel = combinedObjArray;


        //   $scope.skulistBig = productDetails.productDetail.softhardProductdetails.productVariants.prodList[1].prodVarList.prodVar.skuList;

//   for pants       watchListArray= productDetails.productDetail.softhardProductdetails.productVariants.prodList[0].prodVarList.prodVar.attList[0].colorSwatchList;      // men's
        watchListArray = productDetails.productDetail.softhardProductdetails.productVariants.prodList[0].prodVarList.prodVar.attList[0].colorSwatchList;
        aValsArray = productDetails.productDetail.softhardProductdetails.productVariants.prodList[0].prodVarList.prodVar.attList[0].aVals;                   //men's
//
//        watchListArrayBig= productDetails.productDetail.softhardProductdetails.productVariants.prodList[1].prodVarList.prodVar.attList[0].colorSwatchList;      //  men's big
//        aValsArrayBig= productDetails.productDetail.softhardProductdetails.productVariants.prodList[1].prodVarList.prodVar.attList[0].aVals;                    //  men's big
        imgArray = ["images/coral_color.jpg"];
        imgArrayBig = [];
        sizeArr = [];
        colorUrlArr = [];
        colorUrlArrBig = [];
        wstSizeArr = [];
        colorNameArr = [];
        aValsExtented = productDetails.productDetail.softhardProductdetails.productVariants.prodList;
//        aValsWaistSizes = aValsArray[1];
//        aValsInseamSizes = aValsArray[2];
        aValsWaistSizes = aValsArray[0];
        colorNameArr = productDetails.productDetail.softhardProductdetails.productVariants.prodList[0].prodVarList.prodVar.attList[0].aVals[1];


//
//        aValsWaistSizesBig= aValsArrayBig[1] ;
//        aValsInseamSizesBig=  aValsArrayBig[2]  ;
//        for(i=0; i < watchListArray.length; i++){
//            var colorImageUrl= watchListArray[i].colorImageUrl;
//            colorImageUrlMain=watchListArray[i]. mainImageColor;
//            colorName= watchListArray[i]. colorName;
//            imgArray.push(colorImageUrl);
//            colorUrlArr.push(colorImageUrlMain) ;
//            colorNameArr.push(colorName);
//        }

        for (i = 0; i < aValsExtented.length; i++) {
            var varName = aValsExtented[i].prodVarList.prodVar.varName;
            sizeArr.push(varName);
        }
//        for(i=0; i < watchListArrayBig.length; i++){
//            var colorImageUrl= watchListArrayBig[i].colorImageUrl;
//            var colorMain=  watchListArrayBig[i].mainImageColor;
//            imgArrayBig.push(colorImageUrl);
//            colorUrlArrBig.push(colorMain) ;
//        }
//        for(i=0;i<aValsWaistSizes.lenght;i++){
//            var wst=aValsWaistSizes.aVal[i];
//            wstSizeArr.push(wst);
//        }
        $scope.colors = imgArray;
        $scope.waistSizes = aValsWaistSizes.aVal;
//        $scope.inseamSizes= aValsInseamSizes.aVal;
        $scope.sizes = sizeArr;
        $scope.selectedOpt = sizeArr[0];

//        $scope.clrNames =colorNameArr;
        $scope.colorName = colorNameArr.aVal[0];
        $scope.selectedsize = aValsWaistSizes.aVal[0];
        $rootScope.catEntryId = $scope.skulist[0].pId;
        $rootScope.itemInStock = $scope.skulist[0].stock;

        $scope.open = function () {
            $scope.shouldBeOpen = true;
            $scope.firstColor();
        };

        $scope.closeDone = function () {
            $scope.closeMsg = 'I was closed at: ' + new Date();
            $scope.shouldBeOpen = false;
            resultBx = $.find(".bx_result");
            bx = $.find(".bx");
            $(bx).removeClass("bx ");
            $(bx).addClass("bxHide ");
            $(resultBx).removeClass("bx_result ");
            $(resultBx).addClass("bx_resultShow ");
            if ($(resultBx).hasClass('bx_resultShow')) {
                //alert($(resultBx).hasClass('bx_resultShow')) ;
                $rootScope.variant_selected = true;

                $rootScope.$broadcast('VariantChangedEvent');

            }

            for (var index = 0; index < $scope.skulist.length; index++) {
                if (($scope.skulist[index].aVals[0] === $scope.selectedsize) && ($scope.skulist[index].aVals[1] = $scope.colorName)) {
                    $rootScope.catEntryId = $scope.skulist[index].pId;
                    $rootScope.itemInStock = $scope.skulist[index].stock;
                }
            }


        };
        $scope.closeCancel = function () {
            $scope.closeMsg = 'I was closed at: ' + new Date();
            $scope.shouldBeOpen = false;
        }


        $scope.items = ['item1', 'item2'];
        $scope.opts = {
            backdropFade: true,
            dialogFade: true
        };

//        $scope.onChange=function(value)   {
//            $scope.counter=value;
//            if(sizeArr[value]=="Men's Big" )  {
//                $scope.counter=value;
//
//
//                $scope.colors= imgArrayBig;
//                $scope.waistSizes= aValsWaistSizesBig.aVal;
//                $scope.inseamSizes= aValsInseamSizesBig.aVal ;
//                $scope.selectedOpt= sizeArr[value];
//
//            }
//            else{
//                $scope.selectedOpt= sizeArr[value];
//                $scope.colors= imgArray;
//                $scope.waistSizes= aValsWaistSizes.aVal;
//                $scope.inseamSizes= aValsInseamSizes.aVal;
//
//            }
//
//
//
//
//        }
//
        $scope.firstColor = function () {
            colorEl = $.find(".cssColor");
            $(colorEl[0]).removeClass("cssColor");
            $(colorEl[0]).addClass("cssColorSelected");
        }
        $scope.colorClick = function (index) {
            var k;
            $scope.modelSelected = colorUrlArray[index].colMainImgUrl;
            $scope.colorName = colorUrlArray[index].colName;
            colorEl = $.find(".cssColor");

//            wsizeEl = $.find(".rectangles_size");
//            $(wsizeEl[0]).addClass("unavailable");

            $(colorEl[index]).removeClass("cssColorSelected");
            $(colorEl[index]).removeClass("cssColor");
            $(colorEl[index]).addClass("cssColorSelected");
            $(colorEl[index]).removeClass("cssColor");
            for (i = 0; i < colorEl.length; i++) {
                if (i != index) {
                    $(colorEl[i]).removeClass("cssColorSelected");
                    $(colorEl[i]).removeClass("cssColor");
                    $(colorEl[i]).addClass("cssColor");
                }
            }
        };
        $scope.variantClick = function (index) {
            alert("gg");
            var k;

            // k=index+1;

            // k=colorUrlArr[index];
            $scope.modelSelected = k;
            $scope.colorName = colorNameArr[index];
            sizeEl = $.find(".cssSize");
            inseamEl = $.find(".cssInseam");
            waistEl = $.find(".cssWaist");
            fitEl = $.find(".cssFit");
            // $(wsizeEl[0]).addClass("unavailable");

//             colorEl = $.find(".colorimage");
//            $(colorEl[index]).removeClass("rectanglesSelected")   ;
//            $(colorEl[index]).removeClass("rectangles")   ;
//            $(colorEl[index]).addClass("rectanglesSelected");
//            $(colorEl[index]).removeClass("rectangles");


            for (i = 0; i < colorEl.length; i++) {
                if (i != index) {
                    $(colorEl[i]).removeClass("rectanglesSelected");
                    $(colorEl[i]).removeClass("rectangles");
                    $(colorEl[i]).addClass("rectangles");
                }
            }
        };
        $scope.cssWaist = function (index) {

            sizeEl = $.find(".cssSize");
            inseamEl = $.find(".cssInseam");
            waistEl = $.find(".cssWaist");
            fitEl = $.find(".cssFit");
            var w;
            w = wstSizeArr[index];
//
//            w=  wstSizeArr[index] ;

            showBtn = $.find(".showAllBtnW");
            waistEl = $.find(".cssWaist");
            alert("are");
            $(waistEl[index]).addClass("cssWaistSelected");
//           $(waistEl[index]).addClass("rectangles_sizeSelected");
            for (i = 0; i < waistEl.length; i++) {
                if (i != index) {

                    $(waistEl[i]).addClass("display_hidden");
                    // $scope.waistSizes= aValsWaistSizes.aVal[index];
                }
                else {
                    $(waistEl[i]).addClass("cssWaistSelected");
                    $(showBtn).addClass("showAllBtnWShow");
//                    $scope.waistSelected= aValsWaistSizes.aVal[index];
//                    $scope.selectedsize= aValsWaistSizes.aVal[index];
                }
            }


        };
        $scope.showAllClickWs = function (index) {
            showBtn = $.find(".showAllBtnWShow");
            $(showBtn).removeClass("showAllBtnWShow");
            $(showBtn).addClass("showAllBtnW");
            waistEl = $.find(".cssWaist");
            $(waistEl).removeClass("display_hidden");
            $(waistEl).removeClass("cssWaistSelected");
            $(waistEl).addClass("cssWaist");
            $scope.waistSelected = wstSizeArr[2];

        }

//        $scope.showAllClickIn=function(){
//            showBtn= $.find(".showAllBtnIShow") ;
//            $(showBtn).removeClass("showAllBtnIShow");
//            $(showBtn).addClass("showAllBtnI") ;
//            waistEl = $.find(".rectangles_sizeIn");
//            $(waistEl).removeClass("display_hidden");
//            $(waistEl).removeClass("rectangles_sizeInSelected");
//            $(waistEl).addClass("rectangles_sizeIn");
//        }

        $scope.inseamClick = function (index) {
//            inseamEl = $.find(".rectangles_sizeIn");
//
//            $(inseamEl[index]).addClass("rectangles_sizeInSelected");
            showBtn = $.find(".showAllBtnI");
            inseamEl = $.find(".rectangles_sizeIn");
            resultBx = $.find(".bx_result");
            bx = $.find(".bx");
            $(inseamEl[index]).addClass("rectangles_sizeInSelected");
//           $(waistEl[index]).addClass("rectangles_sizeSelected");
            for (i = 0; i < inseamEl.length; i++) {
                if (i != index) {

                    $(inseamEl[i]).addClass("display_hidden");

                }
                else {
                    $(inseamEl[i]).addClass("rectangles_sizeInSelected");
                    $(showBtn).addClass("showAllBtnIShow");
                    $scope.inseamSelected = aValsInseamSizes.aVal[index];
                    $(bx).removeClass("bx ");
                    $(bx).addClass("bxHide ");

                }
            }
        }


    });
}

function AddToListCtrl($scope, $location, $rootScope, $http) {
    $scope.isDone = false;
    $scope.$on('api_ready', function () {
        $scope.isDone = true;
        console.log("loaded: ", $scope.isDone);
    });

    $scope.viewLists = function () {
        if ($scope.isDone == true) {
            var encodedKey = encodeURIComponent(localStorage.token);
            var url = "http://cloudfish.herokuapp.com/shclists/allLists/" + encodedKey;
            $http.get(url).success(function (data) {
                if (data.UniversalLists) {
                    $scope.getLists = data.UniversalLists.UniversalList;
                    console.log("AddToListCtrl view all lists", $scope.getLists);
                    $rootScope.getLists = data.UniversalLists.UniversalList;
                }

                //$scope.getLists.push("Create New List");  
                //console.log("AddToListCtrl view all lists 2", $scope.getLists);
            });
        }
    }

    $scope.addList = function (listName) {
        console.log("list isDone", $scope.isDone);
        console.log("list name", listName);
        if ($scope.isDone == true) {

            //console.log("listname PDP Controller", listName)
            var encodedKey = encodeURIComponent(localStorage.token);
            // Add Item to List
            var url = "http://cloudfish.herokuapp.com/shclists/additem/" + listName + "/" + encodedKey + "/" + $rootScope.partNum + "/" + $rootScope.catId;
            console.log("list url", url);
            $http.get(url).success(function (data) {
                if (data.UniversalListResponse) {
                    console.log("add item api returns", data);
                    alert("item added to list");
                }
                else {
                    alert("failed to add");
                }
            });
        }
    }

    $scope.clickMe = function () {
        $scope.checked = true;
    }
}


function ModalController($scope, zoomImage) {
    $scope.openZoomModal = function () {
        $scope.isImage = zoomImage.zoomService.isImage;
        $scope.selectedImage = zoomImage.zoomService.selectedImage;
        $scope.$parent.shouldBeOpen = true;
    };

    $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.$parent.shouldBeOpen = false;
    };

    $scope.opts = {
        backdropFade: true,
        dialogFade: true
    };
}

function AddToCartCtrl($scope, $rootScope) {
    $scope.addToCart = function () {
        var sessionKey = localStorage.token;
        var catEntryId = null;
        var quantity = "1";
        var loginType = null;
        var fulfillmentType = "Ship";
        var zipcode = "60602";

        // Sears
        var catalogId = "12605";
        var store = "Sears";
        var storeId = "10153";

        // Kmart
        //var catalogId = "10104";
        //var store = "Kmart";
        //var storeId = "10151";

        if (localStorage.authMethod == 'direct') {
            loginType = "User";
        } else {
            loginType = "Guest";
        }

        if ($rootScope.catEntryId != null) {
            catEntryId = $rootScope.catEntryId;
        }

        if ($rootScope.arrivalMethods != null && $rootScope.arrivalMethods[0] != null) {
            fulfillmentType = $rootScope.arrivalMethods[0];
        }

        if (sessionKey == null || sessionKey == undefined || sessionKey == "undefined") {
            sessionKey = "";
        }

        if ($rootScope.webStatusInd != true) {
            $('#addToCartMsg').html('Not available for online shopping').css('color', 'red').show();
        }

        if ($rootScope.itemInStock != true) {
            $('#addToCartMsg').html('Item is out of stock').css('color', 'red').show();
        }

        // Valid CatEntryIds
        // 43570972 -  Sony AM/FM RADIO SPK  P/N 05728551000P Available for Shipment
        // 40625779 -  Cuisinart Brew Central 12 Cup Coffee Maker  P/N 00869761000P

        //var json = wlccAddToCart(sessionKey, orderId, orderItemID, catEntryId, quantity, loginType, fulfillmentType, zipcode);
        //alert('DEBUG' + sessionKey+"--" +catEntryId+quantity+loginType+fulfillmentType+zipcode+catalogId+store+storeId);
        var json = wlccAddToCart(sessionKey, catEntryId, quantity, loginType, fulfillmentType, zipcode, catalogId, store, storeId);

        // check for FF.
        /*if (json === null||json === '') {
         // parse the JSON object for FF.
         console.log('json is null--probably Firefox');
         json = $.parseJSON(json);
         // console.log('json: ', json);
         } else {
         // leave the JSON object alone.
         console.log('json is not null--probably NOT Firefox');
         // console.log('json: ', json);
         }*/

        // JSON response needs to be parsed for Firefox browser.
        // var json = $.parseJSON(wlccAddToCart(sessionKey, catEntryId, quantity, loginType, fulfillmentType, zipcode, catalogId, store, storeId));

        console.log('wlccAddToCart() response: ', json);

        if ((json.CartResponse.StatusData.ResponseCode != 'undefined') && (json.CartResponse.StatusData.ResponseCode == '0')) {
            $('#addToCartMsg').html('Item was successfully added to cart').css('color', 'green').show();
            localStorage.token = json.CartResponse.StatusData.ClientSessionKey;
            var nativeMethod = invokeNativeMethod('ADD_TO_CART_ACTION');
        } else {
            $('#addToCartMsg').html('Error occured while adding item to cart: ' + json.CartResponse.StatusData.RespMessage + '. catEntryId=' + catEntryId).css('color', 'red').show();
        }
    };
}

function PDP_VariantCtrlHard($scope, $http) {
}

function PDP_VariantCtrlHard01($scope, $http) {
    var watchListArray
    var aValsArray
    var imgArrayBig
    var aValsWaistSizes
    var aValsInseamSizes
    var aValsExtented;
    var sizeArr;
    var colorUrlArr;
    var colorUrlArrBig;
    var colorImageUrlMain;
    var wstSizeArr;
    var colorNameArr;
    $http.get('data/productDetails_variantFridge.json').success(function (data) {
        //try {
        var productDetails = data;

        //$scope.shortDescription = productDetails.productDetail.softhardProductdetails.shortDescription;
        $scope.longDescription = productDetails.productDetail.softhardProductdetails.longDescription;
        $scope.descrName = productDetails.productDetail.softhardProductdetails.descriptionName;
        $scope.modelSelected = productDetails.productDetail.softhardProductdetails.mainImageUrl;
        $scope.price = productDetails.productDetail.softhardProductdetails.salePrice;
        //  men's big
        imgArray = ["http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_668845001", "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_560643901"];
        imgArrayBig = [];
        sizeArr = [];
        colorUrlArr = [];
        colorUrlArrBig = [];
        wstSizeArr = [];
        colorNameArr = ["Black", "Metallic"];
        aValsExtented = productDetails.productDetail.softhardProductdetails.productVariants.prodList;


        colorUrlArr = ["http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_202765401", "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_202765501 "];

        $scope.colors = imgArray;

        $scope.colorName = colorNameArr[0];

        $scope.open = function () {
            $scope.shouldBeOpen = true;
            $scope.firstColor();
        };

        $scope.closeDone = function () {
            $scope.closeMsg = 'I was closed at: ' + new Date();
            $scope.shouldBeOpen = false;
            resultBx = $.find(".bx_result");
            bx = $.find(".bx");
            $(bx).removeClass("bx ");
            $(bx).addClass("bxHide ");
            $(resultBx).removeClass("bx_result ");
            $(resultBx).addClass("bx_resultShow ");
        };

        $scope.closeCancel = function () {
            $scope.closeMsg = 'I was closed at: ' + new Date();
            $scope.shouldBeOpen = false;
        }
        $scope.items = ['item1', 'item2'];

        $scope.opts = {
            backdropFade: true,
            dialogFade: true
        };

        $scope.firstColor = function () {

            colorEl = $.find(".colorimage");
            $(colorEl[0]).removeClass("rectangles");
            $(colorEl[0]).addClass("rectanglesSelected");
        }
        $scope.rectClick = function (index) {

            var k;

            // k=index+1;

            k = colorUrlArr[index];
            $scope.modelSelected = k;
            $scope.colorName = colorNameArr[index];


//            wsizeEl = $.find(".rectangles_size");
//            $(wsizeEl[0]).addClass("unavailable");
            colorEl = $.find(".colorimage");
            $(colorEl[index]).removeClass("rectanglesSelected");
            $(colorEl[index]).removeClass("rectangles");
            $(colorEl[index]).addClass("rectanglesSelected");
            $(colorEl[index]).removeClass("rectangles");
            for (i = 0; i < colorEl.length; i++) {
                if (i != index) {
                    $(colorEl[i]).removeClass("rectanglesSelected");
                    $(colorEl[i]).removeClass("rectangles");
                    $(colorEl[i]).addClass("rectangles");
                }
            }
        };


    });
    //} //end try block
    //catch(e) {};
}

function GotoCollectionsCtrl($scope, $location, isGuest) {
    $scope.gotocollections = function () {
        $location.path("/outfits&collections");
    }
    $scope.gotopdppage = function () {
        $location.path("/details/guest/" + isGuest.isGuestService.productID);
    };
}

function CollectionsCtrl($scope, Collections, $location) {
    //$scope.getcollections=Collections.query();

    Collections.get(function (data) {
        $scope.collections = data.productDetail.collectionProductDetails[0].mainImageURL;

        $scope.zoomImages = data.productDetail.collectionProductDetails[0].mainImageURL;
        $scope.desName = data.productDetail.collectionProductDetails[0].descriptionName;


    });

}
function OutfitsCtrl($scope, Collections, socialShare, $location) {
    Collections.get(function (data) {
        var priceArr = [];
        var quantBx;
        var outfitsArr = [];
        var outfitObjArray = [];
        var outImgUrl, outDescr, outSalePrice, outRegPrice, num, numChkbx;
        var ImgUrl, descr, salePrice, regPrice, imgArray;

        $scope.totalPrice = 0;
        $scope.outfitsArr = data.productDetail.collectionProductDetails[0].collectionProducts;
        $scope.isCollapsed = false;
        for (i = 0; i < $scope.outfitsArr.length; i++) {
            $scope.quantBx = 1;

            $scope.imgUrl = $scope.outfitsArr[i].imgUrl;
            $scope.descr = $scope.outfitsArr[i].productDescriptionName;
            $scope.salePrice = $scope.outfitsArr[i].salePrice;
            $scope.regPrice = $scope.outfitsArr[i].regularPrice;
//          alert($scope.salePrice) ;

            outfitObjArray.push({ isChecked: false, outImgUrl: $scope.imgUrl, outDescr: $scope.descr, outSalePrice: $scope.salePrice, outRegPrice: $scope.regPrice });
            // console.log(outfitObjArray.length)
//           alert (outfitObjArray[i].outSalePrice) ;
            $scope.collectionArr = outfitObjArray;
        }
//        temp hardcoded fix for variants   start
        imgArray = ["http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_619565601", "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_501201501", "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_501179501"];
        $scope.colors = imgArray;
        $scope.ckBx = true;
        $scope.chBxSelected = function (index) {

            var price;
            price = $scope.collectionArr[index].outSalePrice;
            var flag = $scope.collectionArr[index].isChecked;
            if (!flag) {


                $scope.totalPrice = $scope.totalPrice + parseFloat(price);

                alert($scope.totalPrice);
            } else {
                $scope.totalPrice = $scope.totalPrice - parseFloat(price);
            }
            $scope.collectionArr[index].isChecked = !flag;
        }
        checked = false;

        function checkedAll(frm1) {
            var aa = document.getElementById('frm1');
            if (checked == false) {
                checked = true
            }
            else {
                checked = false
            }
            for (var i = 0; i < aa.elements.length; i++) {
                aa.elements[i].checked = checked;
            }
        }
    });


}
function OutfitsandCollectionsCtrl($scope, Collections, socialShare, $location) {
    $scope.max = 0;
    $scope.max1 = 0;
    Collections.get(function (data) {
        $scope.collections = data.productDetail.collectionProductDetails[0].mainImageURL;
        $scope.desName = data.productDetail.collectionProductDetails[0].descriptionName;
        $scope.shortdesc = data.productDetail.collectionProductDetails[0].shortDescription;
        $scope.longdesc = data.productDetail.collectionProductDetails[0].longDescription;
        $scope.arrivalmethod = data.productDetail.collectionProductDetails[0].arrivalMethods[0];

        $scope.arrival = "normal";
        if ($scope.arrivalmethod == 'Ship') {
            $scope.arrival = "shipping";
        }

        socialShare.shareService.nameofProd = data.productDetail.collectionProductDetails[0].descriptionName;
        $scope.shareopen = "views/share.html";
        socialShare.shareService.winLoc = window.location.toString();

        $scope.min = data.productDetail.collectionProductDetails[0].collectionProducts[0].regularPrice;
        $scope.min1 = data.productDetail.collectionProductDetails[0].collectionProducts[0].salePrice;

        for (var i = 0; i < (data.productDetail.collectionProductDetails[0].collectionProducts).length; i++) {

            $scope.value = data.productDetail.collectionProductDetails[0].collectionProducts[i].regularPrice;
            $scope.value1 = data.productDetail.collectionProductDetails[0].collectionProducts[i].salePrice;

            if ($scope.value < $scope.min)
                $scope.min = $scope.value;
            if ($scope.value > $scope.max)
                $scope.max = $scope.value;

            if ($scope.value1 < $scope.min1)
                $scope.min1 = $scope.value1;
            if ($scope.value1 > $scope.max1)
                $scope.max1 = $scope.value1;


        }

        console.log($scope.min + "minregularprice");
        console.log($scope.max + "maxregularprice");
        console.log($scope.min1 + "minsaleprice");
        console.log($scope.max1 + "minsaleprice");

        $scope.price = "normalprice";
        if ($scope.value1 < $scope.value) {
            $scope.price = "saleprice";

        } else {
            $scope.price = "regularprice";

        }


    });
    $scope.open = function () {
        $scope.$parent.shouldBeOpen = true;
    };

    $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.$parent.shouldBeOpen = false;
    };

    $scope.opts = {
        backdropFade: true,
        dialogFade: true
    };
}


