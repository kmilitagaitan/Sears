
/* Controllers - Home */

// Controller - Deals
function DealsCtrl($scope){
  $scope.title = "DealsCtrl";
  //console.log('START ',$scope.title);
};


/* ++++++++++++++++++++++++++ */
/* START example of passing values between controllers */

/*

function FirstController($scope) {
  $scope.$on('someEvent', function() {
    // another controller or even directive
  });

function SecondController($scope) {
  $scope.$emit('someEvent', args);
}

*/

/* END example of passing values between controllers */
/* ++++++++++++++++++++++++++ */


// Controller - Menu
function MenuCtrl($scope, MyMenuData){
  $scope.title = "MenuCtrl";
  //console.log('START ',$scope.title);
};


// Controller - Nav
function NavCtrl($window, $location, $scope, $http, MyMenuData){
  $scope.title = "NavCtrl";
  //console.log('START ',$scope.title);

  $scope.$on('displayNotifications',function(){
    //console.log('--NavCtrl - displayNotifications');
  });

  // Header Objects:
    var $headerAll = $('.header-button');
    // console.log('$headerAll: ',$headerAll);

    var $headerMenu = $('.header-button.menu');
    // console.log('$headerMenu: ',$headerMenu);

    var $headerLogo = $('.header-button.logo');
    // console.log('$headerLogo: ',$headerLogo);

    var $headerDeals = $('.header-button.deals');
    // console.log('$headerDeals: ',$headerDeals);

    var $headerProfile = $('.header-button.account');
    // console.log('$headerProfile: ',$headerProfile);

    var $headerCart = $('.header-button.cart');
    // console.log('$headerCart: ',$headerCart);

  // Menu Objects:
    // var $menusActive = $('.nav-main-menu, .nav-sub-menu.active');

    var $menuHome = $('.menu-item.logo');

    var $navMainMenu = $('.nav-main-menu');
    var $navMainMenuItem = $('.nav-main-menu .menu-item');
    // console.log('$navMainMenu: ',$navMainMenu);

    var $navSubMenu = $('.nav-sub-menu');
    var $navSubMenuItem = $('.nav-sub-menu .menu-item');
    // console.log('$navMainMenu: ',$navMainMenu);
    /*For Browse */
    var $navVertMenu = $('.nav-vert-menu');
    var $navCatMenu = $('.nav-cat-menu');
    var $navSubCatMenu = $('.nav-subcat-menu');
    /*For Browse */
    var $menuReturnLinks = $('.menu-return-bg');

    // var $menuItem = $('.menu-item');

  // Content Objects:
    var $overlay = $('.overlay');

    var $viewTray = $('.content-tray');

    var $viewCart = $('.wlcc-container');
    // console.log('$viewAccount: ',$viewAccount);
    // $viewAccount.hide();

    var $viewAccount = $('.profile-container');
    // console.log('$viewAccount: ',$viewAccount);
    // $viewAccount.hide();

    var $viewDeals = $('.deals-container');
    // console.log('$viewDeals: ',$viewDeals);
    // $viewDeals.hide();

    var $viewHome = $('.home-view');
    // console.log('$viewHome: ',$viewHome);

    var fShiftNormal = function(e) {
      // slide the home view back to normal.
      //console.log('START fShiftNormal() - move content back to normal');
      $overlay.removeClass('on');
      $(e).removeClass('offset-left').removeClass('offset-right');
      //once here, menu should get hidden
      $('#swordfish-menu').hide();
      
    };

    var fShiftRight = function(e) {
      // slide the home view right.
      //console.log('START fShiftRight() - move content to right');
      $overlay.addClass('on');
      $(e).removeClass('offset-left').addClass('offset-right');
      $('#swordfish-menu').show();
    };

    var fShiftLeft = function(e) {
      // slide the home view left.
      //console.log('START fShiftLeft() - move content to left');
      $overlay.addClass('on');
      $(e).removeClass('offset-right').addClass('offset-left');
      $('#swordfish-menu').hide();
    };

    var fMenuShow = function() {
      //console.log('START fMenuShow()');
      // $navMainMenu.scrollTop();
      // $navMainMenu.show();
        $navMainMenu.promise().done(function(){
            $navSubMenu.removeClass('active');
        });
    };

    var fMenuHide = function() {
      //console.log('START fMenuHide()');
      // $navMainMenu.scrollTop();
      // $navMainMenu.hide();
        $navMainMenu.promise().done(function(){
            $navSubMenu.removeClass('active');
        });

        // Temporary fix...
        // Real functionality should be:
        // Hiding the menu returns the menu to the 
        // base state if no menu item is chosen, 
        // but menu stays on currently selected 
        // submenu if one is clicked.
        $('.nav-sub-menu').hide();
        $navMainMenu.show();

    };

    var showHideMainMenu = function() {
        //console.log('START showHideMainMenu()');
    };

  // Menu Functions:
    // Toggle the active state of the header item.
    var fHeaderAll = function(e) {
        //console.log('START fHeaderAll()');
        //console.log('-- fHeaderAll(): e is ',$(e));

        // If the header button is active, deactivate it...
        if ($(e).hasClass('active')) {
          // console.log('header button is active)');
          // Make all header buttons NOT active.
          $headerAll.removeClass('active');

          // Show Content.
          if ($(e).hasClass('menu')) {
              //console.log('-- fHeaderAll(): deactivate menu');

              // Return the content to normal position.
              fShiftNormal($viewHome);

              // Hide all sliding trays.
              $viewTray.removeClass('onset-right');
              $viewTray.hide();

              // Hide menu.
              fMenuHide();

          } else if ($(e).hasClass('logo')) {
              //console.log('-- fHeaderAll(): deactivate logo');
              fHeaderLogo();
          } else if ($(e).hasClass('cart')) {
              //console.log('-- fHeaderAll(): deactivate cart');
              fHeaderLogo();
          } else if ($(e).hasClass('deals')||$(e).hasClass('account')) {
              //console.log('-- fHeaderAll(): deactivate deals, account');

              // Hide all sliding trays.
              // $viewDeals.hide();
              $viewTray.removeClass('onset-right');
              // $viewAccount.hide();
              // $viewAccount.removeClass('onset-right');

              // Return the content to normal position.
              fShiftNormal($viewHome);

          } else {
           //console.log('-- fHeaderAll(): START fHeaderAll error 1!') 
        }

        } else {
          // console.log('-- fHeaderAll(): header button is not active)');
          // Make all header buttons NOT active.
          $headerAll.removeClass('active');
          // Make THIS header button active.
          $(e).addClass('active');

          // Hide Content.
          if ($(e).hasClass('menu')) {
              //console.log('-- fHeaderAll(): activate menu');
              

              // Hide all sliding trays.
              $viewTray.removeClass('onset-right');
              $viewTray.hide();

              fShiftRight($viewHome);
              fMenuShow();

          } else if ($(e).hasClass('logo')) {
              //console.log('-- fHeaderAll(): activate logo');
              fHeaderLogo();
              $(e).removeClass('active');
          } else if ($(e).hasClass('deals')) {
              //console.log('-- fHeaderAll(): activate deals');

              $viewTray.removeClass('onset-right');
              $viewTray.hide();

              fShiftLeft($viewHome);
              
              $viewDeals.show();
              $viewDeals.addClass('onset-right');

              // go to url/partial
              // window.location ='#/deals';

          } else if ($(e).hasClass('account')) {
              //console.log('-- fHeaderAll(): activate account');

              $viewTray.removeClass('onset-right');
              $viewTray.hide();

              fShiftLeft($viewHome);

              $viewAccount.show();
              $viewAccount.addClass('onset-right');

              if (profileScope.loginStatus != 'loggedIn') {
                //$loginEmail.focus(); // Using cached object doesn't seem to work
                $('#login-form input[name=email]').focus();
              }

              // go to url/partial
              // window.location = '#/account';

          } else if ($(e).hasClass('cart')) {
              //console.log('-- fHeaderAll(): activate cart');

              $viewTray.removeClass('onset-right');
              $viewTray.hide();

              // fShiftLeft($viewHome);

              // $viewCart.show();
              // $viewCart.addClass('onset-right');

              fShiftNormal($viewHome);

              // go to url/partial              
              window.location = '#/cart/viewcart/' + new Date().getTime();
   
          } else { 
            //console.log('-- fHeaderAll(): catch logo');
            fHeaderLogo();
          }

        }
    };

    var fHeaderLogo = function(e) {
        //console.log('START fHeaderLogo()');

        // Make menu header button NOT active.
        $headerAll.removeClass('active');

        $viewDeals.hide();
        $viewAccount.hide();

        fShiftNormal($viewHome);
        window.location = '#/';
    };

  // Overlay Binding:
  $overlay.on('touchstart mousedown',function() {
    if ( $overlay.hasClass('on') ) {
      //console.log('turn overlay off!');
      $overlay.removeClass('on');

      // create conodition for click when menu is open
      fHeaderAll($headerAll);
    } else {
      //console.log('overlay error!');
    }
  });

  // Header Bindings:
  $headerMenu.bind('click',function() {
      fHeaderAll(this);
  });
  $headerLogo.bind('click',function() {
      fHeaderAll(this);
  });
  $headerLogo.bind('click',function() {
      fHeaderAll(this);
  });
  $menuHome.bind('click',function() {
      fHeaderAll(this);
  });
  $headerDeals.bind('click',function() {
      fHeaderAll(this);
  });
  $headerProfile.bind('click',function() {
      fHeaderAll(this);
  });
  $headerCart.bind('click',function() {
      fHeaderAll(this);
  });

  $scope.MyMenuData = MyMenuData;
  // console.log('MyMenuData: ',MyMenuData);

  // $scope.navItems = data;

  $http.get('data/nav-items.json')
  .success(function(data) {
    $scope.navItems = data;
    // console.log('navItems1: ',$scope.navItems);
  })
  .error(function(data) {
    //console.log('error');
  });

  $scope.navHome = function() {
    //console.log('click on new home link...');

    // do the 'action' (i.e., 'subMenu') corresponding to the menu item...
    // fHeaderLogo();
    // fHeaderAll(this);

    /*$navMainMenu.hide();
    if (e.val.action==="navTo") {
      fShiftNormal($viewHome);
      window.location = e.val.path;
      $headerMenu.removeClass('active');
    } else {
      $('.nav-sub-menu[data-menu='+e.key+']').show();
    }*/

  };

  $scope.navMainMenuItem = function(e) {
    //console.log('click on new main menu item...');
    hideAddToPassBook(e);
    //console.log('key: ',e.key);
    //console.log('val: ',e.val);
    //console.log('main menu path: ',e.val.path);

    // do the 'action' (i.e., 'subMenu') corresponding to the menu item...
    $navMainMenu.hide();

    if ($scope.showLoginIfRequired(e) == true) {
      return;
    }

    if (e.val.action==="navTo") {
      //console.log('navTo');

      fShiftNormal($viewHome);
      window.location = e.val.path;
      $headerMenu.removeClass('active');
    } else {
      //console.log('navTo');
      
      $('.nav-sub-menu[data-menu='+e.key+']').show();
      
    }
  };

  $scope.navSubMenuItem = function(e) {
    //console.log('click on new sub menu item...',e.subItem.path);
    //console.log('key: ',e.subItem);
    // console.log('val: ',e.subItem);
    // do the 'path' (i.e., 'path') corresponding to the menu item...
    
    if ($scope.showLoginIfRequired(e) == true) {
      return;
    }
    
    fShiftNormal($viewHome);
    window.location = e.subItem.path;
    $headerMenu.removeClass('active');
  };

  function hideAddToPassBook(e)
  {
      if(e.key == "giftcards")
       {
            var submenuarr = [];
           if(!getIOSVersion()){
 
                for(var i=0;i<e.val.submenu.length;i++) {
                    if(e.val.submenu[i].title!="Add to passbook")
                        submenuarr.push(e.val.submenu[i]);
                }
                      e.val.submenu = submenuarr;
                      }
          
       }  
  }

  $scope.navReturn = function() {
    //console.log('click on new return menu item...');
    // hide sebmenus and show main menu...
    $navSubMenu.hide();
    $navMainMenu.show();
  };
  $scope.navMainReturn = function() {
    //console.log('return to menu item...');
    $navVertMenu.hide();
    $navCatMenu.hide();
    $navSubCatMenu.hide();
    $navMainMenu.show(); 
  };
  $scope.navVertReturn = function() {
    //console.log('return to vertical item...');
    $navMainMenu.hide();

    $navVertMenu.show();
    $navCatMenu.hide();
    $navSubCatMenu.hide();
    $overlay.removeClass('on');
    $('#searchHistory').hide();
    $('#searchAutocomplete').hide();
    $('#searchProducts').hide();
  };
  $scope.navCatReturn = function() {
    //console.log('return to category item...');
    $navMainMenu.hide();
    $navVertMenu.hide();
    $navCatMenu.show();
    $navSubCatMenu.hide();
    $overlay.removeClass('on');
  };    

  $scope.navSubCatReturn = function() {
    //console.log('return to sub category item...');
    $navMainMenu.hide();
    $navVertMenu.show();
    $navCatMenu.show();
    $navSubCatMenu.show();
    $overlay.removeClass('on');
  }; 
 
 $scope.browseSearchPage = function(){
    fShiftNormal($viewHome);
    //$('#overlayid').removeClass('on');
    }

  $scope.showLogin = function(sourceEvent, targetAction) {
 	//console.log('showLogin');
 	
    $viewTray.removeClass('onset-right');
    $viewTray.hide();
 
    fShiftLeft($viewHome);
 
    $viewAccount.show();
    $viewAccount.addClass('onset-right');
     
    profileScope.loginStatus = 'guest';   
    profileScope.sourceEvent = sourceEvent;
    profileScope.targetAction = targetAction;    
  };
  $scope.showLoginIfRequired = function(e) {
	if (profileScope.loginStatus != 'loggedIn') {  
	  if ((e.val != null && e.val.loginRequired == "true") || (e.subItem != null && e.subItem.loginRequired == "true")) {	   
		var targetAction = function(e) {

      //console.log('targetAction function start...');

			if (e.val != null && e.val.loginRequired == "true") {
				if (e.val.action==="navTo") {
			      fShiftNormal($viewHome);
			      window.location = e.val.path;
			      $headerMenu.removeClass('active');
			    } else {
                  $('.header-button').removeClass('active');
                  $('.home-view').removeClass('offset-left');
                  $('.home-view').removeClass('offset-right');
                  $('span.count').show();

                  $('.nav-sub-menu[data-menu='+e.key+']').show();
                  $headerMenu.click();
			    }
			} else if (e.subItem != null && e.subItem.loginRequired == "true") {
				fShiftNormal($viewHome);
			    window.location = e.subItem.path;
			    $headerMenu.removeClass('active');
			}
		};
		$scope.showLogin(e, targetAction);
		return true;
	  }
	}  
	return false;
  };
  
};

