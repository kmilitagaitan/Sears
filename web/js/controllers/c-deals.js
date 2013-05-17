/*

function dodCtrl($scope, $rootScope, getDealsOfTheDayService, $dialog, redirectService) {

    $rootScope.dodScope = $scope;

    $scope.$watch("allProducts", function(newValue, oldValue) {
      var data = {products:[]};
      if (newValue) {
        data.products = newValue;
        $scope.allProducts = data.products;
      } else {
        data.products = oldValue;
      }
    },true);

    $scope.opts = {
      dialogFade: true,
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      templateUrl:  "views/even-more-dod.html",
      controller: MoreDealsController,
      resolve: MoreDealsController.resolve
    };


    $scope.openDialog = function(){
        var d = $dialog.dialog($scope.opts);
        d.open().then(function(result){
          if(result)
          {
            alert('dialog closed with result: ' + result);
          }
        });
      };




      //redirection done from Bo
    $scope.redirection = function(product){
        redirectService.redirectService.gotoPages(product.Link) ;
    }


    $scope.top4_dod_feed= getDealsOfTheDayService.query(function(data){
        $scope.start_time= data.start_time;
        $scope.end_time=data.end_time;
        $scope.top4DoDproducts= data.products;
    });

    $scope.featured_dod_feed= getDealsOfTheDayService.get({folder:'deals', store:'sears',file:'more_deals_of_the_day'}, function(data){
        $scope.allProducts = data.products;
        $rootScope.allProducts = data.products;
        if (data.products) {
          $scope.topFeaturedDeal= $scope.allProducts[0];
          var deals_lessOne = $scope.allProducts;
          deals_lessOne.shift();
          $scope.FeaturedDealsLessOne= deals_lessOne;
        };

        */
/*
        $scope.topFeaturedDeal= data.products[0];
        var deals_lessOne= data.products;
        deals_lessOne.shift();
        $scope.FeaturedDealsLessOne= deals_lessOne;
        *//*

    });

    console.log("SELECTED CATEGORIES", $rootScope.productCategories);

  $scope.getBackGroundImg = function(product) {
      var image= null;
      if(product == null){
          //console.error(" ERROR ERROR The product parameter is undefined! ");
          return;
      } else{
          image = product.MainImageUrl;
          return { 'background-image': "url('" + image + "')", 'background-size': "100% 100%", 'background-repeat': "no-repeat"};
      }

  };




}
*/


/******************** TIMER CONTROLLER  *******************  */


function dod_countdownCtrl($scope, dealsSharedService){
    $scope.hours= '00';
    $scope.minutes= '00';
    $scope.seconds='00';

    var end_time= dealsSharedService.getEndTime();

    if((typeof(end_time) === 'string') && (end_time != "")){
        end_time= end_time + " " + "GMT-0600";
    }else{
        end_time= "23:59:59 GMT-0600";
    }

    countdown(end_time);  // call timer


     function countdown(time){
     var end = time;

     var now = new Date(),
     dst = (now.getTimezoneOffset() == new Date(now.getFullYear(), 6).getTimezoneOffset()) * 3600;

     if (!Date.parse(end))
     end = new Date(+now + (now.getTimezoneOffset() * 60 + dst + end.match(/[^T]+$/) * 36) * 1000).toDateString() + " " + end;
     var remaining = Math.max((new Date(end) - now) / 1000 - dst, 0);
     /*var leading= '';*/
     var h= Math.floor(remaining % 86400 / 3600);
     var m= Math.floor(remaining % 3600 / 60);
     var s=  Math.floor(remaining % 60);

      leadingHours=(h < 10)? "0" : "";
      leadingMinutes= (m < 10)? "0" :"";
      leadingSeconds= (s < 10)?  "0" : "";

   /*  leading = /:/.test($countdown.text()) ? "0" : "";*/

     $scope.hours= (leadingHours + Math.floor(remaining % 86400 / 3600)).slice(-2);
     $scope.minutes= (leadingMinutes + Math.floor(remaining % 3600 / 60)).slice(-2);
     $scope.seconds= (leadingSeconds + Math.floor(remaining % 60)).slice(-2);

     if (remaining)
     setTimeout(function() {
     $scope.$apply(countdown(end));
     }, 1000);

     }

}


