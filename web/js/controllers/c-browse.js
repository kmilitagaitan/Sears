/* Controllers - Browse */
/* Vertical model is populated using restclient api services from services.js */

function BrowseCtrl($scope, Vertical, Category, SubCategory, $rootScope) {
    console.log("START BrowseCtrl");
	$('#searchHistory').hide();
        $('#searchAutocomplete').hide();
        $('#searchProducts').hide();

    /* Calling vertical api by using query() method of Vertical module in services.js , to populate veticals */
    $scope.verticalApiCall = function () {
        $scope.navVertReturn();
        Vertical.query(function (data) {
            $scope.verts = data.globalNavigation.verticals;
            console.log("vertical==" + $scope.verts);
        });
    };

    /* Calling category api by using query() method of Category module in services.js , to populate category */
    $scope.categoryApiCall = function (vertName) {
        $scope.navCatReturn();
        // Category.query({store:'Sears',searchType:'vertical',authID:'mrktplcC91F7F1DE2CE3F675A65C172B944C37301202010',catalogId:'12605',appID:'MOB_MWEB_SEARS',contentType:'json',verticalName:vertName},function(data){
        Category.query(function (data) {
            // $scope.cats = data.mercadoresult.navgroups.navgroup[1][0].shopbycategories.shopbycategory[1];
            $scope.cats = data.globalNavigation.verticals[0].vertical.categories;
            $rootScope.verticalName = vertName;
            document.getElementById("inputSearchBox").style.display = 'none';
            $rootScope.imageUrl = [];

            for (var i = 0; i <= $scope.cats.length; i++) {
                console.log("this is imageee-", $scope.cats[i].category.imgURL)
                $rootScope.imageUrl.push({
                    key: $scope.cats[i].category.displayName,
                    value: $scope.cats[i].category.imgURL
                });
            }    
            console.log("vertname==" + vertName)
        });
    };

    /* Calling subCategory api by using query() method of SubCategory module in services.js , to populate subCategory */
    $scope.subCategoryApiCall = function (CatName) {
        $scope.navSubCatReturn();
        // SubCategory.query({store:'Sears',searchType:'category',authID:'mrktplcC91F7F1DE2CE3F675A65C172B944C37301202010',catalogId:'12605',appID:'MOB_MWEB_SEARS',contentType:'json',verticalName:$scope.verticalName ,categoryName:CatName},function(data){
        // $scope.subcats = data.mercadoresult.navgroups.navgroup[1][0].shopbycategories.shopbycategory[1];
        SubCategory.query(function (data) {
            // console.log("i am in subcat" + data);
            $scope.subcats = data.globalNavigation.verticals[0].vertical.categories[0].category.subCategories;
            $rootScope.categoryName = CatName;
            if($scope.subcats == null) {
                $location.path('/browseProducts/'+verticalName+'/'+CatName);
            }

            $rootScope.imageUrl = [];
            console.log("length" + $scope.subcats.length);
            for (var i = 0; i <= $scope.subcats.length; i++) {
                // console.log("this is imageee-",$scope.subcats[i].subcategory);
                $rootScope.imageUrl.push({
                    key: $scope.subcats[i].subCategory.displayName,
                    value: $scope.subcats[i].subCategory.imgURL[0].url
                });
            }
            console.log("Data" + data);
        // console.log("SubCats==" + $scope.subcats);
        });

      
    };
}

function BrowseProductCtrl($scope, BrowseProduct,$routeParams,$rootScope) {
       console.log("START BrowseProductCtrl");
       document.getElementById("inputSearchBox").style.display = 'block'; 
        $rootScope.fromWhichFlow = "BrowseFlow"; 
        $scope.browseProductData = BrowseProduct.query(function(data){
        $rootScope.subCategoryName = $routeParams.subCatName;
        $rootScope.categoryName = $routeParams.catName;
        $rootScope.verticalName = $routeParams.vName;
        console.log('SubCategoryCtrl: ',data);
            //$scope.items = data.mercadoresult.products.product[1];
        $rootScope.items = data.subCatKeyword.items;
            console.log('browse product------: ',$rootScope.items);
            
        $rootScope.mrktPlaceCheckBox=true;
        $rootScope.ShowMktPlace='Show MarketPlace';
         $rootScope.productcount = 'Search ' + data.subCatKeyword.metadata.count + ' results';
      });          
//};
       
}

function ScanCtrl($scope, $rootScope, $routeParams , UPCSearch){

    var deviceFlag=getDeviceType();
    if(deviceFlag){
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        $scope.scanbar=true;
    }else{
        console.log('#################################');
        $scope.scanbar=false;
    }
    function getDeviceType(){
        console.log("User Agent : " + navigator.userAgent);
             
        var flag = ( navigator.userAgent.match(/(iPhone|android|Android)/g) ? true : false );
        if( flag ){
            return flag;
        }else{
            return flag;
        }
    }
    UPCSearch.query({
         keyword: $routeParams.keyword
        },function(data){
            $rootScope.items=data.subCatKeyword.items;
            $rootScope.productcount = 'Search ' + data.subCatKeyword.metadata.count + ' results';
            $rootScope.mrktPlaceCheckBox=true;
        });
}

