/* Constants */
const MOBILE = 'mobile';
const TABLET = 'tablet';

const MOBILE_HOSTNAME = 'm.sears.com';
const TABLET_HOSTNAME = 't.sears.com';

/* Service Module Definitions - Home */

// Nav Items Services
/*angular.module('navItemsServices', ['ngResource']).
directive('MyMenuData', function($resource, AppConfig){
    console.log('MyMenuData (in navItemsServices) directive is running...');
    return $resource(AppConfig.getApiUrl('NAVITEMS'), {}, {
        // scope.$watch...
    });
});*/

// Nav Items Services
angular.module('navItemsServices', []).
// factory('MyMenuData', function($resource, AppConfig){
factory('MyMenuData', function($http){
    // console.log('MyMenuData (in navItemsServices) factory is running...');
    /*return $resource(AppConfig.getApiUrl('NAVITEMS'), {}, {
        getData: {method:'GET', isArray:false}
    });*/
    var getMenu = function() {
        // Declare object.
        var myMenuData = {
            menu:[]
        };
        // Grab JSON.
        $http.get('data/nav-items.json').success(function(data) {
            myMenuData.menu = data;
        });
        return myMenuData;
    };
    return getMenu();
    // console.log('myMenuData: ',myMenuData);
});

// Deals Module Services
angular.module('dealsServices', ['ngResource']).
factory('dealsInfo', function($resource){
    console.log('dealsInfo factory is running...');
}).

factory('getDealsOfTheDayServiceSAL', function($resource, AppConfig){
     return $resource(AppConfig.getApiUrl('DEALS_OF_THE_DAY'))
    }).

         factory('getDealsOfTheDayService', function($resource){
        return $resource('data/:folder/:store/:file.json', {}, {
            query : {
                method : 'GET',
                params : {folder: 'deals', store: 'sears', file: 'deals-of-the-day'},
                isArray : false
            }
        });
    }).
factory('dealsSharedService', function($rootScope){
        var sharedService = {
            products:[],
            unfilteredProducts:[],
            end_time: '',
            start_time: ''
        };

        /*getters and setters*/
        sharedService.getProducts = function () {
            return sharedService.products;
        }

        sharedService.setProducts = function (data) {
              sharedService.products= data;
        }

        sharedService.getUnfilteredProducts = function () {
            return sharedService.unfilteredProducts;
        }

        sharedService.setUnfilteredProducts = function (data) {
            sharedService.unfilteredProducts= data;
            /*sharedService.unfilteredProducts= deepCopy(data);*/
        }

        sharedService.setEndTime= function(time){
               sharedService.end_time= time;
        }

        sharedService.getEndTime= function(){
            return sharedService.end_time;
        }

        sharedService.setStartTime= function(time){
            sharedService.start_time= time;
        }

        sharedService.getStartTime= function(){
            return sharedService.start_time;
        }


        sharedService.prepForBroadcast = function (products, msg) {
            this.products = products;
            this.broadcastItem(msg);
            console.log("dealsSharedService broadcast a message !");
        };

        sharedService.broadcastItem = function (msg) {
            $rootScope.$broadcast(msg);
        }

        return sharedService;

       /* function deepCopy(obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                var out = [], i = 0, len = obj.length;
                for ( ; i < len; i++ ) {
                    out[i] = obj[i];
                }
                return out;
            }
            if (typeof obj === 'object') {
                var out = {}, i;
                for ( i in obj ) {
                    out[i] = obj[i];
                }
                return out;
            }
            return obj;
        }*/
}).
    factory('deepCopy', function () {
        return function deepCopy(obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                var out = [], i = 0, len = obj.length;
                for ( ; i < len; i++ ) {
                    out[i] = obj[i];
                }
                return out;
            }
            if (typeof obj === 'object') {
                var out = {}, i;
                for ( i in obj ) {
                    out[i] = obj[i];
                }
                return out;
            }
            return obj;
        }
    }).
        factory('MinMaxService', function(){
            return function getMinMax(someArray){
                var minMax, prices, product;
                minMax = {};
                prices = [];
                prices = (function() {
                    var _i, _len, _results;
                    _results = [];

                    var asNumber = function(aString) {
                        return parseFloat(aString.replace(/\$/g, ''));
                    }

                    for (_i = 0, _len = someArray.length; _i < _len; _i++) {
                        product = someArray[_i];
                        if(product.RegularPrice){
                            _results.push(asNumber(product.RegularPrice));
                        }else if(product.regularPrice){
                            _results.push(asNumber(product.regularPrice));
                        }

                    }
                    return _results;
                }).call(this);

                minMax.min = Math.min.apply(Math, prices);
                minMax.max = Math.max.apply(Math, prices);
                return minMax;

            }
        });