/******************** BEGIN PROMO PAGE CONTROLLER  *******************  */


function promoPageCtrl($scope, $location, $dialog, getDealsOfTheDayService, dealsSharedService, redirectService){
   $scope.isVisibleFlag= false;
   var relativePath= $location.path();
   var category= getCategory(relativePath);


   switch(category){
       case "electronics":
           $scope.promoPageTitle = "Electronics Deals";
           getDealsOfTheDayService.get({folder:'promo-pages', store:'sears',file:'electronics'}, function(data){
              $scope.products=data.products;
              initSharedService($scope.products);
           });
           break;

       case "hot-deals":
           $scope.promoPageTitle = "Hot Deals";
           getDealsOfTheDayService.get({folder:'promo-pages', store:'sears',file:'hot-deals'}, function(data){
               $scope.products=data.products;
               initSharedService($scope.products);
           });
           break;

       case "appliances":
           $scope.promoPageTitle = "Appliance Deals";
           getDealsOfTheDayService.get({folder:'promo-pages', store:'sears',file:'appliance'}, function(data){
               $scope.products=data.products;
               initSharedService($scope.products);
           });
           break;

       case "craftsman":
           $scope.promoPageTitle = "Craftsman Club";
           getDealsOfTheDayService.get({folder:'promo-pages', store:'sears',file:'craftsman-deals'}, function(data){
               $scope.products=data.products;
               initSharedService($scope.products);
           });
           break;

       case "real-for-home":
           $scope.promoPageTitle = "Real For the Home";
           getDealsOfTheDayService.get({folder:'promo-pages', store:'sears',file:'real-for-home'}, function(data){
               $scope.products=data.products;
               initSharedService($scope.products);
           });
           break;

       case "k-electronics":
           $scope.promoPageTitle = "Electronics Deals";
           getDealsOfTheDayService.get({folder:'promo-pages', store:'kmart',file:'electronics'}, function(data){
               $scope.products=data.products;
               initSharedService($scope.products);
           });
           break;

       case "k-hot-deals":
           $scope.promoPageTitle = "Hot Deals";
           getDealsOfTheDayService.get({folder:'promo-pages', store:'kmart',file:'hot-deals'}, function(data){
               $scope.products=data.products;
               initSharedService($scope.products);
           });
           break;

       case "k-real-for-home":
           $scope.promoPageTitle = "Real For the Home";
           getDealsOfTheDayService.get({folder:'promo-pages', store:'kmart',file:'real-for-home'}, function(data){
               $scope.products=data.products;
               initSharedService($scope.products);
           });
           break;

       default:
              $location.path('/404') ;
              break;
   }


    //redirection done from Bo
    $scope.redirection = function(product){
        if(product.link){
          redirectService.redirectService.gotoPages(product.link) ;
        } else{
          redirectService.redirectService.gotoPages(product.Link) ;
        }

    }

    /*set-up products in the SharedService object*/
    function initSharedService(products){
        dealsSharedService.setProducts(products);
        dealsSharedService.setUnfilteredProducts(products);
    }



    //set up listener
    $scope.$on('dialog-to-page', function(){
        console.log('received message from dialog service !!!');
        $scope.products= dealsSharedService.getProducts();
    });



    //shows hide footer bar
    $scope.showSortBar= function(){
        $scope.isVisibleFlag= ! $scope.isVisibleFlag;
    }


    /*function to compare the sale price*/
 $scope.sale_price= function(deal){
     var salePriceStr= deal.SalePrice;

         if(isNaN(salePriceStr) && salePriceStr.indexOf('$') == 0){
             var parseIt= salePriceStr.split('$');
             var price= parseIt[1];
                 if(!isNaN(price)){
                     return parseFloat(price);
                 }
         }
     return salePriceStr;
 }

//returns the category
    function getCategory(path){
           if(path && path.indexOf("/") !== -1){
              return path.split('/').pop();
           }
        return undefined;
    }

/******** code for filter the dialog *********/

$scope.opts = {
    dialogFade: true,
    backdrop: true,
    keyboard: true,
    backdropClick: true,
    templateUrl:  "views/deals/promo-filter-dialog.html",
    controller: promos_dialog_Ctrl,
    resolve: promos_dialog_Ctrl.resolve
};

    $scope.openDialog = function(){
       var filterDialog = $dialog.dialog($scope.opts);
        filterDialog.open().then(function(result){
            if(result)
            {
                console.log('dialog closed with result: ' + result);
            }
        });

    };



}

