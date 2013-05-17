/* Controllers */

// Profile Controller
// function ProfileCtrl($scope, $rootScope, $http, $dialog, Profile, Notifications){
function ProfileCtrl($scope, $rootScope, $http, $dialog, Profile){
  // $scope.title = "ProfileCtrl";

  $scope.loginStatus = "guest";
  $scope.sourceEvent = null;
  $scope.targetAction = null;

  // Views
  $scope.guestView = "login";
  $scope.memberView = "notifications";

  // Form fields
  $scope.rememberEmail = true;
  $scope.regTerms = true;
  $scope.country = 'US';

  // Static data
  //$http.get('data/country-list.json').success(function(data) {$scope.countryList = data; });
  $scope.countryList = [];


  $scope.onSubmitted = function() {
    // $scope.$apply();
  };

  $scope.setLoginStatus = function(status) {
     $scope.loginStatus = status;
  };

  $scope.setGuestView = function(view) {
      $scope.guestView = view;
  };

  $scope.setMemberView = function(view) {
    $scope.memberView = view;
  };


  /****************************************************************/
  /*                          LOGIN                               */
  /****************************************************************/

  /**
   * Login a user via SAL's Universal Login API
   */
  $scope.login = function(email, password, rememberEmail, regTerms) {
    console.log('attempting to login via SAL API using credentials:' + email + ', ' + password);
    Profile.login(email, password, $scope.loginSuccessHandler, $scope.loginErrorHandler);
  };

  /**
   * Login success handler
   */
  $scope.loginSuccessHandler = function(data, status, headers, config)  {
    console.log('entering loginSuccessHandler...', data);
    if (!isEmptyOrNull(data.sessionId)) {

      Profile.proxyTicket(data.casTGT, "WCS", true, proxyTicketSuccessHandler,  proxyTicketErrorHandler);
      localStorage.userId = data.customerInfo.userId;

    } else {
      if (data.responseStatus != null) {
        if (data.responseStatus.errorCode == 'authentication.failure') {
          $('#login-error').html('Invalid email or password');
        } else {
          $('#login-error').html(data.responseStatus.errorMessge);
        }
      } else {
        $('#login-error').html('Unknown system error occurred. Please try again.');
      }

      $('#login-error').css('color', 'red');
      $('#login-error').show();
    }
  };

  /**
   * Login error handler
   */
  $scope.loginErrorHandler = function(data, status, headers, config)  {
    console.log('login attempt failed');

    if (data.responseStatus != null) {
      if (data.responseStatus.errorCode == 'authentication.failure') {
        $('#login-error').html('Invalid email or password');
      } else {
        $('#login-error').html(data.responseStatus.errorMessge);
      }
    } else {
      $('#login-error').html('Unknown system error occurred. Please try again.');
    }

    $('#login-error').css('color', 'red');
    $('#login-error').show();
  };

  /**
   * Proxy Ticket Success Handler
   */
  function proxyTicketSuccessHandler(data, status, headers, config)  {
      console.log('entering proxyTicketSuccessHandler...', data);
      Profile.ssoLogin(data.casTicket, ssoLoginSuccessHandler, ssoLoginErrorHandler);
  };

  /**
   * Proxy Ticket Error Handler
   */
  function proxyTicketErrorHandler(data, status, headers, config)  {
    console.log('entering proxyTicketErrorHandler...');
  };

  /**
   * SSO Login Success Handler
   */
  function ssoLoginSuccessHandler(data, status, headers, config)  {
    console.log('entering ssoLoginSuccessHandler...', data);

    if (data.LoginResponse.LoginRespData != null && data.LoginResponse.LoginRespData[0].clientSessionKey != null) {

      localStorage.token = data.LoginResponse.LoginRespData[0].clientSessionKey;
      localStorage.tokenTimestamp = new Date();
      localStorage.authMethod = 'direct';
      localStorage.userType = 'R';
      localStorage.zipcode = '60602'; // TODO: temporary hard code to get WLCC to work. Remove when profile API is available
      logininfo.membertype =  localStorage.userType;
      logininfo.memberzipCode=localStorage.zipcode;
      logininfo.isSignedIn=true;
      logininfo.acounttype = localStorage.userType;
      console.log('login attempt succeeded. clientSessionKey=' + localStorage.token);
      console.log('encoded+'+encodeURIComponent(localStorage.token));

      $scope.loginStatus = 'loggedIn';

      $scope.getNotifications();

      if ($scope.sourceEvent != null && $scope.targetAction != null) {
        $scope.targetAction($scope.sourceEvent);
        $scope.sourceEvent = null;
        $scope.targetAction = null;
      } else {
        $('.header-button').removeClass('active');
        $('.home-view').removeClass('offset-left').removeClass('offset-right');
        $('span.count').show();
      }

    } else {
      console.log('login attempt failed');

      $('#login-error').html('Invalid email or password');
      $('#login-error').css('color', 'red');
      $('#login-error').show();
    }
  };

  /**
   * SSO Login Error Handler
   */
  function ssoLoginErrorHandler(data, status, headers, config)  {
    console.log('entering ssoLoginErrorHandler...');
  };

  /**
   * WLCC Login
   */
  /*
   $scope.wlccLogin = function(email, password, rememberEmail, regTerms) {
   console.log('attempting to login via WLCC API using credentials:' + email + ', ' + password);

   $scope.username = email.split('@')[0];
   console.log('username: ',$scope.username);

   var json = wlccLogin(email, password);
   console.log('json: ',json);

   // check for FF.
   if (json.LoginResponse === null||json.LoginResponse === '') {
   // parses JSON for FF.
   console.log('LoginResponse is null');
   json = $.parseJSON(json);
   } else {
   console.log('LoginResponse is not null');
   }

   // Looks for session key to determine valid login.
   if (json.LoginResponse.LoginRespData != null && json.LoginResponse.LoginRespData.clientSessionKey != null) {

   localStorage.token = json.LoginResponse.LoginRespData.clientSessionKey;
   localStorage.tokenTimestamp = new Date();
   localStorage.authMethod = 'direct';
   localStorage.userType = 'R';
   localStorage.zipcode = '60602'; // TODO: temporary hard code to get WLCC to work. Remove when profile API is available
   logininfo.membertype =  localStorage.userType;
   logininfo.memberzipCode=localStorage.zipcode;
   logininfo.isSignedIn=true;
   logininfo.acounttype = localStorage.userType;
   console.log('login attempt succeeded. clientSessionKey=' + localStorage.token);
   console.log('encoded+'+encodeURIComponent(localStorage.token));

   $scope.loginStatus = 'loggedIn';

   getNotifications($scope, email);

   if ($scope.sourceEvent != null && $scope.targetAction != null) {
   $scope.targetAction($scope.sourceEvent);
   $scope.sourceEvent = null;
   $scope.targetAction = null;
   } else {
   $('.header-button').removeClass('active');
   $('.home-view').removeClass('offset-left').removeClass('offset-right');
   $('span.count').show();
   }

   } else {
   console.log('login attempt failed');

   $('#login-error').html('Invalid email or password');
   $('#login-error').css('color', 'red');
   $('#login-error').show();
   }

   };  */

  /****************************************************************/
  /*                      REGISTRATION                            */
  /****************************************************************/

  /**
   * Register a new user
   */
  $scope.register = function(email, password, firstName, lastName, zipcode, country, rememberEmail, regTerms) {
    Profile.register(email, password, firstName, lastName, zipcode, country, $scope.registerSuccessHandler, $scope.registerErrorHandler);
  }

   /**
   * Registration success handler
   */
  $scope.registerSuccessHandler = function(data, status, headers, config)  {
    console.log('registration attempt succeeded');
    localStorage.token = "sdsdda232324jk234324234j2243242343";
    localStorage.tokenTimestamp = new Date();
    localStorage.userId = data.userId;
    localStorage.authMethod = 'direct';
    localStorage.userType = 'R';
    localStorage.zipcode = '60602'; // TODO: temporary hard code to get WLCC to work. Remove when profile API is available
    $scope.loginStatus = 'loggedIn';
    $scope.memberView = 'registerSuccess';
    logininfo.membertype =  localStorage.userType;
    logininfo.memberzipCode = localStorage.zipcode;
    logininfo.acounttype = localStorage.userType;
    logininfo.isSignedIn = true;
    $scope.getNotifications();
  }

  /**
   * Registration error handler
   */
  $scope.registerErrorHandler = function(data, status, headers, config)  {
    console.log('registration attempt failed');
    $('#register-error').html('Registration attempt failed. Please try again');
    $('#register-error').css('color', 'red');
    $('#register-error').show();
  }

  /****************************************************************/
  /*                     RESET PASSWORD                           */
  /****************************************************************/

  /**
   * Reset a user's password
   */
  $scope.reset = function(email) {
    Profile.reset(email, $scope.resetSuccessHandler, $scope.resetErrorHandler);
  }

  /**
   * Reset password success handler
   */
  $scope.resetSuccessHandler = function(data, status, headers, config)  {
    console.log('reset password attempt succeeded');
    $scope.setGuestView("forgotSuccess");
  }

  /**
   * Reset password error handler
   */
  $scope.resetErrorHandler = function(data, status, headers, config)  {
    console.log('reset password attempt failed');
    $('#forgot-error').html('Forgot password attempt failed. Please try again');
    $('#forgot-error').css('color', 'red');
    $('#forgot-error').show();
  }

  /****************************************************************/
  /*                     NOTIFICATIONS                            */
  /****************************************************************/

  // get notification messages
  /*$http.get('data/notify-messages.json')
    .success(function(data) {
      $scope.statusMessages = data.statusMessages;
      console.log('statusMessages: ',$scope.statusMessages);
    })
    .error(function(data) {
      console.log('statusMessages error');
    });*/

  // get status cards data
  /*$http.get('data/notify-data.json')
    .success(function(data) {
      $scope.statusData = data.statusData;
      console.log('statusData: ',$scope.statusData);
    })
    .error(function(data) {
      console.log('statusData error');
    });*/


  // populate messages with data...
  // COMING SOON!

  // keep the status card count updated...
  // $scope.countStatus;

  // Count the remaining active status cards...
  /*$scope.remaining = function() {
    var c = 0;
    for (var i=0;i<$scope.notifications.data.length;i++) {
      if ($scope.notifications.data[i].read) {
        c++;
      }
    }
    // console.log('count: ',c);
    return c;
  };*/

  // Get Notifications -- NAKED AJAX CALL...
  $scope.getNotifications = function(){


    // Access 'notifications.json'...
    /*$.ajax({url:"../data/notifications.json",
      success:function(result){
        console.log('success: ',result);
        // console.log('parse: ',$.parseJSON(result));
        // notifications = $.parseJSON(result);
        $scope.statusMessages = result.statusMessages;
        // console.log('$scope.notifications: ',notifications);
        console.log('$scope.statusMessages: ',$scope.statusMessages);
      },
      error: function(result){
        console.log = ('error: ',result);
      }
    });*/

    // Access 'notify.json'...
    // $.ajax({url:"../data/notify.json",

    // Access 'http://cloudfish.herokuapp.com/notify'...
    // $.ajax({url:"http://cloudfish.herokuapp.com/notify",

    // Access 'notify-data.json'...
    // Data only
/*    $.ajax({url:"../data/notify-data.json",
      success:function(result){
        console.log('success: ',result);
        $scope.statusData = result.statusData;
        // console.log('$scope.notifications: ',notifications);
        console.log('$scope.statusData: ',$scope.statusData);
      }
    });
*/
    // Access 'notify-messages.json'...
    // Messages with no data
    $.ajax({url:"../data/notify-cards.json",
      success:function(fetchResult){
        console.log('success bryon: ',fetchResult);
        // console.log('parse: ',$.parseJSON(result));
        // notifications = $.parseJSON(result);
        $scope.statusMessages = fetchResult.statusMessages;
        // console.log('$scope.notifications: ',notifications);
        console.log('$scope.statusMessages: ',$scope.statusMessages);
      }
    });
  };
  //$scope.getNotifications();


  // Get Notifications -- SERVICE CALL...
  /*function getNotifications($scope, emailId){
    $scope.notifications = Notifications.query(function(){
      console.log('Notifications: ',Notifications);
      // count = $scope.notifications.count;
      count = 3;
      console.log('Notifications count: ',count);
      swordfishScope.count = count;
      swordfishScope.$apply();
    });
  };*/

  // Show Notifications -- Need more details about this function...
  $scope.showNotifications = function() {
    $scope.setMemberView('notifications');
    $scope.loginStatus = 'loggedIn';
  };

  /****************************************************************/
  /*                      MODAL DIALOGS                           */
  /****************************************************************/

  /**
   * Default options
   */
  $scope.opts = {
      dialogFade: true,
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      templateUrl:  "views/help/terms-of-use.html",
      controller: AccountDialogCtrl
  };

  /**
   * Open the Terms of Use dialog
   */
  $scope.openTerms = function(){
      $scope.opts.templateUrl = "views/help/terms-of-use.html";
      var d = $dialog.dialog($scope.opts);
      d.open().then(function(result){
          if(result) {
            alert('terms dialog closed with result: ' + result);
          }
      });
  };

  /**
   * Open the Privacy Policy dialog
   */
  $scope.openPrivacy = function(){
      $scope.opts.templateUrl = "views/help/privacy-policy.html";
      var d = $dialog.dialog($scope.opts);
      d.open().then(function(result){
          if(result) {
            alert('privacy dialog closed with result: ' + result);
          }
      });
  };

  /****************************************************************/
  /*                   MISCELLANEOUS FUNCTIONS                    */
  /****************************************************************/

  /**
   * Handles cancel button events of various screens
   */
  $scope.cancel = function(screenName) {
    var $loginError = $('#login-error');
    var $forgotError = $('#forgot-error');
    var $registerError = $('#register-error');

    var $forgotAccordian = $('#forgot-accordian');
    var $loginAccordian = $('#login-accordian');
    var $loginAccordianAnchor =  $('#login-accordian .accordion-heading a ');
    var $headerProfile = $('.header-button.account');

    if (screenName == 'forgot') {
      $scope.loginStatus = "guest";
      $scope.setGuestView("login");
      $forgotError.html('');
      $forgotAccordian.hide();
      $loginAccordian.show();
      $loginAccordianAnchor.trigger('click');
    } else if (screenName == 'login' || screenName == 'register') {
      $loginError.html('');
      $registerError.html('');
      $headerProfile.trigger('click');
    }
  };

  /**
   * Restores the application's AnjularJS state after a page refresh
   */
  $scope.restoreSession = function() {
    if (localStorage.token != null && localStorage.tokenTimestamp != null) {
      var currentTime = new Date();
      var timestamp = new Date(localStorage.tokenTimestamp);
      var maxAge = 1000 * 60 * 60 * 24 * 365 * 100; // 100 years

      if (localStorage.authMethod == 'guest') {
        maxAge = 1000 * 60 * 30; // guest sessions expire after 30 minutes of inactivity
      } else if (localStorage.authMethod == 'direct') {
        maxAge = 1000 * 60 * 60; // registered user sessions expire after 60 minutes of inactivity
      }

      if ((currentTime - timestamp) > maxAge) {
        // session has expired. clear out local storage params
        localStorage.token = null;
        localStorage.tokenTimestamp = null;
        localStorage.authMethod = null;
        localStorage.userType = 'G';
        $scope.loginStatus = "guest";
      } else if (localStorage.authMethod == 'guest' || localStorage.authMethod == 'direct') {
        localStorage.tokenTimestamp = new Date();

        if (localStorage.authMethod == 'direct' && $scope.loginStatus == 'guest') {
          // user was logged in before page refresh so set loginStatus back to 'loggedIn'
          $scope.loginStatus = 'loggedIn';
        }
      }
    }

    if (!isEmptyOrNull(localStorage.deviceType)) {
      swordfishScope.deviceType = localStorage.deviceType;
    }

    if (!isEmptyOrNull(localStorage.appId)) {
      swordfishScope.appId = localStorage.appId;
    }

  };

  window.addEventListener("load", $scope.restoreSession, false);

};
// End Profile Controller


