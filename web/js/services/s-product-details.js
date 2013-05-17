


angular.module('PDPDetailServices', [ 'ngResource' ]).factory('PDPDetail',
		function($resource, $http, AppConfig) {
          //  $http.defaults.headers.common['Authorization'] = 'hmac-v1 SEARSIPHONE';
			return $resource(AppConfig.getApiUrl('PRODUCT_DETAILS')+"/:productLine"+"?storeName=Sears&showSpecInd=:showSpecInd", {productLine:'@id',showSpecInd:'@id'}, {
				query : {
					method : 'GET',
					isArray : false
				}
			});
		});



angular.module('imageGallery.services', ['ngResource']).factory('ImageService',
        function($resource) {
            return $resource('data/productDetails.json', {}, {
                query : {
                    method : 'GET',
                    isArray : false
                }
            });
        });
//angular.module('reviewsServices', [ 'ngResource' ]).factory('Reviews',
//		function($resource,$http,AppConfig) {
//		delete $http.defaults.headers.common['Authorization'];
//            $http.defaults.headers.common['Authorization'] = 'hmac-v1 SEARSIPHONE';
//				return $resource(AppConfig.getApiUrl('PRODUCT_REVIEWS')+":productLine"+"&originSite=mobile&reviewType=product", {productLine:'@id'}, {
//				query : {
//					method : 'GET',
//					isArray : false
//				}
//			});
//		});

angular.module('reviewsServices', [ 'ngResource' ]).factory('Reviews',
    //    function($resource) {
		function($resource,AppConfig,$http) {
        //    $http.defaults.headers.common['Authorization'] = 'hmac-v1 SEARSIPHONE';
            return $resource(AppConfig.getApiUrl('PRODUCT_REVIEWS')+"?partNum=:productLine"+"&originSite=mobile&reviewType=product", {productLine:'@id'}, {

                //    return $resource('data/SAL_reviews.json', {}, {
            query : {
                method : 'GET',
                isArray : false
            }
        });
    });


angular.module('collectionsService', ['ngResource']).factory('Collections',
                                                             function($resource) {
                                                             return $resource('data/collections.json', {}, {
                                                                              query : {
                                                                              method : 'GET',
                                                                              isArray : false
                                                                              }
                                                                              });
                                                             });

angular.module('storeDetailServices', [ 'ngResource' ]).factory('StoreDetails',
		function($resource) {

            return $resource('http://cloudfish.herokuapp.com/store/availability/43697788?zipcode=60602', {}, { //for black  //Moutusi
				query : {
					method : 'GET',
					isArray : false
				}
			});
		});
angular.module('pdpRecommendationsService', ['ngResource']).factory('PdpRecommendations',
    function($resource, AppConfig) {
        return $resource(AppConfig.getApiUrl('PRODUCT_RECOMMENDATIONS')+"/:productLine", {productLine:'@id'}, {
            query : {
                method : 'GET',
                isArray : false
            }
        });
    });

angular.module('localAdsWeeklyServices', [ 'ngResource' ]).factory('LocalAdsWeekly',
    function($resource) {

        return $resource('data/localAds_weekly.json', {}, {
            query : {
                method : 'GET',
                isArray : false
            }
        });
    });

angular.module('messageServices', [ 'ngResource' ]).factory('mySharedService', function($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('123');
    };

    return sharedService;
});