/******************** BEGIN PROMO DIALOG CONTROLLER  *******************  */

function promos_dialog_Ctrl($scope, $filter, dialog, dealsSharedService, deepCopy, MinMaxService){

    var getProducts= dealsSharedService.getUnfilteredProducts(); // get always the original set

    var MinMax= MinMaxService(getProducts);
    /*var unModifiedMinMax= $.extend({}, MinMax);*/
    var originMin= MinMax.min;
    var originMax= MinMax.max;
    $scope.minMax= MinMax;
    $scope.productsInDialog= deepCopy(getProducts);
    $scope.productsCount= $scope.productsInDialog.length;
    $scope.isFilterExersized= false;


    var groupByFilter= $filter('groupedBy'); // injects my filter

    $scope.categories= groupByFilter($scope.productsInDialog, 'Category'); //filter by categories
    $scope.brands= groupByFilter($scope.productsInDialog, 'BrandName');   // filter by brands

    $scope.$watch('minMax' , function(){
        if(originMax !== MinMax.max || originMin !==MinMax.min){
            $scope.isFilterExersized= true;
        }

    });

    $scope.closeSaveDialog= function(){
        if(dialog){
            dialog.close();
            var products= $scope.productsInDialog;

            if(originMax !== MinMax.max || originMin !== MinMax.min){
                $scope.isFilterExersized= true;
            }

            if($scope.isFilterExersized) {           // if true re-index the array
                var productsReIndexed= [];

                //reindex the array
                for(var i=0; i < products.length; i++){
                    var next= products[i];
                    var asNumber = function(aString) {
                        return parseFloat(aString.replace(/\$/g, ''));
                    }
                    var min= $scope.minMax.min;
                    var max= $scope.minMax.max;
                    if(next != undefined && (asNumber(next.RegularPrice) <= max) && (asNumber(next.RegularPrice) >= min)){
                        productsReIndexed.push(next);
                    }else{
                        continue;
                    }
                }
                products= productsReIndexed;
            }else{


            }
            //broadcast update message
            dealsSharedService.prepForBroadcast(products, 'dialog-to-page');
        }

    }


    $scope.closeCancelDialog= function(){
        if(dialog){
            dialog.close();
        }
    }

    $scope.toggle= function(group){
        /*var count= $scope.productsCount;*/      /*disable for now*/
        var products= $scope.productsInDialog;
        var isChecked= !group.checked;


        if(!isChecked){
            for(var i= 0; i < group.products.length; i++ ){
                var product= group.products[i];
                var index= product.indexPointer;
                //products.index
                if(products[index]){
                    delete products[index];
                    /* count= count - 1;*/    /*disable for now*/
                }

            }

        }else{
            for(var i= 0; i < group.products.length; i++ ){
                var product= group.products[i];
                var insertIndex= product.indexPointer;
                if(products[insertIndex] == undefined){
                    products[insertIndex]= product;
                    /*count+= 1;*/    /*disable for now*/
                }

            }
        }

        //do update
        /* $scope.productsCount= count;*/    /*disable for now*/
        $scope.productsInDialog= products;
        group.checked= isChecked;
        $scope.isFilterExersized= true;
    }

    $scope.clearAll= function(){
        var categories= $scope.categories;
        var brands= $scope.brands;

        for(var index in categories){
            var group= categories[index];
            group.checked=false;
        }

        for(var index in brands){
            var group= brands[index];
            group.checked= false;
        }

        /* $scope.productsCount= 0;*/
        $scope.productsInDialog= [];
        /* $scope.minMax= MinMaxService($scope.productsInDialog);*/

    }


}