function HomePageCtrl($scope, $rootScope, $http, $location, AppConfig, DeviceConfig, Banner, AdditionalPromos, TECRecommendations) {
  $scope.title = "HomePageCtrl";
  console.log('START ',$scope.title);

  // startedCycle1 = false;

  /* ++++++++++++++ START App & Device Config stuff */
  $rootScope.appId = AppConfig.getAppId();
  localStorage.appId = AppConfig.getAppId();
  console.log('---App Id: ', $rootScope.appId);

  $rootScope.envId = AppConfig.getEnvId();
  localStorage.envId = AppConfig.getAppId();
  console.log('---Environment Id: ', $rootScope.envId);

  $rootScope.deviceType = DeviceConfig.getDeviceType();
  localStorage.deviceType = $rootScope.deviceType;
  // console.log('---Device Type: ',$rootScope.deviceType);

  $rootScope.isHybridApp = DeviceConfig.isHybridApp();
  localStorage.isHybridApp = $rootScope.isHybridApp;
  // console.log('isHybridApp: ',$rootScope.isHybridApp);

  $rootScope.deviceOS = DeviceConfig.getDeviceOS();
  localStorage.deviceOS = $rootScope.deviceOS;
  // console.log('device os: ',$rootScope.deviceOS);

  // Set the branding class on the HTML body tag dynamically
  $("body").removeClass().addClass($rootScope.deviceType).addClass($rootScope.appId);

  if (DeviceConfig.isHybridApp()) {
      $("#swordfish").addClass('hybrid-view');
  }
  /* ++++++++++++++ END App & Device Config stuff */

  /* ++++++++++++++ START CMS Feed stuff */
  //$scope.recommendedProducts = RecommendedProducts.query();
  // console.log('recommendedProducts: ',$scope.recommendedProducts);

  // ===== JSONP Callback =====
  //$scope.TECRecommendations = TECRecommendations;
  //$scope.TECRecommendations.get(5, true, function(data) {
  //  $scope.recommendedProducts = data;
  //});
  // console.log('TECRecommendations.data', $scope.recommendedProducts);
  // ===== end JSONP Callback =====
  //$scope.additionalPromos = AdditionalPromos.query();
  // console.log('recommendedProducts: ',$scope.recommendedProducts); 

  /*var banner = Banner.get(function(data) {
    console.log("banner data: ",data);
    $scope.cmsStyles = data.styles;
    $scope.cmsScriptsHead = data["scripts-head"];
    $scope.cmsScriptsBody = data["scripts-body"];
    $scope.cmsContentZones = data.contentZones;
    // console.log('contentZones/$scope.cmsContentZones.heroes.W1P: ',$scope.cmsContentZones.heroes.W1P);
    console.log('styles/$scope.cmsStyles: ',$scope.cmsStyles);
    console.log('scriptsHead/$scope.cmsScriptsHead: ',$scope.cmsScriptsHead);
    console.log('scriptsBody/$scope.cmsScriptsBody: ',$scope.cmsScriptsBody);
    console.log('contentZones/$scope.cmsContentZones: ',$scope.cmsContentZones);
    
    function startCycle(){
    // if(!startedCycle1){
      // console.log('START hero banner cycle plugin from bannerCtrl...');
      $('.scrollThis').after('<div id="cycle-carousel-nav">')
      .cycle({
          fx: 'scrollHorz', //[blindX,blindY,blindZ,cover,curtainX,curtainY,fade,fadeZoom,growX,growY,none,scrollUp,scrollDown,scrollLeft,scrollRight,scrollHorz,scrollVert,shuffle,slideX,slideY,toss,turnUp,turnDown,turnLeft,turnRight,uncover,wipe,zoom]
          fit: 1,
          speed:  750,
          timeout:  2250,
          pager: '#cycle-carousel-nav',
          next: '#next',
          prev: '#prev',
          pause:1
      });
      $(".scrollThis").touchwipe({
          preventDefaultEvents: false,
          wipeLeft: function() {
            $(".scrollThis").cycle("next");
          },
          wipeRight: function() {
            $(".scrollThis").cycle("prev");
          }
      });
      startedCycle1 = true;
    // }
    }
    setTimeout(startCycle, 1000);

});*/
  
  /* ++++++++++++++ END CMS Feed stuff */

//  function for redirection to pdp page
    $scope.goTOPdp = function(pid){

            $location.path("/details/guest/"+pid);

    }
};