// AccountDialog Controller
function AccountDialogCtrl($scope, dialog){
    $scope.close = function(result){
        dialog.close(result);
    };
}
// End AccountDialog Controller

/*
*
* My profile controllers
*
*/

// function savedAddressCtrl($scope, $http){
//  $http.get('data/saved-address.json').success(function(data) {
//      var len = data.length;
//      for(var index = 0; index < len; index++) {
//          var address = data[index];
//          if(address.express === "YES") {
//              address.expresscheckout = "Address" + (index +1 ) + "(Express checkout)";
//          }
//          else 
//            address.expresscheckout = "Address" + (index +1);

//      }
//      $scope.addresses = data;
   
//  });
//  };

function accntInfoCntrl($http, $scope){

  console.log('Account Info controller...');
  var encodedKey = encodeURIComponent(localStorage.token);

  $http.get('data/profile-user-info.json').success(function(data){

  // $http.get('http://ushofml302436.kih.kmart.com:4000/shcprofile/viewprofile/'+ encodedKey).success(function(data){
        console.log("api data", data);
        $scope.accntinfozipcode= data.ProfileResponse.AccountInfo.ZipCode;
        logininfo.memberzipCode = $scope.accntinfozipcode;
        $scope.accntBirthDay = data.ProfileResponse.AccountInfo.BDay;
        $scope.accntBirthMonth = data.ProfileResponse.AccountInfo.BMonth;
        $scope.accntBirthYear = data.ProfileResponse.AccountInfo.BYear;
        $scope.accntHomePhone = data.ProfileResponse.AccountInfo.HomePhone;
        $scope.accntMobilePhone = data.ProfileResponse.AccountInfo.MobilePhone;
        $scope.accntEmail = data.ProfileResponse.AccountInfo.Email1;
    }) 
  $scope.editZipEnabled = true;
  $scope.editBirthdayEnabled = true;
  $scope.editHomephoneEnabled = true;
  $scope.editMobilephoneEnabled = true;
  $scope.editEmailEnabled = true;
  
  $scope.editzipenable= function(){
    $scope.editZipEnabled = false;
  }
  
  $scope.editzipdisable=function(){
    $scope.editZipEnabled = true;
  }
  
  $scope.editbirthdayenable= function(){
    $scope.editBirthdayEnabled = false;
  }
  
  $scope.editbirthdaydisable= function(){
    $scope.editBirthdayEnabled = true;
  }
  
  $scope.edithomephoneenable= function(){
    $scope.editHomephoneEnabled = false;
  }
  
  $scope.edithomephonedisable= function(){
    $scope.editHomephoneEnabled = true;
  }
  
  $scope.editmobilephoneenable= function(){
    $scope.editMobilephoneEnabled = false;
  }
  
  $scope.editmobilephonedisable= function(){
    $scope.editMobilephoneEnabled = true;
  }
  
  $scope.editemailenable= function(){
    $scope.editEmailEnabled = false;
  }
  
  $scope.editemaildisable= function(){
    $scope.editEmailEnabled = true;
  }
  
  
  $scope.save = function() {
  
  console.log($scope.accntinfozipcode);
  console.log($scope.accntBirthday);
  console.log($scope.accntHomePhone);
  console.log($scope.accntMobilePhone);   
  console.log($scope.accntEmail); 
  } 
};