angular.module('sessionServices', ['ngResource']).factory('isGuest', function() {
    return {
        isGuestService :{
            isGuestsss : true,
            isHard: true,
            productID: 0
        }
    }
}).factory('redirectService', ['$location', function($location) {
        return {
            redirectService :{
                getPIDFromPath: function(path){
                    var keywords = ["p-","p_","search=","keyword=","c-","s-","filter="];
                    var subPath = path.split("/");
                    if(subPath[subPath.length-1].match(keywords[0])  )  {
                        return subPath[subPath.length-1].substring(2);
                    }else if (subPath[subPath.length-1].match(keywords[1])) {
                        var tmp = subPath[subPath.length-1].split("_");
                        return  tmp[tmp.length-1] ;
                    }else{
                        return null;
                    }
                },
                parseUri : function (sourceUri){
                    var uriPartNames = ["source","protocol","authority","domain","port","path","directoryPath","fileName","query","anchor"],
                        uriParts = new RegExp("^(?:([^:/?#.]+):)?(?://)?(([^:/?#]*)(?::(\\d*))?)((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[\\?#]|$)))*/?)?([^?#/]*))?(?:\\?([^#]*))?(?:#(.*))?").exec(sourceUri),
                        uri = {};

                    for(var i = 0; i < 10; i++){
                        uri[uriPartNames[i]] = (uriParts[i] ? uriParts[i] : "");
                    }
                    /* Always end directoryPath with a trailing backslash if a path was present in the source URI
                     Note that a trailing backslash is NOT automatically inserted within or appended to the "path" key */
                    if(uri.directoryPath.length > 0){
                        uri.directoryPath = uri.directoryPath.replace(/\/?$/, "/");
                    }
                    var queryParameter = uri.query.split("&");
                    var pid = this.getPIDFromPath(uri["path"]);
                    if(pid == null){
                        return  uri;
                    }else{
                        return pid;
                    }
//                for(var i=0;i<queryParameter.length;i++){
//                    alert( queryParameter[i].split("=")[0] + "==" + decodeURIComponent(queryParameter[i].split("=")[1]));
//                }
                },
                gotoPages : function(Link){
                    var result = this.parseUri(Link);
                    if(typeof result === 'string') {
                        $location.path("/details/guest/"+ result);
                    }else{
                        $location.path('/404');
                    }

                }
            }
        }
    }]).factory('aopService', ['$rootScope','$injector', function($rootScope,$injector) {
        var _after			= 1;
        var _afterThrow		= 2;
        var _afterFinally	= 3;
        var _before			= 4;
        var _around			= 5;
        var _intro			= 6;
        var _regexEnabled = true;
        var _arguments = 'arguments';
        var _undef = 'undefined';

        var getType = (function() {

            var toString = Object.prototype.toString,
                toStrings = {},
                nodeTypes = { 1: 'element', 3: 'textnode', 9: 'document', 11: 'fragment' },
                types = 'Arguments Array Boolean Date Document Element Error Fragment Function NodeList Null Number Object RegExp String TextNode Undefined Window'.split(' ');

            for (var i = types.length; i--; ) {
                var type = types[i], constructor = window[type];
                if (constructor) {
                    try { toStrings[toString.call(new constructor)] = type.toLowerCase(); }
                    catch (e) { }
                }
            }

            return function(item) {
                return item == null && (item === undefined ? _undef : 'null') ||
                    item.nodeType && nodeTypes[item.nodeType] ||
                    typeof item.length == 'number' && (
                        item.callee && _arguments ||
                            item.alert && 'window' ||
                            item.item && 'nodelist') ||
                    toStrings[toString.call(item)];
            };

        })();

        var isFunc = function(obj) { return getType(obj) == 'function'; };

        var weaveOne = function(source, method, advice) {

            var old = source[method];

            // Work-around IE6/7 behavior on some native method that return object instances
            if (advice.type != _intro && !isFunc(old)) {
                var oldObject = old;
                old = function() {
                    var code = arguments.length > 0 ? _arguments + '[0]' : '';

                    for (var i=1;i<arguments.length;i++) {
                        code += ',' + _arguments + '[' + i + ']';
                    }

                    return eval('oldObject(' + code + ');');
                };
            }

            var aspect;
            if (advice.type == _after || advice.type == _afterThrow || advice.type == _afterFinally)
                aspect = function() {
                    var returnValue, exceptionThrown = null;

                    try {
                        returnValue = old.apply(this, arguments);
                    } catch (e) {
                        exceptionThrown = e;
                    }

                    if (advice.type == _after)
                        if (exceptionThrown == null)
                            returnValue = advice.value.apply(this, [returnValue, method]);
                        else
                            throw exceptionThrown;
                    else if (advice.type == _afterThrow && exceptionThrown != null)
                        returnValue = advice.value.apply(this, [exceptionThrown, method]);
                    else if (advice.type == _afterFinally)
                        returnValue = advice.value.apply(this, [returnValue, exceptionThrown, method]);

                    return returnValue;
                };
            else if (advice.type == _before)
                aspect = function() {
                    advice.value.apply(this, [arguments, method]);
                    return old.apply(this, arguments);
                };
            else if (advice.type == _intro)
                aspect = function() {
                    return advice.value.apply(this, arguments);
                };
            else if (advice.type == _around) {
                aspect = function() {
                    var invocation = { object: this, args: Array.prototype.slice.call(arguments) };
                    return advice.value.apply(invocation.object, [{ arguments: invocation.args, method: method, proceed :
                        function() {
                            return old.apply(invocation.object, invocation.args);
                        }
                    }] );
                };
            }

            aspect.unweave = function() {
                source[method] = old;
                pointcut = source = aspect = old = null;
            };

            source[method] = aspect;

            return aspect;

        };


        var search = function(source, pointcut, advice) {

            var methods = [];

            for (var method in source) {

                var item = null;

                // Ignore exceptions during method retrival
                try {
                    item = source[method];
                }
                catch (e) { }

                if (item != null && method.match(pointcut.method) && isFunc(item))
                    methods[methods.length] = { source: source, method: method, advice: advice };

            }

            return methods;
        };


        var weave = function(pointcut, advice) {

            var source = typeof(pointcut.target.prototype) != _undef ? pointcut.target.prototype : pointcut.target;
            var advices = [];

            // If it's not an introduction and no method was found, try with regex...
            if (advice.type != _intro && typeof(source[pointcut.method]) == _undef) {

                // First try directly on target
                var methods = search(pointcut.target, pointcut, advice);

                // No method found, re-try directly on prototype
                if (methods.length == 0)
                    methods = search(source, pointcut, advice);

                for (var i in methods)
                    advices[advices.length] = weaveOne(methods[i].source, methods[i].method, methods[i].advice);

            }
            else
            {
                // Return as an array of one element
                advices[0] = weaveOne(source, pointcut.method, advice);
            }

            return _regexEnabled ? advices : advices[0];

        };

        aop =
        {
            after : function(pointcut, advice)
            {
                return weave( pointcut, { type: _after, value: advice } );
            },


            afterThrow : function(pointcut, advice)
            {
                return weave( pointcut, { type: _afterThrow, value: advice } );
            },


            afterFinally : function(pointcut, advice)
            {
                return weave( pointcut, { type: _afterFinally, value: advice } );
            },


            before : function(pointcut, advice)
            {
                return weave( pointcut, { type: _before, value: advice } );
            },


            around : function(pointcut, advice)
            {
                return weave( pointcut, { type: _around, value: advice } );
            },

            introduction : function(pointcut, advice)
            {
                return weave( pointcut, { type: _intro, value: advice } );
            },

            setup: function(settings)
            {
                _regexEnabled = settings.regexMatch;
            },
            injectToDirective : function(aspectForWatch){
                var oldWatch = $rootScope.$watch;
                $rootScope.__proto__.$watch = function(watchExp, listener, objectEquality){
                    if(watchExp == aspectForWatch.watchExp){
                        var callingObject = this;
                        callingObject.watchAlternative =  oldWatch;
                        var oldListeners = [];
                        oldListeners.push(listener);
                        for(var i=0;i<aspectForWatch.types.length;i++){
                            if(aspectForWatch.types[i]=="before"){
                                listener = function(value){
                                    aspectForWatch.advices[aspectForWatch.types.indexOf("before")](value);
                                    oldListeners[aspectForWatch.types.indexOf("before")](value);
                                }
                                oldListeners.push(listener);
                            }else if(aspectForWatch.types[i]=="after"){
                                listener = function(value){
                                    var result = oldListeners[aspectForWatch.types.indexOf("after")](value);
                                    aspectForWatch.advices[aspectForWatch.types.indexOf("after")](result);
                                }
                                oldListeners.push(listener);
                            }
                        }
                        callingObject.watchAlternative(watchExp, listener, objectEquality) ;
                    }else{
                        this.watchAlternative =  oldWatch;
                        this.watchAlternative(watchExp, listener, objectEquality) ;
                    }
                }
            },
            injectToService : function(serviceName, aspecct){
                var oldWatch = $rootScope.$watch;
                var targetService = $injector.get(serviceName);
                if(typeof targetService[aspecct.joinPoint] == 'function') {
                    if(aspecct.type =="before"){
                        this.before( {target: targetService, method: aspecct.joinPoint},aspecct.advice);
                    }else if(aspecct.type =="after"){
                        this.after( {target: targetService, method: aspecct.joinPoint},aspecct.advice);
                    }
                }else{
                    console.log("advice is not a function!");
                }
            }
        };

    return aop;
}]).factory('dummyService', ['$location', function($location) {
    return {
            dummyFunction : function(){
                var tmp = 0;
                for(i=0;i<1000000;i++){
                    tmp = tmp + i;
                }
                return tmp;
//                alert("dummy service is done");
            }
    }
}]).factory('logService', ['$location', function($location) {
    console.log("SwordFish_log4js_Logger is running ...");
    var logger = log4javascript.getLogger("SwordFish_log4js_Logger");
    var ajaxAppender = new log4javascript.AjaxAppender("http://clientlogging.clientlogging.cloudbees.net/log4js/Log4jsseverlet.do");
    ajaxAppender.setWaitForResponse(true);
    ajaxAppender.setLayout(new log4javascript.HttpPostDataLayout());// default

    /*set up success callback function*/
    ajaxAppender.setRequestSuccessCallback(function(xmlHttp){
        /*TODO*/
        xmlHttp.onreadystatechange=function()
        {
            if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
                console.log("SwordFish_log4js_Logger Success! ---> log message has been sent successfully to server logger");
            }
        }

    });

    /* set up fail callback function*/
    ajaxAppender.setFailCallback(function(message){
        /*TODO*/
        console.log("SwordFish_log4js_Logger Failure! ---> "  + message);
    });

    logger.addAppender(ajaxAppender);

    var LogToServer = {};
    //set the LogToServer object
    LogToServer.logger= logger;

    LogToServer.sendLog= function(level, message, config){
        if(logger!= null){
            switch (level){
                case  "DEBUG":
                    logger.debug(config + message);
                    break;
                case "TRACE":
                    logger.trace(config + message);
                    break;
                case "INFO":
                    logger.info(config + message);
                    break;
                case "WARN":
                    logger.warn(config + message);
                    break;
                case "ERROR":
                    logger.error(config + message);
                    break;
                case "FATAL":
                    logger.fatal(config + message);
                    break;
                default:
                    break;

            }

        }

    }
    return  LogToServer;

}]);