// CMS Module Services
angular.module('cmsServices', ['ngResource']).
factory('Banner', function($resource, AppConfig){
    console.log('Banner factory is running...');
    return $resource(AppConfig.getApiUrl('SITEWORX'), {}, {
    // return $resource("http://ushofml302436.kih.kmart.com\\:4000/sears-siteworx", {}, {
        get: {method:'GET'},
        query: {method:'GET'}
    });
}).
factory('AdditionalPromos', function($resource, AppConfig){
    console.log('AdditionalPromos factory is running...');
    return $resource(AppConfig.getApiUrl('ADDITIONAL_PROMOS'), {}, {
        get: {method:'GET'},
        query: {method:'GET'}
    });
}).
factory('TECRecommendations', function($http, AppConfig) {
    console.log('TECRecommendations factory running....');
    // change this to use AppConfig
    var server='http://semantictec.com/tec/api/searsmobileasset/campaign/mhome/asset/mobileprodrecs?';
    // var server = AppConfig.getApiUrl('RECOMMENDED_PRODUCTS');
    return {
        data:{},
        get: function(recs, skipRecord, successCallback){
            var requestbuild = server+"skipRecord="+skipRecord+"&recs="+recs+"&callback=JSON_CALLBACK";
            // console.log('TEC Request',requestbuild);
            $http.jsonp(requestbuild).
                success(function(data, status, headers, config) {
                    successCallback(data, status, headers, config);
                    // console.log('TEC', data);
                }).
                error(function(data, status, headers, config) {
                    console.log("ERROR: Could not get data from TEC");
                });
        }
    }
}).
factory('RecommendedProducts', function($resource, AppConfig){      
    console.log('RecommendedProducts factory is running...');
    return $resource(AppConfig.getApiUrl('RECOMMENDED_PRODUCTS'), {}, {
        query: {method:'GET'}
    });
});

