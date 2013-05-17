

angular.module('loadingOnAJAX', []).config(function($httpProvider) {
    var numLoadings = 0;
    var loadingScreen = $('<div style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:10000;background-color:gray;background-color:rgba(70,70,70,0.2);"><img style="background-image:url();position:absolute;top:50%;left:50%;width:16%;height:16%" alt="" src="images/loader-blue.gif"/></div>')
        .appendTo($('body')).hide();
    $httpProvider.responseInterceptors.push(function() {
        return function(promise) {
            numLoadings++;
            loadingScreen.show();
            var hide = function(r) { if (!(--numLoadings)) loadingScreen.hide(); return r; };
            return promise.then(hide, hide);
        };
    });
});


angular.module('globalErrors', []).config(function($provide, $httpProvider, $compileProvider) {
    var elementsList = $('body');

    var showMessage = function(content, cl, time) {
        $('<div></div>')
            .addClass('message')
            .addClass(cl)
            .hide()
            .fadeIn('fast')
            .delay(time)
            .fadeOut('fast', function() { $(this).remove(); })
            .appendTo(elementsList)
            .text(content);
    };

    $httpProvider.responseInterceptors.push(function($timeout, $q) {
        return function(promise) {
            return promise.then(function(successResponse) {
                if (successResponse.config.method.toUpperCase() != 'GET')
                    showMessage('Success', 'successMessage', 5000);
                return successResponse;

            }, function(errorResponse) {
                switch (errorResponse.status) {
                    case 401:
                        showMessage('Wrong usename or password', 'errorMessage'+errorResponse.status, 20000);
                        break;
                    case 403:
                        showMessage('You don\'t have the right to do this', 'errorMessage'+errorResponse.status, 20000);
                        break;
                    case 404:
						showMessage('Server internal 404 error' ,'errorMessage'+errorResponse.status, 4000);     //tobe changed
						//showMessage('Server internal 404 error' ,'errorMessage'+errorResponse.status, 4000);     //tobe changed
                        $location.path("/404_network");
                        break;
                    case 500:
                        showMessage('Server internal error: ' + errorResponse.data, 'errorMessage'+errorResponse.status, 20000);
                        break;
                    default:
                    //showMessage('Error ' + errorResponse.status + ': ' + errorResponse.data, 'errorMessage', 20000);
                }
                return $q.reject(errorResponse);
            });
        };
    });

    $compileProvider.directive('appMessages', function() {
        var directiveDefinitionObject = {
            link: function(scope, element, attrs) { elementsList.push($(element)); }
        };
        return directiveDefinitionObject;
    });
});
