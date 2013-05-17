angular.module('dealsPromosServices', []).
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
            unfilteredProducts:[]
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
            sharedService.unfilteredProducts= deepCopy(data);
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

        function deepCopy(obj) {
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
                    }

                }
                return _results;
            }).call(this);

            minMax.min = Math.min.apply(Math, prices);
            minMax.max = Math.max.apply(Math, prices);
            return minMax;

        }
    });