/* start:Calling search api by using query() method of searchServices module in s-browse.js , to populate Items*/

function SearchCtrl($scope, $location, Search, HistoryCache, $http, $rootScope) {  
    console.log("START SearchCtrl");
     document.getElementById("cross-icon").style.display = 'none';
     document.getElementById("scan-cancel").style.display = 'none';
     $scope.crossClicked=function(){
        console.log("in cross");
        document.getElementById("keyword").value = '';
        document.getElementById("cross-icon").style.display = 'none';
        document.getElementById("searchAutocomplete").style.display='none';
        document.getElementById("searchProducts").style.display='block';
}

    $scope.heightwidth = '?hei=100&wid=80';
    // $rootScope.mrktPlaceCheckBox=false;
    $scope.addToMarketP = function (data) {
        $scope.marketPlaceFlag = data;
        $scope.addTodo();
    };

    function supports_html5_storage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    $scope.autoArray = [];
    var historyArray;
    var localCacheData;
    if (supports_html5_storage() === true) {

        localCacheData = JSON.parse(localStorage.getItem('localCache'));

        if (localCacheData == null || localCacheData == '' || localCacheData.length == 0) {
            historyArray = [];
        } else {
            historyArray = localCacheData;
        }

    } else {
        historyArray = [];

        localCacheData = null;
    }



    $scope.putInCache = function (value) {

        if (value == null) {
            return;
        };
        if (historyArray.length == 0) {
            historyArray.push(value);
        } else {
            var i = 0;
            for (i; i < historyArray.length; i++) {

                if (historyArray[i] == value) {
                    console.log('same element');
                    break;
                } else {
                    console.log('diff element');
                };
            }
            if (i == historyArray.length)
                historyArray.push(value);
        };
        HistoryCache.put('myCache', historyArray);
        if (supports_html5_storage() === true) {
            localStorage.setItem('localCache', JSON.stringify(historyArray));
        }
        $scope.cachedData = "";
        $scope.autoArray = [];
        document.getElementById("noHistory").style.display = 'none';
        document.getElementById("clearHistory").style.display = 'none';
    };

    $scope.cancelHistory = function () {
        document.getElementById("noHistory").style.display = 'none';
        document.getElementById("clearHistory").style.display = 'none';
       
        document.getElementById("searchHistory").style.display = 'none';
    };

    $scope.getHistory = function () {
        $('#searchProducts').hide();
        document.getElementById("scan").style.display = 'none';
        $scope.autoArray = [];
        $scope.cachedData = HistoryCache.get('myCache');
        document.getElementById("cross-icon").style.display = 'none';
        if (supports_html5_storage() == true) {
            localCacheData = JSON.parse(localStorage.getItem('localCache'));
        } else {
            localCacheData = null;
        }

        console.log('search history cachedData:', $scope.cachedData)

        noHistory = document.getElementById("noHistory");
        clearHistory = document.getElementById("clearHistory");
       

        if ($scope.cachedData == null || $scope.cachedData.length == 0) {
            $scope.cachedData = localCacheData;
        }

        if ($scope.cachedData == null) {
            noHistory.style.display = 'block';
            clearHistory.style.display = 'none';
            
            console.log('search history cachedData: null');
        } else if ($scope.cachedData.length == 0) {
            noHistory.style.display = 'block';
            clearHistory.style.display = 'none';
            
            console.log('search history cachedData: empty');
        } else {
            noHistory.style.display = 'none';
            clearHistory.style.display = 'block';
           
            console.log('search history cachedData: present');
        }
    };

    $scope.clearHistory = function () {
        historyArray = [];
        HistoryCache.put('myCache', '');
        $scope.cachedData = HistoryCache.get('myCache');
        var empty = [];
        if (supports_html5_storage() == true) {
            localStorage.setItem('localCache', JSON.stringify(empty));
        }
        localCacheData = null;

        document.getElementById("clearHistory").style.display = 'none';
       
       
    };

    $scope.cleardata = function () {
        $scope.cachedData = '';
        document.getElementById("clearHistory").style.display = 'none';
        document.getElementById("noHistory").style.display = 'none';
       
    }

    $scope.getAutocomplete = function (searchTerm) {
        $('#searchProducts').hide();
	 document.getElementById("cross-icon").style.display = 'block';
         document.getElementById("scan").style.display = 'none';


        $scope.autoArray = [];
        var searchString = searchTerm.toString();
        var length = searchTerm.toString().length;

        var tempString;
        if (length > 3)
            var count = 3;
        else
            var count = length
        for (var i = 0; i < count; i++) {
            if (tempString == undefined) {
                tempString = '';
                console.log('tempString in undefined=' + tempString);
            }
            tempString = tempString + searchString.substring(0, i + 1) + '/';
        }
        console.log('tempString:' + tempString)
        var urlPartString = tempString.substring(0, tempString.toString().length - 1);
        var endpoint = '/' + searchString;

        var retArray, dataToPost, urlPart = "";

        dataToPost = {
            featureClass: "P",
            style: "full",
            maxRows: 12,
            callback: 'JSON_CALLBACK'
        };
        config = {
            method: 'JSONP',

            url: 'http://af.ch3.sears.com/AutoFill/msears/' + urlPartString + endpoint + '.txt',
            params: dataToPost
        };
        $http.jsonp(config.url, config).
        success(function (data, status, headers, config) {
            console.log('data' + data);
            retArray = data.map(function (item) {
                console.log('item' + item.k);
                $scope.autoArray.push(item.k);
                return {
                    label: (item.k ? "" + item.k : "")
                }

            });
        }).
        error(function (data, status, headers, config) {
            // response([]);
            });
    };


    $scope.searchApiCall = function (name) {

        $scope.keyword = name;
        $scope.addTodo(name);
        document.getElementById("noHistory").style.display = 'none';
        document.getElementById("clearHistory").style.display = 'none';
     
    };


      
    $scope.addTodo = function (autokey) {    
        var key;
        if (autokey == undefined) {      
            key = $scope.keyword;
        } else {      
            key = autokey;
        }    
        /* Set key in rootScope to Get it in another Ctrl*/    
        $rootScope.searchedKeyword = key;
        $rootScope.fromWhichFlow = "SearchFlow"; 
        
        console.log('keyword is ' + key);
        $scope.putInCache(key);
        if ((key.toUpperCase() == 'gift card'.toUpperCase()) || (key.toUpperCase() == 'Gift cards'.toUpperCase()) || (key.toUpperCase() == 'Giftcards'.toUpperCase()))       {
            $location.path('giftCard/emailCard');
        } else if ((key.toUpperCase() == 'Gift Card Balance'.toUpperCase()) || (key.toUpperCase() == 'Card Balance'.toUpperCase()) || (key.toUpperCase() == 'Check Gift Card Balance'.toUpperCase()) || (key.toUpperCase() == 'Gift Card Balance inquiry'.toUpperCase()) || (key.toUpperCase() == 'Gift Card Amount'.toUpperCase())) {
            $location.path('giftCard/checkBalance');
        } else {
            $scope.resp = Search.query({        
                keyword: key      
            }, function (data) { 
                console.log('Resp' + $scope.resp);
                
                if (data.subCatKeyword.actualcorrectedword == 'gift card')         {            
                    $location.path('giftCard/emailCard');
                } else {            
                    if (data.subCatKeyword.actualcorrectedword == undefined) {
                        $rootScope.items = data.subCatKeyword.items;
                        $rootScope.productcount = 'Search ' + data.subCatKeyword.metadata.count + ' results';
                    } else {            
                        var key = data.subCatKeyword.actualcorrectedword;
                        $scope.resp = Search.query({
                            keyword: key
                        }, function (data) {
                            $rootScope.items = data.subCatKeyword.items;
                            $rootScope.productcount = 'Search ' + data.subCatKeyword.metadata.count + ' results';
                        });
                    }
                    $rootScope.mrktPlaceCheckBox = true;
                    $rootScope.ShowMktPlace = 'Show MarketPlace';
                    $location.path('search_results');
                    $('#searchProducts').show();
		            document.getElementById("cross-icon").style.display = 'none';
                    document.getElementById("scan").style.display = 'block';
                    document.getElementById("scan-cancel").style.display = 'none';
                }      
            });
        }  
    }

    $scope.cancelClicked=function(){
    console.log('scan clicked===');
        document.getElementById("noHistory").style.display = 'none';
        document.getElementById("searchHistory").style.display = 'none';
        document.getElementById("clearHistory").style.display = 'none';
        document.getElementById("searchHistory").style.display = 'none';
        document.getElementById("searchAutocomplete").style.display='none';
        document.getElementById("scan").style.display = 'block';
        document.getElementById("scan-cancel").style.display = 'none';
        $scope.keyword='';
        document.getElementById("cross-icon").style.display = 'none';
    }
}

function ImageSearchCtrl($scope, $location, Search, $routeParams) {  
    console.log("START ImageSearchCtrl");
    document.getElementById("inputSearchBox").style.display = 'block';
    $scope.resp = Search.query({
        keyword: $routeParams.imageName
    }, function (data) {        
        console.log("data===" + data);
        // $scope.items=data.mercadoresult.products.product[1];
        $scope.items = data.subCatKeyword.items;
        console.log("items===" + $scope.items);
    // $scope.productcount = 'Search ' + data.mercadoresult.productcount + ' results';
      
    });
}