HomePageCtrl.resolve = {
	  datasets : function($q, $http, $rootScope, $resource) {
		var deferred = $q.defer();

//	if (localStorage.getItem("remoteAppConfigJSON") != null	|| localStorage.getItem("localAppConfigJSON") != null) {
//			deferred.resolve(null);
//			return deferred.promise;
//	} else {
		var configUrl = REMOTE_APP_CONFIG_URL;

    // check to see if user wants to override the default application id and environment id
    var appId = getUrlParamValue('appId');
    var envId = getUrlParamValue('envId');

    if (envId == 'LOCAL' || envId == 'local') {
      configUrl = LOCAL_APP_CONFIG_URL;
    } else if (appId != null && envId != null) {
			// console.log('Overriding the default app config with the app id and environment id submitted by user:' + appId + ' ' + envId);
			configUrl = getAppConfigUrl(appId, envId);
		}
		// console.log('Loading JSON config file from network endpoint... ' + configUrl);
		$http({
			method : 'GET',
			url : configUrl
		}).success(
				function(data) {
						// console.log('Successfully loaded JSON config file from network endpoint:', data);
						localStorage.setItem("remoteAppConfigJSON", JSON.stringify(data));
						deferred.resolve(data);
					}).error(function(data) {
			// console.log('HomePageCtrl.resolve(): Error occured while trying to load JSON config file from network endpoint:', data);
			deferred.resolve(data);
		});

		// load the local config in case a network failure occurs while trying to load JSON data from network endpoint.
		$http({
			method : 'GET',
			url : LOCAL_APP_CONFIG_URL
		}).success(
				function(data) {
						localStorage.setItem("localAppConfigJSON", JSON.stringify(data));
		});
//  }
		return deferred.promise;
	}
};

