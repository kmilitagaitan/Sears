/*Filter*/

function FilterCtrl($scope, FilterProduct,$rootScope){
    
    //var fromFlow = $rootScope.fromWhichFlow; 
    var fromFlow = "SearchFlow";
    console.log("*******You are comming from **********"+ fromFlow);
    
    if(fromFlow == "SearchFlow"){
        //          var searchKeyword = $rootScope.searchedKeyword;
        var searchKeyword = "baby";
        console.log("*****Your searched keyword is*****"+ searchKeyword);
        filterSearchAPI($scope , searchKeyword);
            
    }
    else if(fromFlow == "BrowseFlow"){
        $scope.filterBrowseAPI();
    }
    
    $scope.selectDis = function(){
        $scope.disList = [];
        $("input:checkbox[name=discount]:checked").each(function() {
            if(!$scope.contains($scope.disList , $(this).val())){   
                $scope.disList.push($(this).val());
            }
        });
        console.log("*******Selected Categories*********  :" + $scope.disList );
        FilterProduct.query({
            searchType:'keyword',
            storeId:'10153',
            q:searchKeyword,
            sortBy:'ORIGINAL_SORT_ORDER',
            startIndex:'16',
            endIndex:'30',
            filter:'storeOrigin|Sears',
            catPredictionInd:'true',
            bratRedirectInd:'false',
            includeCategoriesInd:'true',
            includeFiltersInd:'true'
        },function(data){
                //FilterProduct.query(function(data){
            console.log('Number of items ::'+data.subCatKeyword.items.length);
            $scope.displayArray = [];
            $scope.minval='';
            $scope.maxval='';
  
            for(var i=0;i<data.subCatKeyword.items.length-1;i++){
                $scope.displayArray.push(data.subCatKeyword.items[i].addVals.displayPrice);
                $scope.minval = Math.min.apply(null, $scope.displayArray);
                $scope.maxval= Math.max.apply(null, $scope.displayArray);
            }
            console.log('display::'+$scope.displayArray);
            console.log('display min val::'+$scope.minval);
            console.log('display max val::'+$scope.maxval);
                
            $scope.brandsFilter = data.subCatKeyword.metadata.filters[0].values;
            //$scope.categoryFilter = data.subCatKeyword.metadata.productHierarchy.category;
            $scope.filterProductcount = 'Found ' + data.subCatKeyword.metadata.count + ' products';
       
          });
        
    };
    
    $scope.selectBrand = function(){
        $scope.brandList = [];
        $("input:checkbox[name=brand]:checked").each(function() {
            if(!$scope.contains($scope.brandList , $(this).val())){   
                $scope.brandList.push($(this).val());
            }
        });
        console.log("*******Selected Brands*********  :" + $scope.brandList );
    };
    
    
    $scope.contains = function(searchString, searchTerm) {
        return searchString.indexOf(searchTerm) != -1;
    };
  
  
     function filterSearchAPI ($scope, searchKey){
      
        FilterProduct.query({
            searchType:'keyword',
            storeId:'10153',
            q:searchKey,
            sortBy:'ORIGINAL_SORT_ORDER',
            startIndex:'16',
            endIndex:'30',
            filter:'storeOrigin|Sears',
            catPredictionInd:'true',
            bratRedirectInd:'false',
            includeCategoriesInd:'true',
            includeFiltersInd:'true'
        },function(data){
                //FilterProduct.query(function(data){
            displayArray = [];
            minval='';
            maxval='';
            rangeValue = '';
            $scope.priceList = [];
            $scope.shipList = [];
            for(var i=0;i<data.subCatKeyword.items.length-1;i++){
                displayArray.push(data.subCatKeyword.items[i].addVals.displayPrice);
                minval = Math.min.apply(null, displayArray);
                maxval= Math.max.apply(null, displayArray);
            }
            console.log('display min val::'+minval);
            console.log('display max val::'+maxval);
                
            priceRange = maxval - minval;
            rangeValue = Math.ceil(priceRange/5 );
            console.log("value of range=="+ rangeValue);
                
            for (var i=0; i< 5; i++){
                var minPrice =Math.round(minval + i* rangeValue) ;
                var maxPrice = Math.round(minPrice + rangeValue);
                $scope.priceList.push(minPrice +"-"+maxPrice);
            }
            console.log("Price range value==="+ $scope.priceList);
            // console.log('display::'+$scope.displayArray);
                
                
                
            console.log('Number of Filter ::'+data.subCatKeyword.metadata.filters.length);
            var filterName ; 
            $scope.filterList = [];
            for(var i=0;i<data.subCatKeyword.metadata.filters.length-1;i++){
                filterName = data.subCatKeyword.metadata.filters[i].name;
                console.log("filter names ******"+ filterName);
                if(filterName == 'Brand' || filterName == 'brand'){
                    $scope.BrandList = data.subCatKeyword.metadata.filters[i].values;
                    console.log("In Brand and list of value is =="+ $scope.BrandList);
                }
                if(filterName == 'discount' || filterName == 'Discount'){
                    $scope.discount = data.subCatKeyword.metadata.filters[i].values;
                    console.log("In discount and list of value is =="+ $scope.discount);
                }
                if(filterName == 'offer' || filterName == 'Offer'){
                    $scope.offer = data.subCatKeyword.metadata.filters[i].values;
                    console.log("In offer and list of value is =="+ $scope.offer);
                }
                if(filterName == 'shipping' || filterName == 'Shipping'){
                    $scope.shipping = data.subCatKeyword.metadata.filters[i].values;
                    $scope.shipList.push("Shipping");
                    console.log("In shipping and list of value is =="+ $scope.shipping);
                }
                if(filterName == 'delivery' || filterName == 'Delivery'){
                    $scope.delivery = data.subCatKeyword.metadata.filters[i].values;
                    $scope.shipList.push("Delivery");
                    console.log("In delivery and list of value is =="+ $scope.delivery);
                }
                if(filterName == 'spuEligible' || filterName == 'SpuEligible'){
                    $scope.spuEligible = data.subCatKeyword.metadata.filters[i].values;
                    $scope.shipList.push("Pickup");
                    console.log("In spuEligible and list of value is =="+ $scope.spuEligible);
                }
                $scope.filterList.push(filterName);
                    
                    
            }
            console.log("filter name==="+ $scope.filterList);
            $scope.filterProductcount = 'Found ' + data.subCatKeyword.metadata.count + ' products';   
            // Brand,delivery,discount,offer,sears_international,shipping,spuEligible     
            //$scope.categoryFilter = data.subCatKeyword.metadata.productHierarchy.category;
            
            $scope.discountFilter = data.subCatKeyword.metadata.filters[0].values;
            $scope.brandsFilter = data.subCatKeyword.metadata.filters[0].values;
            $scope.brandsFilter = data.subCatKeyword.metadata.filters[0].values;
            $scope.brandsFilter = data.subCatKeyword.metadata.filters[0].values;
       
          });
      
    };
  
    $scope.filterBrowseAPI = function (){
        var vertical = $rootScope.verticalName;
        var category = $rootScope.categoryName;
        var subCategory = $rootScope.subCategoryName;
        console.log("*****Your selections are*****vertical = "+ vertical + ", category = " + category + ", subCategory = "+subCategory);
        FilterProduct.query(function(data){
                
            console.log('Number of items ::'+data.subCatKeyword.items.length);
            $scope.displayArray = [];
            $scope.minval='';
            $scope.maxval='';
  
            for(var i=0;i<data.subCatKeyword.items.length-1;i++){
                $scope.displayArray.push(data.subCatKeyword.items[i].addVals.displayPrice);
                $scope.minval = Math.min.apply(null, $scope.displayArray);
                $scope.maxval= Math.max.apply(null, $scope.displayArray);
            }
            console.log('display::'+$scope.displayArray);
            console.log('display min val::'+$scope.minval);
            console.log('display max val::'+$scope.maxval);
                
            $scope.brandsFilter = data.subCatKeyword.metadata.filters[0].values;
            $scope.categoryFilter = data.subCatKeyword.metadata.productHierarchy.category;
            $scope.filterProductcount = 'Found ' + data.subCatKeyword.metadata.count + ' products';
          });
      
    };
  
  
  
  
  
  
  
  
    var $divDis = $('.div-Dis');
    var $divBrand = $('.div-Brand');
    var $divPrice = $('.div-Price');
    var $divShip = $('.div-Ship');
    var $filterDis = $('.filter-Dis');
    var $filterBrand = $('.filter-Brand');
    var $filterPrice = $('.filter-Price');
    var $filterShip = $('.filter-Ship');
   
    $scope.showDis = function() {
        console.log('Go to Discount item...');
        $divDis.show();
        $filterDis.hide();
    };
  
    $scope.showBrand = function() {
        console.log('Go to Brand item...');
        $divBrand.show();
        $filterBrand.hide();
    };
  
    $scope.showPrice = function() {
        console.log('Go to Price item...');
        $divPrice.show();
        $filterPrice.hide();
    };
    $scope.showShip = function() {
        console.log('Go to Price item...');
        $divShip.show();
        $filterShip.hide();
    };
  
    $scope.hideDis = function() {
        console.log('hide to Discount item...');
        $divDis.hide();
        $filterDis.show();
    };
  
    $scope.hideBrand = function() {
        console.log('hide to Brand item...');
        $divBrand.hide();
        $filterBrand.show();
    };
  
    $scope.hidePrice = function() {
        console.log('hide to Price item...');
        $divPrice.hide();
        $filterPrice.show();
    };
    $scope.hideShip = function() {
        console.log('hide to Price item...');
        $divShip.hide();
        $filterShip.show();
    };
    
//   $scope.changeCat = function(){
//       if (this.cat.name) {
//           if(!$scope.contains($scope.catList , this.cat.name)){
//               $scope.catList.push(this.cat.name);
//           }
//           else{
//               $scope.catList.splice(this.cat.name,1);
//           }
//       }
//       console.log("*******selected categories*********  :" + $scope.catList );
//   };
};