/*promo_dialog_Ctrl.$inject= ['$scope', '$rootScope', dialog','dealsSharedService'];*/


/******************** BEGIN GENERIC DEALS-OF-DAY CONTROLLER  *******************  */

function generic_DoD_Ctrl($scope,$resource, $http, getDealsOfTheDayService, getDealsOfTheDayServiceSAL, $dialog, dealsSharedService, $location,redirectService, deepCopy){
    var isSearsFlag= false;
    var isKmartFlag= false;
    var relativePath= $location.path();
    var searsKey='deals-of-the-day';
    var kmartKey='k-dod';



    (function(){
        initFlags(relativePath, searsKey, kmartKey);
    }).call(this);

    function initFlags(pathStr, searsKey, kmartKey){
       if(pathStr.indexOf(searsKey) !== -1){
            isSearsFlag= true;
            isKmartFlag= false;
           console.log(" generic_DoD_Ctrl  -> Flag for  Sears is set!");
       }else if(pathStr.indexOf(kmartKey) !== -1){
           isSearsFlag= false;
           isKmartFlag= true;
           console.log(" generic_DoD_Ctrl  -> Flag for  Kmart is set!");
       }else{

            console.log(" generic_DoD_Ctrl  -> Flags for either Sears or Kmart cannot be set!");

       }
    }

    if(isSearsFlag){
        try{
            /*old Json ARS like format*/
            /*getDealsOfTheDayService.query(function(data){
             dealsSharedService.setStartTime(data.start_time);
             dealsSharedService.setEndTime(data.end_time);
             $scope.searsTop4DoDproducts= data.products;
             });

             getDealsOfTheDayService.get({folder:'deals', store:'sears',file:'more_deals_of_the_day'}, function(data){
             $scope.products= data.products;
             if ($scope.products) {
             initSharedService($scope.products);
             $scope.TopFeaturedDeal= $scope.products[0];
             var deals_less_One = $scope.products;
             deals_less_One.shift();
             $scope.FeaturedDealsLessOne= deals_less_One;
             };

             });*/
             /******************************************************************************************************/
            /* SAL like JSON file */

            /*getDealsOfTheDayService.get({folder:'deals', store:'sears',file:'s-feed-SAL'}, function(data){
                dealsSharedService.setStartTime(data.start_time);
                dealsSharedService.setEndTime(data.end_time);
                $scope.searsTop4DoDproducts= (data.dealCategoriesSears.shift()).products;
                $scope.products= flattenArray(data.dealCategoriesSears);
                if ($scope.products) {
                    initSharedService($scope.products);
                    $scope.TopFeaturedDeal= $scope.products.shift();
                    $scope.FeaturedDealsLessOne= $scope.products;
                };
            });
         */

            /******************************************************************************************************/
            /*Live SAL feed*/

                //$http.defaults.headers.common['Authorization'] = 'SEARSIPHONE';
                var defer= getDealsOfTheDayServiceSAL.get({storeid:'sears', clientId:'SHOPSEARSLITE'}, function(data, getResponseHeaders){
                    if(data){
                        dealsSharedService.setStartTime(data.start_time);
                        dealsSharedService.setEndTime(data.end_time);
                        if(data.dealCategoriesSears){
                            $scope.searsTop4DoDproducts= (data.dealCategoriesSears.shift()).products;
                            $scope.products= flattenArray(data.dealCategoriesSears);
                        }

                        if ($scope.products) {
                            initSharedService($scope.products);
                            $scope.TopFeaturedDeal= $scope.products.shift();
                            $scope.FeaturedDealsLessOne= $scope.products;
                        };
                        var h= getResponseHeaders(); // get response headers if needed
                    }

                }, function(err){
                    console.error('-------- Error fetching Sears data from SAL ! --------' + err);
                });

        }catch(err){
          console.error("[generic_DoD_Ctrl] - > Error in loading data from Sears feed !");
        }

    }

    if(isKmartFlag){
        try{
            /*old Json ARS like format*/
            /*getDealsOfTheDayService.get({folder:'deals', store:'kmart',file:'kmart-top3'}, function(data){
                dealsSharedService.setStartTime(data.start_time);
                dealsSharedService.setEndTime(data.end_time);
                $scope.kmartTop3Products= data.products;
            });

            getDealsOfTheDayService.get({folder:'deals', store:'kmart',file:'kmart-even-more-dod'}, function(data){
                $scope.products= data.products;
                if($scope.products){
                    initSharedService($scope.products);
                    $scope.TopFeaturedDeal= $scope.products[0];
                    var deals_less_One= deepCopy($scope.products);
                    deals_less_One.shift();
                    $scope.FeaturedDealsLessOne= deals_less_One;
                }

            });*/
            /******************************************************************************************************/
            /* SAL-like JSON file */

           /* getDealsOfTheDayService.get({folder: 'deals', store: 'kmart', file: 'k-feed-all'}, function (data) {
                dealsSharedService.setStartTime(data.start_time);
                dealsSharedService.setEndTime(data.end_time);
                $scope.kmartTop3Products = (data.dealCategories.shift()).products;
                $scope.products = flattenArray(data.dealCategories);
                if ($scope.products) {
                    initSharedService($scope.products);
                    $scope.TopFeaturedDeal = $scope.products.shift();
                    $scope.FeaturedDealsLessOne = $scope.products;
                }
            });*/

            /******************************************************************************************************/

            /*Live SAL feed*/

           // $http.defaults.headers.common['Authorization'] = 'SEARSIPHONE';
            var defer= getDealsOfTheDayServiceSAL.get({storeid:'kmart', clientId:'SHOPSEARSLITE'}, function(data, getResponseHeaders){
                 if(data){
                     dealsSharedService.setStartTime(data.start_time);
                     dealsSharedService.setEndTime(data.end_time);
                     if(data.dealCategoriesKmart){
                         $scope.kmartTop3Products = (data.dealCategoriesKmart.shift()).products;
                         $scope.products= flattenArray(data.dealCategoriesKmart);
                     }

                     if ($scope.products) {
                         initSharedService($scope.products);
                         $scope.TopFeaturedDeal= $scope.products.shift();
                         $scope.FeaturedDealsLessOne= $scope.products;
                     };
                     var h= getResponseHeaders(); // get response headers if needed
                 }
            }, function(err){
                console.error('-------- Error fetching Kmart data from SAL ! --------' + err);
            });

        }catch(err){
            console.error("[generic_DoD_Ctrl] - > Error in loading data from Kmart feed !");
        }

    }


    function flattenArray(arr){
        var result=[];
        if(Object.prototype.toString.call( arr ) === '[object Array]' ){
            for(var i=0; i< arr.length; i++) {
                var category;
                var products;
                var obj= arr[i];
                if(obj.hasOwnProperty('categoryName') && obj.hasOwnProperty('products')){
                    category= obj.categoryName;
                    products= obj.products;
                }
                   for(var j=0; j< products.length; j++){
                       var product= products[j];
                       product.Category= category;
                       result.push(product);
                   }

            }
        }else{
         console.error("Objects is not an Array, cannot be flatten!")
         return undefined;
        }
        return  result;
    }

    //redirection done from Bo
    $scope.redirection = function(product){
        redirectService.redirectService.gotoPages(product.link) ;
    }


    $scope.getBackGroundImg = function(product) {
        var image= null;
        if(product == null){
            //console.error(" ERROR ERROR The product parameter is undefined! ");
            return;
        } else{
            image = product.mainImageUrl;
            return { 'background-image': "url('" + image + "')", 'background-size': "100% 100%", 'background-repeat': "no-repeat"};
        }

    };

    /*set-up products in the SharedService object*/
    function initSharedService(products){
        dealsSharedService.setProducts(products);
        dealsSharedService.setUnfilteredProducts(products);
    }



    //set up listener
    $scope.$on('dialog-to-page', function(){
        console.log('received message from dialog service !!!');
        var products=  dealsSharedService.getProducts();
        $scope.products= products;
        $scope.TopFeaturedDeal=  $scope.products.shift();
        $scope.FeaturedDealsLessOne = $scope.products;
    });



    /******** code for filter the dialog *********/

    $scope.opts = {
        dialogFade: true,
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl:  "views/deals/dod-filter-dialog.html",
        controller: dod_dialog_Ctrl,
        resolve: dod_dialog_Ctrl.resolve
    };

    $scope.openDoDFilter = function(){
        var filterDialog = $dialog.dialog($scope.opts);
        filterDialog.open().then(function(result){
            if(result)
            {
                console.log('dialog closed with result: ' + result);
            }
        });

    };


}