function HeaderCtrl($scope, $rootScope){
  $scope.title = "HeaderCtrl";
  //console.log('START ',$scope.title);

  if (!isEmptyOrNull(localStorage.deviceType)) {
    $scope.deviceType = localStorage.deviceType;
    $scope.appId = localStorage.appId;
    $("body").addClass($scope.deviceType).addClass($scope.appId);
    //console.log('-- HeaderCtrl - deviceType:'+$scope.deviceType+', appId:'+$scope.appId+'');
  } else {
    //console.log('-- HeaderCtrl - error');
  }


  /* JDS - Alternate script */
  /*$scope.deviceType = localStorage.deviceType;
  $scope.appId = localStorage.appId;

  var $body = $("body");

  // Check for device type, i.e., 'mobile' or 'tablet'.
  if (localStorage.deviceType !== null && localStorage.deviceType !== 'null' && localStorage.deviceType !== '') {
    console.log('-- HeaderCtrl: localStorage.deviceType is "'+localStorage.deviceType+'"');
    $body.addClass($scope.deviceType);
  } else {
    console.log('-- HeaderCtrl: localStorage.deviceType is null');
    // $body.addClass('mobile');// default
  }

  // Check for App ID, i.e., 'sears' or 'kmart'.
  if (localStorage.appId !== null && localStorage.appId !== 'null' && localStorage.appId !== '') {
    console.log('-- HeaderCtrl: localStorage.appId is "'+localStorage.appId+'"');
    $body.addClass($scope.appId);
  } else {
    console.log('-- HeaderCtrl: localStorage.appId is null');
    // $body.addClass('sears');// default
  }*/

};