angular.module('localAdsServices', [ 'ngResource' ]).factory('LocalAds',
    function($resource) {
        return $resource('data/a_b.json', {}, {
            query : {
                method : 'GET',
                isArray : false
            }
        });
    }).factory('LocalAdsCurrentLocation',function(){
        return {storeNumber:0,
            currentTemplate:"",
            listTemplateUrl:"views/local-ad/localAdsListTemplate.html",
            googleMapTemplateUrl:"views/local-ad/localAdsGoogleMapTemplate.html",
            zipCode:"60602",
            localAdsData:null
        }});

angular.module('shareServices', ['ngResource']).factory('socialShare', function() {
    return {
        shareService :{
            winLoc:"",
            prices:"",
            nameofprod:" "
        }
    }
});
angular.module('zoomServices', ['ngResource']).factory('zoomImage', function() {
    return {
        zoomService :{
             selectedImage:" "
        }
    }
});


angular.module('local_ad_categoryServices', [ 'ngResource' ]).factory('LocalAd_category',
    function($resource) {

        return $resource('data/localAd_categories.json', {}, { //for black  //Moutusi
            query : {
                method : 'GET',
                isArray : false
            }
        });
    });


angular.module('availableStoresServices',['ngResource']).factory('availableStoresSharedData',function(){
    return {
        location:{s:""},
        allStoresDetails:[],
        preferredStore:{
            perferedStoreInd:false,
            storeName:"",
            storeDistance:"",
            storeCity:"",
            storePhone:"",
            storeStock:"",
            storeAvailability:"",
            storeAddress:"",
            storeZip: "",
            storeLocation:"",
            storeshipment:"",
            g_color:"",
            g_image:"",
            storeHour:"",
            storeDays:"",
            storeDayHour:"",
            str:false
        },
        state:{
            intrestedStore:null,
            buttontype:"outOfStock",
            stusAddToCart:false,
            selected1:true
        }
    }
});
angular.module('marketPlace.services', ['ngResource']).factory('MarketPlace',
    function($resource) {
        return $resource('data/pdp_marketplace.json', {}, {
            query : {
                method : 'GET',
                isArray : false
            }
        });
    });