function ExpCheckoutCtrl($http, $scope) {
  console.log('Express Checkout controller...');
  var encodedKey = localStorage.token;
  $http.get('data/profile-user-info.json').success(function(data){
  // $http.get('http://ushofml302436.kih.kmart.com:4000/'+encodedKey).success(function(data){
    console.log("api data", data);
    $scope.expCheckoutBilling = data.ProfileResponse.ExpressCheckOut.BillingAddress;
    console.log("Billing data", $scope.expCheckoutBilling);
    $scope.expCheckoutPayment = data.ProfileResponse.ExpressCheckOut.PaymentMethod;
    console.log("Payment data", $scope.expCheckoutPayment);
    $scope.expCheckoutShipping = data.ProfileResponse.ExpressCheckOut.ShippingAddress;
    console.log("Shipping data", $scope.expCheckoutShipping);
  })
};

function ProfilePaymentsCtrl($http, $scope){
  console.log('Payment type controller...');
  $scope.viewComponent = "all";
  var encodedKey = encodeURIComponent(localStorage.token);
  $http.get('data/profile-user-info.json').success(function(data){
  // $http.get('http://ushofml302436.kih.kmart.com:4000/'+encodedKey).success(function(data){
    console.log("api data", data);
    $scope.paymentList = data.ProfileResponse.WalletInfo.CardInfo;
    console.log("Cards", $scope.paymentList);
  })

  $scope.setActiveView = function(viewType){
    $scope.viewComponent = viewType;
    console.log("view:", $scope.viewComponent);
  }

};