/******************** BEGIN DoD DIALOG CONTROLLER  *******************  */

function dod_dialog_Ctrl($scope, $filter, dialog, dealsSharedService, deepCopy, MinMaxService){
    var getProducts= dealsSharedService.getUnfilteredProducts(); // get always the original set

    var MinMax= MinMaxService(getProducts);
    /*var unModifiedMinMax= $.extend({}, MinMax);*/
    var originMin= MinMax.min;
    var originMax= MinMax.max;
    $scope.minMax= MinMax;
    $scope.productsInDialog= deepCopy(getProducts);
    $scope.productsCount= $scope.productsInDialog.length;
    $scope.isFilterExersized= false;


    var groupByFilter= $filter('groupedBy'); // injects my filter

    $scope.categories= groupByFilter($scope.productsInDialog, 'Category'); //filter by categories

    /*$scope.brands= groupByFilter($scope.productsInDialog, 'BrandName');   // filter by brands*/

    $scope.$watch('minMax' , function(){

        if(originMax !== MinMax.max || originMin !== MinMax.min){
            $scope.isFilterExersized= true;
        }

    });

    $scope.closeSaveDialog= function(){
        if(dialog){
            dialog.close();
            var products= $scope.productsInDialog;

            if(originMax !== MinMax.max || originMin !== MinMax.min){
                $scope.isFilterExersized= true;
            }

            if($scope.isFilterExersized) {           // if true re-index the array
                var productsReIndexed= [];

                //reindex the array
                for(var i=0; i < products.length; i++){
                    var next= products[i];
                    var asNumber = function(aString) {
                        return parseFloat(aString.replace(/\$/g, ''));
                    }
                    var min= $scope.minMax.min;
                    var max= $scope.minMax.max;
                    if(next != undefined && (asNumber(next.regularPrice) <= max) && (asNumber(next.regularPrice) >= min)){
                        productsReIndexed.push(next);
                    }else{
                        continue;
                    }
                }
                products= productsReIndexed;
            }else{


            }
            //broadcast update message
            dealsSharedService.prepForBroadcast(products, 'dialog-to-page');
        }

    }


    $scope.closeCancelDialog= function(){
        if(dialog){
            dialog.close();
        }
    }

    $scope.toggle= function(group){
        /*var count= $scope.productsCount;*/      /*disable for now*/
        var products= $scope.productsInDialog;
        var isChecked= !group.checked;


        if(!isChecked){
            for(var i= 0; i < group.products.length; i++ ){
                var product= group.products[i];
                var index= product.indexPointer;
                products.index
                if(products[index]){
                    delete products[index];
                    /* count= count - 1;*/    /*disable for now*/
                }

            }

        }else{
            for(var i= 0; i < group.products.length; i++ ){
                var product= group.products[i];
                var insertIndex= product.indexPointer;
                if(products[insertIndex] == undefined){
                    products[insertIndex]= product;
                    /*count+= 1;*/    /*disable for now*/
                }

            }
        }

        //do update
        /* $scope.productsCount= count;*/    /*disable for now*/
        $scope.productsInDialog= products;
        group.checked= isChecked;
        $scope.isFilterExersized= true;
    }

    $scope.clearAll= function(){
        var categories= $scope.categories;
        var brands= $scope.brands;

        for(var index in categories){
            var group= categories[index];
            group.checked=false;
        }

        for(var index in brands){
            var group= brands[index];
            group.checked= false;
        }

        /* $scope.productsCount= 0;*/
        $scope.productsInDialog= [];
       /* $scope.minMax= MinMaxService($scope.productsInDialog);*/

    }

}
