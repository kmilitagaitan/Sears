var logininfo ={
        isSignedIn: false,
        memberzipCode:"",
        acounttype: 'G',
        membersavedaddress: {}
};

var cartConfig = {cartPartial: "views/cart.html",fiveEight: false};


angular.module('swordfish', ['ui','ui.bootstrap','ui.bootstrap.strangeButtons', 'configServices', 'cmsServices', 'verticalServices','categoryServices','subCategoryServices', 'imageGallery.services', 'imageGallery.directives','reviewsServices','pdpRecommendationsService','bannerService','link-action.directives','sessionServices','scroll.directives','storeDetailServices','scrollPosition.directives','PDPDetailServices','deals','navItemsServices','giftCardServices', 'browseProductServices', 'searchServices','phoneFilter','slider.directives','localAdsServices','shareServices','zoomServices','historyServices','loadingOnAJAX','availableStoresServices','local_ad_categoryServices','globalErrors','localAdsWeeklyServices','collectionsService','filterServices','searchUPCServices','profileServices','go-back.directives','siteworx-head-js.directives','siteworx-body-js.directives','marketPlace.services', 'orderCenterServices', 'infinite-scroll']).

config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider.   
        when('/', {templateUrl: 'views/home.html', controller: HomePageCtrl, resolve: HomePageCtrl.resolve}).
        when('/404', {templateUrl: 'views/404.html', controller: HomePageCtrl, resolve: HomePageCtrl.resolve}).

        // Automotive section
        when('/automotive/select_vehicle', {templateUrl: 'views/automotive/tires-by-vehicle.html', controller: 'AutomotiveTiresFitmentCtrl'}).
        when('/automotive/placeholder/:keyword', {templateUrl: 'views/automotive/placeholder.html', controller: 'AutomotivePlaceholderCtrl'}).
        when('/automotive/search_results', {templateUrl: 'views/automotive/search-results.html', controller: 'AutomotiveSearchResutsCtrl'}).
        when('/automotive/product_details/:productName', {templateUrl: 'views/automotive/product-details.html', controller: 'AutomotiveProductCtrl'}).
        when('/automotive/select_vehicle_menu', {templateUrl: 'views/automotive/select-vehicle.html', controller: 'AutomotiveSelectVehicleCtrl'}).
        when('/automotive/services', {templateUrl: 'views/automotive/services.html', controller: 'AutomotiveServicesCtrl'}).

        // Catch
        otherwise({redirectTo: '/404'});
}]).directive('banner', function() {
    return {
        link: function($scope, element, attrs, ctrl) {}
    }
});

angular.forEach('hmTap:tap hmDoubletap:doubletap hmHold:hold hmTransformstart:transformstart hmTransform:transform hmTransforend:transformend hmDragstart:dragstart hmDrag:drag hmDragend:dragend hmSwipe:swipe hmRelease:release'.split(' '), function(name) {
    var directive = name.split(':');
    var directiveName = directive[0];
    var eventName = directive[1];
    angular.module('swordfish').directive(directiveName, ['$parse', function($parse) {
        return function(scope, element, attr) {
            var fn = $parse(attr[directiveName]);
            var opts = $parse(attr[directiveName + 'Opts'])(scope, {});
            element.hammer(opts).bind(eventName, function(event) {
                scope.$apply(function() {
                    scope.moveLeft();
                    console.log("Doing stuff", event);
                    fn(scope, {$event: event});
                });
            });
        };
    }]);
});

angular.module("account",['accountServices']).config();

angular.module("profile",['ui.bootstrap', 'ui.bootstrap.accordion', 'configServices', 'profileServices', 'loadingOnAJAX']).config(
    ['$routeProvider', 
    function($routeProvider) {
        $routeProvider.
        when('/profile', {templateUrl: 'views/profile/index.html'}).

        /* Catch */
        otherwise({redirectTo: '/404'});
        }
    ]
);


angular.module('deals',['dealsServices', 'deals_promos_directives','deals_promos_filters']).config(
    ['$routeProvider', 
        function($routeProvider) {
            $routeProvider.
            when('/deals', {templateUrl: 'views/deals/index.html'}).
            when('/promos/deals-of-the-day', {templateUrl: 'views/deals/s-dod.html', controller:generic_DoD_Ctrl}).
            when('/promos/top7pages/:category', {templateUrl: 'views/deals/promos.html', controller:promoPageCtrl}).
            when('/k-dod', {templateUrl: 'views/deals/k-dod.html', controller:generic_DoD_Ctrl}).
            otherwise({redirectTo: '/404'});
        }
    ]
);

angular.element(document).ready(
    function() {
        angular.bootstrap(document.getElementById("swordfish"), ["swordfish", "wlcc"]);
        angular.bootstrap(document.getElementById("profile"), ["profile"]);
        angular.bootstrap(document.getElementById("deals"), ["deals"]);
        profileScope = angular.element('#profile').scope();
        swordfishScope = angular.element('#swordfish').scope();
        console.log('profile scope: '+profileScope);
    }
);

/*  testing stuff  
angular.module("firstApp", []).controller("app1control", function() {...});
angular.module("secondApp", []).controller("app2control", function() {...});

angular.bootstrap(document.getElementById("app1"), ["firstApp"]);
angular.bootstrap(document.getElementById("app2"), ["secondApp"]);

*/
angular.module('ui.bootstrap.strangeButtons', [])

.constant('buttonConfig', {
          activeClass:'active',
          toggleEvent:'click'
          })

.directive('strangeBtnRadio', ['buttonConfig', function (buttonConfig) {
                               var activeClass = buttonConfig.activeClass || 'active';
                               var toggleEvent = buttonConfig.toggleEvent || 'click';
                               
                               return {
                               
                               require:'ngModel',
                               link:function (scope, element, attrs, ngModelCtrl) {
                               
                               var value = scope.$eval(attrs.strangeBtnRadio);
                               console.log("*****************************Construct Strange Button.");
                               //model -> UI
                               scope.$watch(function () {
                                            return ngModelCtrl.$modelValue;
                                            }, function (modelValue) {
                                            if (angular.equals(modelValue, value.t)||angular.equals(modelValue, value.f)){
                                            element.addClass(activeClass);
                                            } else {
                                            element.removeClass(activeClass);
                                            value.state=value.t;
                                            value.view=value.tView;
                                            }
                                            });
                               
                               //ui->model
                               element.bind(toggleEvent, function (event) {
                                            event.stopPropagation();
                                            if (!element.hasClass(activeClass)) {

                                            scope.$apply(function () {
                                                         //alert(JSON.stringify(ngModelCtrl));
                                                         
                                                         ngModelCtrl.$setViewValue(value.state);
                                                         
                                                         
                                                         });
                                            }else{
                                            scope.$apply(function () {
                                                         //alert(JSON.stringify(ngModelCtrl));
                                                         if(ngModelCtrl.$viewValue==value.t){
                                                         value.state=value.f;
                                                         value.view=value.fView;
                                                         ngModelCtrl.$setViewValue(value.f);
                                                         }else if(ngModelCtrl.$viewValue==value.f){
                                                         value.state=value.t;
                                                         value.view=value.tView;
                                                         ngModelCtrl.$setViewValue(value.t);
                                                         }else{
                                                         alert("Should not happen!");
                                                         }
                                                         
                                                         });
                                            }
                                            });
                               }
                               };
                               }]);