// App Config Module Services
angular.module('configServices', []).
    factory('AppConfig', function ($rootScope) {
        function appConfigService(){        
        	
        	// App Id, Environment Id & Description
            var appId = null;
        	var envId = null;
        	var envDesc = null;
        	
        	// White Label Cart & Checkout URL
        	var wlccUrl = null; 
        	
        	// List of API Names & URLs
        	var apiNames = null;
        	var apiUrls = null;   
        	
        	/**
        	 * Initializes the internal state of the AppConfig service
        	 */
        	this.init = function() {  
        		// console.log('Initializing AppConfig service...');        		
        		if (localStorage.getItem("remoteAppConfigJSON") != null || localStorage.getItem("localAppConfigJSON") != null) {        			
        			var appConfigJSON = JSON.parse(localStorage.getItem("remoteAppConfigJSON"));
                    // var appConfigJSON = null;
        			if (appConfigJSON == null) {
        				console.log('Unable to find the remoteAppConfigJSON object in $rootScope. Using localAppConfigJSON instead...');        				
        				appConfigJSON = JSON.parse(localStorage.getItem("localAppConfigJSON"));
        			} else if (appConfigJSON.length == 1) {
                        appConfigJSON =  appConfigJSON[0];
                    }
        			
        			var apiHostNameKeys = new Array();
            		var apiHostNameValues = new Array();
            		
            		apiNames = new Array();
                	apiUrls = new Array();

                    // Parse application configuration
                    if (appConfigJSON.application != null) {
                        appId = appConfigJSON.application.id;
                    }

                	// Parse environment configuration
                	if (appConfigJSON.environment != null) {
                		envId = appConfigJSON.environment.id;
                		envDesc = appConfigJSON.environment.description;
                	}
        			
                	// Parse WLCC configuration
        			if (appConfigJSON.wlccUrl != null) {
        				var urlKey = appConfigJSON.wlccUrl.url;
        				
        				for (var index=0; index < appConfigJSON.wlccUrl.url_map.length; index++) {      
        					var url = appConfigJSON.wlccUrl.url_map[index];
        					
        					if (url.hasOwnProperty(urlKey)) {
        						var descriptor = Object.getOwnPropertyDescriptor(url, urlKey);     
        						wlccUrl = descriptor.value; 
        						break;
        					}
        				}
        			}
        			
        			// Parse API hostname configuration
            		if (appConfigJSON.apiHosts != null && appConfigJSON.apiHosts.host_map != null) {            			
            			for (var index=0; index < appConfigJSON.apiHosts.host_map.length; index++) {  
            				var host = appConfigJSON.apiHosts.host_map[index];            				
            				var hostKeys = Object.keys(host);
            				
            				for (var i=0; i < hostKeys.length; i++) {
            					var key = hostKeys[i];            					
            					var descriptor = Object.getOwnPropertyDescriptor(host, key);    
            					var value = descriptor.value;        						
            					apiHostNameKeys[index] = key;
            					apiHostNameValues[index] = value;
            					break;            					
            				}            				
            			}
            		}
            		
            		// Parse API name & URL configuration
            		if (appConfigJSON.apiPaths != null) {
            			for (var index=0; index < appConfigJSON.apiPaths.length; index++) {            				
            				var apiName = appConfigJSON.apiPaths[index].name;
            				var hostKey = appConfigJSON.apiPaths[index].host;  
            				var hostname = null;
            				var apiUrl = null;            				
            				            				
            				if (apiHostNameKeys.indexOf(hostKey) > -1) {
            					hostname = apiHostNameValues[apiHostNameKeys.indexOf(hostKey)];
            				}
            				
            				for (var i=0; i < appConfigJSON.apiPaths[index].path_map.length; i++) {            				
            					var path = appConfigJSON.apiPaths[index].path_map[i]; 
            					if (path.hasOwnProperty(hostKey)) {
            						var descriptor = Object.getOwnPropertyDescriptor(path, hostKey);  
            						apiUrl = hostname + descriptor.value;
            						//console.log(apiName + '=' + apiUrl);
            						break;
            					}
            				}
            				
            				apiNames.push(apiName);
            				apiUrls.push(apiUrl); 
            			}
            		} 
            		// console.log('AppConfig service initialized...');
            		this.log();
            	} else {
            		// console.log('Unable to initialize app configuration. Cannot find remoteAppConfigJSON or localAppConfigJSON in $rootScope');
            	}
        	}        	
        	
        	/**
             * Returns a URL that points to the specified SAL API
             */
        	this.getApiUrl = function(apiName, removeEscapedPort) {
        		var apiUrl = null;
        		
        		if (apiName != null) {
        			if (apiNames == null || apiUrls == null) {
        				this.init();
        			}
        			if (apiNames != null && apiNames.indexOf(apiName) > -1) {
        				apiUrl = apiUrls[apiNames.indexOf(apiName)];
            		}        			
        		}

            if (apiUrl != null && removeEscapedPort == true) {
              apiUrl = apiUrl.replace(/\\:/, ':');
            }
            	
        		return apiUrl;
            };
            
            /**
             * Returns a URL that points to the "White Label Cart & Checkout" main page
             */
            this.getWlccUrl = function() {  
            	if (wlccUrl == null) {
            		this.init();
            	}
            	return wlccUrl;  
            };

            /**
             * Returns the application id of the app (sears, kmart, etc.)
             */
            this.getAppId = function() {
                if (appId == null) {
                    this.init();
                }
                return appId;
            };

            /**
             * Returns the environment id of the app configuration (DEV, QA, PROD, etc.)
             */
            this.getEnvId = function() {
            	if (envId == null) {
            		this.init();
            	}
            	return envId;  
            };
            
            /**
             * Returns a description of the environment (Development, Quality Insurance, Production, etc.)
             */
            this.getEnvDescription = function() {
            	if (envDesc == null) {
            		this.init();
            	}
            	return envDesc;  
            };
            
            /**
             * Logs the app configuration to the browser's console 
             */
            this.log = function() {  
            	if (apiNames == null || apiUrls == null) {
            		this.init();
            	}
            	/*console.log('****** APPLICATION CONFIGURATION ******');
            	console.log('--- Environment ---');
            	console.log('Id: ' + envId);
            	console.log('Description: ' + envDesc);            	
            	console.log('--- White Label Cart & Checkout ---');
            	console.log('Home URL: ' + wlccUrl);            	
            	console.log('--- API URLs ---'); */
            	if (apiNames != null && apiUrls != null) {            		
            		for (var index=0; index < apiNames.length; index++) { 
            			// console.log(apiNames[index] + '=' + apiUrls[index]);                    	
                	}
            	} else {
            		// console.log('no API URLs configured');
            	} 
            	// console.log('');
            };         
        };
    return new appConfigService();
}).
factory('DeviceConfig', function ($routeParams, $rootScope) {
    function deviceConfigService(){
    	var deviceType = null;
    	var deviceOS = null;    	
    	var isHybridApp = null;    	

    	this.init = function() {
    		// Device type    		
    		if (getUrlParamValue('deviceType') == MOBILE) {
    			deviceType = MOBILE; 
        	} else if (getUrlParamValue('deviceType') == TABLET) {
        		deviceType = TABLET;
            } else if ($rootScope.deviceType == MOBILE) {
            	deviceType = MOBILE;   
            } else if ($rootScope.deviceType == TABLET) {
            	deviceType = TABLET;
        	} else if (location.hostname.indexOf(MOBILE_HOSTNAME, 0) > -1) {
        		deviceType = MOBILE;   
        	} else if (location.hostname.indexOf(TABLET_HOSTNAME, 0) > -1) {
        		deviceType = TABLET;
        	} else {
        		deviceType = MOBILE; 
        	}   
    		
    		// Device OS & isHybridApp
    		var userAgent = navigator.userAgent;
    		    		
    		if (userAgent.indexOf('MobileDevice=ios') > -1) {
    			deviceOS = "ios";
    			isHybridApp = true;
    		} else if (userAgent.indexOf('MobileDevice=android') > -1) {
    			deviceOS = "android";
    			isHybridApp = true;
    		} else {
    			deviceOS = "unknown";
    			isHybridApp = false;
    		}    	
    		
    		/* test code to reader http headers
    		var xmlhttp = new XMLHttpRequest();
    		    xmlhttp.open("HEAD", "/index.html",true);    		
    		    xmlhttp.onreadystatechange=function() {
    		    if (xmlhttp.readyState==4) {
    			    var responseHeaders = xmlhttp.getAllResponseHeaders();
    			    alert(responseHeader);
    		    }
    		}   
    		xmlhttp.send(null);
    		*/
    	}
    	
        this.getDeviceType = function() {   
        	if (deviceType == null) {
        		this.init();
        	}
        	return deviceType;
        }; 
        
        this.getDeviceOS = function() {   
        	if (deviceOS == null) {
        		this.init();
        	}
        	return deviceOS;
        }; 
        
        this.isHybridApp = function() {   
        	if (isHybridApp == null) {
        		this.init();
        	}
        	return isHybridApp;        	
        }; 
        
        this.setDevice = function(deviceType) {
        	if (deviceType == MOBILE) {
        		$rootScope.deviceType = MOBILE;
        		/* Figure out a way to spoof smart phone specific CSS settings 
        		   @media only screen and (max-width: 480px) {  }
        		*/            		
        	} else if (deviceType == TABLET) {
        		$rootScope.deviceType = TABLET;
        		/* Figure out a way to spoof iPad/tablet specific CSS settings 
        		   @media only screen and (device-width: 768px) { }
        		*/
        	}            	         
        };  
        
        /* Here's a sample HTTP header that has Akamai device characteristics included. 
         * Figure out a way to parse the header and map these key/values to properties on 
         * the DeviceConfig object:
         * 
         * X-Akamai-Device-Characteristics:accept_third_party_cookie=true; ajax_preferred_geoloc_api=gears; ajax_support_javascript=true; brand_name=Google; cookie_support=true; device_os=Android; device_os_version=2.3; dual_orientation=true; flash_lite_version=3_1; full_flash_supprt=true; gif_animated=false; html_preferred_dtd=html4; is_tablet=false; is_wireless_device=true; jpg=true; marketing_name=Samsung Nexus S; max_image_height=400; max_image_width=320; mobile_browser=Android Webkit; mobile_browser_version=2.3; model_name=Nexus S; pdf_support=true; physical_screen_height=100; physical_screen_width=60; png=true; preferred_markup=html_web_4_0; resolution_height=800; resolution_width=480; viewport_initial_scale=1.0; viewport_width=device_width_token; xhtml_file_upload=supported; xhtml_preferred_charset=iso-8859-1; xhtml_support_level=4; xhtml_supports_iframe=full; xhtml_supports_table_for_layout=true; xhtml_table_support=true; xhtmlmp_preferred_mime_type=text/html
         * 
         */
                   
    };
return new deviceConfigService();
});