function ProfileAddressCtrl($http, $scope){
  console.log('Address controller...');
  $scope.viewComponent = "all";
  var encodedKey = encodeURIComponent(localStorage.token);
  $http.get('data/profile-user-info.json').success(function(data){
  // $http.get('http://ushofml302436.kih.kmart.com:4000/'+encodedKey).success(function(data){
    console.log("api data", data);
    $scope.addressList = data.ProfileResponse.AddressBook;
    console.log("Addresses", $scope.addressList);
  })

  $scope.setActiveView = function(viewType){
    $scope.viewComponent = viewType;
    console.log("view:", $scope.viewComponent);
  }

};

function PreferredStoreInfoCtrl($http, $scope){
  console.log('Preferred Store controller...');
  var encodedKey = encodeURIComponent(localStorage.token);
    $http.get('data/profile-user-info.json').success(function(data){
  // $http.get('http://ushofml302436.kih.kmart.com:4000/'+encodedKey).success(function(data){
      console.log("api data", data);
      $scope.storeInfo = data.ProfileResponse.PreferredStores.PreferredStore.StoreDetails;
      $scope.storeServices = data.ProfileResponse.PreferredStores.PreferredStore.AvailableStoreServices;
      console.log("storeInfo", $scope.storeInfo);
      console.log("storeServices", $scope.storeServices);
      // profile_icons = 
      //     {   "Gift registry": "g",
      //         "Store pick up": 
      //     }     
  })
};

