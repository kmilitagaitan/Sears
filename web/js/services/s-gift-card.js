/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

  var giftCardServices = angular.module('giftCardServices', ['ngResource']);
  giftCardServices.factory('CheckBalance', function($resource, AppConfig){
 
        
         console.log("url : "+AppConfig.getApiUrl('CHECK_BALANCE'));
        
        return $resource(AppConfig.getApiUrl('CHECK_BALANCE'), {}, {
       
       query: {method:'GET',isArray : false}
    });
    
}); 
giftCardServices.factory('GetVirtualGiftCardDetails', function($resource, AppConfig){
 
       console.log("url : "+AppConfig.getApiUrl('GET_VIRTUALGIFTCARDDETAILS'));       
       return $resource(AppConfig.getApiUrl('GET_VIRTUALGIFTCARDDETAILS'), {}, {
       query: {method:'GET',
                isArray : false}
       
    });
       
       
       
}); 

 giftCardServices.factory('PickaCard', function($resource, AppConfig){
    return $resource(AppConfig.getApiUrl('PICK_CARD'), {}, {
      query: {method:'GET'}
    });
    
 });

 giftCardServices.factory('GiftCardFilter', function($resource, AppConfig){
    return $resource(AppConfig.getApiUrl('GIFT_CARD_FILTER'), {}, {
      query: {method:'GET'}
    });
});

 giftCardServices.directive('uiValidateEquals', function() {

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            function validateEqual(myValue, otherValue) {
			//alert("myvalue:"+myValue);
			//alert("otherValue:"+otherValue);
                if (myValue === otherValue) {
                    ctrl.$setValidity('equal', true);
                    return myValue;
                } else {
                    ctrl.$setValidity('equal', false);
                    return undefined;
                }
            }

            scope.$watch(attrs.uiValidateEquals, function(otherModelValue) {
                validateEqual(ctrl.$viewValue, otherModelValue);               
            });

            ctrl.$parsers.unshift(function(viewValue) {
                return validateEqual(viewValue, scope.$eval(attrs.uiValidateEquals));
            });

            ctrl.$formatters.unshift(function(modelValue) {
                return validateEqual(modelValue, scope.$eval(attrs.uiValidateEquals));                
            });
        }
    };
});


giftCardServices.directive('amountValidateEquals', function() {

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            function validateEqual(myValue) {
			//alert("myvalue:"+myValue);
			
                if (myValue === "amount") {
                    ctrl.$setValidity('amount',false);
                    return myValue;
                } else {
                    ctrl.$setValidity('amount',true);
                    return undefined;
                }
            }

            scope.$watch(attrs.amountValidateEquals, function(otherModelValue) {
                validateEqual(ctrl.$viewValue, otherModelValue);               
            });

            ctrl.$parsers.unshift(function(viewValue) {
                return validateEqual(viewValue, scope.$eval(attrs.amountValidateEquals));
            });

            ctrl.$formatters.unshift(function(modelValue) {
                return validateEqual(modelValue, scope.$eval(attrs.amountValidateEquals));                
            });
        }
    };
});



