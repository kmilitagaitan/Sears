
// Profile Module Services
angular.module('profileServices', ['ngResource']).
  factory('accountInfo', function($resource){
    console.log('accountInfo (in profileServices) factory is running...');
  }).
  factory('Notifications', function($resource, AppConfig){
    console.log('Notifications (in profileServices) factory is running...');
    return $resource(AppConfig.getApiUrl('NOTIFICATIONS'), {}, {
      // get: {method:'GET'},
      query: {method:'GET'}
    });
  }).
  factory('Profile', function($http, $q, AppConfig){
    function profile() {
      // Login
      this.login = function(email, password, successHandler, errorHandler) {
        var deferred = $q.defer();
        $http.defaults.headers.common['Authorization'] = 'SEARSIPHONE';
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        $http({method: 'POST',
          url: AppConfig.getApiUrl('PROFILE_LOGIN', true),
          data: {"authType":"CUSTOMER",
                 "authMethod":"DIRECT",
                 "userId": email,
                 "password": password }
        }).success(successHandler)
          .error(errorHandler);
      };

      // CAS Proxy Ticket
      this.proxyTicket = function(casTGT, service, proxyInd, successHandler, errorHandler) {
        var deferred = $q.defer();
        $http.defaults.headers.common['Authorization'] = 'SEARSIPHONE';
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        $http({method: 'POST',
          url: "https://mobile1vip.qa.ch3.s.com/mobileapi5/v1/cas/serviceticket",
          data: {"casTGT":casTGT,
            "service":service,
            "proxyInd": proxyInd }
        }).success(successHandler)
          .error(errorHandler);
      };

      // SHC SSO Login
     this.ssoLogin = function(proxyTicket, successHandler, errorHandler) {
       var deferred = $q.defer();

       var params = [];
       params['proxyTicket'] = proxyTicket;
       delete $http.defaults.headers.common['Authorization'];
        $http({method: 'GET',
          url: "http://ushofml302436.kih.kmart.com:4000/shcSSOLogin?proxyTicket=" + proxyTicket  // Internal Cloudfish server
       //   params: params
        }).success(successHandler)
          .error(errorHandler);
      };

      // Register
      this.register = function(email, password, firstName, lastName, zipcode, country, successHandler, errorHandler) {
        var deferred = $q.defer();
        $http.defaults.headers.common['Authorization'] = 'SEARSIPHONE';
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        $http({method: 'PUT',
          url: AppConfig.getApiUrl('PROFILE_REGISTER', true),
          data: {"status":"ACTIVE",
                 "firstName":firstName,
                 "lastName":lastName,
                 "zipCode":zipcode,
                 "email":email,
                 "password": password }
        }).success(successHandler)
          .error(errorHandler);
      };

      // Reset Password
      this.reset = function(email, successHandler, errorHandler) {
        var deferred = $q.defer();
        $http.defaults.headers.common['Authorization'] = 'SEARSIPHONE';
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        $http({method: 'POST',
          url: AppConfig.getApiUrl('PROFILE_RESET', true),
          data: {"logon":email }
        }).success(successHandler)
          .error(errorHandler);
      };
    };
    return new profile();
  })