function OrderCenterCtrl  ($scope, $http, $location, $rootScope, OrderCenter) {
    $scope.loginStatus = profileScope.loginStatus;
    console.log("order center login status", $scope.loginStatus);

    if ($scope.loginStatus == 'loggedIn') {
      //intialize count variables
      $scope.currentPage = 1;
      $scope.totalOnlinePage = 0;
      $scope.totalInStorePage = 0;

      // success handler routine
      $scope.getOrdersSuccessHandler = function(data, status, headers, config)  {
        console.log('order center call succeeded');

        $scope.orderData = data.SALOrderCenterResponse.OrderList.Orders;
        $scope.totalOnlinePage  = data.SALOrderCenterResponse.PageInformation.TotalOnlinePages;
        $scope.totalInStorePage  = data.SALOrderCenterResponse.PageInformation.TotalInStorePages;
      
        console.log("order center handler totalO", $scope.totalOnlinePage);
        console.log("order center handler totalS", $scope.totalInStorePage);

        $scope.currentPage ++;
      
      }

      // error handler routine
      $scope.getOrdersErrorHandler = function(data, status, headers, config)  {
        console.log('order center call failed');
      }

    
     
      //$scope.nextPage = function ()
      //{
        console.log("Next Page called with page number", $scope.currentPage);
        // function to call order center page
        OrderCenter.getOrders($scope.getOrdersSuccessHandler, $scope.getOrdersErrorHandler, $scope.currentPage, $scope.totalOnlinePage, $scope.totalInStorePage);
      //}
     // $scope.nextPage();

    

      $scope.orderDetails = function(item) {
        console.log("order id", item.OrderId);
        $scope.orderId = item.OrderId;
        window.location = ("/#ordercenter/details");
      };

      $scope.arrayCheck = function(item){
        if (angular.isArray(item.Items)){
          return item.Items.length;
        } else {
          return 1;
        }
      }
    }

    if ($scope.loginStatus == 'guest') {
      console.log("order center guest status");
    }

};

function OrderDetailsCtrl ($scope, $http, $location, $rootScope) {
  console.log("order details ctrl");
  
  $http.get('data/order-details.json').success(function(data) {
      $scope.orderItem = data.OrderDetails.SalesList.SalesListInfo.DOSNumberDetail.Items.Item;
      $scope.PurchasedDate = data.OrderDetails.PurchaseDate;
      $scope.SYWRMemberId = data.OrderDetails.SYWRMemberId;
      $scope.SYWRAmount = data.OrderDetails.SYWRAmount;
      $scope.OrderStatus = data.OrderDetails.OrderStatus;
      $scope.StorePickUp = data.OrderDetails.SalesList.SalesListInfo.DOSNumberDetail.FullfilmentDetails.Fulfillment;
    })
    .error(function(data) {
      console.log('order details error');
    });

};


  




