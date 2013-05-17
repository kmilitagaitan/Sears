  /* Service Module Definitions - Browse */
angular.module('verticalServices', ['ngResource']).
  factory('Vertical', function($resource, AppConfig){
	//return $resource(AppConfig.getApiUrl('BROWSE_VERTICAL'), {}, {
        //Hard coded url for demo,seems a small issue in AppConfig  
        return $resource('https://cloudfish.herokuapp.com/browseVertical', {}, {
      query: {method:'GET'}
    });
});

angular.module('categoryServices', ['ngResource']).
  factory('Category', function($resource, AppConfig){
	//return $resource(AppConfig.getApiUrl('BROWSE_CATEGORY'), {}, {
        //Hard coded url for demo,seems a small issue in AppConfig
         return $resource('https://cloudfish.herokuapp.com/browseCategory', {}, {   
      query: {method:'GET'}
    });
});

angular.module('subCategoryServices', ['ngResource']).
  factory('SubCategory', function($resource, AppConfig){
	//return $resource(AppConfig.getApiUrl('BROWSE_SUBCATEGORY'), {}, {
        //Hard coded url for demo,seems a small issue in AppConfig
        return $resource('https://cloudfish.herokuapp.com/browseSubcategory', {}, {    
      query: {method:'GET'}
    });
});

  angular.module('browseProductServices', ['ngResource']).
  factory('BrowseProduct', function($resource, AppConfig){
    //return $resource(AppConfig.getApiUrl('BROWSE_SEARCH'), {}, {
    //Hard coded url for demo,seems a small issue in AppConfig
      return $resource('https://cloudfish.herokuapp.com/browseSearch', {}, {
      query: {method:'GET'}
    });
});

angular.module('historyServices', ['ngResource']).
factory('HistoryCache', function($cacheFactory) {
    return $cacheFactory('HistoryCache');
});

  angular.module('searchServices', ['ngResource']).
    factory('Search', function($resource, AppConfig){
      return $resource('https://cloudfish.herokuapp.com/browseSearch', {}, {
            query: {
                method:'GET',
                isArray:false
                // params:{
                //     store:'Sears',
                //     catalogId:'12605',
                //     searchType:'keyword',
                //     contentType:'json',
                //     startIndex:'1',
                //     endIndex:'20',
                //     appID:'MOB_ANR_SEARS_2GO',
                //     authID:'mrktplcC91F7F1DE2CE3F675A65C172B944C37301202010',
                //     apikey:'6f7ed6719eebda48d9c04aa43996af8b'
                // }
            }
        });
    });


angular.module('filterServices', ['ngResource']).
  factory('FilterProduct', function($resource, AppConfig){
    //return $resource(AppConfig.getApiUrl('BROWSE_SEARCH'), {}, {
    //Hard coded url for demo,seems a small issue in AppConfig
      return $resource('http://localhost\\:8084/MobileSalGateway/mobileapi/v1/products/search', {}, {
      query: {method:'GET'}
    });
});

angular.module('searchUPCServices', ['ngResource']).
    factory('UPCSearch', function($resource, AppConfig){
            return $resource('https://cloudfish.herokuapp.com/scanSearch', {}, {
            query: {
                method:'GET',
                isArray:false
            }
        });
    });
