 function wlccUpdateCount(count){	

	if( localStorage.wlccUserAgent == "IOS"){
        
        var iframe = document.createElement("IFRAME");
		iframe.setAttribute("src", "?"+"wlccUpdateCount"+ ":"+ count);
		//console.log(iframe.getAttribute("src"));
		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;
		
    }else if( localStorage.wlccUserAgent == "ANDROID"){

		Android.updateCount(count);
//		Android.wlcc_update_count(count)
	}else{
		//console.log("This is MWEb");
	}
};

 function wlccProductDetails(partNo){

	
	if( localStorage.wlccUserAgent == "IOS"){
		var iframe = document.createElement("IFRAME");
		iframe.setAttribute("src", "?"+"wlccProductDetails" + ":" + partNo);
		//console.log(iframe.getAttribute("src"));
		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;

	}else if( localStorage.wlccUserAgent == "ANDROID"){

//		Android.wlcc_view_product_details(partNo);

		Android.productDetails(partNo);

	}else{
		//console.log("This is MWEb");
		var origin = window.location.origin;
		window.location.href = origin +"/SEARS_WAP/productdetails.do?partNumber="+ partNo; // for now
//		window.location.href = origin +"/productdetails.do?partNumber="+ partNo; // for production
		
		
		// link to redirect : mobile303p.qa.ch3.s.com/SEARS_WAP/productdetails.do?partNumber=xxxxxx
	}
};
 
 
  //loginKey only needed for ios
 function wlcclogin(){

	if( localStorage.wlccUserAgent == "IOS"){
		var iframe = document.createElement("IFRAME");
		iframe.setAttribute("src", "?"+"login");
		//console.log(iframe.getAttribute("src"));
		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;

	}else if( localStorage.wlccUserAgent == "ANDROID"){
		Android.wlcc_login();
	}else{
		//console.log("This is MWEb");
		var origin = window.location.origin;
		window.location.href ='https://mobile3vip.qa.ch3.s.com/SEARS_WAP/logIn.do'// for now
//		window.location.href = origin +"/logIn.do // for production
	}
};

function wlccForgotPassword() {
	if( localStorage.wlccUserAgent == "IOS"){		

	}else if( localStorage.wlccUserAgent == "ANDROID"){   

	}else{
		var origin = window.location.origin;
		var pathname = window.location.pathname;

		if (cartConfig.fiveEight == true) { 
			window.location.href = cartConfig.forgotPassword;
		}else if(window.location.hostname == "localhost" && pathname != undefined){
			window.location.href = origin + pathname;
		}else if(window.location.hostname == "localhost" && pathname == undefined){
			window.location.href = origin;
		}else if(origin == "http://mobile303p.qa.ch3.s.com:8180" || origin == "http://m.sears.com"){ //not sure about this
			window.location.href = cartConfig.forgotPassword;
		}else{
			window.location.href = origin;
		}
	}
};


  function wlccContinueShopping(){

	if( localStorage.wlccUserAgent == "IOS"){
		
        var iframe = document.createElement("IFRAME");
		iframe.setAttribute("src", "?"+"wlccContinueShopping");
		//console.log(iframe.getAttribute("src"));
		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;
	
	}else if( localStorage.wlccUserAgent == "ANDROID"){
		   
		   Android.wlcc_continue_shopping()
	}else{
		localStorage.removeItem("token");
		var origin = window.location.origin;
		var pathname = window.location.pathname;
		//eventually should redirect to home page :  m.sears.com
		//console.log(window.location);
		if (cartConfig.fiveEight == true) { 
			//console.log("cartConfig.fiveEight: " + cartConfig.fiveEight);
			window.location.href = "https://mobile3vip.qa.ch3.s.com/SEARS_WAP/sears_Home.jsp";
//			window.location.href = origin + "/SEARS_WAP/sears_Home.jsp"; // for now
//  		window.location.href = origin + "/sears_Home.jsp"; // for production
		}else if(window.location.hostname == "localhost" && pathname != undefined){
			window.location.href = origin + pathname;
		}else if(window.location.hostname == "localhost" && pathname == undefined){
			window.location.href = origin;
		}else if(origin == "http://mobile303p.qa.ch3.s.com:8180"){ //not sure about this
			window.location.href = "https://mobile3vip.qa.ch3.s.com/SEARS_WAP/sears_Home.jsp";
		}else{
			window.location.href = origin;
		}
	}
};

 function updateCartCnt(qty) {
    $.ajax({
        type: "POST",
        url: "wlccUpdate.do?cartCnt="+ qty +"&method=updateCartCnt"
    }).success(function(){
        $('span.cartnumber').text(qty);
    }).error(function(){
        //console.log('error'); 
    });
};
function updateLoggedIn(email, sID){
  var person = email.split('@');
  var name = person[0];
  $.ajax({
      type: "POST",
      url: "wlccUpdate.do?method=updateLogin&skey="+sID+"&userType=signedInUser&email="+email
  }).success(function(){
      $('div.spacer').html("Welcome, |<br>"+name);
      $('.ui-header .signIn').css({display: "none"});
      if($('.signed-user').length >0){$('div.spacer').hide();}
      $('div.newCustomer').html("<a href='logout.do' rel='external' style='color: #2489CE'>log out</a>");
  }).error(function(){
      //console.log('error'); 
  });
};servlet_url = "http://mobile303p.qa.ch3.s.com:8180/wlcc_dispatcher/service/rest/";

//SCREEN SERVICE URLS
poViewCart_url = servlet_url + 'cart/POViewCart?';
viewCart_url = servlet_url + 'cart/ViewCart?';
addToCart_url = servlet_url + 'cart/AddtoCart?';
storePickupContinue_url = servlet_url + 'cart/StorePickupContinue?';
updateCart_url = servlet_url + 'cart/UpdateCart?';
proceedCheckout_url = servlet_url + 'checkout/ProceedCheckout?';
continueCheckout_url = servlet_url + 'checkout/ContinueCheckout?';
payBill_url = servlet_url + 'checkout/PayBill?';
placeOrder_url = servlet_url + 'checkout/PlaceOrder?';
handleAddress_url = servlet_url + 'checkout/HandleAddress?';
applyorRemovePromoCode_url = servlet_url + 'checkout/ApplyorRemovePromoCode?';
handleInstallation_url = servlet_url + 'product-option/HandleInstallation?';
applyPO_url = servlet_url + 'product-option/ApplyProductOption?';
removePO_url = servlet_url + "product-option/RemoveProductOption?";
viewProfile_url = servlet_url + 'UtilService/ViewProfile?';
/**
 * @license AngularJS v1.0.4
 * (c) 2010-2012 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {
'use strict';

/**
 * @ngdoc overview
 * @name ngResource
 * @description
 */

/**
 * @ngdoc object
 * @name ngResource.$resource
 * @requires $http
 *
 * @description
 * A factory which creates a resource object that lets you interact with
 * [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) server-side data sources.
 *
 * The returned resource object has action methods which provide high-level behaviors without
 * the need to interact with the low level {@link ng.$http $http} service.
 *
 * @param {string} url A parameterized URL template with parameters prefixed by `:` as in
 *   `/user/:username`. If you are using a URL with a port number (e.g. 
 *   `http://example.com:8080/api`), you'll need to escape the colon character before the port
 *   number, like this: `$resource('http://example.com\\:8080/api')`.
 *
 * @param {Object=} paramDefaults Default values for `url` parameters. These can be overridden in
 *   `actions` methods.
 *
 *   Each key value in the parameter object is first bound to url template if present and then any
 *   excess keys are appended to the url search query after the `?`.
 *
 *   Given a template `/path/:verb` and parameter `{verb:'greet', salutation:'Hello'}` results in
 *   URL `/path/greet?salutation=Hello`.
 *
 *   If the parameter value is prefixed with `@` then the value of that parameter is extracted from
 *   the data object (useful for non-GET operations).
 *
 * @param {Object.<Object>=} actions Hash with declaration of custom action that should extend the
 *   default set of resource actions. The declaration should be created in the following format:
 *
 *       {action1: {method:?, params:?, isArray:?},
 *        action2: {method:?, params:?, isArray:?},
 *        ...}
 *
 *   Where:
 *
 *   - `action` – {string} – The name of action. This name becomes the name of the method on your
 *     resource object.
 *   - `method` – {string} – HTTP request method. Valid methods are: `GET`, `POST`, `PUT`, `DELETE`,
 *     and `JSONP`
 *   - `params` – {object=} – Optional set of pre-bound parameters for this action.
 *   - isArray – {boolean=} – If true then the returned object for this action is an array, see
 *     `returns` section.
 *
 * @returns {Object} A resource "class" object with methods for the default set of resource actions
 *   optionally extended with custom `actions`. The default set contains these actions:
 *
 *       { 'get':    {method:'GET'},
 *         'save':   {method:'POST'},
 *         'query':  {method:'GET', isArray:true},
 *         'remove': {method:'DELETE'},
 *         'delete': {method:'DELETE'} };
 *
 *   Calling these methods invoke an {@link ng.$http} with the specified http method,
 *   destination and parameters. When the data is returned from the server then the object is an
 *   instance of the resource class `save`, `remove` and `delete` actions are available on it as
 *   methods with the `$` prefix. This allows you to easily perform CRUD operations (create, read,
 *   update, delete) on server-side data like this:
 *   <pre>
        var User = $resource('/user/:userId', {userId:'@id'});
        var user = User.get({userId:123}, function() {
          user.abc = true;
          user.$save();
        });
     </pre>
 *
 *   It is important to realize that invoking a $resource object method immediately returns an
 *   empty reference (object or array depending on `isArray`). Once the data is returned from the
 *   server the existing reference is populated with the actual data. This is a useful trick since
 *   usually the resource is assigned to a model which is then rendered by the view. Having an empty
 *   object results in no rendering, once the data arrives from the server then the object is
 *   populated with the data and the view automatically re-renders itself showing the new data. This
 *   means that in most case one never has to write a callback function for the action methods.
 *
 *   The action methods on the class object or instance object can be invoked with the following
 *   parameters:
 *
 *   - HTTP GET "class" actions: `Resource.action([parameters], [success], [error])`
 *   - non-GET "class" actions: `Resource.action([parameters], postData, [success], [error])`
 *   - non-GET instance actions:  `instance.$action([parameters], [success], [error])`
 *
 *
 * @example
 *
 * # Credit card resource
 *
 * <pre>
     // Define CreditCard class
     var CreditCard = $resource('/user/:userId/card/:cardId',
      {userId:123, cardId:'@id'}, {
       charge: {method:'POST', params:{charge:true}}
      });

     // We can retrieve a collection from the server
     var cards = CreditCard.query(function() {
       // GET: /user/123/card
       // server returns: [ {id:456, number:'1234', name:'Smith'} ];

       var card = cards[0];
       // each item is an instance of CreditCard
       expect(card instanceof CreditCard).toEqual(true);
       card.name = "J. Smith";
       // non GET methods are mapped onto the instances
       card.$save();
       // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'}
       // server returns: {id:456, number:'1234', name: 'J. Smith'};

       // our custom method is mapped as well.
       card.$charge({amount:9.99});
       // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}
     });

     // we can create an instance as well
     var newCard = new CreditCard({number:'0123'});
     newCard.name = "Mike Smith";
     newCard.$save();
     // POST: /user/123/card {number:'0123', name:'Mike Smith'}
     // server returns: {id:789, number:'01234', name: 'Mike Smith'};
     expect(newCard.id).toEqual(789);
 * </pre>
 *
 * The object returned from this function execution is a resource "class" which has "static" method
 * for each action in the definition.
 *
 * Calling these methods invoke `$http` on the `url` template with the given `method` and `params`.
 * When the data is returned from the server then the object is an instance of the resource type and
 * all of the non-GET methods are available with `$` prefix. This allows you to easily support CRUD
 * operations (create, read, update, delete) on server-side data.

   <pre>
     var User = $resource('/user/:userId', {userId:'@id'});
     var user = User.get({userId:123}, function() {
       user.abc = true;
       user.$save();
     });
   </pre>
 *
 *     It's worth noting that the success callback for `get`, `query` and other method gets passed
 *     in the response that came from the server as well as $http header getter function, so one
 *     could rewrite the above example and get access to http headers as:
 *
   <pre>
     var User = $resource('/user/:userId', {userId:'@id'});
     User.get({userId:123}, function(u, getResponseHeaders){
       u.abc = true;
       u.$save(function(u, putResponseHeaders) {
         //u => saved user object
         //putResponseHeaders => $http header getter
       });
     });
   </pre>

 * # Buzz client

   Let's look at what a buzz client created with the `$resource` service looks like:
    <doc:example>
      <doc:source jsfiddle="false">
       <script>
         function BuzzController($resource) {
           this.userId = 'googlebuzz';
           this.Activity = $resource(
             'https://www.googleapis.com/buzz/v1/activities/:userId/:visibility/:activityId/:comments',
             {alt:'json', callback:'JSON_CALLBACK'},
             {get:{method:'JSONP', params:{visibility:'@self'}}, replies: {method:'JSONP', params:{visibility:'@self', comments:'@comments'}}}
           );
         }

         BuzzController.prototype = {
           fetch: function() {
             this.activities = this.Activity.get({userId:this.userId});
           },
           expandReplies: function(activity) {
             activity.replies = this.Activity.replies({userId:this.userId, activityId:activity.id});
           }
         };
         BuzzController.$inject = ['$resource'];
       </script>

       <div ng-controller="BuzzController">
         <input ng-model="userId"/>
         <button ng-click="fetch()">fetch</button>
         <hr/>
         <div ng-repeat="item in activities.data.items">
           <h1 style="font-size: 15px;">
             <img src="{{item.actor.thumbnailUrl}}" style="max-height:30px;max-width:30px;"/>
             <a href="{{item.actor.profileUrl}}">{{item.actor.name}}</a>
             <a href ng-click="expandReplies(item)" style="float: right;">Expand replies: {{item.links.replies[0].count}}</a>
           </h1>
           {{item.object.content | html}}
           <div ng-repeat="reply in item.replies.data.items" style="margin-left: 20px;">
             <img src="{{reply.actor.thumbnailUrl}}" style="max-height:30px;max-width:30px;"/>
             <a href="{{reply.actor.profileUrl}}">{{reply.actor.name}}</a>: {{reply.content | html}}
           </div>
         </div>
       </div>
      </doc:source>
      <doc:scenario>
      </doc:scenario>
    </doc:example>
 */
angular.module('ngResource', ['ng']).
  factory('$resource', ['$http', '$parse', function($http, $parse) {
    var DEFAULT_ACTIONS = {
      'get':    {method:'GET'},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}
    };
    var noop = angular.noop,
        forEach = angular.forEach,
        extend = angular.extend,
        copy = angular.copy,
        isFunction = angular.isFunction,
        getter = function(obj, path) {
          return $parse(path)(obj);
        };

    /**
     * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
     * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set (pchar) allowed in path
     * segments:
     *    segment       = *pchar
     *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
     *    pct-encoded   = "%" HEXDIG HEXDIG
     *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
     *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
     *                     / "*" / "+" / "," / ";" / "="
     */
    function encodeUriSegment(val) {
      return encodeUriQuery(val, true).
        replace(/%26/gi, '&').
        replace(/%3D/gi, '=').
        replace(/%2B/gi, '+');
    }


    /**
     * This method is intended for encoding *key* or *value* parts of query component. We need a custom
     * method becuase encodeURIComponent is too agressive and encodes stuff that doesn't have to be
     * encoded per http://tools.ietf.org/html/rfc3986:
     *    query       = *( pchar / "/" / "?" )
     *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
     *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
     *    pct-encoded   = "%" HEXDIG HEXDIG
     *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
     *                     / "*" / "+" / "," / ";" / "="
     */
    function encodeUriQuery(val, pctEncodeSpaces) {
      return encodeURIComponent(val).
        replace(/%40/gi, '@').
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace((pctEncodeSpaces ? null : /%20/g), '+');
    }

    function Route(template, defaults) {
      this.template = template = template + '#';
      this.defaults = defaults || {};
      var urlParams = this.urlParams = {};
      forEach(template.split(/\W/), function(param){
        if (param && template.match(new RegExp("[^\\\\]:" + param + "\\W"))) {
          urlParams[param] = true;
        }
      });
      this.template = template.replace(/\\:/g, ':');
    }

    Route.prototype = {
      url: function(params) {
        var self = this,
            url = this.template,
            val,
            encodedVal;

        params = params || {};
        forEach(this.urlParams, function(_, urlParam){
          val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
          if (angular.isDefined(val) && val !== null) {
            encodedVal = encodeUriSegment(val);
            url = url.replace(new RegExp(":" + urlParam + "(\\W)", "g"), encodedVal + "$1");
          } else {
            url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W)", "g"), function(match,
                leadingSlashes, tail) {
              if (tail.charAt(0) == '/') {
                return tail;
              } else {
                return leadingSlashes + tail;
              }
            });
          }
        });
        url = url.replace(/\/?#$/, '');
        var query = [];
        forEach(params, function(value, key){
          if (!self.urlParams[key]) {
            query.push(encodeUriQuery(key) + '=' + encodeUriQuery(value));
          }
        });
        query.sort();
        url = url.replace(/\/*$/, '');
        return url + (query.length ? '?' + query.join('&') : '');
      }
    };


    function ResourceFactory(url, paramDefaults, actions) {
      var route = new Route(url);

      actions = extend({}, DEFAULT_ACTIONS, actions);

      function extractParams(data, actionParams){
        var ids = {};
        actionParams = extend({}, paramDefaults, actionParams);
        forEach(actionParams, function(value, key){
          ids[key] = value.charAt && value.charAt(0) == '@' ? getter(data, value.substr(1)) : value;
        });
        return ids;
      }

      function Resource(value){
        copy(value || {}, this);
      }

      forEach(actions, function(action, name) {
        action.method = angular.uppercase(action.method);
        var hasBody = action.method == 'POST' || action.method == 'PUT' || action.method == 'PATCH';
        Resource[name] = function(a1, a2, a3, a4) {
          var params = {};
          var data;
          var success = noop;
          var error = null;
          switch(arguments.length) {
          case 4:
            error = a4;
            success = a3;
            //fallthrough
          case 3:
          case 2:
            if (isFunction(a2)) {
              if (isFunction(a1)) {
                success = a1;
                error = a2;
                break;
              }

              success = a2;
              error = a3;
              //fallthrough
            } else {
              params = a1;
              data = a2;
              success = a3;
              break;
            }
          case 1:
            if (isFunction(a1)) success = a1;
            else if (hasBody) data = a1;
            else params = a1;
            break;
          case 0: break;
          default:
            throw "Expected between 0-4 arguments [params, data, success, error], got " +
              arguments.length + " arguments.";
          }

          var value = this instanceof Resource ? this : (action.isArray ? [] : new Resource(data));
          $http({
            method: action.method,
            url: route.url(extend({}, extractParams(data, action.params || {}), params)),
            data: data
          }).then(function(response) {
              var data = response.data;

              if (data) {
                if (action.isArray) {
                  value.length = 0;
                  forEach(data, function(item) {
                    value.push(new Resource(item));
                  });
                } else {
                  copy(data, value);
                }
              }
              (success||noop)(value, response.headers);
            }, error);

          return value;
        };


        Resource.prototype['$' + name] = function(a1, a2, a3) {
          var params = extractParams(this),
              success = noop,
              error;

          switch(arguments.length) {
          case 3: params = a1; success = a2; error = a3; break;
          case 2:
          case 1:
            if (isFunction(a1)) {
              success = a1;
              error = a2;
            } else {
              params = a1;
              success = a2 || noop;
            }
          case 0: break;
          default:
            throw "Expected between 1-3 arguments [params, success, error], got " +
              arguments.length + " arguments.";
          }
          var data = hasBody ? this : undefined;
          Resource[name].call(this, params, data, success, error);
        };
      });

      Resource.bind = function(additionalParamDefaults){
        return ResourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
      };

      return Resource;
    }

    return ResourceFactory;
  }]);

})(window, window.angular);
;(function(a){String.prototype.trim===a&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),Array.prototype.reduce===a&&(Array.prototype.reduce=function(b){if(this===void 0||this===null)throw new TypeError;var c=Object(this),d=c.length>>>0,e=0,f;if(typeof b!="function")throw new TypeError;if(d==0&&arguments.length==1)throw new TypeError;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);while(e<d)e in c&&(f=b.call(a,f,c[e],e,c)),e++;return f})})();var Zepto=function(){function E(a){return a==null?String(a):y[z.call(a)]||"object"}function F(a){return E(a)=="function"}function G(a){return a!=null&&a==a.window}function H(a){return a!=null&&a.nodeType==a.DOCUMENT_NODE}function I(a){return E(a)=="object"}function J(a){return I(a)&&!G(a)&&a.__proto__==Object.prototype}function K(a){return a instanceof Array}function L(a){return typeof a.length=="number"}function M(a){return g.call(a,function(a){return a!=null})}function N(a){return a.length>0?c.fn.concat.apply([],a):a}function O(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function P(a){return a in j?j[a]:j[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function Q(a,b){return typeof b=="number"&&!l[O(a)]?b+"px":b}function R(a){var b,c;return i[a]||(b=h.createElement(a),h.body.appendChild(b),c=k(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),c=="none"&&(c="block"),i[a]=c),i[a]}function S(a){return"children"in a?f.call(a.children):c.map(a.childNodes,function(a){if(a.nodeType==1)return a})}function T(c,d,e){for(b in d)e&&(J(d[b])||K(d[b]))?(J(d[b])&&!J(c[b])&&(c[b]={}),K(d[b])&&!K(c[b])&&(c[b]=[]),T(c[b],d[b],e)):d[b]!==a&&(c[b]=d[b])}function U(b,d){return d===a?c(b):c(b).filter(d)}function V(a,b,c,d){return F(b)?b.call(a,c,d):b}function W(a,b,c){c==null?a.removeAttribute(b):a.setAttribute(b,c)}function X(b,c){var d=b.className,e=d&&d.baseVal!==a;if(c===a)return e?d.baseVal:d;e?d.baseVal=c:b.className=c}function Y(a){var b;try{return a?a=="true"||(a=="false"?!1:a=="null"?null:isNaN(b=Number(a))?/^[\[\{]/.test(a)?c.parseJSON(a):a:b):a}catch(d){return a}}function Z(a,b){b(a);for(var c in a.childNodes)Z(a.childNodes[c],b)}var a,b,c,d,e=[],f=e.slice,g=e.filter,h=window.document,i={},j={},k=h.defaultView.getComputedStyle,l={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},m=/^\s*<(\w+|!)[^>]*>/,n=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,o=/^(?:body|html)$/i,p=["val","css","html","text","data","width","height","offset"],q=["after","prepend","before","append"],r=h.createElement("table"),s=h.createElement("tr"),t={tr:h.createElement("tbody"),tbody:r,thead:r,tfoot:r,td:s,th:s,"*":h.createElement("div")},u=/complete|loaded|interactive/,v=/^\.([\w-]+)$/,w=/^#([\w-]*)$/,x=/^[\w-]+$/,y={},z=y.toString,A={},B,C,D=h.createElement("div");return A.matches=function(a,b){if(!a||a.nodeType!==1)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=D).appendChild(a),d=~A.qsa(e,b).indexOf(a),f&&D.removeChild(a),d},B=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},C=function(a){return g.call(a,function(b,c){return a.indexOf(b)==c})},A.fragment=function(b,d,e){b.replace&&(b=b.replace(n,"<$1></$2>")),d===a&&(d=m.test(b)&&RegExp.$1),d in t||(d="*");var g,h,i=t[d];return i.innerHTML=""+b,h=c.each(f.call(i.childNodes),function(){i.removeChild(this)}),J(e)&&(g=c(h),c.each(e,function(a,b){p.indexOf(a)>-1?g[a](b):g.attr(a,b)})),h},A.Z=function(a,b){return a=a||[],a.__proto__=c.fn,a.selector=b||"",a},A.isZ=function(a){return a instanceof A.Z},A.init=function(b,d){if(!b)return A.Z();if(F(b))return c(h).ready(b);if(A.isZ(b))return b;var e;if(K(b))e=M(b);else if(I(b))e=[J(b)?c.extend({},b):b],b=null;else if(m.test(b))e=A.fragment(b.trim(),RegExp.$1,d),b=null;else{if(d!==a)return c(d).find(b);e=A.qsa(h,b)}return A.Z(e,b)},c=function(a,b){return A.init(a,b)},c.extend=function(a){var b,c=f.call(arguments,1);return typeof a=="boolean"&&(b=a,a=c.shift()),c.forEach(function(c){T(a,c,b)}),a},A.qsa=function(a,b){var c;return H(a)&&w.test(b)?(c=a.getElementById(RegExp.$1))?[c]:[]:a.nodeType!==1&&a.nodeType!==9?[]:f.call(v.test(b)?a.getElementsByClassName(RegExp.$1):x.test(b)?a.getElementsByTagName(b):a.querySelectorAll(b))},c.contains=function(a,b){return a!==b&&a.contains(b)},c.type=E,c.isFunction=F,c.isWindow=G,c.isArray=K,c.isPlainObject=J,c.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},c.inArray=function(a,b,c){return e.indexOf.call(b,a,c)},c.camelCase=B,c.trim=function(a){return a.trim()},c.uuid=0,c.support={},c.expr={},c.map=function(a,b){var c,d=[],e,f;if(L(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return N(d)},c.each=function(a,b){var c,d;if(L(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},c.grep=function(a,b){return g.call(a,b)},window.JSON&&(c.parseJSON=JSON.parse),c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){y["[object "+b+"]"]=b.toLowerCase()}),c.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,sort:e.sort,indexOf:e.indexOf,concat:e.concat,map:function(a){return c(c.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return c(f.apply(this,arguments))},ready:function(a){return u.test(h.readyState)?a(c):h.addEventListener("DOMContentLoaded",function(){a(c)},!1),this},get:function(b){return b===a?f.call(this):this[b>=0?b:b+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return e.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return F(a)?this.not(this.not(a)):c(g.call(this,function(b){return A.matches(b,a)}))},add:function(a,b){return c(C(this.concat(c(a,b))))},is:function(a){return this.length>0&&A.matches(this[0],a)},not:function(b){var d=[];if(F(b)&&b.call!==a)this.each(function(a){b.call(this,a)||d.push(this)});else{var e=typeof b=="string"?this.filter(b):L(b)&&F(b.item)?f.call(b):c(b);this.forEach(function(a){e.indexOf(a)<0&&d.push(a)})}return c(d)},has:function(a){return this.filter(function(){return I(a)?c.contains(this,a):c(this).find(a).size()})},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!I(a)?a:c(a)},last:function(){var a=this[this.length-1];return a&&!I(a)?a:c(a)},find:function(a){var b,d=this;return typeof a=="object"?b=c(a).filter(function(){var a=this;return e.some.call(d,function(b){return c.contains(b,a)})}):this.length==1?b=c(A.qsa(this[0],a)):b=this.map(function(){return A.qsa(this,a)}),b},closest:function(a,b){var d=this[0],e=!1;typeof a=="object"&&(e=c(a));while(d&&!(e?e.indexOf(d)>=0:A.matches(d,a)))d=d!==b&&!H(d)&&d.parentNode;return c(d)},parents:function(a){var b=[],d=this;while(d.length>0)d=c.map(d,function(a){if((a=a.parentNode)&&!H(a)&&b.indexOf(a)<0)return b.push(a),a});return U(b,a)},parent:function(a){return U(C(this.pluck("parentNode")),a)},children:function(a){return U(this.map(function(){return S(this)}),a)},contents:function(){return this.map(function(){return f.call(this.childNodes)})},siblings:function(a){return U(this.map(function(a,b){return g.call(S(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return c.map(this,function(b){return b[a]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null),k(this,"").getPropertyValue("display")=="none"&&(this.style.display=R(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var b=F(a);if(this[0]&&!b)var d=c(a).get(0),e=d.parentNode||this.length>1;return this.each(function(f){c(this).wrapAll(b?a.call(this,f):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){c(this[0]).before(a=c(a));var b;while((b=a.children()).length)a=b.first();c(a).append(this)}return this},wrapInner:function(a){var b=F(a);return this.each(function(d){var e=c(this),f=e.contents(),g=b?a.call(this,d):a;f.length?f.wrapAll(g):e.append(g)})},unwrap:function(){return this.parent().each(function(){c(this).replaceWith(c(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(b){return this.each(function(){var d=c(this);(b===a?d.css("display")=="none":b)?d.show():d.hide()})},prev:function(a){return c(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return c(this.pluck("nextElementSibling")).filter(a||"*")},html:function(b){return b===a?this.length>0?this[0].innerHTML:null:this.each(function(a){var d=this.innerHTML;c(this).empty().append(V(this,b,a,d))})},text:function(b){return b===a?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=b})},attr:function(c,d){var e;return typeof c=="string"&&d===a?this.length==0||this[0].nodeType!==1?a:c=="value"&&this[0].nodeName=="INPUT"?this.val():!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:this.each(function(a){if(this.nodeType!==1)return;if(I(c))for(b in c)W(this,b,c[b]);else W(this,c,V(this,d,a,this.getAttribute(c)))})},removeAttr:function(a){return this.each(function(){this.nodeType===1&&W(this,a)})},prop:function(b,c){return c===a?this[0]&&this[0][b]:this.each(function(a){this[b]=V(this,c,a,this[b])})},data:function(b,c){var d=this.attr("data-"+O(b),c);return d!==null?Y(d):a},val:function(b){return b===a?this[0]&&(this[0].multiple?c(this[0]).find("option").filter(function(a){return this.selected}).pluck("value"):this[0].value):this.each(function(a){this.value=V(this,b,a,this.value)})},offset:function(a){if(a)return this.each(function(b){var d=c(this),e=V(this,a,b,d.offset()),f=d.offsetParent().offset(),g={top:e.top-f.top,left:e.left-f.left};d.css("position")=="static"&&(g.position="relative"),d.css(g)});if(this.length==0)return null;var b=this[0].getBoundingClientRect();return{left:b.left+window.pageXOffset,top:b.top+window.pageYOffset,width:Math.round(b.width),height:Math.round(b.height)}},css:function(a,c){if(arguments.length<2&&typeof a=="string")return this[0]&&(this[0].style[B(a)]||k(this[0],"").getPropertyValue(a));var d="";if(E(a)=="string")!c&&c!==0?this.each(function(){this.style.removeProperty(O(a))}):d=O(a)+":"+Q(a,c);else for(b in a)!a[b]&&a[b]!==0?this.each(function(){this.style.removeProperty(O(b))}):d+=O(b)+":"+Q(b,a[b])+";";return this.each(function(){this.style.cssText+=";"+d})},index:function(a){return a?this.indexOf(c(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return e.some.call(this,function(a){return this.test(X(a))},P(a))},addClass:function(a){return this.each(function(b){d=[];var e=X(this),f=V(this,a,b,e);f.split(/\s+/g).forEach(function(a){c(this).hasClass(a)||d.push(a)},this),d.length&&X(this,e+(e?" ":"")+d.join(" "))})},removeClass:function(b){return this.each(function(c){if(b===a)return X(this,"");d=X(this),V(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(P(a)," ")}),X(this,d.trim())})},toggleClass:function(b,d){return this.each(function(e){var f=c(this),g=V(this,b,e,X(this));g.split(/\s+/g).forEach(function(b){(d===a?!f.hasClass(b):d)?f.addClass(b):f.removeClass(b)})})},scrollTop:function(){if(!this.length)return;return"scrollTop"in this[0]?this[0].scrollTop:this[0].scrollY},position:function(){if(!this.length)return;var a=this[0],b=this.offsetParent(),d=this.offset(),e=o.test(b[0].nodeName)?{top:0,left:0}:b.offset();return d.top-=parseFloat(c(a).css("margin-top"))||0,d.left-=parseFloat(c(a).css("margin-left"))||0,e.top+=parseFloat(c(b[0]).css("border-top-width"))||0,e.left+=parseFloat(c(b[0]).css("border-left-width"))||0,{top:d.top-e.top,left:d.left-e.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||h.body;while(a&&!o.test(a.nodeName)&&c(a).css("position")=="static")a=a.offsetParent;return a})}},c.fn.detach=c.fn.remove,["width","height"].forEach(function(b){c.fn[b]=function(d){var e,f=this[0],g=b.replace(/./,function(a){return a[0].toUpperCase()});return d===a?G(f)?f["inner"+g]:H(f)?f.documentElement["offset"+g]:(e=this.offset())&&e[b]:this.each(function(a){f=c(this),f.css(b,V(this,d,a,f[b]()))})}}),q.forEach(function(a,b){var d=b%2;c.fn[a]=function(){var a,e=c.map(arguments,function(b){return a=E(b),a=="object"||a=="array"||b==null?b:A.fragment(b)}),f,g=this.length>1;return e.length<1?this:this.each(function(a,h){f=d?h:h.parentNode,h=b==0?h.nextSibling:b==1?h.firstChild:b==2?h:null,e.forEach(function(a){if(g)a=a.cloneNode(!0);else if(!f)return c(a).remove();Z(f.insertBefore(a,h),function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==="SCRIPT"&&(!a.type||a.type==="text/javascript")&&!a.src&&window.eval.call(window,a.innerHTML)})})})},c.fn[d?a+"To":"insert"+(b?"Before":"After")]=function(b){return c(b)[a](this),this}}),A.Z.prototype=c.fn,A.uniq=C,A.deserializeValue=Y,c.zepto=A,c}();window.Zepto=Zepto,"$"in window||(window.$=Zepto),function(a){function b(a){var b=this.os={},c=this.browser={},d=a.match(/WebKit\/([\d.]+)/),e=a.match(/(Android)\s+([\d.]+)/),f=a.match(/(iPad).*OS\s([\d_]+)/),g=!f&&a.match(/(iPhone\sOS)\s([\d_]+)/),h=a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),i=h&&a.match(/TouchPad/),j=a.match(/Kindle\/([\d.]+)/),k=a.match(/Silk\/([\d._]+)/),l=a.match(/(BlackBerry).*Version\/([\d.]+)/),m=a.match(/(BB10).*Version\/([\d.]+)/),n=a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),o=a.match(/PlayBook/),p=a.match(/Chrome\/([\d.]+)/)||a.match(/CriOS\/([\d.]+)/),q=a.match(/Firefox\/([\d.]+)/);if(c.webkit=!!d)c.version=d[1];e&&(b.android=!0,b.version=e[2]),g&&(b.ios=b.iphone=!0,b.version=g[2].replace(/_/g,".")),f&&(b.ios=b.ipad=!0,b.version=f[2].replace(/_/g,".")),h&&(b.webos=!0,b.version=h[2]),i&&(b.touchpad=!0),l&&(b.blackberry=!0,b.version=l[2]),m&&(b.bb10=!0,b.version=m[2]),n&&(b.rimtabletos=!0,b.version=n[2]),o&&(c.playbook=!0),j&&(b.kindle=!0,b.version=j[1]),k&&(c.silk=!0,c.version=k[1]),!k&&b.android&&a.match(/Kindle Fire/)&&(c.silk=!0),p&&(c.chrome=!0,c.version=p[1]),q&&(c.firefox=!0,c.version=q[1]),b.tablet=!!(f||o||e&&!a.match(/Mobile/)||q&&a.match(/Tablet/)),b.phone=!b.tablet&&!!(e||g||h||l||m||p&&a.match(/Android/)||p&&a.match(/CriOS\/([\d.]+)/)||q&&a.match(/Mobile/))}b.call(a,navigator.userAgent),a.__detect=b}(Zepto),function(a){function g(a){return a._zid||(a._zid=d++)}function h(a,b,d,e){b=i(b);if(b.ns)var f=j(b.ns);return(c[g(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||f.test(a.ns))&&(!d||g(a.fn)===g(d))&&(!e||a.sel==e)})}function i(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function j(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function k(b,c,d){a.type(b)!="string"?a.each(b,d):b.split(/\s/).forEach(function(a){d(a,c)})}function l(a,b){return a.del&&(a.e=="focus"||a.e=="blur")||!!b}function m(a){return f[a]||a}function n(b,d,e,h,j,n){var o=g(b),p=c[o]||(c[o]=[]);k(d,e,function(c,d){var e=i(c);e.fn=d,e.sel=h,e.e in f&&(d=function(b){var c=b.relatedTarget;if(!c||c!==this&&!a.contains(this,c))return e.fn.apply(this,arguments)}),e.del=j&&j(d,c);var g=e.del||d;e.proxy=function(a){var c=g.apply(b,[a].concat(a.data));return c===!1&&(a.preventDefault(),a.stopPropagation()),c},e.i=p.length,p.push(e),b.addEventListener(m(e.e),e.proxy,l(e,n))})}function o(a,b,d,e,f){var i=g(a);k(b||"",d,function(b,d){h(a,b,d,e).forEach(function(b){delete c[i][b.i],a.removeEventListener(m(b.e),b.proxy,l(b,f))})})}function t(b){var c,d={originalEvent:b};for(c in b)!r.test(c)&&b[c]!==undefined&&(d[c]=b[c]);return a.each(s,function(a,c){d[a]=function(){return this[c]=p,b[a].apply(b,arguments)},d[c]=q}),d}function u(a){if(!("defaultPrevented"in a)){a.defaultPrevented=!1;var b=a.preventDefault;a.preventDefault=function(){this.defaultPrevented=!0,b.call(this)}}}var b=a.zepto.qsa,c={},d=1,e={},f={mouseenter:"mouseover",mouseleave:"mouseout"};e.click=e.mousedown=e.mouseup=e.mousemove="MouseEvents",a.event={add:n,remove:o},a.proxy=function(b,c){if(a.isFunction(b)){var d=function(){return b.apply(c,arguments)};return d._zid=g(b),d}if(typeof c=="string")return a.proxy(b[c],b);throw new TypeError("expected function")},a.fn.bind=function(a,b){return this.each(function(){n(this,a,b)})},a.fn.unbind=function(a,b){return this.each(function(){o(this,a,b)})},a.fn.one=function(a,b){return this.each(function(c,d){n(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return o(d,b,a),c}})})};var p=function(){return!0},q=function(){return!1},r=/^([A-Z]|layer[XY]$)/,s={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(b,c,d){return this.each(function(e,f){n(f,c,d,b,function(c){return function(d){var e,g=a(d.target).closest(b,f).get(0);if(g)return e=a.extend(t(d),{currentTarget:g,liveFired:f}),c.apply(g,[e].concat([].slice.call(arguments,1)))}})})},a.fn.undelegate=function(a,b,c){return this.each(function(){o(this,b,c,a)})},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d){return!c||a.isFunction(c)?this.bind(b,c||d):this.delegate(c,b,d)},a.fn.off=function(b,c,d){return!c||a.isFunction(c)?this.unbind(b,c||d):this.undelegate(c,b,d)},a.fn.trigger=function(b,c){if(typeof b=="string"||a.isPlainObject(b))b=a.Event(b);return u(b),b.data=c,this.each(function(){"dispatchEvent"in this&&this.dispatchEvent(b)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(f,g){d=t(typeof b=="string"?a.Event(b):b),d.data=c,d.target=g,a.each(h(g,b.type||b),function(a,b){e=b.proxy(d);if(d.isImmediatePropagationStopped())return!1})}),e},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.trigger(b)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.each(function(){try{this[b]()}catch(a){}}),this}}),a.Event=function(a,b){typeof a!="string"&&(b=a,a=b.type);var c=document.createEvent(e[a]||"Events"),d=!0;if(b)for(var f in b)f=="bubbles"?d=!!b[f]:c[f]=b[f];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c.isDefaultPrevented=function(){return this.defaultPrevented},c}}(Zepto),function($){function triggerAndReturn(a,b,c){var d=$.Event(b);return $(a).trigger(d,c),!d.defaultPrevented}function triggerGlobal(a,b,c,d){if(a.global)return triggerAndReturn(b||document,c,d)}function ajaxStart(a){a.global&&$.active++===0&&triggerGlobal(a,null,"ajaxStart")}function ajaxStop(a){a.global&&!--$.active&&triggerGlobal(a,null,"ajaxStop")}function ajaxBeforeSend(a,b){var c=b.context;if(b.beforeSend.call(c,a,b)===!1||triggerGlobal(b,c,"ajaxBeforeSend",[a,b])===!1)return!1;triggerGlobal(b,c,"ajaxSend",[a,b])}function ajaxSuccess(a,b,c){var d=c.context,e="success";c.success.call(d,a,e,b),triggerGlobal(c,d,"ajaxSuccess",[b,c,a]),ajaxComplete(e,b,c)}function ajaxError(a,b,c,d){var e=d.context;d.error.call(e,c,b,a),triggerGlobal(d,e,"ajaxError",[c,d,a]),ajaxComplete(b,c,d)}function ajaxComplete(a,b,c){var d=c.context;c.complete.call(d,b,a),triggerGlobal(c,d,"ajaxComplete",[b,c]),ajaxStop(c)}function empty(){}function mimeToDataType(a){return a&&(a=a.split(";",2)[0]),a&&(a==htmlType?"html":a==jsonType?"json":scriptTypeRE.test(a)?"script":xmlTypeRE.test(a)&&"xml")||"text"}function appendQuery(a,b){return(a+"&"+b).replace(/[&?]{1,2}/,"?")}function serializeData(a){a.processData&&a.data&&$.type(a.data)!="string"&&(a.data=$.param(a.data,a.traditional)),a.data&&(!a.type||a.type.toUpperCase()=="GET")&&(a.url=appendQuery(a.url,a.data))}function parseArguments(a,b,c,d){var e=!$.isFunction(b);return{url:a,data:e?b:undefined,success:e?$.isFunction(c)?c:undefined:b,dataType:e?d||c:c}}function serialize(a,b,c,d){var e,f=$.isArray(b);$.each(b,function(b,g){e=$.type(g),d&&(b=c?d:d+"["+(f?"":b)+"]"),!d&&f?a.add(g.name,g.value):e=="array"||!c&&e=="object"?serialize(a,g,c,b):a.add(b,g)})}var jsonpID=0,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;$.active=0,$.ajaxJSONP=function(a){if("type"in a){var b="jsonp"+ ++jsonpID,c=document.createElement("script"),d=function(){clearTimeout(g),$(c).remove(),delete window[b]},e=function(c){d();if(!c||c=="timeout")window[b]=empty;ajaxError(null,c||"abort",f,a)},f={abort:e},g;return ajaxBeforeSend(f,a)===!1?(e("abort"),!1):(window[b]=function(b){d(),ajaxSuccess(b,f,a)},c.onerror=function(){e("error")},c.src=a.url.replace(/=\?/,"="+b),$("head").append(c),a.timeout>0&&(g=setTimeout(function(){e("timeout")},a.timeout)),f)}return $.ajax(a)},$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings)settings[key]===undefined&&(settings[key]=$.ajaxSettings[key]);ajaxStart(settings),settings.crossDomain||(settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host),settings.url||(settings.url=window.location.toString()),serializeData(settings),settings.cache===!1&&(settings.url=appendQuery(settings.url,"_="+Date.now()));var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder)return hasPlaceholder||(settings.url=appendQuery(settings.url,"callback=?")),$.ajaxJSONP(settings);var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=settings.xhr(),abortTimeout;settings.crossDomain||(baseHeaders["X-Requested-With"]="XMLHttpRequest"),mime&&(baseHeaders.Accept=mime,mime.indexOf(",")>-1&&(mime=mime.split(",",2)[0]),xhr.overrideMimeType&&xhr.overrideMimeType(mime));if(settings.contentType||settings.contentType!==!1&&settings.data&&settings.type.toUpperCase()!="GET")baseHeaders["Content-Type"]=settings.contentType||"application/x-www-form-urlencoded";settings.headers=$.extend(baseHeaders,settings.headers||{}),xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=empty,clearTimeout(abortTimeout);var result,error=!1;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=="file:"){dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type")),result=xhr.responseText;try{dataType=="script"?(1,eval)(result):dataType=="xml"?result=xhr.responseXML:dataType=="json"&&(result=blankRE.test(result)?null:$.parseJSON(result))}catch(e){error=e}error?ajaxError(error,"parsererror",xhr,settings):ajaxSuccess(result,xhr,settings)}else ajaxError(null,xhr.status?"error":"abort",xhr,settings)}};var async="async"in settings?settings.async:!0;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);return ajaxBeforeSend(xhr,settings)===!1?(xhr.abort(),!1):(settings.timeout>0&&(abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty,xhr.abort(),ajaxError(null,"timeout",xhr,settings)},settings.timeout)),xhr.send(settings.data?settings.data:null),xhr)},$.get=function(a,b,c,d){return $.ajax(parseArguments.apply(null,arguments))},$.post=function(a,b,c,d){var e=parseArguments.apply(null,arguments);return e.type="POST",$.ajax(e)},$.getJSON=function(a,b,c){var d=parseArguments.apply(null,arguments);return d.dataType="json",$.ajax(d)},$.fn.load=function(a,b,c){if(!this.length)return this;var d=this,e=a.split(/\s/),f,g=parseArguments(a,b,c),h=g.success;return e.length>1&&(g.url=e[0],f=e[1]),g.success=function(a){d.html(f?$("<div>").html(a.replace(rscript,"")).find(f):a),h&&h.apply(d,arguments)},$.ajax(g),this};var escape=encodeURIComponent;$.param=function(a,b){var c=[];return c.add=function(a,b){this.push(escape(a)+"="+escape(b))},serialize(c,a,b),c.join("&").replace(/%20/g,"+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b=[],c;return a(Array.prototype.slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&(d!="radio"&&d!="checkbox"||this.checked)&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.defaultPrevented||this.get(0).submit()}return this}}(Zepto),function(a,b){function s(a){return t(a.replace(/([a-z])([A-Z])/,"$1-$2"))}function t(a){return a.toLowerCase()}function u(a){return d?d+a:t(a)}var c="",d,e,f,g={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},h=window.document,i=h.createElement("div"),j=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,k,l,m,n,o,p,q,r={};a.each(g,function(a,e){if(i.style[a+"TransitionProperty"]!==b)return c="-"+t(a)+"-",d=e,!1}),k=c+"transform",r[l=c+"transition-property"]=r[m=c+"transition-duration"]=r[n=c+"transition-timing-function"]=r[o=c+"animation-name"]=r[p=c+"animation-duration"]=r[q=c+"animation-timing-function"]="",a.fx={off:d===b&&i.style.transitionProperty===b,speeds:{_default:400,fast:200,slow:600},cssPrefix:c,transitionEnd:u("TransitionEnd"),animationEnd:u("AnimationEnd")},a.fn.animate=function(b,c,d,e){return a.isPlainObject(c)&&(d=c.easing,e=c.complete,c=c.duration),c&&(c=(typeof c=="number"?c:a.fx.speeds[c]||a.fx.speeds._default)/1e3),this.anim(b,c,d,e)},a.fn.anim=function(c,d,e,f){var g,h={},i,t="",u=this,v,w=a.fx.transitionEnd;d===b&&(d=.4),a.fx.off&&(d=0);if(typeof c=="string")h[o]=c,h[p]=d+"s",h[q]=e||"linear",w=a.fx.animationEnd;else{i=[];for(g in c)j.test(g)?t+=g+"("+c[g]+") ":(h[g]=c[g],i.push(s(g)));t&&(h[k]=t,i.push(k)),d>0&&typeof c=="object"&&(h[l]=i.join(", "),h[m]=d+"s",h[n]=e||"linear")}return v=function(b){if(typeof b!="undefined"){if(b.target!==b.currentTarget)return;a(b.target).unbind(w,v)}a(this).css(r),f&&f.call(this)},d>0&&this.bind(w,v),this.size()&&this.get(0).clientLeft,this.css(h),d<=0&&setTimeout(function(){u.each(function(){v.call(this)})},0),this},i=null}(Zepto);

/*var jQuery=Zepto;
(function(a){["width","height"].forEach(function(s){var w=s.replace(/./,function(a){return a[0].toUpperCase()});a.fn["outer"+w]=function(a){var v=this;if(v){var q=v[0]["offset"+w];({width:["left","right"],height:["top","bottom"]})[s].forEach(function(f){a&&(q+=parseInt(v.css("margin-"+f),10))});return q}return null}});["Left","Top"].forEach(function(s,w){function I(a){return a&&"object"===typeof a&&"setInterval"in a?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}var v="scroll"+s;a.fn[v]=function(q){var f,
k;if(void 0===q)return f=this[0],!f?null:(k=I(f))?"pageXOffset"in k?k[w?"pageYOffset":"pageXOffset"]:k.document.documentElement[v]||k.document.body[v]:f[v];this.each(function(){if(k=I(this)){var f=!w?q:a(k).scrollLeft(),i=w?q:a(k).scrollTop();k.scrollTo(f,i)}else this[v]=q})}});a.__extend=a.extend;a.extend=function(){arguments[0]=arguments[0]||{};return a.__extend.apply(this,arguments)}})(jQuery);(function(a){function s(j,l){function g(g){return a.isArray(e.readonly)?(g=a(".dwwl",u).index(g),e.readonly[g]):e.readonly}function y(a){var g='<div class="dw-bf">',j=1,e;for(e in T[a])0==j%20&&(g+='</div><div class="dw-bf">'),g+='<div class="dw-li dw-v" data-val="'+e+'" style="height:'+H+"px;line-height:"+H+'px;"><div class="dw-i">'+T[a][e]+"</div></div>",j++;return g+"</div>"}function k(){var a=document.body,g=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,g.clientHeight,
g.scrollHeight,g.offsetHeight)}function q(g){d=a(".dw-li",g).index(a(".dw-v",g).eq(0));b=a(".dw-li",g).index(a(".dw-v",g).eq(-1));z=a(".dw-ul",u).index(g);m=H;p=h}function o(a){var g=e.headerText;return g?"function"==typeof g?g.call(M,a):g.replace(/\{value\}/i,a):""}function C(){h.temp=P&&(null!==h.val&&h.val!=x.val()||!x.val().length)||null===h.values?e.parseValue(x.val()||"",h):h.values.slice(0);h.setValue(!0)}function s(g,j,e,d){!1!==K("validate",[u,j])&&a(".dw-ul",u).each(function(e){var y=a(this),
c=a('.dw-li[data-val="'+h.temp[e]+'"]',y),b=a(".dw-li",y).index(c),l=e==j||void 0===j;if(!c.hasClass("dw-v")){for(var f=c,i=0,n=0;f.prev().length&&!f.hasClass("dw-v");)f=f.prev(),i++;for(;c.next().length&&!c.hasClass("dw-v");)c=c.next(),n++;(n<i&&n&&2!==d||!i||!f.hasClass("dw-v")||1==d)&&c.hasClass("dw-v")?b+=n:(c=f,b-=i)}if(!c.hasClass("dw-sel")||l)h.temp[e]=c.attr("data-val"),a(".dw-sel",y).removeClass("dw-sel"),c.addClass("dw-sel"),h.scroll(y,e,b,g)});h.change(e)}function V(){function g(){a(".dwc",
u).each(function(){l=a(this).outerWidth(!0);j+=l;c=l>c?l:c});l=j>y?c:j;l=a(".dwwr",u).width(l+1).outerWidth();n=f.outerHeight()}if("inline"!=e.display){var j=0,c=0,y=a(window).width(),d=window.innerHeight,b=a(window).scrollTop(),f=a(".dw",u),l,h,i,n,q,m={},o,p=void 0===e.anchor?x:e.anchor,d=d||a(window).height();if("modal"==e.display)g(),i=(y-l)/2,h=b+(d-n)/2;else if("bubble"==e.display){g();var D=p.offset(),t=a(".dw-arr",u),B=a(".dw-arrw-i",u),r=f.outerWidth();q=p.outerWidth();i=D.left-(f.outerWidth(!0)-
q)/2;i=i>y-r?y-(r+20):i;i=0<=i?i:20;h=D.top-(f.outerHeight()+3);h<b||D.top>b+d?(f.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),h=D.top+p.outerHeight()+3,o=h+f.outerHeight(!0)>b+d||D.top>b+d):f.removeClass("dw-bubble-bottom").addClass("dw-bubble-top");h=h>=b?h:b;b=D.left+q/2-(i+(r-B.outerWidth())/2);b>B.outerWidth()&&(b=B.outerWidth());t.css({left:b})}else m.width="100%","top"==e.display?h=b:"bottom"==e.display&&(h=b+d-f.outerHeight(),h=0<=h?h:0);m.top=h;m.left=i;f.css(m);a(".dwo, .dw-persp",
u).height(0).height(k());o&&a(window).scrollTop(h+f.outerHeight(!0)-d)}}function K(g,j){var e;j.push(h);a.each([U,l],function(a,c){c[g]&&(e=c[g].apply(M,j))});return e}function w(a){var g=+a.data("pos")+1;f(a,g>b?d:g,1)}function Y(a){var g=+a.data("pos")-1;f(a,g<d?b:g,2)}var h=this,W=a.mobiscroll,M=j,x=a(M),X,Z,e=E({},J),U={},$,H,D,u,T=[],Q={},P=x.is("input"),R=!1;h.enable=function(){e.disabled=!1;P&&x.prop("disabled",!1)};h.disable=function(){e.disabled=!0;P&&x.prop("disabled",!0)};h.scroll=function(a,
g,j,e,c,b){function d(){clearInterval(Q[g]);Q[g]=void 0;a.data("pos",j).closest(".dwwl").removeClass("dwa")}var y=($-j)*H,h,b=b||F;a.attr("style",(e?O+"-transition:all "+e.toFixed(1)+"s ease-out;":"")+(S?O+"-transform:translate3d(0,"+y+"px,0);":"top:"+y+"px;"));Q[g]&&d();e&&void 0!==c?(h=0,a.closest(".dwwl").addClass("dwa"),Q[g]=setInterval(function(){h+=0.1;a.data("pos",Math.round((j-c)*Math.sin(h/e*(Math.PI/2))+c));h>=e&&(d(),b())},100),K("onAnimStart",[g,e])):(a.data("pos",j),b())};h.setValue=
function(a,g,j,c){c||(h.values=h.temp.slice(0));R&&a&&s(j);g&&(D=e.formatResult(h.temp),h.val=D,P&&x.val(D).trigger("change"))};h.validate=function(a,g){s(0.2,a,!0,g)};h.change=function(g){D=e.formatResult(h.temp);"inline"==e.display?h.setValue(!1,g):a(".dwv",u).html(o(D));g&&K("onChange",[D])};h.hide=function(g,j){if(!1===K("onClose",[D,j]))return!1;a(".dwtd").prop("disabled",!1).removeClass("dwtd");x.blur();u&&("inline"!=e.display&&e.animate&&!g?(a(".dw",u).addClass("dw-"+e.animate+" dw-out"),setTimeout(function(){u.remove();
u=null},350)):(u.remove(),u=null),R=!1,a(window).unbind(".dw"))};h.cancel=function(){!1!==h.hide(!1,"cancel")&&K("onCancel",[h.val])};h.changeWheel=function(g,j){if(u){var c=0,b,d,h=g.length;for(b in e.wheels)for(d in e.wheels[b]){if(-1<a.inArray(c,g)&&(T[c]=e.wheels[b][d],a(".dw-ul",u).eq(c).html(y(c)),h--,!h)){V();s(j);return}c++}}};h.show=function(j){if(e.disabled||R)return!1;"top"==e.display&&(e.animate="slidedown");"bottom"==e.display&&(e.animate="slideup");C();K("onBeforeShow",[u]);var b=0,
d,l="",m="",k="";e.animate&&!j&&(m='<div class="dw-persp">',k="</div>",l="dw-"+e.animate+" dw-in");l='<div class="'+e.theme+" dw-"+e.display+'">'+("inline"==e.display?'<div class="dw dwbg dwi"><div class="dwwr">':m+'<div class="dwo"></div><div class="dw dwbg '+l+'"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">'+(e.headerText?'<div class="dwv"></div>':""));for(j=0;j<e.wheels.length;j++){l+='<div class="dwc'+("scroller"!=e.mode?" dwpm":" dwsc")+
(e.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';for(d in e.wheels[j])T[b]=e.wheels[j][d],l+='<td><div class="dwwl dwrc dwwl'+b+'">'+("scroller"!=e.mode?'<div class="dwwb dwwbp" style="height:'+H+"px;line-height:"+H+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+H+"px;line-height:"+H+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+d+'</div><div class="dww dwrc" style="height:'+e.rows*H+"px;min-width:"+e.width+'px;"><div class="dw-ul">',
l+=y(b),l+='</div><div class="dwwo"></div></div><div class="dwwol"></div></div></td>',b++;l+="</tr></table></div></div>"}l+=("inline"!=e.display?'<div class="dwbc'+(e.button3?" dwbc-p":"")+'"><span class="dwbw dwb-s"><span class="dwb">'+e.setText+"</span></span>"+(e.button3?'<span class="dwbw dwb-n"><span class="dwb">'+e.button3Text+"</span></span>":"")+'<span class="dwbw dwb-c"><span class="dwb">'+e.cancelText+"</span></span></div>"+k:'<div class="dwcc"></div>')+"</div></div></div>";u=a(l);s();"inline"!=
e.display?u.appendTo("body"):x.is("div")?x.html(u):u.insertAfter(x);R=!0;"inline"!=e.display&&(a(".dwb-s span",u).click(function(){if(h.hide(false,"set")!==false){h.setValue(false,true);K("onSelect",[h.val])}}),a(".dwb-c span",u).click(function(){h.cancel()}),e.button3&&a(".dwb-n span",u).click(e.button3),e.scrollLock&&u.bind("touchmove",function(a){a.preventDefault()}),a("input,select,button").each(function(){a(this).prop("disabled")||a(this).addClass("dwtd")}),a("input,select").prop("disabled",
!0),V(),a(window).bind("resize.dw",V));u.delegate(".dwwl","DOMMouseScroll mousewheel",function(j){if(!g(this)){j.preventDefault();var j=j.originalEvent,j=j.wheelDelta?j.wheelDelta/120:j.detail?-j.detail/3:0,c=a(".dw-ul",this),b=+c.data("pos"),b=Math.round(b-j);q(c);f(c,b,j<0?1:2)}}).delegate(".dwb, .dwwb",N,function(){a(this).addClass("dwb-a")}).delegate(".dwwb",N,function(j){var b=a(this).closest(".dwwl");if(!g(b)&&!b.hasClass("dwa")){j.preventDefault();j.stopPropagation();var d=b.find(".dw-ul"),
l=a(this).hasClass("dwwbp")?w:Y;c=true;q(d);clearInterval(i);i=setInterval(function(){l(d)},e.delay);l(d)}}).delegate(".dwwl",N,function(j){j.preventDefault();if(!n&&!g(this)&&!c&&e.mode!="clickpick"){n=true;t=a(".dw-ul",this);t.closest(".dwwl").addClass("dwa");B=+t.data("pos");q(t);L=Q[z]!==void 0;A=I(j);aa=new Date;r=A;h.scroll(t,z,B)}});K("onShow",[u,D]);X.init(u,h)};h.init=function(a){X=E({defaults:{},init:F},W.themes[a.theme||e.theme]);Z=W.i18n[a.lang||e.lang];E(l,a);E(e,X.defaults,Z,l);h.settings=
e;x.unbind(".dw");if(a=W.presets[e.preset])U=a.call(M,h),E(e,U,l),E(G,U.methods);$=Math.floor(e.rows/2);H=e.height;void 0!==x.data("dwro")&&(M.readOnly=v(x.data("dwro")));R&&h.hide();"inline"==e.display?h.show():(C(),P&&e.showOnFocus&&(x.data("dwro",M.readOnly),M.readOnly=!0,x.bind("focus.dw",function(){h.show()})))};h.values=null;h.val=null;h.temp=null;h.init(l)}function w(a){for(var b in a)if(void 0!==Y[a[b]])return!0;return!1}function I(a){var b=a.originalEvent,g=a.changedTouches;return g||b&&
b.changedTouches?b?b.changedTouches[0].pageY:g[0].pageY:a.pageY}function v(a){return!0===a||"true"==a}function q(a,b,g){a=a>g?g:a;return a<b?b:a}function f(j,c,g,y,f){var c=q(c,d,b),i=a(".dw-li",j).eq(c),n=z,y=y?c==f?0.1:Math.abs(0.1*(c-f)):0;p.scroll(j,n,c,y,f,function(){p.temp[n]=i.attr("data-val");p.validate(n,g)})}function k(a,b,g){return G[b]?G[b].apply(a,Array.prototype.slice.call(g,1)):"object"===typeof b?G.init.call(a,b):a}var o={},i,F=function(){},m,d,b,p,C=(new Date).getTime(),n,c,t,z,A,
r,aa,B,L,Y=document.createElement("modernizr").style,S=w(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),O=function(){var a=["Webkit","Moz","O","ms"],b;for(b in a)if(w([a[b]+"Transform"]))return"-"+a[b].toLowerCase();return""}(),E=a.extend,N="touchstart mousedown",J={width:70,height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",lang:"en-US",setText:"Set",
cancelText:"Cancel",scrollLock:!0,formatResult:function(a){return a.join(" ")},parseValue:function(a,b){var g=b.settings.wheels,c=a.split(" "),d=[],f=0,i,n,m;for(i=0;i<g.length;i++)for(n in g[i]){if(void 0!==g[i][n][c[f]])d.push(c[f]);else for(m in g[i][n]){d.push(m);break}f++}return d}},G={init:function(a){void 0===a&&(a={});return this.each(function(){this.id||(C+=1,this.id="scoller"+C);o[this.id]=new s(this,a)})},enable:function(){return this.each(function(){var a=o[this.id];a&&a.enable()})},disable:function(){return this.each(function(){var a=
o[this.id];a&&a.disable()})},isDisabled:function(){var a=o[this[0].id];if(a)return a.settings.disabled},option:function(a,b){return this.each(function(){var g=o[this.id];if(g){var c={};"object"===typeof a?c=a:c[a]=b;g.init(c)}})},setValue:function(a,b,g,c){return this.each(function(){var d=o[this.id];d&&(d.temp=a,d.setValue(!0,b,g,c))})},getInst:function(){return o[this[0].id]},getValue:function(){var a=o[this[0].id];if(a)return a.values},show:function(){var a=o[this[0].id];if(a)return a.show()},
hide:function(){return this.each(function(){var a=o[this.id];a&&a.hide()})},destroy:function(){return this.each(function(){var b=o[this.id];b&&(b.hide(),a(this).unbind(".dw"),delete o[this.id],a(this).is("input")&&(this.readOnly=v(a(this).data("dwro"))))})}};a(document).bind("touchmove mousemove",function(a){n&&(a.preventDefault(),r=I(a),p.scroll(t,z,q(B+(A-r)/m,d-1,b+1)),L=!0)});a(document).bind("touchend mouseup",function(j){if(n){j.preventDefault();var l=new Date-aa,j=q(B+(A-r)/m,d-1,b+1),g;g=
t.offset().top;300>l?(l=(r-A)/l,l=l*l/0.0012,0>r-A&&(l=-l)):l=r-A;if(!l&&!L){g=Math.floor((r-g)/m);var y=a(".dw-li",t).eq(g);y.addClass("dw-hl");setTimeout(function(){y.removeClass("dw-hl")},200)}else g=Math.round(B-l/m);f(t,g,0,!0,Math.round(j));n=!1;t=null}c&&(clearInterval(i),c=!1);a(".dwb-a").removeClass("dwb-a")});a.fn.mobiscroll=function(b){E(this,a.mobiscroll.shorts);return k(this,b,arguments)};a.mobiscroll=a.mobiscroll||{setDefaults:function(a){E(J,a)},presetShort:function(a){this.shorts[a]=
function(b){return k(this,E(b,{preset:a}),arguments)}},shorts:{},presets:{},themes:{},i18n:{}};a.scroller=a.scroller||a.mobiscroll;a.fn.scroller=a.fn.scroller||a.fn.mobiscroll})(jQuery);(function(a){var s=a.mobiscroll,w=new Date,I={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:w.getFullYear()-100,endYear:w.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
shortYearCutoff:"+10",monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",nowText:"Now",showNow:!1,stepHour:1,stepMinute:1,stepSecond:1,separator:" "},v=function(q){function f(a,b,c){return void 0!==n[b]?+a[n[b]]:void 0!==c?c:S[t[b]]?S[t[b]]():t[b](S)}function k(a,b){return Math.floor(a/b)*b}function o(a){var b=f(a,"h",0);return new Date(f(a,"y"),f(a,"m"),f(a,"d",1),f(a,"ap")?b+12:b,f(a,"i",0),f(a,"s",0))}var i=a(this),F={},m;if(i.is("input")){switch(i.attr("type")){case "date":m=
"yy-mm-dd";break;case "datetime":m="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":m="yy-mm-ddTHH:ii:ss";break;case "month":m="yy-mm";F.dateOrder="mmyy";break;case "time":m="HH:ii:ss"}var d=i.attr("min"),i=i.attr("max");d&&(F.minDate=s.parseDate(m,d));i&&(F.maxDate=s.parseDate(m,i))}var b=a.extend({},I,F,q.settings),p=0,F=[],C=[],n={},c,t={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=L&&12<=a?a-12:a;return k(a,O)},i:function(a){return k(a.getMinutes(),E)},s:function(a){return k(a.getSeconds(),
N)},ap:function(a){return B&&11<a.getHours()?1:0}},z=b.preset,A=b.dateOrder,r=b.timeWheels,w=A.match(/D/),B=r.match(/a/i),L=r.match(/h/),v="datetime"==z?b.dateFormat+b.separator+b.timeFormat:"time"==z?b.timeFormat:b.dateFormat,S=new Date,O=b.stepHour,E=b.stepMinute,N=b.stepSecond,J=b.minDate||new Date(b.startYear,0,1),G=b.maxDate||new Date(b.endYear,11,31,23,59,59);m=m||v;if(z.match(/date/i)){a.each(["y","m","d"],function(a,b){c=A.search(RegExp(b,"i"));-1<c&&C.push({o:c,v:b})});C.sort(function(a,
b){return a.o>b.o?1:-1});a.each(C,function(a,b){n[b.v]=a});d={};for(i=0;3>i;i++)if(i==n.y){p++;d[b.yearText]={};var j=J.getFullYear(),l=G.getFullYear();for(c=j;c<=l;c++)d[b.yearText][c]=A.match(/yy/i)?c:(c+"").substr(2,2)}else if(i==n.m){p++;d[b.monthText]={};for(c=0;12>c;c++)j=A.replace(/[dy]/gi,"").replace(/mm/,9>c?"0"+(c+1):c+1).replace(/m/,c),d[b.monthText][c]=j.match(/MM/)?j.replace(/MM/,'<span class="dw-mon">'+b.monthNames[c]+"</span>"):j.replace(/M/,'<span class="dw-mon">'+b.monthNamesShort[c]+
"</span>")}else if(i==n.d){p++;d[b.dayText]={};for(c=1;32>c;c++)d[b.dayText][c]=A.match(/dd/i)&&10>c?"0"+c:c}F.push(d)}if(z.match(/time/i)){C=[];a.each(["h","i","s"],function(a,b){a=r.search(RegExp(b,"i"));-1<a&&C.push({o:a,v:b})});C.sort(function(a,b){return a.o>b.o?1:-1});a.each(C,function(a,b){n[b.v]=p+a});d={};for(i=p;i<p+3;i++)if(i==n.h){p++;d[b.hourText]={};for(c=0;c<(L?12:24);c+=O)d[b.hourText][c]=L&&0==c?12:r.match(/hh/i)&&10>c?"0"+c:c}else if(i==n.i){p++;d[b.minuteText]={};for(c=0;60>c;c+=
E)d[b.minuteText][c]=r.match(/ii/)&&10>c?"0"+c:c}else if(i==n.s){p++;d[b.secText]={};for(c=0;60>c;c+=N)d[b.secText][c]=r.match(/ss/)&&10>c?"0"+c:c}B&&(n.ap=p++,i=r.match(/A/),d[b.ampmText]={"0":i?"AM":"am",1:i?"PM":"pm"});F.push(d)}q.setDate=function(a,b,c,d){for(var f in n)this.temp[n[f]]=a[t[f]]?a[t[f]]():t[f](a);this.setValue(!0,b,c,d)};q.getDate=function(a){return o(a)};return{button3Text:b.showNow?b.nowText:void 0,button3:b.showNow?function(){q.setDate(new Date,!1,0.3,!0)}:void 0,wheels:F,headerText:function(){return s.formatDate(v,
o(q.temp),b)},formatResult:function(a){return s.formatDate(m,o(a),b)},parseValue:function(a){var c=new Date,d,f=[];try{c=s.parseDate(m,a,b)}catch(i){}for(d in n)f[n[d]]=c[t[d]]?c[t[d]]():t[d](c);return f},validate:function(c){var d=q.temp,i={y:J.getFullYear(),m:0,d:1,h:0,i:0,s:0,ap:0},j={y:G.getFullYear(),m:11,d:31,h:k(L?11:23,O),i:k(59,E),s:k(59,N),ap:1},l=!0,m=!0;a.each("y,m,d,ap,h,i,s".split(","),function(q,k){if(n[k]!==void 0){var p=i[k],o=j[k],B=31,h=f(d,k),r=a(".dw-ul",c).eq(n[k]),s,x;if(k==
"d"){s=f(d,"y");x=f(d,"m");o=B=32-(new Date(s,x,32)).getDate();w&&a(".dw-li",r).each(function(){var c=a(this),d=c.data("val"),e=(new Date(s,x,d)).getDay(),d=A.replace(/[my]/gi,"").replace(/dd/,d<10?"0"+d:d).replace(/d/,d);a(".dw-i",c).html(d.match(/DD/)?d.replace(/DD/,'<span class="dw-day">'+b.dayNames[e]+"</span>"):d.replace(/D/,'<span class="dw-day">'+b.dayNamesShort[e]+"</span>"))})}l&&J&&(p=J[t[k]]?J[t[k]]():t[k](J));m&&G&&(o=G[t[k]]?G[t[k]]():t[k](G));if(k!="y"){var C=a(".dw-li",r).index(a('.dw-li[data-val="'+
p+'"]',r)),z=a(".dw-li",r).index(a('.dw-li[data-val="'+o+'"]',r));a(".dw-li",r).removeClass("dw-v").slice(C,z+1).addClass("dw-v");k=="d"&&a(".dw-li",r).removeClass("dw-h").slice(B).addClass("dw-h")}h<p&&(h=p);h>o&&(h=o);l&&(l=h==p);m&&(m=h==o);if(b.invalid&&k=="d"){var e=[];b.invalid.dates&&a.each(b.invalid.dates,function(a,b){b.getFullYear()==s&&b.getMonth()==x&&e.push(b.getDate()-1)});if(b.invalid.daysOfWeek){var F=(new Date(s,x,1)).getDay(),v;a.each(b.invalid.daysOfWeek,function(a,b){for(v=b-F;v<
B;v=v+7)v>=0&&e.push(v)})}b.invalid.daysOfMonth&&a.each(b.invalid.daysOfMonth,function(a,b){b=(b+"").split("/");b[1]?b[0]-1==x&&e.push(b[1]-1):e.push(b[0]-1)});a.each(e,function(b,c){a(".dw-li",r).eq(c).removeClass("dw-v")})}d[n[k]]=h}})},methods:{getDate:function(b){var c=a(this).mobiscroll("getInst");if(c)return c.getDate(b?c.temp:c.values)},setDate:function(b,c,d,f){void 0==c&&(c=!1);return this.each(function(){var i=a(this).mobiscroll("getInst");i&&i.setDate(b,c,d,f)})}}}};a.each(["date","time",
"datetime"],function(a,f){s.presets[f]=v;s.presetShort(f)});s.formatDate=function(q,f,k){if(!f)return null;var k=a.extend({},I,k),o=function(a){for(var b=0;m+1<q.length&&q.charAt(m+1)==a;)b++,m++;return b},i=function(a,b,c){b=""+b;if(o(a))for(;b.length<c;)b="0"+b;return b},s=function(a,b,c,d){return o(a)?d[b]:c[b]},m,d="",b=!1;for(m=0;m<q.length;m++)if(b)"'"==q.charAt(m)&&!o("'")?b=!1:d+=q.charAt(m);else switch(q.charAt(m)){case "d":d+=i("d",f.getDate(),2);break;case "D":d+=s("D",f.getDay(),k.dayNamesShort,
k.dayNames);break;case "o":d+=i("o",(f.getTime()-(new Date(f.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":d+=i("m",f.getMonth()+1,2);break;case "M":d+=s("M",f.getMonth(),k.monthNamesShort,k.monthNames);break;case "y":d+=o("y")?f.getFullYear():(10>f.getYear()%100?"0":"")+f.getYear()%100;break;case "h":var p=f.getHours(),d=d+i("h",12<p?p-12:0==p?12:p,2);break;case "H":d+=i("H",f.getHours(),2);break;case "i":d+=i("i",f.getMinutes(),2);break;case "s":d+=i("s",f.getSeconds(),2);break;case "a":d+=
11<f.getHours()?"pm":"am";break;case "A":d+=11<f.getHours()?"PM":"AM";break;case "'":o("'")?d+="'":b=!0;break;default:d+=q.charAt(m)}return d};s.parseDate=function(q,f,k){var o=new Date;if(!q||!f)return o;var f="object"==typeof f?f.toString():f+"",i=a.extend({},I,k),s=i.shortYearCutoff,k=o.getFullYear(),m=o.getMonth()+1,d=o.getDate(),b=-1,p=o.getHours(),o=o.getMinutes(),v=0,n=-1,c=!1,t=function(a){(a=w+1<q.length&&q.charAt(w+1)==a)&&w++;return a},z=function(a){t(a);a=f.substr(r).match(RegExp("^\\d{1,"+
("@"==a?14:"!"==a?20:"y"==a?4:"o"==a?3:2)+"}"));if(!a)return 0;r+=a[0].length;return parseInt(a[0],10)},A=function(a,b,c){a=t(a)?c:b;for(b=0;b<a.length;b++)if(f.substr(r,a[b].length).toLowerCase()==a[b].toLowerCase())return r+=a[b].length,b+1;return 0},r=0,w;for(w=0;w<q.length;w++)if(c)"'"==q.charAt(w)&&!t("'")?c=!1:r++;else switch(q.charAt(w)){case "d":d=z("d");break;case "D":A("D",i.dayNamesShort,i.dayNames);break;case "o":b=z("o");break;case "m":m=z("m");break;case "M":m=A("M",i.monthNamesShort,
i.monthNames);break;case "y":k=z("y");break;case "H":p=z("H");break;case "h":p=z("h");break;case "i":o=z("i");break;case "s":v=z("s");break;case "a":n=A("a",["am","pm"],["am","pm"])-1;break;case "A":n=A("A",["am","pm"],["am","pm"])-1;break;case "'":t("'")?r++:c=!0;break;default:r++}100>k&&(k+=(new Date).getFullYear()-(new Date).getFullYear()%100+(k<=("string"!=typeof s?s:(new Date).getFullYear()%100+parseInt(s,10))?0:-100));if(-1<b){m=1;d=b;do{i=32-(new Date(k,m-1,32)).getDate();if(d<=i)break;m++;
d-=i}while(1)}p=new Date(k,m-1,d,-1==n?p:n&&12>p?p+12:!n&&12==p?0:p,o,v);if(p.getFullYear()!=k||p.getMonth()+1!=m||p.getDate()!=d)throw"Invalid date";return p}})(jQuery);(function(a){var s={defaults:{dateOrder:"Mddyy",mode:"mixed",rows:5,width:70,height:36,showLabel:!1}};a.mobiscroll.themes["android-ics"]=s;a.mobiscroll.themes["android-ics light"]=s})(jQuery);
*/
/**
 * Flickable: a Zepto plugin for making elements flickable on a touch device
 * 2012, Tom Longo
 *
 * Licensed under the Whatever License. Use it for whatever you want!
 * 
 * @author thetomlongo@gmail.com
 * @version 1.0.4
 * 
 * @requires 
 * Zepto JavaScript Library
 */
(function(a){function j(a){var d,e;typeof a.touches[0].pageX!="undefined"?d=a.touches[0].pageX:d=a.pageX;typeof a.touches[0].pageY!="undefined"?e=a.touches[0].pageY:e=a.pageY;b=c;b.start={x:d,y:e,time:a.timeStamp};b.delta.prevPos={x:d,y:e};k(a);if(h){s()}}function k(a){var c,d;typeof a.touches[0].pageX!="undefined"?c=a.touches[0].pageX:c=a.pageX;typeof a.touches[0].pageY!="undefined"?d=a.touches[0].pageY:d=a.pageY;var e,f,g=c,i=d,j=c-b.start.x,k=d-b.start.y;if(c>b.delta.prevPos.x){e=1}else if(c<b.delta.prevPos.x){e=-1}else{e=0}if(d>b.delta.prevPos.y){f=1}else if(d<b.delta.prevPos.y){f=-1}else{f=0}b.delta.prevPos={x:g,y:i};b.delta.dist={x:j,y:k};b.delta.dir={x:e,y:f};if(h){s()}}function l(c){var d=a(this),e=d.data("preventDefaultAxis"),f=e==="both"||e==="x",h=e==="both"||e==="y",i=f&&Math.abs(b.delta.dist.y)>=g,j=h&&Math.abs(b.delta.dist.x)>=g;if(i||j){c.preventDefault()}}function m(a){var c=a.timeStamp-b.start.time,d=Math.abs(Math.round(b.delta.dist.x/c*100)/100),e=Math.abs(Math.round(b.delta.dist.y/c*100)/100),i=b.delta.dir.x,j=b.delta.dir.y,k=0,l=0;if(d>f){Math.abs(b.delta.dist.x)>=g?k=i:k=0}else if(e>f){Math.abs(b.delta.dist.y)>=g?l=j:l=0}b.end.duration=c;b.end.speed={x:d,y:e};b.end.flick={x:k,y:l};if(h){r("Touch end");s()}}function n(a,b){if(b!=="x"&&b!=="y"){a.height()>a.width()?b="y":b="x"}return b}function o(a,b){if(!parseInt(b)){var b,c=a.data("segments"),d=n(a,a.data("flickDirection"));d=="y"?b=a.height()/c:b=a.width()/c}return b}function p(a){var b=document.createElement("div"),c="Khtml Ms O Moz Webkit".split(" "),d=c.length;return function(a){if(a in b.style)return true;a=a.replace(/^[a-z]/,function(a){return a.toUpperCase()});while(d--){if(c[d]+a in b.style){return true}}return false}}function q(){if(!a("#flickableDebugger").length){h=true;b=c;b.eventLog=[];var d='<div id="flickableDebugger" style="position: fixed; bottom: 0; margin: 0 auto; padding: 10px; width: 100%; background: #000; color: #fff; font-family: courier, sans-serif;">Debugger</div>';a("body").append(d)}}function r(a){if(h){b.eventLog.splice(0,0,a);s()}}function s(){var c="";for(var d=0;d<3;d++){c+=b.eventLog[d]+" | "}var e="<pre> 		last 3 events: "+c+"<br /> 		start: {x:"+b.start.x+", y:"+b.start.y+",time: "+b.start.time+"}<br /> 			delta: {<br /> 			prevPos: {"+b.delta.prevPos.x+", "+b.delta.prevPos.y+"}<br /> 			dist: {"+b.delta.dist.x+", "+b.delta.dist.y+"}<br /> 			dir: {"+b.delta.dir.x+", "+b.delta.dir.y+"}<br /> 			}<br /> 		end: {<br /> 			speed: {"+b.end.speed.x+", "+b.end.speed.y+"}<br /> 			flick: {"+b.end.flick.x+", "+b.end.flick.y+"}<br /> 			duration: "+b.end.duration+"<br /> 		} 		</pre>";a("#flickableDebugger").html(e)}var b,c={start:{x:0,y:0,time:0},delta:{prevPos:{x:0,y:0},dist:{x:0,y:0},dir:{x:0,y:0}},end:{duration:0,speed:{x:0,y:0},flick:{x:0,y:0}}},d=false,e=0,f=.7,g=5,h=false;var i={init:function(b){var c=a.extend({enableDebugger:false,segments:5,snapSpeed:.3,flickSnapSpeed:.3,flickThreshold:false,segmentPx:"auto",flickDirection:"auto",preventDefault:true,preventDefaultAxis:"both",onCreate:false,onFlick:false,onFlickLeft:false,onFlickRight:false,onFlickUp:false,onFlickDown:false,onScroll:false,onScrollNext:false,onScrollPrev:false,onMove:false,onStart:false,onEnd:false},b);return this.each(function(){var b=a(this),e=b.data("isAlive");if(!e){var g=c.segments,i=n(b,c.flickDirection);b.data("isAlive",true).data("pos",0).data("snapSpeed",parseFloat(c.snapSpeed)).data("flickSnapSpeed",parseFloat(c.flickSnapSpeed)).data("segment",0).data("segments",g).data("flickDirection",i).data("segmentPx",o(b,c.segmentPx)).data("preventDefaultAxis",c.preventDefaultAxis);a(b).bind({onStart:function(){a(this).flickable("start",c.onStart)},onMove:function(){a(this).flickable("move",c.onMove)},onEnd:function(){a(this).flickable("finished",c.onEnd)},onScroll:function(){a(this).flickable("scrollToSegment",c.onScroll)},onScrollPrev:function(){a(this).flickable("prevSegment",c.onScrollPrev)},onScrollNext:function(){a(this).flickable("nextSegment",c.onScrollNext)},onFlick:function(){a(this).flickable("flick",c.onFlick)},onFlickLeft:function(){a(this).flickable("flickLeft",c.onFlickLeft)},onFlickRight:function(){a(this).flickable("flickRight",c.onFlickRight)},onFlickUp:function(){a(this).flickable("flickUp",c.onFlickUp)},onFlickDown:function(){a(this).flickable("flickDown",c.onFlickDown)},touchstart:function(b){j(b);a(this).trigger("onStart")},touchmove:function(b){k(b);if(c.preventDefault){l.call(this,b)}a(this).trigger("onMove")},touchend:function(b){m(b);a(this).trigger("onEnd")}});if(!p("transform")){d=true}if(parseInt(c.flickThreshold)){f=parseInt(c.flickThreshold)}if(h||c.enableDebugger){q()}b.flickable("create",c.onCreate)}})},create:function(d){var f=a(this);b=c;e++;r("It's alive!");if(!f.attr("id")){f.attr("id","flickable"+e)}f.flickable("scrollToSegment");if(typeof d=="function"){d.call(this,e)}},start:function(c){r("Touch start");var d=a(this),e=parseInt(d.data("segment")),f=parseInt(d.data("segmentPx")),g=-(f*e);d.data("anchor",g);if(typeof c=="function"){c.call(this,b)}},segment:function(b){var c=a(this),d=parseInt(c.data("segments")),e=parseInt(c.data("segment"));if(typeof b!="undefined"){if(b>=d){b=d-1}else if(b<0){b=0}if(b!==e){c.data("segment",b).trigger("onScroll")}else{c.flickable("scrollToSegment")}}return parseInt(c.data("segment"))},move:function(c){var e=a(this),f,g,h=e.data("flickDirection"),i=parseInt(e.data("anchor")),f=i+b.delta.dist[h];if(d){if(h=="y"){e.css("top",f)}else{e.css("left",f)}}else{h=="y"?g="(0,"+f+"px,0)":g="("+f+"px,0,0)";if(typeof document.getElementById(e.attr("id")).style.webkitTransform!="undefined"){document.getElementById(e.attr("id")).style.webkitTransform="translate3d"+g}else if(typeof document.getElementById(e.attr("id")).style.mozTransform!="undefined"){document.getElementById(e.attr("id")).style.mozTransform="translate3d"+g}else{document.getElementById(e.attr("id")).style.transform="translate3d"+g}}a(this).data("pos",f);if(typeof c=="function"){c.call(this,b)}},scrollNext:function(){a(this).trigger("onScrollNext")},scrollPrev:function(){a(this).trigger("onScrollPrev")},nextSegment:function(c){r("Next segment");var d=a(this),e=parseInt(d.data("segment"))+1;d.flickable("segment",e);if(typeof c=="function"){c.call(this,b,e)}},prevSegment:function(c){r("Previous segment");var d=a(this),e=parseInt(d.data("segment"))-1;d.flickable("segment",e);if(typeof c=="function"){c.call(this,b,e)}},flick:function(c){r("You flicked");var d=a(this);switch(b.end.flick.x){case-1:d.trigger("onFlickLeft");break;case 1:d.trigger("onFlickRight");break}switch(b.end.flick.y){case-1:d.trigger("onFlickUp");break;case 1:d.trigger("onFlickDown");break}if(typeof c=="function"){c.call(this,b)}},flickLeft:function(c){r("Flicked left");var d=a(this),e=parseInt(d.data("segment"));d.trigger("onScrollNext");if(typeof c=="function"){c.call(this,b,e)}},flickRight:function(c){r("Flicked right");var d=a(this),e=parseInt(d.data("segment"));d.trigger("onScrollPrev");if(typeof c=="function"){c.call(this,b,e)}},flickUp:function(c){r("Flicked up");var d=a(this),e=parseInt(d.data("segment"));d.trigger("onScrollNext");if(typeof c=="function"){c.call(this,b,e)}},flickDown:function(c){r("Flicked down");var d=a(this),e=parseInt(d.data("segment"));d.trigger("onScrollPrev");if(typeof c=="function"){c.call(this,b,e)}},scrollToSegment:function(c){var e=a(this),f,g=e.data("flickDirection"),h=parseFloat(e.data("snapSpeed")),i=parseFloat(e.data("flickSnapSpeed")),j=parseInt(e.data("segments")),k=parseInt(e.data("segment")),l=parseInt(e.data("segmentPx")),m=-(l*k),n="ease-out";r("Sliding to segment "+k);if(b.end.flick.x||b.end.flick.y){h=i;n="cubic-bezier(0, .70, .35, 1)"}e.data("anchor",m).data("pos",m).data("segment",k);if(d){if(g=="y"){e.anim({top:m},h,n)}else{e.anim({left:m},h,n)}}else{g=="y"?f="0px, "+m+"px, 0px":f=m+"px, 0px, 0px";e.anim({translate3d:f},h,n)}if(typeof c=="function"){c.call(this,b,k)}},finished:function(c){var d=a(this),e=d.data("flickDirection"),f=parseInt(d.data("segments")),g=parseInt(d.data("segment")),h=parseInt(d.data("segmentPx")),i=parseInt(d.data("anchor")),j=parseInt(d.data("pos"));var k;j<0?k=Math.abs(Math.round(j/h)):k=0;r("Nearest segment is "+k);if(typeof c=="function"){c.call(this,b,g)}if(g==k){if(b.end.flick[e]){return d.trigger("onFlick")}}if(k==g+1){d.trigger("onScrollNext")}else if(k==g-1){d.trigger("onScrollPrev")}else{d.flickable("segment",k)}}};a.fn.flickable=function(b){if(i[b]){return i[b].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof b==="object"||!b){return i.init.apply(this,arguments)}else{a.error("Method "+b+" does not exist")}}})(Zepto);



/******* POST URLS ************/
loginCart_url = servlet_url + 'UtilService/Login';
checkoutLogin_url = servlet_url + 'checkout/CheckoutLogin';
proceedCheckout_url = servlet_url + 'checkout/ProceedCheckout';
continueCheckout_url = servlet_url + 'checkout/ContinueCheckout';
payBill_url = servlet_url + 'checkout/PayBill';
payBillPayPal_url = servlet_url + 'checkout/PayBillPaypal';
placeOrder_url = servlet_url + 'checkout/PlaceOrder?';
placeOrderPayPal_url = servlet_url + 'checkout/PlaceOrderPaypal';
applyorRemovePromoCode_url = servlet_url + 'checkout/ApplyorRemovePromoCode';
premiumDC_url = servlet_url + 'checkout/FetchPremiumDeliveryCharge';
removeCC_url = servlet_url + 'checkout/RemoveCreditCard';
checkoutDisplay_url = servlet_url + 'checkout/CheckoutDisplay';
applyOrRemoveGC_url = servlet_url + 'checkout/ApplyorRemoveGiftCard';
thirdPartyPickup_url = servlet_url + "checkout/ThirdPartyPickUp";
viewProfile_url = servlet_url + 'UtilService/ViewProfile';
proceedCheckoutPaypal_url = servlet_url + 'checkout/ProceedCheckoutPaypal';
payPalFetchOrderDetail_url = servlet_url + 'checkout/FetchOrderDetail';
applyShippingOption_url = servlet_url + 'checkout/ApplyShippingOptions';
checkoutDisplay_url = servlet_url + 'checkout/CheckoutDisplay';
getCouponOffers_url = servlet_url + "checkout/product-offers"

/******* GET URLS ***********/


poViewCart_url = servlet_url + 'cart/POViewCart?';
viewCart_url = servlet_url + 'cart/ViewCart?';
addToCart_url = servlet_url + 'cart/AddtoCart?';
storePickupContinue_url = servlet_url + 'cart/StorePickupContinue?';
updateCart_url = servlet_url + 'cart/UpdateCart?';
addInstallationAddress_url = servlet_url + 'checkout/AddInstallationAddress?';
installationContinue_url = servlet_url + 'checkout/InstallationContinue?';
handleAddress_url = servlet_url + 'checkout/HandleAddress?';
handleAddressTourism_url = servlet_url + 'checkout/HandleAddressToursim?';
handleInstallation_url = servlet_url + 'product-option/HandleInstallation?';
applyPO_url = servlet_url + 'product-option/ApplyProductOption?';
removePO_url = servlet_url + "product-option/RemoveProductOption?";
userRegistration_url = servlet_url + "checkout/UserRegistration?";
SCPaypal_url = servlet_url + 'checkout/SCPaypal?';

applyOrRemoveCoupons_url = servlet_url + "checkout/ApplyOrRemoveCoupons?";
sywService_url = servlet_url + "checkout/SYWRService?";
fetchSYWROrderTotal_url = servlet_url + "checkout/FetchSYWROrderTotal?";
saveSYWRonCart_url = servlet_url + "checkout/SaveSYWRonCart?";
applyRebates_url = servlet_url + "checkout/ApplyRebate?";

dynamicCartView = "";

carouselProducts_url = servlet_url +"TIproducts/fbt.json?";
carouselOffers_url = servlet_url +"TIoffers/mobileoffer.json?";


eCouponDeploy = "http://mobile303p.dev.ch3.s.com:8180/ecoupons_dispatcher/service/rest/sywrECoupons/";
eCoupon_getSaved_url = eCouponDeploy + 'GetSavedOffers?';
eCoupon_removeOffer_url = eCouponDeploy + 'RemoveOffer?';


/*************** FOR OMNITURE *******************************/
omSuiteId = "searsmobilewlcctest";
omFlag = "true";

/************************ REFRACTOR *****************************/
refractor_processPickupData_url = servlet_url + 'cart/ProcessPickupData?';
refractor_pickupInfoUpdate_url = servlet_url + 'cart/PickupInfoUpdate?';


//instantiate the app
var WLCC = angular.module("wlcc", ['ngResource']);

WLCC.resolves = {};

var deba = [];  //congwen deba

WLCC.config(['$httpProvider', function($httpProvider){
	delete $httpProvider.defaults.headers.common["X-Requested-With"]; 
	$httpProvider.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded';
}])
.run(['$rootScope', '$http', '$location', '$templateCache', '$timeout', 'omnitureTagging','sessionVariables', function($rootScope, $http, $location, $templateCache, $timeout, omnitureTagging, sessionVariables){
        
        var debugMode = true;
		//set dynamicCartView based on server
		if((window.location.origin).indexOf(".dev.") != -1){
			var dynamicCartView = "http://mobile303p.dev.ch3.s.com:8180/";	
			//console.log('Dev');
			$rootScope.environment = "DEV";
			
		}else if((window.location.origin).indexOf(".qa.") != -1){
			var dynamicCartView = "http://mobile303p.qa.ch3.s.com:8180//";	
			$rootScope.environment = "QA";
				//console.log('Qa');
		}else if((window.location.origin).indexOf("localhost") != -1){
			dynamicCartView = "";
			//console.log('LocalHost');
			$rootScope.environment = "LOCALHOST";
		}else{
			//assuming this is prod
			// NEEDS MORE TESTING
			$rootScope.environment = "PROD";
		}
	//warn users before refreshing the page.
//	$(window).on('beforeunload', function() {
//	    return 'You may lose any unsaved data. Would you like to reload the page?';
//	});
    //Hard Coded for Testing
	localStorage.setItem('cartStore', 'sears');
    
	$rootScope.getUrlVar = function(target) {
	    var vars = [], hash;
	    //or location.search.substr(1) // lateron revisit
	    var params = window.location.href.slice(window.location.href.indexOf('?') + 1).split('#/');
	    var hashes = params[0].split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        if($.inArray(hash[0], vars)>-1)
	        {
	            vars[hash[0]]+=","+hash[1];
	        }
	        else
	        {
	            vars.push(hash[0]);
	            vars[hash[0]] = hash[1];
	        }
	    }
	    return vars[target];
	};

   
	$rootScope.setUserAgent = function(){
		if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)){
	      //console.log('IOS');
	      localStorage.wlccUserAgent = "IOS";
	      $rootScope.wlccUserAgent = 'IOS';
       }else if (navigator.userAgent.match(/Android/i)) {
    	 //console.log('android');
    	 localStorage.wlccUserAgent = "ANDROID";
         $rootScope.wlccUserAgent = 'ANDROID';  
      }else{
    	  localStorage.wlccUserAgent = "MWEB";
          $rootScope.wlccUserAgent = 'MWEB';  
      }
	}
   $rootScope.setUserAgent();
   $rootScope.$on('$routeChangeError',function(){
	   //console.log(arguments);
   });

    $rootScope.mergeObj = function(obj1, obj2){
        var obj = {};
        for (att in obj1){
            obj[att] = obj1[att];
        }
        for (var att in obj2) {
            obj[att] = obj2[att];
        }
        return obj;
    };

    //Timer In Case we need to Expire
/*    $rootScope.timer = 0;
    $rootScope.logOutTimer = function(){
        setInterval(function(){
            $rootScope.timer++;
            if ($rootScope.timer >= 10){
                //console.log('expired');
            }
            $rootScope.$apply();
//            //console.log($rootScope.timer);
        }, 1000);
    }
    $rootScope.logOutTimer();*/

    $rootScope.storeInfo = {
        cartStore: '',
        itemStore: '',
        Kmart: {
            catalogId: '10104',
            store: 'Kmart',
            storeId: '10151',
            toString: function(){
                return '&in_catalogId='+this.catalogId
                    +'&in_store='+this.store
                    +'&in_storeId='+this.storeId;
            },
            addKey: function(obj){
                obj.in_catalogId = this.catalogId;
                obj.in_store = this.store;
                obj.in_storeId = this.storeId;
                return obj;
            }
        },
        Sears: {
            catalogId: '12605',
            store: 'Sears',
            storeId: '10153',
            toString: function(){
                return '&in_catalogId='+this.catalogId
                    +'&in_store='+this.store
                    +'&in_storeId='+this.storeId;
            },
            addKey: function(obj){
                obj.in_catalogId = this.catalogId;
                obj.in_store = this.store;
                obj.in_storeId = this.storeId;
                return obj;
            }
        },
        storeUrl: function(store){
//            if(deba.servletReady == false) {return '';}

            this.itemStore = (store) ? store : this.itemStore;
            if(this.itemStore == "sears"){
                return this.Sears.toString();
            }else if (this.itemStore == "kmart"){
                return this.Kmart.toString();
            }
            else{
            	//console.log('%c Unrecognized Store!',  'background: #222; color: #bada55');
            }
        },
        storeKey: function(obj, store){
//            if(deba.servletReady == false){return obj;}

            this.itemStore = (store) ? store : this.itemStore;
            if (this.itemStore == "sears"){
                return this.Sears.addKey(obj);
            } else if (this.itemStore == "kmart"){
                return this.Kmart.addKey(obj);
            } else{
             //console.log('%c Unrecognized Store!',  'background: #222; color: #bada55');
            }
        },
        storeUrlCart: function(cartStore){
            var lsStore = localStorage.getItem('cartStore');
            this.cartStore = (lsStore != null) ? lsStore : ((cartStore) ? cartStore : this.itemStore);
            return this.storeUrl(this.cartStore);
        },
        storeKeyCart: function(obj, cartStore){
            var lsStore = localStorage.getItem('cartStore');
            this.cartStore = (lsStore != null) ? lsStore : ((cartStore) ? cartStore : this.itemStore);
            return this.storeKey(obj, this.cartStore);
        }
    };

    $rootScope.omSuiteIdClient = omSuiteId;
//	$rootScope.omFlagClient = omFlag;
	$rootScope.visitorId = "1234567";

	
	$rootScope.addOmnitureParams = function(obj, page, urlFlag){
		if(urlFlag){
			obj = obj + 
			"&visitorId="	+ 	$rootScope.visitorId+
			"&pageName=" 	+	encodeURI(page)+
			"&in_userType="	+	$rootScope.userType+
			"&userAgent=" 	+	encodeURI(navigator.userAgent)+
			"&omSuiteId=" 	+	$rootScope.omSuiteIdClient +
			"&uniqReqId=" 	+  localStorage.uid +
			"&in_spuRefactorEnabled=" + 'true';
			if(obj.indexOf("in_zipCode") == -1 && $rootScope.zipcode != undefined && $rootScope.zipcode != ""){
				obj = obj + "&in_zipCode="	+	$rootScope.zipcode;
			}
//			"&OmFlag="		+ 	$rootScope.omFlagClient;
			return obj;
		}else{
			obj.visitorId 	= 	$rootScope.visitorId;
			obj.pageName 	= 	page;
			obj.in_userType =	$rootScope.userType;
			obj.userAgent 	= 	navigator.userAgent;
			obj.omSuiteId 	= 	$rootScope.omSuiteIdClient;
			obj.in_spuRefactorEnabled = 'true';
			
			if(obj.in_zipCode == undefined && $rootScope.zipcode != undefined && $rootScope.zipcode != ""){
				obj.in_zipCode	=	$rootScope.zipcode;
			}
//			obj.OmFlag 		= 	$rootScope.omFlagClient;
			obj.uniqReqId = localStorage.uid;
			return obj;
		}
			
	};
    
    
	$rootScope.MOBILE = navigator.userAgent.match(/mobile/i);
	$rootScope.myEvent = $rootScope.MOBILE ? "touchend" : "click";
	

	$rootScope.addressState = [
       {name: "AA"}, {name: "AE"}, {name: "AK"}, {name: "AL"}, {name: "AP"}, {name: "AR"}, {name: "AS"}, {name: "AZ"}, {name: "CA"}, {name: "CO"}, 
       {name: "CT"}, {name: "DC"}, {name: "DE"}, {name: "FL"}, {name: "GA"}, {name: "GU"}, {name: "HI"}, {name: "IA"}, {name: "ID"}, {name: "IL"},
       {name: "IN"}, {name: "KS"}, {name: "KY"}, {name: "LA"}, {name: "MA"}, {name: "MD"}, {name: "ME"}, {name: "MI"}, {name: "MN"}, {name: "MO"},
       {name: "MS"}, {name: "MT"}, {name: "NC"}, {name: "ND"}, {name: "NE"}, {name: "NH"}, {name: "NJ"}, {name: "NM"}, {name: "NV"}, {name: "NY"},
       {name: "OH"}, {name: "OK"}, {name: "OR"}, {name: "PA"}, {name: "PR"}, {name: "RI"}, {name: "SC"}, {name: "SD"}, {name: "TN"}, {name: "TX"},
       {name: "UT"}, {name: "VA"}, {name: "VI"}, {name: "VT"}, {name: "WA"}, {name: "WI"}, {name: "WV"}, {name: "WY"}
    ];
	
	$rootScope.addressProvince = [
	   {name: "AB"}, {name: "BC"}, {name: "MB"}, {name: "NB"}, {name: "NL"}, {name: "NS"}, {name: "NT"}, 
	   {name: "NU"}, {name: "ON"}, {name: "PE"}, {name: "QC"}, {name: "SK"}, {name: "YT"}
	];
	
	/************ PLEASE DO NOT OVERWRITE ***********/
	$rootScope.selectedBillingAddressId = "";
	$rootScope.addressList = new Array();
	$rootScope.continueShippingCheckout = {
			addressId : new Array(),
			shipModeId: new Array(),
			shippingQuantities: new Array(),
			shippingOrderItemIds: new Array(),
	};
	
	$rootScope.continueDeliveryCheckout = {
			addressId : "",
			shipModeId: new Array(),
			deliveryQuantities: new Array(),
			deliveryOrderItemIds: new Array(),
	};
	
	$rootScope.selectedDeliveryType = "";
	$rootScope.selectedDeliveryCharge = "";
		
	$rootScope.objToArray = function(object) {
		if(typeof object != "undefined" && typeof object.length == 'undefined') {
			var temp = object;
			delete object;
			object = new Array();
			object.push(temp);
		}
		return object;
	};
	
	$rootScope.transitionalCss = function(currentElementType, currentElement, toggled, additionalCutoff) {
		if(currentElementType == "attr") {
			currentElement = $("[" + currentElement + "]");
		} else if(currentElementType == "class") {
			currentElement = $("." + currentElement);
		} else if(currentElementType =="id") {
			currentElement = $("#" + currentElement);
		}
		
		var parentElement = currentElement.parent();
		if(toggled == true) {
			parentElement.removeClass("toggled").addClass("untoggled");
			changeToHeight = parentElement.height() - currentElement.height() - additionalCutoff;
			parentElement.height(changeToHeight);
		} else {
			parentElement.removeClass("untoggled").addClass("toggled");
			changeToHeight = parentElement.height()+currentElement.height() + additionalCutoff;
			parentElement.height(changeToHeight);
		}
	};
	
	$rootScope.toggleOnOff = function(elementInJquery, toggle) {
		if(toggle == true) {
			elementInJquery.removeClass("toggled").addClass("untoggled");
		} else {
			elementInJquery.removeClass("untoggled").addClass("toggled");
		}
	};
	
//	$rootScope.searchSelectedFulfillment = function(available, selected) {
//		available = (available.replace(/ /g,"")).toLowerCase();
//		selected = (selected.replace(/ /g, "")).toLowerCase();
////		//console.log("compare: " + available+ " "+ selected);
//		if(available == selected){
//			return true;
//		}else{
//			return false;
//		}
//		
////		if(available.toLowerCase() == selected.toLowerCase()){
////			return true;
////		}else if(available == "SPU" && selected == "SRES"){
////			return true;
////		}else{
////			return false;
////		}
//	};
	
	$rootScope.removeFromArray = function(array, keyToRemove) {
		if((indexToRemove = array.indexOf(keyToRemove)) > -1) {
			array.splice(indexToRemove, 1);
		}
		return array;
	};
	
	$rootScope.numberToCurrency = function(price) {
		if(typeof price == 'string') {
			if(price.indexOf("$") > -1)
				return price;
			else return "$" + price.toString();
		} else 
			return "$" + price.toString();
	};
	
	$rootScope.removeCurrency = function(json) {
		//console.log(JSON.stringify(json));
		var string = JSON.stringify(json);
		string = string.replace(/\$/g,"");
		return JSON.parse(string);
	};
	
	$rootScope.convertToMonthDayYearFormat = function(date) { //assuming the original format is year-month-day, converting to month-day-year
		date = date.split("-");
		return date[1] + "-" + date[2] + "-" + date[0];
	};
	
	$rootScope.setExpandedStatus = function(currentStatus) {
		$rootScope.expandedStatus = currentStatus.ExpandedStatus.replace(",","").toLowerCase();
		$rootScope.notVisited = currentStatus.NotVisited.replace(",","").toLowerCase();
	};
	
	$rootScope.returnAvailableShipModeId = function(allShippingOption) {
		var allShipModeId = new Array();
		if(allShippingOption.hasOwnProperty("StandardShippingMode")) allShipModeId.push(allShippingOption.StandardShippingMode.ShipModeId);
		if(allShippingOption.hasOwnProperty("ExpeditedShippingMode")) allShipModeId.push(allShippingOption.ExpeditedShippingMode.ShipModeId);
		if(allShippingOption.hasOwnProperty("PremiumShippingMode")) allShipModeId.push(allShippingOption.PremiumShippingMode.ShipModeId);
		return allShipModeId;
	};
	
	$rootScope.maskCCN = function(ccn, starLen){ //Masks CREDIT CARD NUMBER, (@number, @length to mask)
		if (!starLen) var starLen = ccn.length-4;
        var visible = ccn.substring(ccn.length-4);
        var result = '';
        for ( var i = 0; i < starLen; i ++){
            result += '*';
        }
        return  result + visible;
	};
	
	
	$rootScope.omnitureTagging = function(tagAction, page, error){
		 omnitureTagging.tag(tagAction, page, error);
	};
	
	sessionVariables.setSessionVariables();
	
	$rootScope.responseMessage = {
			"success":"The action is successful",
			"invokeStorePickupContinue":"Action is successful.Please invoke Store Pickup Continue Service",
			"login":"Please Login to Proceed",
			"registration": "Please initiate Checkout Login / User Registration  to Continue",
			"handleAddress": "Please enter address details using Handle Address API",
			"addAddress" : "Please enter your address to proceed.",
			"addAddress2": "Please Enter your Address Details to proceed",
			"continueCheckoutGuest": "The action is successful.Please continue Checkout",
			"continueCheckout": "Please invoke continue checkout API",
			"orderSuccessful":"Order placed successfully",
			"placeOrder":"Please invoke place order API",
			"payBill":"Please invoke PayBill API",
			"failed":"Failed to retrieve response from third party service.",
			"loginSuccess": "LOGIN SUCCESSFUL",
			"invalidAddress": "Address Id field is invalid or blank.",
			"continueInstallationAddress": "Please invoke Add Installation Address API",
			"sessionInvalid" : "Session invalid. Please relogin and try.",
			"failedRetrieveResponse" : "Failed to retrieve response from third party service.",
			"payPalIneligible" : "Sorry, this order is not eligible for Pay Pal, please select another payment method.",
			"selectStore" : "Please select a pick up store for your pick up items",
			"outOfStock" : "_ERR_OUTOFSTOCK",
			"countyError" : "Please call HandleAddress API with selected county",
			"overSize" : "Please use another shipping address or remove the item from your order",
			"shipError": "Sorry, this item cannot be shipped to your location. Please remove it.",
	};
	
    $rootScope.makeUrl = function(url, params){
        return url + $.param(params);
    }
    $rootScope.newCreditCard = undefined;
	
	$rootScope.templateSource = "cart";
	$rootScope.isLoading = false;
	$rootScope.ajaxLoader = false;
	$rootScope.isCheckout = false;
	
	$rootScope.ajaxPending = false;
	$rootScope.responseFail = false;
	$rootScope.count = 0;
//    $rootScope.userType = (localStorage.getItem('userType')) ? localStorage.getItem('userType') : 'R';
	
//	expressCheckoutResolve.isTrueOrFalse();
//        $rootScope.selectedCreditCardInfo = {};
}]);//end WLCC module


// FILTER
WLCC.filter('decodeLang', [function(){
    return function(input){
        input = input.replace('&amp;', '&');
        input = input.replace('&#8482;', '&trade;');
        input = input.replace('&#153;', '&trade;');

        input = input.replace('&#169;', '&copy;');
        input = input.replace('&#174;', '&reg');
        input = $('<div></div>').append(input).text();
//        //console.log($('<div></div>').append(input).text());
        return input;
    };
}]);
WLCC.directive('validatePage', ["$rootScope", "$timeout", "validatePageService", "payPalService", function($rootScope, $timeout, validatePageService, payPalService) {
	return {
		restrict: "A",
		link: function(scope, element, attr) {
			element.bind($rootScope.myEvent, function(){
				var page = element.attr('validate-page');
				var index = scope.$index;
				//console.log(page);
				$timeout(function() {
					scope.$apply(function(){
						if(page == "viewCart"){
							validatePageService.validateViewCart();
							$rootScope.currentPage = 'cart';
						}else if(page == "fulfillment"){
							validatePageService.validateFulfillment();
							$rootScope.currentPage = 'fulfillment';
						} else if(page == "payment"){
							
							validatePageService.validatePayment();
							$rootScope.currentPage = 'payment';
		                } else if(page == "reviewOrder"){
	                		
	                		validatePageService.validateReview();
		                	$rootScope.currentPage = 'review';
						}
					});
				}, 0);
			});
			
			element.bind("handleTrigger", function(){
				var page = element.attr('validate-page');
				var index = scope.$index;
				//console.log(page);
				$timeout(function() {
					scope.$apply(function(){
						if(page == "viewCart"){
							validatePageService.validateViewCart();
							$rootScope.currentPage = 'cart';
						}else if(page == "fulfillment"){
							validatePageService.validateFulfillment();
							$rootScope.currentPage = 'fulfillment';
						} else if(page == "payment"){
					
							validatePageService.validatePayment();
							$rootScope.currentPage = 'payment';
		                } else if(page == "reviewOrder"){
	                		
	                		validatePageService.validateReview();
		                	$rootScope.currentPage = 'review';
						}
					});
				}, 0);
				
			});
			
			$timeout(function(){
				var page = element.attr('validate-page');
				if($rootScope.isExpress && page == "fulfillment") {
					$rootScope.ajaxLoader = true;
					//console.log($rootScope.expandedStatus);
					element.triggerHandler("handleTrigger");
				}
			},2000);
		}
	};
}]);

WLCC.factory("validatePageService", ['$q','$rootScope', '$timeout', '$location', 'payBill', 'placeOrder', 'proceedToCheckOut', 'proceedToCheckoutParsing', 'continueCheckoutParsing', 'continueCheckOut', 'paymentValidatorService', 'continueInstallationAjaxService', 'payPalService', 'applyShippingOption', 'checkoutDisplay',
function($q, $rootScope, $timeout, $location, payBill, placeOrder, proceedToCheckOut, proceedToCheckoutParsing, continueCheckoutParsing, continueCheckOut, paymentValidatorService, continueInstallationAjaxService, payPalService, applyShippingOption, checkoutDisplay){
	var validatePageService = {};
	validatePageService.validateViewCart = function() {
		//here the validation will happen
		$rootScope.cartError = "";
		$rootScope.ajaxLoader = true;
		proceedToCheckOut.deferred = $q.defer();
		proceedToCheckOut.checkOut();

		proceedToCheckOut.deferred.promise.then(function(){
			$rootScope.ajaxLoader = false;
			if($rootScope.proceedToCheckoutResponse.UserLogonResponse != undefined){     
				if($rootScope.proceedToCheckoutResponse.UserLogonResponse.StatusData.ResponseMessage == $rootScope.responseMessage.registration){
					$("#signInModal").trigger("loginHandler");
				}
			}else if($rootScope.proceedToCheckoutResponse.StorePickUp != undefined){
				$rootScope.cartError = $rootScope.responseMessage.selectStore;
			}else if($rootScope.proceedToCheckoutResponse.CartResponse != undefined){
				if($rootScope.proceedToCheckoutResponse.CartResponse.Shoppingcart.CartErrorMessage != ""){
					//console.log("CART ERROR MESSAGE: " + $rootScope.proceedToCheckoutResponse.CartResponse.Shoppingcart.CartErrorMessage);
					$rootScope.cartError = $rootScope.proceedToCheckoutResponse.CartResponse.Shoppingcart.CartErrorMessage;
				}
			}else if($rootScope.proceedToCheckoutResponse.CheckoutResponse != undefined){
				$rootScope.showNewAddressForm = false;
				if($rootScope.proceedToCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.login || $rootScope.proceedToCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.sessionInvalid){
					$("#signInModal").trigger("loginHandler");
				}else if($rootScope.proceedToCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.payBill){
					
					$rootScope.setExpandedStatus($rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus);
					proceedToCheckoutParsing.parseData($rootScope.proceedToCheckoutResponse);
					continueCheckoutParsing.parseData($rootScope.proceedToCheckoutResponse);
					$location.path(dynamicCartView + '/cart/co_step_fulfillment');
				}else if($rootScope.proceedToCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.continueCheckout){
					$rootScope.setExpandedStatus($rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus);
					proceedToCheckoutParsing.parseData($rootScope.proceedToCheckoutResponse);
					$rootScope.ajaxLoader = $rootScope.isExpress ? true : false;
					if($rootScope.removeOverSizedItem.length == 0) {
						$location.path(dynamicCartView +'/cart/co_step_fulfillment');
					}
				}else if($rootScope.proceedToCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.handleAddress){
					//console.log("Add an address");
					$rootScope.setExpandedStatus($rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus);
					$rootScope.showNewAddressForm = true;
					$location.path(dynamicCartView + '/cart/co_step_fulfillment');
				}

//				if($rootScope.isExpress == true ){
//				$timeout(function() {validatePageService.validateFulfillment(); 
//		
//					$timeout(function() {validatePageService.validateFulfillment(); }, 3000);
//					$timeout(function() {validatePageService.validateFulfillment(); }, 3000);
//					
//					
//					}, 900);
//                }

			}
		});
		//WLCCProceedCheckout();
	};
	
	validatePageService.validateFulfillment = function(scope) {
		//here the validation will happen
		$rootScope.ajaxLoader = true;
		continueCheckOut.deferred = $q.defer();
		if($rootScope.expandedStatus == "shipping") {
			//console.log("shipping");
			if($("[data-address-setting]").attr("data-address-setting") == "one" && ($rootScope.shippingOptionChanged == true || $rootScope.selectedAddressChanged == true)) {
				delete $rootScope.shippingOptionChanged;
				delete $rootScope.selectedAddressChanged;
				applyShippingOption.scenarioOne();
				applyShippingOption.ajaxCall();
				applyShippingOption.deferred.promise.then(function(data){
					continueCheckOut.shipping();
				});
			} else if($rootScope.runScenarioThree == true || $rootScope.shippingOptionChanged == true)  {
				delete $rootScope.runScenarioThree;
				delete $rootScope.shippingOptionChanged;
				for(var i in $rootScope.shippingItems) {
					if($rootScope.modifyShippingOptionAddress[i] == true) {
						applyShippingOption.scenarioThree(i);
						applyShippingOption.ajaxCall(i);
					} else {
						applyShippingOption.scenarioTwo(i);
						applyShippingOption.ajaxCall(i);
					}
					applyShippingOption.deferred.promise.then(function(data){
						continueCheckOut.shipping();
					});
				}
			} else {
				continueCheckOut.shipping();
			}
		} else if($rootScope.expandedStatus == "delivery") {
			//console.log("delivery");
			continueCheckOut.delivery();	
		} else if($rootScope.expandedStatus == "installation") {
			//console.log("installation");
			continueInstallationAjaxService.continueInstallation();
//			continueInstallationAjaxService.addAddress();
		} else if(($rootScope.expandedStatus == "payment" || $rootScope.expandedStatus == "pickup") && $rootScope.isExpress != true) {
			if($("#thirdPartyPickUp").prop("checked") == true) {
				var email = $("#thirdPartyEmail");
				var name = $("#thirdPartyName");
				email.trigger("change");
				if($("#thirdPartyEmail").hasClass("error")) {
					email.parent().addClass("error");
				}
				if($.trim(name.val()) == "") {
					name.parent().addClass("error");
				}
				if(!$("#thirdPartyEmail").hasClass("error") && $.trim(name.val()) != "") {
					$rootScope.thirdPartyEmail = $("#thirdPartyEmail").val();
					$rootScope.thirdPartyName = $("#thirdPartyName").val();
					$rootScope.someonePickingUp = "Y";
					$location.path(dynamicCartView +'/cart/co_step_payment');
		            continueCheckoutParsing.parseData($rootScope.continueCheckoutResponse);
				}
			} else {
				$rootScope.thirdPartyEmail = "";
				$rootScope.thirdPartyName = "";
				$rootScope.someonePickingUp = "";
				$location.path(dynamicCartView +'/cart/co_step_payment');
	            continueCheckoutParsing.parseData($rootScope.continueCheckoutResponse);
			}
			$rootScope.ajaxLoader = false;
			$rootScope.removeExpressUI = true;
		} else if($rootScope.isExpress){
			if($rootScope.proceedToCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.continueCheckout) {
				$rootScope.setExpandedStatus($rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus);
				$timeout(function(){ $("a[validate-page]").trigger("handleTrigger"); }, 0); 
			}
		}
		
		continueCheckOut.deferred.promise.then(function(){
			$rootScope.ajaxLoader = false;
			if($rootScope.continueCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.payBill){
				continueCheckoutParsing.parseData($rootScope.continueCheckoutResponse);
				$rootScope.removeExpressUI = true;
				$location.path(dynamicCartView +'/cart/co_step_payment');
			}else if($rootScope.continueCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.continueCheckout){
				proceedToCheckoutParsing.parseData($rootScope.continueCheckoutResponse);
				if($rootScope.isExpress == true){
					validatePageService.validateFulfillment();
				}
			} else if($rootScope.continueCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.continueInstallationAddress) {
				proceedToCheckoutParsing.parseData($rootScope.continueCheckoutResponse);
			} else if($rootScope.continueCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.failedRetrieveResponse){
				$rootScope.cartError = "The selected address is invalid, please choose a different one";
//					$rootScope.showNewAddressForm = true;
			} 
		});
	}
	
	validatePageService.validatePayment = function() {
		$rootScope.isExpress == false; /*************** MATT I THOUGHT YOU SAID THIS WAS NEVER TURNED INTO FALSE???? WHY IS THIS HERE THEN?? *********/
        var afterPayBillExecution = function() {
        	$rootScope.ajaxLoader = false;
			if($rootScope.payBillResponse != undefined){
				if($rootScope.payBillResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.placeOrder){
				
					payBill.preparingDataForReview();
//					$rootScope.allProducts = [];
//                    if(!angular.isArray($rootScope.reviewPickupItems)){
//                        $rootScope.reviewPickupItems = $rootScope.objToArray($rootScope.reviewPickupItems);
//                    }
//                    var omnitureConfirmationData = new Array();
//                    var thePrice = 0;
//                    $rootScope.carouselPartNum = "";
//					if($rootScope.reviewPickupItems){
//						$.each($rootScope.reviewPickupItems, function(){
//							var obj = {};
//							var _this = this.PickUpItemDetail;
//							obj.img = _this.ImageURL;
//							obj.name = _this.ItemName;
//							obj.price = _this.PickUpTotal;
//							
//							var date = new Date();
//							var day = date.getDay();
//							if(day < 6 && day > 0)
//								this.closingHour = this.PickUpHours.MondayToFriday.split("-")[1];
//							else if(day == 0) {
//								this.closingHour = this.PickUpHours.Sunday.split("-")[1];
//							} else this.closingHour = this.PickUpHours.Saturday.split("-")[1];
//							this.StorePhone = "(" + this.StorePhone.substring(0, 3) + ") " + this.StorePhone.substring(3, 6) + "-" + this.StorePhone.substring(6, this.StorePhone.length);
//							
//							$rootScope.allProducts.push(obj);
//							
//							if(thePrice < _this.PickUpTotal){
//								thePrice = _this.PickUpTotal;
//								$rootScope.carouselPartNum = _this.PartNumber+"P";
//							}
//							omnitureConfirmationData.push(";"+_this.PartNumber+"P;"+_this.PickUpQuantity+";"+_this.PickUpTotal+";eVar46=Spu");
//						});
//					}
//					if($rootScope.reviewShippingItems){
//						$.each($rootScope.reviewShippingItems, function(){
//							var obj = {};
//							obj.img = this.ImageURL;
//							obj.name = this.ItemDescription;
//							obj.price = this.ItemPrice;
//							$rootScope.allProducts.push(obj);
//							
//							if(thePrice < this.ItemPrice){
//								thePrice = this.ItemPrice;
//								$rootScope.carouselPartNum = this.PartNumber+"P";
//							}
//							omnitureConfirmationData.push(";"+this.PartNumber+"P;"+this.ShippingQuantity+";"+this.ItemPrice+";eVar46=Shipping");
//						});
//					}
//					if($rootScope.reviewDeliveryItems){
//						$.each($rootScope.reviewDeliveryItems, function(){
//							var obj = {};
//							obj.img = this.ImageURL;
//							obj.name = this.ItemDescription;
//							obj.price = this.DeliveryItemPrice;
//							$rootScope.allProducts.push(obj);
//							
//							if(thePrice < this.DeliveryItemPrice){
//								thePrice = this.DeliveryItemPrice;
//								$rootScope.carouselPartNum = this.PartNumber+"P";
//							}
//							
//							omnitureConfirmationData.push(";"+this.PartNumber+"P;"+this.Quantity+";"+this.DeliveryItemPrice+";eVar46=Delivery");
//						});
//					}
//
//					$rootScope.omnitureConfirmationDataToSent = omnitureConfirmationData.toString();

					$location.path(dynamicCartView + '/cart/co_step_review');
				}else{
					$rootScope.checkoutError = $rootScope.payBillResponse.CheckoutResponse.StatusData.RespMessage;
					$location.path(dynamicCartView +'/cart/co_step_payment');
				}
			}
        }
        
		if($rootScope.invokePayPalCO == true){//paypal on viewcart page
			$rootScope.ajaxLoader = true;
			payPalService.expressPayBill();
    		payPalService.expressPayBillDeferred.promise.then(function(data){
        		$rootScope.ajaxLoader = false;
    			if(data.CheckoutResponse.StatusData.RespMessage != $rootScope.responseMessage.payBill) {
	    			payBill.payBillParsing(data);
	    			afterPayBillExecution();
	    			$location.path(dynamicCartView + '/cart/co_step_review');
    			} else {
    				$rootScope.checkoutError = $rootScope.responseMessage.payPalIneligible;
                	$rootScope.invokePayPalCO = false;
    			}
    		});
		} else if($rootScope.payPalStraightToPlaceOrder == true) { //paypal on payment page
//			$rootScope.ajaxLoader = true;
//			payPalService.fetchOrderDetail();
			payPalService.fetchOrderDetailDeferred.promise.then(function(data){
				if(angular.isDefined(data.CheckoutResponse) && data.CheckoutResponse.StatusData.RespMessage  == $rootScope.responseMessage.placeOrder) {
					$rootScope.fetchOrderDetailData = data;
					payBill.payBillParsing(data);
					afterPayBillExecution();
					$location.path(dynamicCartView + '/cart/co_step_review');
				} else {
					$rootScope.checkoutError = $rootScope.responseMessage.payPalIneligible;
				}
			});
			$rootScope.ajaxLoader = false;
			
		} else { //credit card
            //console.log('**Will Be Paying Bill with Credit Card' + $rootScope.selectedCreditCardIndex);
            //console.log($rootScope.selectedCreditCardInfo);
			if($rootScope.orderTotal != undefined){
				var total = $rootScope.orderTotal; 
			}else{
				var total = $rootScope.continueCheckoutResponse.CheckoutResponse.OrderSummary.OrderSummaryTotals.Total;
				
			}
		    total = total.replace("\$", "");
		    $rootScope.orderTotal = total;
		    var valid = false;
            $rootScope.selectedCreditCardInfo = $rootScope.modifiedSavedCards[$rootScope.selectedCreditCardIndex];
		    if(total == "0" || total == "0.0" || total == "0.00"){
		    	valid = true;
			} else if(!$rootScope.selectedCreditCardInfo || $rootScope.selectedCreditCardIndex == -1){       //NOT DEFINED
	            //console.log($rootScope.selectedCreditCardInfo);//console.log($rootScope.selectedCreditCardIndex);
                $rootScope.checkoutError = 'Please select a Credit Card with valid information';
                $('#checkoutError').css('display','block');
	        }
	        else{
	          $('#checkoutError').css('display','none');
		        $('.cvvErrorOn').removeClass('cvvErrorOn').addClass('cvvErrorOff'); // initially remove all error.
		        var index = $rootScope.selectedCreditCardIndex;
	          var cvv = $rootScope.selectedCreditCardInfo.cvv;
		        var cvvOb = $('input[name="creditCards"]:checked');
		        var typ = cvv ? paymentValidatorService.vPattern(cvv, 'numbers') : false; //validate type
		        var digits = cvv ? paymentValidatorService.vLength(cvv, $rootScope.selectedCreditCardInfo.WalletBrand, 'cvv') : false;
	          var isEmpty = (cvv == '' || cvv == undefined);
	
	            //console.log(cvvOb);
	            //console.log(typ+''+digits+isEmpty);
	            if($rootScope.selectedCreditCardIndex == undefined || $rootScope.selectedCreditCardIndex == -1){  //if no credit card is selected.
		            //console.log('Select a Card Please');
                    $rootScope.checkoutError = 'Please Select a Credit Card';
		            $('#checkoutError').css('display', 'block');
                } else {
                    $('#cvvEmpty' + index).removeClass((isEmpty) ? 'cvvErrorOff' : 'cvvErrorOn').addClass((isEmpty) ? 'cvvErrorOn' : 'cvvErrorOff');
                    if(!isEmpty){
                        $('#cvvDigits' + index).removeClass((digits) ? 'cvvErrorOn' : 'cvvErrorOff').addClass((digits) ? 'cvvErrorOff' : 'cvvErrorOn');
                        //console.log('digits' + digits);
                        if(digits){
                            $('#cvvNumbers' + index).removeClass((typ) ? 'cvvErrorOn' : 'cvvErrorOff').addClass((typ) ? 'cvvErrorOff' : 'cvvErrorOn');
                            valid = (typ && digits);   //check for final validity
                        }
		            }
		        }
		        //console.log('payment page is: ' + ((valid) ? 'valid' : 'invalid'));
					}
	        if(!valid){//check for $rootScope.selectedCreditCardInfo
	        	$('#cvv'+$rootScope.selectedCreditCardIndex).addClass('error').focus();
	        } else{
				//check for $rootScope.selectedCreditCardInfo
	            $rootScope.ajaxLoader = true;
	            payBill.deferred = $q.defer();
	
	            payBill.checkOut();
	            payBill.deferred.promise.then(function(){
	            	afterPayBillExecution();
	            });
	        }
		}	
	};
	
	validatePageService.validateReview = function() {
		//here the validation will happen
		$rootScope.checkoutError = "";
		$rootScope.ajaxLoader = true;
		placeOrder.deferred = $q.defer();
		var executeAfterPlaceOrder = function() {
			$rootScope.ajaxLoader = false;
			if($rootScope.confirmationData != undefined){
				if(angular.isDefined($rootScope.confirmationData.CheckoutResponse) && $rootScope.confirmationData.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.orderSuccessful){
					$location.path(dynamicCartView +'/cart/co_step_confirmation');
//					localStorage.clear(); /*** WHY HERE?????? ********/
					localStorage.removeItem("token");
					localStorage.removeItem("uid");
				} else{
//                    //console.log("place order: " + $rootScope.confirmationData.CheckoutResponse.StatusData.RespMessage);
////                    $location.path(dynamicCartView + '/cart/backTo/co_step_payment', 'catch this');
//                    //console.log('**$rootScope.confirmationData');//console.log($rootScope.confirmationData);
//                    //console.log('**Before Updating Credit Card');//console.log($rootScope.modifiedSavedCards);
                    var checkoutError = "";
                    if($rootScope.payPalStraightToPlaceOrder == true && (JSON.stringify($rootScope.confirmationData) == "{}" || JSON.stringify($rootScope.confirmationData) == "" || $rootScope.confirmationData.CheckoutResponse.RespMessage == $rootScope.responseMessage.outOfStock)) { //paypal failed scenario
                    	$rootScope.checkoutError = $rootScope.responseMessage.payPalIneligible;
                    	$rootScope.invokePayPalCO = false;
                    	$rootScope.expandedStatus = "payment";
                    	$rootScope.orderId = localStorage.getItem("WLCCPayPalOrderId");
                    	$rootScope.checkoutDisplayAddressId = localStorage.getItem("WLCCPayPalSelectedBillingAddressId");
                    	checkoutDisplay.ajaxCall();
//                    	continueCheckoutParsing.parseData(JSON.parse(localStorage.getItem("WLCCPayPalContinueCheckoutResponse")));
//                    	localStorage.removeItem("WLCCPayPalContinueCheckoutResponse");
                    	
                    }
                    //Fails Place Order
                    else if($rootScope.confirmationData.CheckoutResponse.StatusData.RespMessage != $rootScope.responseMessage.orderSuccessful
                        && $rootScope.confirmationData.CheckoutResponse.PaymentMethod && $rootScope.confirmationData.CheckoutResponse.PaymentMethod != ''){
                        //if place order fails reparse result as giftcard and credit cards might have updated
                        //console.log('%c**Updating Credit Cards!!!', 'background-color: black; color: #bada55');
                        continueCheckoutParsing.parseData($rootScope.confirmationData, true);
                        //console.log($rootScope.modifiedSavedCards);
                        //console.log($rootScope.confirmationData);
                    }
                    $rootScope.templateSource = 'payment';
                    $location.path(dynamicCartView + '/cart/co_step_payment');
                    $rootScope.selectedCreditCardCVV = undefined;
                    $rootScope.selectedCreditCardIndex = undefined; //maybe not needed
                    if(angular.isDefined($rootScope.confirmationData.CheckoutResponse) && $rootScope.checkoutError == "") {
                    	if($rootScope.confirmationData.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.payBill && $rootScope.payPalStraightToPlaceOrder == true) {
                    		$rootScope.checkoutError = $rootScope.responseMessage.payPalIneligible;
                    	} else {
                    		$rootScope.checkoutError = $rootScope.confirmationData.CheckoutResponse.StatusData.RespMessage;
                    	}
                        $('#checkoutError').css('display','block');
                    }
                    delete $rootScope.payPalStraightToPlaceOrder;
//                    $timeout(function(){
//                        $('#checkoutError').text(checkoutError);
//                    }, 100);
                }
			}
			//console.log($rootScope.confirmationData);
		}
		if($rootScope.invokePayPalCO != true && $rootScope.payPalStraightToPlaceOrder != true) {
			placeOrder.checkOut();
			placeOrder.deferred.promise.then(function(){
				executeAfterPlaceOrder();
			});
		} else {
			payPalService.expressPlaceOrder();
			payPalService.placeOrderDeferred.promise.then(function(data){
				executeAfterPlaceOrder();
			});
		}
	}
	
	return validatePageService;
}]);
	WLCC.factory('logInResponse',['$rootScope', '$location', '$http', '$q', function ($rootScope, $location, $http, $q) {
    var logInResponse = {};
    logInResponse.logIn = function(){
        var postArrayVars = {
			"in_loginId" : $rootScope.enteredEmail,
			"in_logonPassword" :$rootScope.enterdPassword
        };
        
        logInResponse.deferred = $q.defer();
        $http({
        	URL: loginCart_url,
            method: "POST",
            data :postArrayVars,
        	transformRequest: function(data){
	            return $.param(data);
	        }
        }).success(function(json, status, headers, config) {
			logInResponse.json = json;
			$rootScope.proceedToCheckoutResponse = json;
			//console.log(JSON.stringify(json));
			logInResponse.deferred.resolve();
	
        }).error(function(data, status, headers, config) {
            //console.log('login Failure');
            $rootScope.ajaxPending = false;
        });
    };
    return logInResponse;
}]);

/************** CHECKOUT LOGIN **********************/

WLCC.factory('checkoutlogInResponse',['$rootScope', '$location', '$http', '$q', function ($rootScope, $location, $http, $q) {
	var checkoutlogInResponse = {}
	checkoutlogInResponse.logIn = function() {
		var postArrayVars = {
			"in_loginId" : $rootScope.enteredEmail,
			"in_logonId" : $rootScope.enteredEmail,
			"in_logonPassword" : $rootScope.enterdPassword,
			"in_userType" : $rootScope.userType,//G or R
			"in_orderId" : $rootScope.orderId,
			"in_sessionKey" : $rootScope.token,
		};
    	postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Checkout Login");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log(JSON.stringify(postArrayVars));
        checkoutlogInResponse.deferred = $q.defer();
        $http({
        	url: checkoutLogin_url,
        	method: "POST",
        	data :postArrayVars,
        	transformRequest: function(data){
        		return $.param(data);
        	},
        }).success(function(json, status, headers, config) {
			checkoutlogInResponse.json = json;
			//console.log(json);
            //console.log(JSON.stringify(json));
            if (json.CheckoutResponse.StatusData.ResponseCode == '1'){
                $rootScope.loginError = json.CheckoutResponse.StatusData.RespMessage;
            }
            checkoutlogInResponse.deferred.resolve();
          
//            if($rootScope.isExpress == true && $rootScope.expressLogin == true){
//            	expressCheckoutResolve.expressFlow();
//            }
        }).error(function(data, status, headers, config) {
            //console.log('login Failure');
            $rootScope.ajaxPending = false;
            $rootScope.responseFail = true;
        });
    }
    return checkoutlogInResponse;
}]);


//ViewCart
WLCC.factory('viewCartResponse',['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {


    var viewCartResponse = {}
    viewCartResponse.viewCart = function() {
        viewCartResponse.postArrayVars = {
            'in_sessionKey' : $rootScope.token,
            'spuRefactorEnabled': 'true',
        };
//        deba.push($rootScope);deba.push(viewCartResponse.postArrayVars);
        viewCartResponse.postArrayVars = $rootScope.addOmnitureParams(viewCartResponse.postArrayVars, "Shopping Cart");
        viewCartResponse.postArrayVars = $rootScope.storeInfo.storeKeyCart(viewCartResponse.postArrayVars);

        //console.log('firing ViewCart with postArrayVars: ');//console.log(viewCartResponse.postArrayVars);
//        //console.log('firing ViewCart with poViewCart_url: ');//console.log(poViewCart_url);
        viewCartResponse.deferred = $q.defer();
        $rootScope.ajaxPending = true;
        $http({
            url: poViewCart_url,
            //    		url: viewCart_url,
            method: "GET",
            params: viewCartResponse.postArrayVars
        }).success(function(json, status, headers, config) {
        	////console.log(JSON.stringify(json))
        	if ($.isEmptyObject(json)){
                //console.log(json);
                $location.path(dynamicCartView +'cart/error')
                //console.log("Shop Your Way Empty Response")
            }else{
                //console.log('viewCart  11  Response:');//console.log(json.CartResponse.Shoppingcart);
                viewCartResponse.json = json;
                viewCartResponse.deferred.resolve();
               
                $rootScope.ajaxPending = false;
            }
        }).error(function(data, status, headers, config) {
                //console.log('viewCart Failure');
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
        });
    };
    return viewCartResponse;
}]);

// edit Cart 
//WLCC.factory('cartEdit', function ($rootScope, $http, $q, viewCartOrUpdateCart, spuStores) {
WLCC.factory('cartEdit', ['$rootScope', '$http', '$q', '$timeout', 'viewCartOrUpdateCart', function ($rootScope, $http, $q, $timeout, viewCartOrUpdateCart) {
    cartEdit = {};

// edit fulfillment first step (for delivery, ship and pick up)
    deba.push($rootScope);
    cartEdit.editFulfillmentStep1 = function(index, indicator, itemInfo){ //indicator == pickup, delivery
//        cartEdit.editFulfillmentStep1 = $q.deferred();
        $timeout(function(){$rootScope.ajaxPending = true},1);
        //console.log($rootScope.loginType);

        $rootScope.loginType = $rootScope.userType;
        edit = true; // it is always going to be true for inside the cart...
        pOptions = false; // it is going to define if the product has selected product Options

        var postArrayVars = {
            'in_sessionKey' : $rootScope.token,
            'in_orderId' : $rootScope.orderId,
            'in_orderItemId' : $rootScope.items[index].OrderItemID,
            'in_catentryId' : $rootScope.items[index].CatEntryId,
            'in_quantity' : $rootScope.items[index].Qty,
            'in_loginId' : $rootScope.loginType,  // set in wlccResolves.js in validatePage directive
            'in_IndicatorA' : indicator,
            'in_zipCode' : $rootScope.zipcode,
            'in_editFT' : edit,
            'in_productOptions': pOptions,
//            'in_store' :   ,
//            'in_storeId' :   ,
//            'in_catalogId' :   ,
        };
        if(indicator == 'pickup'){
            postArrayVars.in_newItemInfo = itemInfo;
            postArrayVars.in_partNumber = $rootScope.items[index].DisplayPartNumber;
            postArrayVars.in_variant = 0;
            postArrayVars.in_fitmentRequired = false;
        }

        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);

        //console.log(postArrayVars);
//        //console.log('**Fake AddtoCart Url: ' + $rootScope.makeUrl(addToCart_url + postArrayVars));
        $http({
            url: addToCart_url,
            method: "GET",
            params: postArrayVars
        }).success(function(json, status, headers, config) {
            if ($.isEmptyObject(json)){
                $location.path(dynamicCartView +'cart/error')
                //console.log("Shop Your Way Empty Response")
            }else{
                //console.log('Add to cart with edit: Sucsess ' + JSON.stringify(json));
                if(indicator == "pickup"){
                    $rootScope.avaiStores = new Array();
                    viewCartOrUpdateCart.updateToRootScope(json, 'editFulfillment');
                    /*if(json.StorePickUp.Stores != undefined){
                        $rootScope.spuAddToCartResponse = json;
                        var storesArray = $rootScope.objToArray(json.StorePickUp.Stores.Store);
                        var itemsArray = $rootScope.objToArray(json.StorePickUp.ItemList.Item);
                        var storesToBeDisplayed = [false, false, false, false];
                        //console.log(itemsArray)
                        for(var y in itemsArray) {
                            var itemStoresArray = $rootScope.objToArray(itemsArray[y].StoreList.IndStore);
                            for(var z in itemStoresArray){
                                if(itemStoresArray[z].ItemStatusList == ""){
                                    itemsArray.splice(y, 1);
                                    break;
                                }
                            }
                        }
                        //console.log(itemsArray);
                        for(var y in itemsArray){
                            var itemStoresArray = $rootScope.objToArray(itemsArray[y].StoreList.IndStore);
                            for(var z in itemStoresArray){
                                if(y == 0 && (itemStoresArray[z].ItemStatusList!= "" && itemStoresArray[z].ItemStatusList.ItemStatus != "" && itemStoresArray[z].ItemStatusList.ItemStatus.ResponseFfm == "SPU") ){
                                    storesToBeDisplayed[z] = true;
                                } else if(itemStoresArray[z].ItemStatusList!= "" && itemStoresArray[z].ItemStatusList.ItemStatus != "" && itemStoresArray[z].ItemStatusList.ItemStatus.ResponseFfm == "SPU"){
                                    if(storesToBeDisplayed[z] == true){
                                        storesToBeDisplayed[z] = true;
                                    }
                                } else {//else if(itemStoresArray[z].ItemStatusList!= ""){
                                    storesToBeDisplayed[z] = false;
                                }
                            }
                        }
                        for(var z in storesArray){
                            if(storesToBeDisplayed[z] == true){
                                $rootScope.avaiStores.push(storesArray[z]);
                            }
                        }

                        if($rootScope.avaiStores.length == 0){
                            $rootScope.spuAddToCartResponse.StorePickUp.StatusData.RespMessage = "The pick up items currently in your cart are not available for pick up in this area. Please enter a new zip code";
                        }
                        for(x in $rootScope.avaiStores){
                            if($rootScope.items[index].ArrivalMethods.SelectedArrivalMethod.SelectedStore.SelectedStoreName == $rootScope.avaiStores[x].SelectedStoreName){
                                $rootScope.selectedPickUpStoreIndex = x;
                                //		    			//console.log($rootScope.selectedPickUpStoreIndex);
                            }
                        }
                    }
                    if(json.StorePickUp.StatusData.RespMessage == "Action is successful.Please invoke Store Pickup Continue Service"){
                        $rootScope.spuAddToCartResponse.StorePickUp.StatusData.RespMessage = "";
                    }else{
                        $rootScope.spuAddToCartResponse.StorePickUp.StatusData.RespMessage = json.StorePickUp.StatusData.RespMessage;
                    }*/
                    $timeout(function(){$rootScope.ajaxPending = false},10);
                }else{
                    $timeout(function(){$rootScope.ajaxPending = false},10);
                    viewCartOrUpdateCart.updateToRootScope(json, 'editFulfillment');
                }
            }
        }).error(function(data, status, headers, config) {
            //console.log('Add to cart with edit: Failure');
            $rootScope.ajaxPending = false;
            $rootScope.responseFail = true;
        });

    }


//edit Qty
    cartEdit.updateQuantity = function(index, quantity){
        $rootScope.ajaxPending = true;
        var postArrayVars = {
            'in_sessionKey' : $rootScope.token,
            'in_orderId' : $rootScope.orderId,
            'in_orderItemId' : $rootScope.items[index].OrderItemID,
            'in_quantity' : quantity
        };
        
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing UpdateQuantity with postArrayVars: ');//console.log(postArrayVars);

        $http({
            url: updateCart_url,
            method: "GET",
            params: postArrayVars
        })
            .success(function(json, status, headers, config) {
                if ($.isEmptyObject(json)){
                    $location.path(dynamicCartView +'cart/error')
                    //console.log("Shop Your Way Empty Response")
                }else{
                    //console.log('Update Quantity Sucsess ' + JSON.stringify(json));
                    viewCartOrUpdateCart.updateToRootScope(json);
                    $rootScope.ajaxPending = false;
                    updateCartCnt($rootScope.itemsInCart);
                    $rootScope.possiblePointsOnOrder = json.CartResponse.Shoppingcart.Summary.SYWRPoints;
                }
            }).error(function(data, status, headers, config) {
                //console.log('Update Quantity Response Failure');
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    }

//Delete Item
    cartEdit.deleteCurrentItem = function(item) {
        $rootScope.ajaxPending = true;
        var delete_item_url = servlet_url + "cart/NewDeleteFrmCart?in_sessionKey=" + $rootScope.token + "&in_orderId=" + $rootScope.orderId + "&in_orderItemId=" + item.OrderItemID;
        var ajaxParam = {
            "in_sessionKey" : $rootScope.token,
            "in_orderItemId" : item.OrderItemID,
            "in_orderId": $rootScope.orderId,
        };
        delete_item_url = $rootScope.addOmnitureParams(delete_item_url, "Shopping Cart", true);
        delete_item_url += $rootScope.storeInfo.storeUrlCart();
        //console.log($rootScope.token + "\n" + item.OrderItemID + "\n" + $rootScope.orderId);
        //console.log('firing Delete Current Item with delete_item_url: ');//console.log(delete_item_url);

        $.ajax({
            url: delete_item_url,
            type: "DELETE",
            success: function(data) {
                //console.log(data);

                if ($.isEmptyObject(data)){
                    $location.path(dynamicCartView +'cart/error')
                    //console.log("Shop Your Way Empty Response")
                }else{
                    $rootScope.$apply(function(){
                        viewCartOrUpdateCart.updateToRootScope(data, 'deleteItem');
                    });
                    //console.log("item is successfully deleted:");
                    updateCartCnt($rootScope.itemsInCart);
                    $rootScope.ajaxPending = false;
                }
            },
            error: function(data) {
                //console.log("failed to remove the item" + JSON.stringify(data));
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            }
        });
    };
    return cartEdit;
}]);  // end cart edit

// Refactor Store PickUp
WLCC.factory('refractorCart', ['$rootScope', '$http', '$q', '$timeout', 'viewCartOrUpdateCart', function ($rootScope, $http, $q, $timeout, viewCartOrUpdateCart) {
    var refractorCart = {};
    refractorCart.processPickupData = function(itemIndex, indicator){
//        refractorCart.processPickupData = $q.deferred();
        $rootScope.ajaxPending = true;
        //console.log('%c Process Pickup Data Called.', 'color: brown')
        $timeout(function(){$rootScope.ajaxPending = true},1);
        var postArrayVars = {
            in_partNumber: $rootScope.items[itemIndex].PartNo + 'P',
            in_catentryId: $rootScope.items[itemIndex].CatEntryId,
            in_zipCode: $rootScope.zipcode,
            in_pageonLoad: 'cart',                          //Constant
            in_maxDistance: '50',                           //50 miles

            in_prefferedStoreUnitId: '',                    //Optional
            in_sessionKey: $rootScope.token,
            in_spuRefactorEnabled: 'true',
            in_storeStartIdx: '',                           //to Search more Store send an integer
            in_quantity: $rootScope.items[itemIndex].Qty,                                //
            in_orderId: $rootScope.orderId,
            in_orderItemId: $rootScope.items[itemIndex].OrderItemID,
            in_flowFlag: ''                                 // Optional, Passing the value flowFlag=seeMoreStores
                                                            // with empty preferedStoreUnitId would not bring up
        }
//        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);                 //add store, storeid, catalogId

        //console.log(postArrayVars);
        //console.log('**Fake ProcessPickupData Url: ');
        //console.log($rootScope.makeUrl(refractor_processPickupData_url,postArrayVars));
        $http({
            url: refractor_processPickupData_url,
            method: "GET",
            params: postArrayVars
        }).success(function(json, status, headers, config) {
            //console.log('**&Refractor ProcessPickupData with edit: Sucsess: '); //console.log(json); //Refractor SPU
            if ($.isEmptyObject(json)){
                $location.path(dynamicCartView +'cart/error')
                //console.log("Refractor Cart Empty Response")
            }else{
                $rootScope.ajaxPending = false;
                $rootScope.RefactorSPUPickupData = json.RefactorSPUPickupData;
                //PARSING STORES
                if(json.RefactorSPUPickupData.SPUStoresCount != 0){
                    $rootScope.avaiStores = json.RefactorSPUPickupData.SPUStores.SPUStore;
                }else if($rootScope.RefactorSPUPickupData.Status.StatusMessageExt == ""){
                    $rootScope.RefactorSPUPickupData.Status.StatusMessageExt = "This pick up item is currently not available for pick up in this area. Please enter a new zip code."
                }
            }
        }).error(function(data, status, headers, config) {
            $rootScope.ajaxPending = false;
            //console.log('**&Refractor ProcessPickupData Failure: '); //console.log(data);
        });
    }
    return refractorCart;
}]);


/******* Proceed to checkout Call  DONE!!!!! READY TO BE USED! ********/
WLCC.factory('proceedToCheckOut', ['$rootScope', '$http', '$q', 'handleAddress', 'proceedToCheckoutParsing', 'continueCheckoutParsing', 'sywCalls', function ($rootScope, $http, $q, handleAddress, proceedToCheckoutParsing, continueCheckoutParsing,sywCalls) {

    var proceedToCheckOut = {};
    proceedToCheckOut.deferred = $q.defer();

    proceedToCheckOut.checkOut = function(){
//    	sywCalls.fetchSywOrderTotal();
        $rootScope.ajaxLoader = true;
        
        //console.log('token '  + $rootScope.token);
        //console.log('arival methods '  + $rootScope.arrivalMethods);
        //console.log('order items ' + $rootScope.orderItemIds);
        //console.log('order ID '  + $rootScope.orderId);
        //console.log('user type '  + $rootScope.userType);

        
        var postArrayVars = {
         	   "in_sessionKey":$rootScope.token,
                "in_arrival_method":$rootScope.arrivalMethods,
                "in_orderItemId":$rootScope.orderItemIds,
                "in_orderId":$rootScope.orderId,
                "in_userType": $rootScope.userType
         };
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('proceedToCheckout');//console.log(JSON.stringify(postArrayVars));
        $http({
        	method: "POST",
            url: proceedCheckout_url,
            data: postArrayVars,
            transformRequest: function(data){
        		return $.param(data);
        	},
        }).success(function(data){
                //console.log("Proceed to Checkout: succeeded");
//                //console.log(JSON.stringify(data));
                //console.log(data);
                if ($.isEmptyObject(data)){
                    //console.log('%c Proceed to Checkout Response Empty!', 'color: red');
                    $location.path(dynamicCartView +'cart/error');
                }
                else{
                    $rootScope.proceedToCheckoutResponse = data;
                    proceedToCheckOut.deferred.resolve();
                    $rootScope.ajaxLoader = false;
                }
//                //console.log('proceed to checkout data  ' + JSON.stringify(data));
            })
            .error(function(data){
                proceedToCheckOut.deferred.reject('There was an error');
                //console.log("Proceed to checkout: failed");
                $rootScope.ajaxLoader = false;
                $rootScope.responseFail = true;
            });
    };
    return proceedToCheckOut;
}]);

/******* CONTINUE CHECKOUT: COMPLETE *********/
WLCC.factory('continueCheckOut',['$rootScope', '$http', '$q', 'continueCheckoutParsing', 'omnitureTagging', function ($rootScope, $http, $q, continueCheckoutParsing, omnitureTagging) {

    var continueCheckOut = {};
    continueCheckOut.deferred = $q.defer();
    //Shipping
    continueCheckOut.shipping = function(){
   // check if express checkout is true if true set addressID to view profile shipID
//	    if($rootScope.isExpress  == true){
//		      
//		       $rootScope.shipAddressId = $rootScope.expressShipId.toString();
//		      
//		        if(typeof $rootScope.shipAddressId === 'undefined'){
//                    $rootScope.shipAddressId = $rootScope.continueShippingCheckout.addressId.toString();
//                    //console.log('$rootScope.expressShipId.toString(); is undefined');
//                };		      
//	    }else if($rootScope.isExpress  == false){
//		      $rootScope.shipAddressId = $rootScope.continueShippingCheckout.addressId.toString();
//	    }else{
//		      $rootScope.shipAddressId = $rootScope.continueShippingCheckout.addressId.toString();
//		    
//	    }
	    
        $rootScope.ajaxPending = true;
        var postArrayVars = {
		"in_sessionKey" : $rootScope.token,
        "in_orderId": $rootScope.orderId, //orderId
        "in_orderItemId": $rootScope.continueShippingCheckout.shippingOrderItemIds.toString(),// order item ids comma separated for the specific fulfillment
        "in_userType": $rootScope.userType, // R or G
        "in_quantity": $rootScope.continueShippingCheckout.shippingQuantities.toString(), // quantities for items for specific fulfillment
        "in_arrival_method": "ship", // ship, delivery, or pickup || ship, DDC, SPU
        "in_addressId": $rootScope.continueShippingCheckout.addressId.toString(), //address id used for the fulfillment. if multiple addresses the ids have to follow the order of orderitemid
        "in_shipModeId_0" : $rootScope.continueShippingCheckout.shipModeId.toString(), // for pickup and delivery default is sent
        "in_selectedAddress":$rootScope.continueShippingCheckout.addressId.toString(),// this is going to change after the user selects an address
        }
        
        if(angular.isArray($rootScope.continueShippingCheckout.addressId)){
        	$rootScope.setExpressShipAddress = 'N';
        }
        if($rootScope.setExpressShipAddress == 'Y'){
	       	postArrayVars.in_xShippingAddressId = $rootScope.xShippingAddressId;
	    }
        
        
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Continue Shipping with postArrayVars: ');//console.log(postArrayVars);
        //console.log(continueCheckout_url + "?" + $.param(postArrayVars));
        $http({
        	method: "POST",
            url: continueCheckout_url,
            data: postArrayVars,
            transformRequest: function(data){
        		return $.param(data);
        	}
        }).success(function(data){

            //console.log("Continue Checkout for shipping: succeeded");
            if ($.isEmptyObject(data)){
                //console.log('%c Continue to Checkout Shipping Response Empty!', 'color: red');
                $location.path(dynamicCartView +'cart/error');
            }else{
                $rootScope.continueCheckoutResponse = data;
                //console.log(JSON.stringify(data));
                //console.log(data);
//            continueCheckoutParsing.parseData(data);
                continueCheckOut.deferred.resolve();
//            //console.log('shipAddressId' + $rootScope.continueShippingCheckout.addressId);
            }
            $rootScope.ajaxPending = false;
        }).error(function(data){
            continueCheckOut.deferred.reject('There was an error');
            //console.log("Continue checkout for shipping: failed");
            //console.log(JSON.stringify(data));
            $rootScope.ajaxPending = false;
            $rootScope.responseFail = true;
        });
    };

    //Delivery
    continueCheckOut.delivery = function(){
        $rootScope.ajaxPending = true;
        if(($rootScope.selectedDeliveryType).indexOf("W") != -1){
        	omnitureTagging.tag("OmnitureWeekendDelivery", "Shipping Cost Page");
        }
        
        if(($rootScope.selectedDeliveryType).indexOf("P") != -1){
        	omnitureTagging.tag("OmniturePremiumDelivery", "Shipping Cost Page");
        }
        $rootScope.selectedDeliveryDate = "";
        if(angular.isDefined($rootScope.selectedDeliveryDay)) {
        	$rootScope.selectedDeliveryDate = $rootScope.selectedDeliveryDay.date;
        }
        
        var postArrayVars = {
    		"in_sessionKey" : $rootScope.token,
    		"in_orderId":$rootScope.orderId, //orderId
    		"in_orderItemId": $rootScope.continueDeliveryCheckout.deliveryOrderItemIds.toString(), // order item ids comma separated for the specific fulfillment
    		"in_userType":$rootScope.userType, // R or G
    		"in_quantity":$rootScope.continueDeliveryCheckout.deliveryQuantities.toString(), // quantities for items for specific fulfillment
    		"in_arrival_method" :"DDC", // ship, delivery, or pickup || ship, DDC, SPU
    		"in_addressId":$rootScope.continueDeliveryCheckout.addressId.toString(), //address id used for the fulfillment. if multiple addresses the ids have to follow the order of orderitemid
    		"in_shipModeId_0" :$rootScope.continueDeliveryCheckout.shipModeId.toString(), // for pickup and delivery default is sent
    		"in_selectedAddress":$rootScope.continueDeliveryCheckout.addressId.toString(),// this is going to change after the user selects an address
    		//FOR DELIVERY
    		"in_selectedDate" : $rootScope.selectedDeliveryDate.replace("#A#E", ""), //$rootScope.selectedDeliveryDay.date,
			"in_specialInstructions":"",//
			"in_additionalDeliveryCharge":$rootScope.selectedDeliveryCharge, //
			"in_deliveryType" :$rootScope.selectedDeliveryType, // there are multiple possible values
        };
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Continue Delivery with postArrayVars: ');//console.log(postArrayVars);

        $http({
        	method: "POST",
            url: continueCheckout_url,
            data: postArrayVars,
            transformRequest: function(data){
        		return $.param(data);
        	},
        }).success(function(data){
            //console.log("Continue Checkout for delivery: succeeded");
            if ($.isEmptyObject(data)){
                //console.log('%c Continue to Checkout Delivery Response Empty!', 'color: red');
                $location.path(dynamicCartView +'cart/error');
            }else{
                $rootScope.continueCheckoutResponse = data;
                //console.log($rootScope.continueCheckoutResponse);
                continueCheckOut.deferred.resolve();
                ////console.log('shipAddressId' + $rootScope.continueDeliveryCheckout.addressId);
                $rootScope.ajaxPending = false;
            }
        }).error(function(data){
            //console.log("Continue checkout for delivery: failed");
            //console.log(JSON.stringify(data));
            $rootScope.ajaxPending = false;
            $rootScope.responseFail = true;
        });
    };
   
    return continueCheckOut;
}]);

/******** PAY BILL: COMPLETE **********/
WLCC.factory('payBill',['$rootScope', '$http', '$q', 'omnitureTagging', '$location', function ($rootScope, $http, $q, omnitureTagging, $location) {
    var payBill = {};

    payBill.checkOut = function(){
    	payBill.deferred = $q.defer();
    	localStorage.myFunnyNumber2 = $rootScope.selectedBillingAddressId;
        $rootScope.ajaxPending = true;
        var postArrayVars = new Object();
        var url = payBill_url;
        if($rootScope.orderTotal == "0" || $rootScope.orderTotal == "0.0" || $rootScope.orderTotal == "0.00"){
        	postArrayVars = {
        		"in_sessionKey" :$rootScope.token,
                "in_userType" :$rootScope.userType, // R or G
                "in_cc_brand":"GiftCard",//$rootScope.selectedCreditCardInfo.WalletBrand,//CardType+ // or DisplayBrand // VISA, MasterCard , or
                "in_orderId" :$rootScope.orderId, // orderid
                "in_billingAddressId":$rootScope.selectedBillingAddressId, // billing address id
                "in_savedCardSelected" : "N",//$rootScope.savedCreditCardUsed, // Y or N,
                "in_thirdPartyName" : $rootScope.thirdPartyName,
                "in_thirdPartyEmail" : $rootScope.thirdPartyEmail,
                "in_someonepickingup" : $rootScope.someonePickingUp,
            };

        }else {
	        if($rootScope.selectedCreditCardInfo.GetCVV == undefined) $rootScope.selectedCreditCardInfo.GetCVV = 'N';
	        postArrayVars = {
        		"in_sessionKey" :$rootScope.token,
                "in_userType" :$rootScope.userType, // R or G
                "in_account": $rootScope.selectedCreditCardInfo.TrueAccount ?
                    $rootScope.selectedCreditCardInfo.TrueAccount : $rootScope.selectedCreditCardInfo.MaskedAccount, // creditcard number
//                "in_securityCode":$rootScope.selectedCreditCardCVV, // unique number
                "in_securityCode": $rootScope.selectedCreditCardInfo.cvv,
                "in_addressId":$rootScope.selectedBillingAddressId, //address id
                "in_payMethod":$rootScope.selectedCreditCardInfo.WalletPayMethodId,//"CREDITCARD"+//$rootScope+ // CREDITCARD, , or
                "in_cc_brand":$rootScope.selectedCreditCardInfo.WalletBrand,//CardType+ // or DisplayBrand // VISA, MasterCard , or
                "in_nameoncard":$rootScope.selectedCreditCardInfo.NameonCard, // name on credit card
                "in_expire_month":$rootScope.selectedCreditCardInfo.WalletExpiryMonth, // expiration month
                "in_expire_year":$rootScope.selectedCreditCardInfo.WalletExpiryYear, // expiration year
                "in_totalAmount":$rootScope.orderTotal, //$rootScope.continueCheckoutResponse.CheckoutResponse.OrderSummary.OrderSummaryTotals.Total, // amount to pay
                "in_orderId" :$rootScope.orderId, // orderid
                "in_billingAddressId":$rootScope.selectedBillingAddressId, // billing address id
                "in_savedCardSelected" :$rootScope.savedCreditCardUsed, // Y or N,
                "in_profileOrderId" :$rootScope.continueCheckoutResponse.CheckoutResponse.ProfileOrderId, //
//                "in_getCVV" :$rootScope.selectedCreditCardInfo.GetCVV,
                "in_thirdPartyName" : $rootScope.thirdPartyName,
                "in_thirdPartyEmail" : $rootScope.thirdPartyEmail,
                "in_someonepickingup" : $rootScope.someonePickingUp,
	        };
	        /**variables for expressCheckout**/
            if($rootScope.setExpressPay == 'Y'){
	        	postArrayVars.in_xBillingAddressId = $rootScope.xBillingAddressId;
	        	postArrayVars.in_cCardExpCheckout = $rootScope.setExpressPay;
	        	omnitureTagging.tag("OmnitureSaveExpressCheckoutDetails", "Billing");
            }
	        if ($rootScope.savedCreditCardUsed == 'Y'){  //Pay with Saved
	            //console.log('will pay with saved card');
	            var savedCardVars = {
	            	"in_getCVV" :$rootScope.selectedCreditCardInfo.GetCVV,
            		"in_savedPaymentType" :$rootScope.selectedCreditCardInfo.OptionValue, // ex: VISA|VISA|-9800|VISA|NO|815501|VISA,minjus************1111Exp04/2012|************1111|minjus|04|2012|Y||1640005
                    "in_policyId": $rootScope.selectedCreditCardInfo.WalletPolicyId,//
                    "in_piId": $rootScope.selectedCreditCardInfo.Edp_PIID, //	
	            };
	            $.extend(postArrayVars, savedCardVars);
	        }else{   //new Card
	            //console.log('will pay with new card');
	        }
        } 
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Billing");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing PayBill with postArrayVars: ');//console.log(postArrayVars);
        //console.log('firing PayBill with fake Url: '); //console.log($rootScope.makeUrl(url, postArrayVars));

        $http({
        	method: "POST",
            url: url,
            data: postArrayVars,
            transformRequest: function(data){
        		return $.param(data);
        	}
        }).success(function(data){
                //console.log("Pay Bill: succeeded");
                //console.log(JSON.stringify(data));
                if ($.isEmptyObject(data)){
                    $location.path(dynamicCartView +'cart/error')
                }
                else{
                    if(data.CheckoutResponse.StatusData.ResponseCode == '1'){
                        $rootScope.checkoutError = data.CheckoutResponse.StatusData.RespMessage;
                        $('#checkoutError').css('display','block');
                    }
                    if(data.CheckoutResponse == undefined ||
                        data.CheckoutResponse.OrderSummary == undefined){
                        //console.log('PayBill successfully fired, but received error in response with the RespMessage...');
                        ////console.log(data.CheckoutResponse.StatusData.RespMessage);
                        ////console.log(data);
                        payBill.deferred.reject();
                    } else{
                        payBill.payBillParsing(data);
                        payBill.json = data;
                        payBill.deferred.resolve();
                    }
                    $rootScope.ajaxPending = false;
                }
            }).error(function(data){
                //console.log("Pay Bill: failed");
                //console.log(JSON.stringify(data));
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };

    payBill.payBillParsing = function(data) {
        $rootScope.payBillResponse = data;
        $rootScope.reviewItems = $rootScope.objToArray(data.CheckoutResponse.OrderSummary.OrderSummaryItem);
        $rootScope.orderSummaryTotals = data.CheckoutResponse.OrderSummary.OrderSummaryTotals;
        $rootScope.orderTotal =  data.CheckoutResponse.OrderSummary.OrderSummaryTotals.Total; /**for paypal**/
        if(data.CheckoutResponse.ShippingSection != undefined && data.CheckoutResponse.ShippingSection != ""){
            $rootScope.reviewShippingItems = $rootScope.objToArray(data.CheckoutResponse.ShippingSection.ShippingItem);

        }
        if(data.CheckoutResponse.DeliverySection != undefined && data.CheckoutResponse.DeliverySection != ""){
            $rootScope.reviewDeliveryItems = $rootScope.objToArray(data.CheckoutResponse.DeliverySection.DeliveryDetails.DeliveryItem);
            $rootScope.reviewDeliveryAddress = $rootScope.objToArray(data.CheckoutResponse.DeliverySection.DeliveryDetails.Address);
            $rootScope.arrivalInformation = data.CheckoutResponse.DeliverySection.ArrivalInformation;
        }
        if(data.CheckoutResponse.PickUpSection != undefined && data.CheckoutResponse.PickUpSection != ""){
            $rootScope.reviewPickupItems = $rootScope.objToArray(data.CheckoutResponse.PickUpSection.PickUpItems.PickUpItem);

//            if(!angular.isDefined($rootScope.storeStatus)) {
//                $rootScope.storeStatus = "storedAtReview";
//                $rootScope.reviewPickupItems[0].Zipcode = $rootScope.reviewPickupItems[0].Zipcode.substring(0,5);
//                var storeInfo =  $rootScope.reviewPickupItems[0];
//
//                var date = new Date();
//                var day = date.getDay();
//                if(day < 6 && day > 0) {
//                	if(angular.isDefined(storeInfo.StorePickUpHours))
//                		$rootScope.selectedStore.closingHour = storeInfo.StorePickUpHours.stPckHrsMonDay.split("-")[1];
//                	else if(angular.isDefined(storeInfo.PickUpHours)) 
//                		$rootScope.reviewPickupItems[0].closingHour = storeInfo.PickUpHours.MondayToFriday.split("-")[1];
//                } else if(day == 0) {
//                	if(angular.isDefined(storeInfo.StorePickUpHours))
//                		$rootScope.selectedStore.closingHour = storeInfo.StorePickUpHours.stPckHrsSunDay.split("-")[1];
//                	else if(angular.isDefined(storeInfo.PickUpHours)) 
//                		$rootScope.reviewPickupItems[0].closingHour = storeInfo.PickUpHours.Sunday.split("-")[1];
//                } else {
//                	if(angular.isDefined(storeInfo.StorePickUpHours))
//                		$rootScope.selectedStore.closingHour = storeInfo.StorePickUpHours.stPckHrsSatDay.split("-")[1];
//                	else if(angular.isDefined(storeInfo.PickUpHours)) 
//                		$rootScope.reviewPickupItems[0].closingHour = storeInfo.PickUpHours.Saturday.split("-")[1];
//                }
//            }

        } else {
        	delete $rootScope.storeStatus;
        }
        
        
        
    	$rootScope.reviewPayment = data.CheckoutResponse.PaymentDetails;
        var orderItemId = new Array();
//        var partNumbers = new Array();
        for(x in $rootScope.reviewItems){ //one item
            orderItemId.push($rootScope.reviewItems[x].OrderItemId);
//            partNumbers.push($rootScope.reviewItems[x].PartNumber + "P");
        }
        
//        if($rootScope.omniturePartNumbers == undefined){
//        	/************* STILL GOING TO BREAK CAROUSEL ITEMS CALL FOR PAYPALL FLOW *************/
//        	 $rootScope.omniturePartNumbers = partNumbers.toString();
//             $rootScope.omniturePartNumbers = ";" + $rootScope.omniturePartNumbers.replace(/\,/g,";");
//        }
       
        $rootScope.payBillOrderItemIds = orderItemId.toString();
        //console.log($rootScope.payBillOrderItemIds);
//        if($rootScope.payBillResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.placeOrder){
//        	payBill.preparingDataForReview();
//        }
    };

    
    payBill.preparingDataForReview = function() {
		$rootScope.allProducts = [];
        if(!angular.isArray($rootScope.reviewPickupItems)){
            $rootScope.reviewPickupItems = $rootScope.objToArray($rootScope.reviewPickupItems);
        }
        var omnitureConfirmationData = new Array();
        var thePrice = 0;
        $rootScope.carouselPartNum = "";
		if($rootScope.reviewPickupItems){
			$.each($rootScope.reviewPickupItems, function(){
				var obj = {};
				var _this = this.PickUpItemDetail;
				obj.img = _this.ImageURL;
				obj.name = _this.ItemName;
				obj.price = _this.PickUpTotal;
				
				var date = new Date();
				var day = date.getDay();
				if(day < 6 && day > 0)
					this.closingHour = this.PickUpHours.MondayToFriday.split("-")[1];
				else if(day == 0) {
					this.closingHour = this.PickUpHours.Sunday.split("-")[1];
				} else this.closingHour = this.PickUpHours.Saturday.split("-")[1];
				this.StorePhone = "(" + this.StorePhone.substring(0, 3) + ") " + this.StorePhone.substring(3, 6) + "-" + this.StorePhone.substring(6, this.StorePhone.length);
				
				$rootScope.allProducts.push(obj);
				
				if(thePrice < _this.PickUpTotal){
					thePrice = _this.PickUpTotal;
					$rootScope.carouselPartNum = _this.PartNumber+"P";
				}
				omnitureConfirmationData.push(";"+_this.PartNumber+"P;"+_this.PickUpQuantity+";"+_this.PickUpTotal+";eVar46=Spu");
			});
		}
		if($rootScope.reviewShippingItems){
			$.each($rootScope.reviewShippingItems, function(){
				var obj = {};
				obj.img = this.ImageURL;
				obj.name = this.ItemDescription;
				obj.price = this.ItemPrice;
				$rootScope.allProducts.push(obj);
				
				if(thePrice < this.ItemPrice){
					thePrice = this.ItemPrice;
					$rootScope.carouselPartNum = this.PartNumber+"P";
				}
				omnitureConfirmationData.push(";"+this.PartNumber+"P;"+this.ShippingQuantity+";"+this.ItemPrice+";eVar46=Shipping");
			});
		}
		if($rootScope.reviewDeliveryItems){
			$.each($rootScope.reviewDeliveryItems, function(){
				var obj = {};
				obj.img = this.ImageURL;
				obj.name = this.ItemDescription;
				obj.price = this.DeliveryItemPrice;
				$rootScope.allProducts.push(obj);
				
				if(thePrice < this.DeliveryItemPrice){
					thePrice = this.DeliveryItemPrice;
					$rootScope.carouselPartNum = this.PartNumber+"P";
				}
				
				omnitureConfirmationData.push(";"+this.PartNumber+"P;"+this.Quantity+";"+this.DeliveryItemPrice+";eVar46=Delivery");
			});
		}

		$rootScope.omnitureConfirmationDataToSent = omnitureConfirmationData.toString();
    };
    
    return payBill;
}]);

/****** PLACE ORDER: COMPLETE  *******/
WLCC.factory('placeOrder',['$rootScope', '$http', '$q', 'continueCheckoutParsing',function ($rootScope, $http, $q, continueCheckoutParsing) {
    var placeOrder = {};
    placeOrder.deferred = $q.defer();
    placeOrder.checkOut = function(){
        $rootScope.ajaxPending = true;
        var url = placeOrder_url;
        var postArrayVars = {
       		 "in_sessionKey":$rootScope.token,
             "in_userType" :$rootScope.userType, // R or G
             "in_orderId" :$rootScope.payBillResponse.CheckoutResponse.OrderId, //
             "in_orderItemId" :$rootScope.payBillOrderItemIds, // comma separated
//           "in_cc_brand" :encodeURI($rootScope.payBillResponse.CheckoutResponse.PaymentDetails.CardType), // VISA, MasterCard, ..
//           "in_totalAmount" :$rootScope.payBillResponse.CheckoutResponse.PaymentDetails.CardValue, // total ammount for the order
//           "in_billingAddressId" : $rootScope.selectedBillingAddressId, //$rootScope.payBillResponse.CheckoutResponse.PaymentDetails.Address.AddressId, // billing address id for the order
        };
        
        if($rootScope.orderTotal == "0" || $rootScope.orderTotal == "0.0" || $rootScope.orderTotal == "0.00"){
        	postArrayVars.in_cc_brand = "GiftCard";
        	postArrayVars.in_billingAddressId = $rootScope.selectedBillingAddressId;
        	postArrayVars.in_totalAmount = $rootScope.payBillResponse.CheckoutResponse.PaymentDetails.GiftCardValue;
        }else{
        	postArrayVars.in_cc_brand = encodeURI($rootScope.payBillResponse.CheckoutResponse.PaymentDetails.CardType); // VISA, MasterCard, ..
//        	postArrayVars.in_billingAddressId = $rootScope.payBillResponse.CheckoutResponse.PaymentDetails.Address.AddressId; // billing address id for the order
        	postArrayVars.in_billingAddressId = $rootScope.selectedBillingAddressId;
        	postArrayVars.in_totalAmount = $rootScope.payBillResponse.CheckoutResponse.PaymentDetails.CardValue; // total ammount for the order

        }
        
//        if(angular.isDefined($rootScope.invokePayPalCO)){ //Place order using express paypal
//        	url = placeOrderPayPal_url;
//        	postArrayVars.in_cc_brand = "Paypal";
//        	postArrayVars.in_payPalAddressId = ""; /** need modification **/ //coming from paybill response of paypal
//        }

        if($rootScope.userType == "G"){
        	postArrayVars.in_guestEmailId = $rootScope.enteredEmail;
        }
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Review Order");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Place Order with postArrayVars: ');//console.log(postArrayVars);
        //console.log('firing PlaceOrder with Imaginary Url: ');//console.log($rootScope.makeUrl(url, postArrayVars));
        $rootScope.ccBrand = postArrayVars.in_cc_brand;
        
        $http({
        	 method: "POST",
             url: url,
             data: postArrayVars,
             transformRequest: function(data){
         		return $.param(data);
         	}
        }).success(function(data){
            //console.log("Place Order: succeeded");
            $rootScope.confirmationData = data;
            placeOrder.deferred.resolve();
            $rootScope.ajaxPending = false;
            updateCartCnt(0);
        }).error(function(data){
            //console.log("Place Order: failed");
            //console.log(JSON.stringify(data));
            $rootScope.ajaxPending = false;
            $rootScope.responseFail = true;
        });
    };
    return placeOrder;

}]);

/****HANDLE ADDRESS *****/
WLCC.factory('handleAddress',['$rootScope','$http', '$q', 'proceedToCheckoutParsing', function ($rootScope, $http, $q, proceedToCheckoutParsing) {
    var handleAddress = {};

    handleAddress.checkOut = function(fromPage, sameAsBilling){
        handleAddress.deferred = $q.defer();
        $rootScope.ajaxPending = true;
        if(($rootScope.zipcode == undefined || $rootScope.zipcode == "") && $rootScope.userType == "G"){
        	$rootScope.zipcode = $rootScope.enteredAddressValues.zipCode;
        }
        if(fromPage == "Shipping"){
            orderItemIds = $rootScope.shippingOrderItemIds;
        }else if(fromPage == "Delivery"){
            orderItemIds = $rootScope.deliveryOrderItemIds;
        }else if(fromPage == "Pickup"){
            orderItemIds = $rootScope.pickupOrderItemIds;
        }else if(fromPage == "Billing"){
        	 orderItemIds = $rootScope.billingOrderItemIds;
        }
//        if( $rootScope.enteredAddressValues.fromPage == "Billing"){
//            orderItemIds = $rootScope.billingOrderItemIds;
//            if($rootScope.country != "US"){
//            	$rootScope.enteredAddressValues.sameAsBilling = "N";
//            }
//        }

//        if($rootScope.enteredAddressValues.isFirstAddress == true && fromPage != "Billing"){
        if($rootScope.enteredAddressValues.isFirstAddress == true){
            $rootScope.enteredAddressValues.sameAsBilling = "Y";
        }
        if($rootScope.country != "US"){
        	$rootScope.country = ($rootScope.country).toUpperCase();
        	urlAddress = handleAddressTourism_url;
        	
        	var ajaxObject = {
                    "in_sessionKey" : $rootScope.token,
                    "in_orderId" : $rootScope.orderId, //
                    "in_orderItemId" :  $rootScope.orderItemIds, //
                    "in_firstName" :  encodeURI($rootScope.enteredAddressValues.firstName), //
                    "in_lastName" :   encodeURI($rootScope.enteredAddressValues.lastName), //
                    "in_address1" :  encodeURI($rootScope.enteredAddressValues.address1), //
                    "in_address2" :  encodeURI($rootScope.enteredAddressValues.address2), //
                    "in_address3" : "", // probably not needed
                    "in_city" :   encodeURI($rootScope.enteredAddressValues.city), //
                    "in_state" :  $rootScope.enteredAddressValues.state, //
                    "in_zipCode" :  $rootScope.enteredAddressValues.zipCode, //
                    "in_phone1" :  $rootScope.enteredAddressValues.phone1, //
                    "in_dphone" : $rootScope.enteredAddressValues.phone1, //
                    "in_ext" : "", //
                    "in_country" :  $rootScope.country, //"US", //$rootScope.enteredAddressValues.country,
                    "in_operationMode" : "add", //
                    "in_pageValue" : "Billing",//$rootScope.enteredAddressValues.fromPage, // Shipping, Delivery, Pickup, Billing
                    "in_sameShipBillAddress" : "Y",//$rootScope.enteredAddressValues.sameAsBilling,//sameAsBilling, // Y or No, For first Address sent it as Y
                    "in_isFirstAddress" : "false",//$rootScope.enteredAddressValues.isFirstAddress, //true,//$rootScope.isFirstAddress,
                    "in_shipping_firstName" :  encodeURI($rootScope.enteredAddressValues.firstName),
                    "in_shipping_lastName" :  encodeURI($rootScope.enteredAddressValues.lastName),
                    "in_shipping_dphone" : $rootScope.enteredAddressValues.phone1,
                    "in_shipping_phone1" : $rootScope.enteredAddressValues.phone1,
                    "in_shipping_dExt" : "",
                    "in_shipping_city" :  "Carol stream",//encodeURI($rootScope.enteredAddressValues.city),
                    "in_shipping_zipCode" : "60188",//$rootScope.enteredAddressValues.zipCode,
                    "in_shipping_address1" :  encodeURI($rootScope.enteredAddressValues.address1),
                    "in_shipping_address2" :  encodeURI($rootScope.enteredAddressValues.address2),
                    "in_shipping_state" : "IL",//$rootScope.enteredAddressValues.state,
                    "in_shipping_country" : "US"//$rootScope.country,//"US",
                };
                
        	
        }else{
        	urlAddress = handleAddress_url;
        
        
	        var ajaxObject = {
	            "in_sessionKey" : $rootScope.token,
	            "in_orderId" : $rootScope.orderId, //
	            "in_orderItemId" :  $rootScope.orderItemIds, //
	            "in_firstName" :  encodeURI($rootScope.enteredAddressValues.firstName), //
	            "in_lastName" :   encodeURI($rootScope.enteredAddressValues.lastName), //
	            "in_address1" :  encodeURI($rootScope.enteredAddressValues.address1), //
	            "in_address2" :  encodeURI($rootScope.enteredAddressValues.address2), //
	            "in_address3" : angular.isDefined($rootScope.enteredAddressValue) ? encodedURI($rootScope.enteredAddressValues.county) : "", // probably not needed
	            "in_city" :   encodeURI($rootScope.enteredAddressValues.city), //
	            "in_state" :  $rootScope.enteredAddressValues.state, //
	            "in_zipCode" :  $rootScope.enteredAddressValues.zipCode, //
	            "in_phone1" :  $rootScope.enteredAddressValues.phone1, //
	            "in_dphone" : $rootScope.enteredAddressValues.phone1, //
	            "in_ext" : "", //
	            "in_country" :  $rootScope.country, //"US", //$rootScope.enteredAddressValues.country,
	            "in_operationMode" : "add", //
	            "in_pageValue" : $rootScope.enteredAddressValues.fromPage, // Shipping, Delivery, Pickup, Billing
	            "in_sameShipBillAddress" : $rootScope.enteredAddressValues.sameAsBilling,//sameAsBilling, // Y or No, For first Address sent it as Y
	            "in_isFirstAddress" : $rootScope.enteredAddressValues.isFirstAddress, //true,//$rootScope.isFirstAddress,
	            "in_shipping_firstName" :  encodeURI($rootScope.enteredAddressValues.firstName),
	            "in_shipping_lastName" :  encodeURI($rootScope.enteredAddressValues.lastName),
	            "in_shipping_dphone" : $rootScope.enteredAddressValues.phone1,
	            "in_shipping_phone1" : $rootScope.enteredAddressValues.phone1,
	            "in_shipping_dExt" : "",
	            "in_shipping_city" :  encodeURI($rootScope.enteredAddressValues.city),
	            "in_shipping_zipCode" : $rootScope.enteredAddressValues.zipCode,
	            "in_shipping_address1" :  encodeURI($rootScope.enteredAddressValues.address1),
	            "in_shipping_address2" :  encodeURI($rootScope.enteredAddressValues.address2),
	            "in_shipping_state" : $rootScope.enteredAddressValues.state,
	            "in_shipping_country" : $rootScope.country,//"US",
	        };
	        
        }
        if(fromPage = "Billing"){
        	 ajaxObject = $rootScope.addOmnitureParams(ajaxObject, "Billing");
        }else{
        	 ajaxObject = $rootScope.addOmnitureParams(ajaxObject, "Shipping Cost Page");
        }
       
        ajaxObject = $rootScope.storeInfo.storeKeyCart(ajaxObject);
        //console.log('firing Handle Address with ajaxObject: ');//console.log(ajaxObject);
       	$rootScope.ajaxPending = true;
        $http({
            method: "GET",
            params: ajaxObject,
            url: urlAddress,

        }).success(function(data){
                //console.log("Handle Address: succeeded");
                //console.log(data);
                $rootScope.ajaxPending = false;
                if(!handleAddress.invalidResponse(data)) {
                    if($rootScope.enteredAddressValues.isFirstAddress) {
                        proceedToCheckoutParsing.parseData(data);
                    } else if($rootScope.expandedStatus == "delivery"){
                    	proceedToCheckoutParsing.parseAddress(data);
                    	proceedToCheckoutParsing.parseDeliverySection(data);
                    } else {
                    	proceedToCheckoutParsing.parseAddress(data);
                    }
                    handleAddress.handleAddressResponse = data;
                    handleAddress.deferred.resolve(data);
                }
                $rootScope.ajaxPending = false;
            }).error(function(data){
                //console.log("Handle Address: failed");
                //console.log(JSON.stringify(data));
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };

    handleAddress.invalidResponse = function(data) {
    	if(angular.isDefined(data.AddAddress)) {
    		handleAddress.deferred.reject();
    		return true;
    	} else if(angular.isDefined(data.AddressValidationResponse)){
    		if(data.AddressValidationResponse.StatusData.RespMessage.indexOf("City/State/ZIP")) {
    			handleAddress.deferred.reject("wrong input");
    		} else if(data.AddressValidationResponse.StatusData.RespMessage == $rootScope.responseMessage.countyError) {
    			handleAddress.deferred.reject(data);
    		}
    		return true;
    	}
       return false;
    }

    return handleAddress;
}]);


/******** Coupon: COMPLETE **********/
WLCC.factory('applyOrRemoveCoupon',['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {

    var applyOrRemoveCoupon = {};

    applyOrRemoveCoupon.deferred = $q.defer();

    applyOrRemoveCoupon.coupon = function(addOrRemove, code){
        $rootScope.ajaxPending = true;
        //console.log("code: " + code);
        
        var postArrayVars = {
        		"in_sessionKey": $rootScope.token,
                "in_orderId": $rootScope.orderId,
                "in_coupon_number":code,
                "in_addOrRemoveFlag": addOrRemove,// add or remove
                "in_fromCart":"true",
                "in_userType":$rootScope.userType,
        };
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing ApplyOrRemoveCoupon with postArrayVars: ');//console.log(postArrayVars);

        $http({
        	 method: "POST",
             url: applyorRemovePromoCode_url,
             data: postArrayVars,
             transformRequest: function(data){
         		return $.param(data);
         	},
        }).success(function(data){
                //console.log("Apply Or Remove Coupon: succeeded");
                //console.log("Coupon"+ JSON.stringify(data));
                if ($.isEmptyObject(data)){
                    $location.path(dynamicCartView +'cart/error')
                    //console.log("ApplyOrRemove Coupon Empty Response")
                }
                else{
                    $rootScope.couponResponse = data;
//                $rootScope.promoCodeMessage = data.CartResponse.StatusData.RespMessage;
//                $rootScope.summary = data.CartResponse.Shoppingcart.Summary;
//                //console.log("Summary: "+JSON.stringify($rootScope.summary));
                    applyOrRemoveCoupon.json = data;
                    applyOrRemoveCoupon.deferred.resolve();
                    $rootScope.ajaxPending = false;
                }
            })
            .error(function(data){
                //console.log("Apply Or Remove Coupon: failed");
                //console.log(JSON.stringify(data));
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };
    return applyOrRemoveCoupon;
}]);

WLCC.factory('proceedToCheckoutParsing',['$rootScope', 'parseContinueInstallation', 'premiumDeliveryChargeService', function($rootScope, parseContinueInstallation, premiumDeliveryChargeService) {
    var proceedToCheckoutParsing = {};
    proceedToCheckoutParsing.parseData = function(data) {
        $rootScope.proceedToCheckoutResponse = data;
        ////console.log('proceed to checkout' + JSON.stringify(data));

        $rootScope.setExpandedStatus($rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus);
//        $rootScope.expandedStatus = (($rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus.ExpandedStatus).replace(",","")).toLowerCase();
//        $rootScope.notVisited = (($rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus.NotVisited).replace(",","")).toLowerCase();
        $rootScope.continueCheckoutResponse = data;
        proceedToCheckoutParsing.parseAddress(data);
        //check the last condition if it is true always
        if(data.CheckoutResponse.ShippingSection != undefined && data.CheckoutResponse.ShippingSection != "" && data.CheckoutResponse.ShippingSection.ShippingDetails != undefined){
            $rootScope.shippingSection = data.CheckoutResponse.ShippingSection;
            $rootScope.shippingItems = new Array();
//    			var shippingItems = $rootScope.shippingSection.ShippingDetails.ShippingItem;
            if($rootScope.shippingSection.ShippingDetails == undefined){
                $rootScope.shippingItems = $rootScope.objToArray($rootScope.shippingSection.ShippingItems.ShippingItem);
            }else{
                $rootScope.shippingItems = $rootScope.objToArray($rootScope.shippingSection.ShippingDetails.ShippingItem);
            }
            
            for(x in $rootScope.shippingItems){
                $rootScope.continueShippingCheckout.shippingOrderItemIds.push($rootScope.shippingItems[x].OrderItemId);
                $rootScope.continueShippingCheckout.shippingQuantities.push($rootScope.shippingItems[x].Quantity);
//                $rootScope.continueShippingCheckout.shipModeId.push($rootScope.shippingItems[x].ShippingOptions.SelectedShipMode);
                var shippingOptions = $rootScope.shippingItems[x].ShippingOptions.AvailableShippingOptions
                if(shippingOptions.hasOwnProperty("ErrorBoxMessage")) { /**add a flag to the item that needs to be removed**/
                	if((angular.isArray(shippingOptions.ErrorBoxMessage) && shippingOptions.ErrorBoxMessage[0].indexOf($rootScope.responseMessage.overSize) > -1) || 
            			shippingOptions.ErrorBoxMessage.indexOf($rootScope.responseMessage.overSize) > -1) {
                		$rootScope.removeOverSizedItem.push($rootScope.shippingItems[x].OrderItemId);
                		for(var y in $rootScope.items) {
                			//console.log($rootScope.items[y].OrderItemID + " : " + $rootScope.shippingItems[x].OrderItemId);
                			if($rootScope.items[y].OrderItemID == $rootScope.shippingItems[x].OrderItemId) {
                				$rootScope.items[y].removeItem = true;
                				break;
                			}
                		}
                	}
                }
            }
        }

        if(data.CheckoutResponse.DeliverySection != undefined && data.CheckoutResponse.DeliverySection != "" && $rootScope.expandedStatus != "installation"){
        	 proceedToCheckoutParsing.parseDeliverySection(data);
        }


        if(data.CheckoutResponse.PickUpSection != undefined && data.CheckoutResponse.PickUpSection != ""){
            $rootScope.expandedStatus = "pickup";
            $rootScope.pickupSection = data.CheckoutResponse.PickUpSection;

            $rootScope.pickupItems = $rootScope.objToArray($rootScope.pickupSection.PickUpItems.PickUpItem);

        }

        if(angular.isDefined(data.CheckoutResponse.InstallationDetails) && data.CheckoutResponse.InstallationDetails != "") {
            parseContinueInstallation.parseAddInstallationAddress();
        }
        
        if(data.CheckoutResponse.OrderSummary != undefined && data.CheckoutResponse.OrderSummary.OrderSummaryTotals != undefined){
        	$rootScope.orderTotal = (data.CheckoutResponse.OrderSummary.OrderSummaryTotals.Total).replace("\$", "");
        	
        };
//        alert($rootScope.orderTotal);
    };

    proceedToCheckoutParsing.parseAddress = function(data) {
        if(data.CheckoutResponse.ShippingSection != undefined && data.CheckoutResponse.ShippingSection != "" && data.CheckoutResponse.ShippingSection.ShippingDetails != undefined){
            var shippingItems = $rootScope.objToArray(data.CheckoutResponse.ShippingSection.ShippingDetails.ShippingItem);
            if($rootScope.continueCheckoutResponse.CheckoutResponse.Addresses != undefined && $rootScope.continueCheckoutResponse.CheckoutResponse.Addresses.Address != ""){
                $rootScope.addressList = $rootScope.objToArray($rootScope.continueCheckoutResponse.CheckoutResponse.Addresses.Address)
            } else if(shippingItems[0].Addresses.Address != undefined && shippingItems[0].Addresses.Address !="") {
                $rootScope.addressList = $rootScope.objToArray(shippingItems[0].Addresses.Address);
            }
        }

        if(data.CheckoutResponse.DeliverySection != undefined && data.CheckoutResponse.DeliverySection != "" && $rootScope.expandedStatus != "installation"){
            if($rootScope.continueCheckoutResponse.CheckoutResponse.Addresses != undefined && $rootScope.continueCheckoutResponse.CheckoutResponse.Addresses.Address != ""){
                $rootScope.addressList = $rootScope.objToArray($rootScope.continueCheckoutResponse.CheckoutResponse.Addresses.Address)
            }else if(data.CheckoutResponse.DeliverySection.Addresses.Address != undefined && data.CheckoutResponse.DeliverySection.Addresses.Address != ""){
                $rootScope.addressList = $rootScope.objToArray(data.CheckoutResponse.DeliverySection.Addresses.Address);
                $rootScope.selectedDeliveryAddressId = data.CheckoutResponse.DeliverySection.Addresses.SelectedAddressId;
            }
        }

        if(data.CheckoutResponse.PickUpSection != undefined && data.CheckoutResponse.PickUpSection != ""){
            if(data.CheckoutResponse.Addresses != undefined && data.CheckoutResponse.Addresses.Address != ""){
                $rootScope.addressList = $rootScope.objToArray(data.CheckoutResponse.Addresses.Address);
            }
        }
        
        if(data.CheckoutResponse.Addresses != undefined && data.CheckoutResponse.Addresses != "") {
        	$rootScope.addressList = $rootScope.objToArray(data.CheckoutResponse.Addresses.Address);
        }
    };
    
    proceedToCheckoutParsing.parseDeliverySection = function(data) {
    	$rootScope.deliverySection = data.CheckoutResponse.DeliverySection;
    	$rootScope.deliveryItems = new Array();
    	if($rootScope.deliverySection.DeliveryDetails == undefined){
    		$rootScope.deliveryItems = $rootScope.objToArray($rootScope.deliverySection.DeliveryItems.DeliveryItem);
    	}else{
    		$rootScope.deliveryItems = $rootScope.objToArray($rootScope.deliverySection.DeliveryDetails.DeliveryItem);
    	}

    	if($rootScope.deliverySection.DateString != "" && $rootScope.deliverySection.DateString != undefined){
    		if($rootScope.deliverySection.DateString.indexOf("#A#E") != -1){
    			$rootScope.hasPremiumDelivery = true;
    		}else{
    			$rootScope.hasPremiumDelivery = false;
    		}
         	
         	$rootScope.deliverySection.DateString = ($rootScope.deliverySection.DateString).replace(/#A#E/g, "");
         	$rootScope.deliveryDates = $rootScope.deliverySection.DateString.split("|");
         	$rootScope.deliveryDays = [];
         	$.each($rootScope.deliveryDates, function(){
         		var split = this.split(":");
         		var obj = {};
         		obj.date = split[0];
         		obj.day = split[1];
         		if(obj.date != ""){
     			$rootScope.deliveryDays.push(obj);
         		}
         	});
         	//console.log(JSON.stringify($rootScope.deliveryDays));
         	$rootScope.selectedDeliveryDay = $rootScope.deliveryDays[0];
         	premiumDeliveryChargeService.fetchPremiumCharge($rootScope.deliveryDays[0].date);
    	}else{
//             $rootScope.selectedDeliveryDay = new Object();
//             $rootScope.selectedDeliveryDay.date = ""
    		$rootScope.selectedDeliveryDay = undefined;
    		if($rootScope.deliverySection.SCIMErrorMessage != undefined){
    			$rootScope.selectedDeliveryMessage = $rootScope.deliverySection.SCIMErrorMessage;
    		}else{
    			$rootScope.selectedDeliveryMessage = "";
    		}
    	}
    	for(x in $rootScope.deliveryItems){
    		$rootScope.continueDeliveryCheckout.deliveryOrderItemIds.push($rootScope.deliveryItems[x].OrderItemId);
    		$rootScope.continueDeliveryCheckout.deliveryQuantities.push($rootScope.deliveryItems[x].Quantity);
    		$rootScope.continueDeliveryCheckout.shipModeId.push($rootScope.deliveryItems[x].ShipModeId);
    	}
    }
    
    return proceedToCheckoutParsing;

}]);

WLCC.factory('continueCheckoutParsing',['$rootScope', '$location', function($rootScope, $location) {
    var continueCheckoutParsing = {};

    continueCheckoutParsing.parseData = function(data, doNotSetExpandedStatus) {
        if(!angular.isDefined(doNotSetExpandedStatus)) {
        	$rootScope.setExpandedStatus(data.CheckoutResponse.CurrentStatus);
        }
        $rootScope.continueCheckoutResponse = data;
        $rootScope.orderTotal = data.CheckoutResponse.OrderSummary.OrderSummaryTotals.Total.replace("\$", "");
        if((data.CheckoutResponse != undefined && data.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.payBill)
            || (data.CheckoutResponse != undefined && $rootScope.expandedStatus == 'payment')){
            if(data.CheckoutResponse.PaymentMethod != undefined && data.CheckoutResponse.PaymentMethod.SavedCreditCards != undefined){
                if(!$rootScope.savedCreditCards){
                    $rootScope.savedCreditCards = $rootScope.objToArray(data.CheckoutResponse.PaymentMethod.SavedCreditCards);
                }
                else{   // Do SAME, Change Later if Need CLEANUP
                    $rootScope.savedCreditCards = $rootScope.objToArray(data.CheckoutResponse.PaymentMethod.SavedCreditCards);
                }
//	    		$rootScope.savedCreditCards = new Array();
                $rootScope.modifiedSavedCards = new Array();

                var savedCreditCards = $rootScope.savedCreditCards;

                if(savedCreditCards.length > 1){
                    for(var x = 0; x < savedCreditCards.length; x++){
                        savedCreditCards[x].NameonCard = decodeURI(savedCreditCards[x].NameonCard);
                        $rootScope.modifiedSavedCards.push(savedCreditCards[x]);
                    }
//                    $rootScope.numberOfSavedCreditCards = $rootScope.savedCreditCards.length;
                }else{
                    $rootScope.modifiedSavedCards = savedCreditCards;
//                    $rootScope.numberOfSavedCreditCards = 1;
                }

                $rootScope.hasSavedCreditCards = true;
                $rootScope.savedCreditCardUsed = "Y";
                if(data.CheckoutResponse.GiftCardDetails != "" && data.CheckoutResponse.GiftCardDetails.Details != undefined){
                	$rootScope.hasGiftCard = true;
                    $rootScope.giftCard = $rootScope.objToArray(data.CheckoutResponse.GiftCardDetails.Details);
                    $rootScope.orderSummary = data.CheckoutResponse.OrderSummary;
                }
                
                
                
            }else if(data.CheckoutResponse.GiftCardDetails != "" && data.CheckoutResponse.GiftCardDetails.Details != undefined){
                $rootScope.hasSavedCreditCards = false;
                $rootScope.savedCreditCardUsed = "N";
                $rootScope.hasGiftCard = true;
                $rootScope.giftCard = $rootScope.objToArray(data.CheckoutResponse.GiftCardDetails.Details);
                $rootScope.orderSummary = data.CheckoutResponse.OrderSummary;
                
//                // HARD CODED FOR NOW!
//                $rootScope.selectedCreditCardInfo={"WalletExpiryYear":"2014","FoundExpressPayment":true,"AllowsFinancing":"NO","SavedCardDisplay":"rula%20tzava, VISA (****9674)","WalletNickName":"VISA,rula%20tzava4399090000999674Exp03/2014","OptionValue":"VISA|VISA|-9800|VISA|NO|201941730|VISA,rula%20tzava4399090000999674Exp03/2014|************9674|rula%20tzava|03|2014||VISA|452514654","MaskedAccount":"************9674","PrimaryCard":"","CurrentCardOrderId":"452514654","Edp_PIID":"201941730","DisplayAccount":"VISA (****9674)","WalletPayMethodId":"VISA","WalletBrand":"VISA","GetCVV":"Y","ExpiryDate":"03/2014","NameonCard":"rula%20tzava","WalletPayment_method":"VISA","WalletExpiryMonth":"3","CardType":"VISA","DisplayBrand":"VISA","WalletPolicyId":"-9800"};


            }else{
            	$rootScope.hasSavedCreditCards = false;
                $rootScope.savedCreditCardUsed = "N";
                $rootScope.hasGiftCard = false;
            }
            if(data.CheckoutResponse.Addresses != undefined && data.CheckoutResponse.Addresses.Address != undefined){
            	$rootScope.addressList = $rootScope.objToArray(data.CheckoutResponse.Addresses.Address);
            }
            if(data.CheckoutResponse.UserType != undefined){
            	$rootScope.userType = data.CheckoutResponse.UserType;
            }
            
            if(data.CheckoutResponse.SYWRDetails != undefined){
            	$rootScope.sywrDetails = data.CheckoutResponse.SYWRDetails;
            }else{
            	$rootScope.sywrDetails.PinLess = "No";
            }
            if(data.CheckoutResponse.SYWRDetails != undefined && data.CheckoutResponse.SYWRDetails != ""){
            	$rootScope.sywrDetails = data.CheckoutResponse.SYWRDetails;
//            	if($rootScope.sywrDetails.OrderTotal != undefined && $rootScope.sywrDetails.OrderTotal != "" ){
            		$rootScope.noPointsMesssage = "";
//            		$rootScope.sywrOrderTotal = $rootScope.sywrDetails.OrderTotal;
//            	}else{
//            		$rootScope.hasSywAccountInfo = "false"
//            		$rootScope.noPointsMesssage = "This account has no Points to redeem";
//            	}
            }
//            OrderSummary.OrderSummaryTotals.SywrAmount": "332"
            if($rootScope.giftCard){
//            if($rootScope.hasGiftCard){
            	for(var x=0; x < $rootScope.giftCard.length; x++){
            		$rootScope.giftCard[x].GiftCardNo = ($rootScope.giftCard[x].GiftCardNo).replace("\"","");
            		$rootScope.giftCard[x].GiftCardPin = ($rootScope.giftCard[x].GiftCardPin).replace("\"","");
            	}
            }

            /************** CREDIT CARD *********************/
            //Check Doubles or Duplicates
            var pIDs =[], cards = $rootScope.modifiedSavedCards;
            for (var card in cards){
                if ($.inArray(cards[card].Edp_PIID, pIDs) != -1){
                    $rootScope.modifiedSavedCards.splice(card, 1); //Remove This Card
                    //console.log('removing Card for duplicacy, this Card Info:'); //console.log(cards[card]);
                }
                else{
                    pIDs.push(cards[card].Edp_PIID); //Add to Search
                }
            }
            pIDs = [];

            if($rootScope.modifiedSavedCards == undefined || $rootScope.modifiedSavedCards[0] == ''
                || $rootScope.modifiedSavedCards == '' || Object.keys($rootScope.modifiedSavedCards).length === 0){
                //emptify
                $rootScope.modifiedSavedCards = [];
            }
            else if(!angular.isArray($rootScope.modifiedSavedCards)){  //turns modified into [] if its not an array.
                $rootScope.modifiedSavedCards = [$rootScope.modifiedSavedCards];
            }else{}

            //Initialize
            if($rootScope.selectedCreditCardIndex == undefined){
                //console.log('reset index' + $rootScope.selectedCreditCardIndex);
                $rootScope.selectedCreditCardIndex = -1;
            }
//            $rootScope.newCreditCard = {};
            $rootScope.numberOfSavedCreditCards = $rootScope.modifiedSavedCards.length;  //initial modified is all saved

            for(card in $rootScope.modifiedSavedCards){ //adding paymentMethod and cvvSize
                $rootScope.modifiedSavedCards[card].PaymentMethod = 'CREDITCARD';
                $rootScope.modifiedSavedCards[card].cvvSize = ($rootScope.modifiedSavedCards[card].WalletBrand == 'AMEX') ? 4 : 3;
            }
            
            if(data.CheckoutResponse.OrderSummary != undefined && data.CheckoutResponse.OrderSummary.OrderSummaryTotals != undefined){
            	$rootScope.orderTotal = data.CheckoutResponse.OrderSummary.OrderSummaryTotals.Total;
            }
            //console.log('**$rootScope.modifiedSavedCards: ');//console.log($rootScope.modifiedSavedCards);
            /************** CREDIT CARD *********************/
        }
    };
    return continueCheckoutParsing;
}]);

//WLCC.factory('viewCartOrUpdateCart', function($rootScope, spuStores, $location, callBacks) {
WLCC.factory('viewCartOrUpdateCart',['$rootScope', '$location', 'callBacks', 'omnitureTagging', 'eCoupons', function($rootScope, $location, callBacks, omnitureTagging, eCoupons) {
    var viewCartOrUpdateCart = {};
    viewCartOrUpdateCart.updateToRootScope = function(json, editType) { //edittype = 'Delete', 'Add New'
        //console.log(json);
        $rootScope.cartError = "";
        //
//        deba['viewCartResponse'] = json; //Congwen's Code, Delete at will;
        //
        if(json.CartResponse === undefined){
        	
        	$rootScope.cartErrorMessageDisplay = "noResponse";
			$location.path('/cart/cartMessage');
			/*********** Omniture tag page **************/
			omnitureTagging.tag("OmniturePageError", "Error Page", "servlet error");
//            omnitureTagging.tag("OmniturePageView", "Error Page");
        }else if(json.CartResponse.StatusData.RespMessage == $rootScope.responseMessage.sessionInvalid){
        	
        	$rootScope.cartErrorMessageDisplay = "sessionInvalid";
			$location.path('/cart/cartMessage');
			/*********** Omniture tag page **************/
			omnitureTagging.tag("OmniturePageError", "Error Page", "session invalid");
//            omnitureTagging.tag("OmniturePageView", "Error Page");
        }else if(json.CartResponse.StatusData.ResponseCode == 1){
        	
        	$rootScope.cartErrorMessageDisplay = "noResponse";
			$location.path('/cart/cartMessage');
			/*********** Omniture tag page **************/
			omnitureTagging.tag("OmniturePageError", "Error Page", "api error");
//            omnitureTagging.tag("OmniturePageView", "Error Page");
        }else if(json.CartResponse.Shoppingcart == ""){
            $location.path('/cart/emptycart');
            /*********** Omniture tag page **************/
            omnitureTagging.tag("OmniturePageView", "Empty Cart");
            wlccUpdateCount("0");
            $rootScope.itemsInCart = 0;
        }else{
//        	/*********** Omniture tag page **************/
//            omnitureTagging.tag("OmniturePageView", "Shopping Cart");
            $rootScope.orderId = json.CartResponse.Shoppingcart.OrderId;
            $rootScope.possiblePointsOnOrder = json.CartResponse.Shoppingcart.Summary.SYWRPoints;
            /**Original item array**/
            $rootScope.updatedItemsArray = $rootScope.objToArray(json.CartResponse.Shoppingcart.OrderItems.OrderItem);
//			if($rootScope.items == undefined || typeof editType == 'undefined' || editType === 'deleteItem' || editType === 'editFulfillment'){
            if($rootScope.items == undefined || typeof editType == 'undefined' || editType === 'deleteItem') {
                /**Updated item array for the UI**/
                $rootScope.items = $rootScope.objToArray(json.CartResponse.Shoppingcart.OrderItems.OrderItem);
                var count = 0;
                for(var x in $rootScope.items){ count = count + parseInt($rootScope.items[x].Qty); }
                $rootScope.itemsInCart = count;
                wlccUpdateCount(count);
            } else if (editType === 'editFulfillment'){
                //COMPARE newItems to Items
                var oldItems = $rootScope.items;
                var newItems = $rootScope.objToArray(json.CartResponse.Shoppingcart.OrderItems.OrderItem);
                for(k in oldItems){
                    var found = false;
                    for(n in newItems){
//					    //console.log(oldItems[k].OrderItemID +" "+ newItems[n].OrderItemID);
                        if(oldItems[k].OrderItemID == newItems[n].OrderItemID){
                            found = true;
                            if(oldItems[k].ArrivalMethods.SelectedArrivalMethod.SelectedFFMCenter == "SPU" && newItems[n].ArrivalMethods.SelectedArrivalMethod.SelectedFFMCenter == "SPU"){
                                $rootScope.items[k] = newItems[n];
                            }
                            break;
                        }
                    }
                    if(!found){ oldItemsIndex = k; }
                }
                for(m in newItems){
                    var found = false;
                    for(b in oldItems){
                        if(newItems[m].OrderItemID == oldItems[b].OrderItemID || viewCartOrUpdateCart.isRA(newItems[m]) == true){
                            found = true;
                            break;
                        }
                    }
                    if(!found){ newItemsIndex = m; }
                }
//                //console.log("old OrderItemID" + oldItems[oldItemsIndex].OrderItemID) ; //console.log(oldItems[oldItemsIndex]);
//                //console.log("new OrderItemID" + newItems[newItemsIndex].OrderItemID); //console.log(newItems[newItemsIndex]);
                
                if($rootScope.selectedProductOption[oldItemsIndex].length == 0) {
                	$rootScope.items[oldItemsIndex] = newItems[newItemsIndex];
                } else {
                    $rootScope.bridgingViewCartAndPO(oldItems[oldItemsIndex], newItems[newItemsIndex], oldItemsIndex);
                }
               
            }
            
            if($rootScope.updatedItemsArray.length < $rootScope.items.length) {
            	viewCartOrUpdateCart.updateToRootScope(json);
            }
            
            $rootScope.summary = json.CartResponse.Shoppingcart.Summary;
            $rootScope.orderTotal = $rootScope.summary.EstimatedPreTaxTotal;
            $rootScope.isPayPalEligible = (json.CartResponse.Shoppingcart.IsPayPalEligible == "Y") ? true: false;
            
            if($rootScope.summary.LoyaltyId != undefined && $rootScope.summary.LoyaltyId != ""){
        		$rootScope.hasSywAccountInfo = "true";
  				$rootScope.swyNumb = $rootScope.summary.LoyaltyId;
  				$rootScope.swyNumb = ($rootScope.swyNumb).toString().replace(/ /g, "");
  				$rootScope.sywAccountInfo = $rootScope.maskCCN($rootScope.swyNumb);
  				eCoupons.getSavedOffers();
  			}else{
  				$rootScope.hasSywAccountInfo = "false";
  			}
            
            if(($rootScope.summary.CouponDiscount != "" && $rootScope.summary.CouponDiscount != "0.00" && $rootScope.summary.CouponDiscount != "$0.00") ||($rootScope.summary.SavingsBreakdown.CouponDiscounts != undefined)){
            	$rootScope.cartCoupons = $rootScope.objToArray($rootScope.summary.SavingsBreakdown.CouponDiscounts.CouponDiscount);
            	$rootScope.appliedCoupons = [];
            	$rootScope.appliedCouponsToDisplay = [];
            	$rootScope.notAppliedCouponsToDisplay = [];
           		 for(n in $rootScope.cartCoupons){
           			 if($rootScope.cartCoupons[n].CouponMessage == ""){
           				 $rootScope.appliedCoupons.push($rootScope.cartCoupons[n].PromotionCode);
           				$rootScope.appliedCouponsToDisplay.push($rootScope.cartCoupons[n]);
           			 }else{
           				$rootScope.notAppliedCouponsToDisplay.push($rootScope.cartCoupons[n]);
           			 }
           		 }
            	
            	//console.log($rootScope.appliedCouponsToDisplay);
            	
            	$rootScope.promoCodeMessage = $rootScope.summary.SavingsBreakdown.CouponDiscounts.CouponDiscount.ShortDescription;
    			$rootScope.promoCodeApplied = true;
//            }else if($rootScope.summary.SavingsBreakdown.CouponDiscounts != undefined){
            }else{
            	$rootScope.appliedCoupons = [];
            	$rootScope.appliedCouponsToDisplay = [];
            	$rootScope.notAppliedCouponsToDisplay = [];
            	$rootScope.summary.CouponDiscount = "0.00";
            	$rootScope.promoCodeMessage ="";
    			$rootScope.promoCodeApplied = false;
            }
            $rootScope.instantRebateShow = $rootScope.summary.InstantRebateShow;
            if($rootScope.instantRebateShow == false && $rootScope.summary.TotalAppliedRebateAmount != "0.00" && $rootScope.summary.TotalAppliedRebateAmount != "$0.00" && $rootScope.summary.TotalAppliedRebateAmount != undefined){
            	$rootScope.orderAppliedRebates = "true";
            }
            else if($rootScope.instantRebateShow == "false"){
            	$rootScope.orderAppliedRebates = "false";
            }


            var fulfillments = new Array();
            var orderitemids = new Array();
            var partNumbers = new Array();
            $rootScope.items = $rootScope.objToArray($rootScope.items);
            $rootScope.cartItemNumb = $rootScope.items.length;
            $rootScope.selectedProductOption = new Array();
            $rootScope.selectedPOPrice = new Array();

            $rootScope.sywSubtotal = parseFloat($rootScope.summary.EstimatedPreTaxTotal.substring(1, $rootScope.summary.EstimatedPreTaxTotal.length)) -
                parseFloat($rootScope.summary.SYWRCouponDiscount.substring(1, $rootScope.summary.SYWRCouponDiscount.length));
//	        $rootScope.sywSubtotal = "$" + $rootScope.sywSubtotal.toString();
            $rootScope.sywSubtotal = $rootScope.sywSubtotal.toString();

            $rootScope.hasArrivalType = new Object();
            $rootScope.hasArrivalType.ship = false;
            $rootScope.hasArrivalType.delivery = false;
            $rootScope.hasArrivalType.pickup = false;
            
            for(var i = 0; i < $rootScope.items.length; i++) {
               if($rootScope.items[i].ArrivalMethods.SelectedArrivalMethod.SelectedFFMCenter === 'GC'){
	                $rootScope.giftCardAsItem = true;
	            }
               
                viewCartOrUpdateCart.updateSelectedProductOption($rootScope.items[i], i);
                $rootScope.items[i].ArrivalMethods.AvailableArrivalMethod = $rootScope.objToArray($rootScope.items[i].ArrivalMethods.AvailableArrivalMethod);
                /** if we get only one available fulfillment type we also add the selected one in the array REVISIT **/
                if($rootScope.items[i].ArrivalMethods.AvailableArrivalMethod != undefined && $rootScope.items[i].ArrivalMethods.AvailableArrivalMethod.length == 1){
//                	//console.log($rootScope.items[i].ArrivalMethods.AvailableArrivalMethod[0].AvailableArrivalMethodName +" "+ $rootScope.items[i].ArrivalMethods.SelectedArrivalMethod.SelectedArrivalMethodName);
                	if($rootScope.items[i].ArrivalMethods.AvailableArrivalMethod[0].AvailableArrivalMethodName != $rootScope.items[i].ArrivalMethods.SelectedArrivalMethod.SelectedArrivalMethodName){
                    selected = {"AvailableArrivalMethodName":$rootScope.items[i].ArrivalMethods.SelectedArrivalMethod.SelectedArrivalMethodName , "AvailableFFMCenter": $rootScope.items[i].ArrivalMethods.SelectedArrivalMethod.SelectedFFMCenter};
                    ($rootScope.items[i].ArrivalMethods.AvailableArrivalMethod).push(selected);
                	}
                }
                var currentfulfillments = $rootScope.items[i].ArrivalMethods.AvailableArrivalMethod;
                var arrayToSave = [];
                for(b in currentfulfillments){
                	if(currentfulfillments[b].AvailableArrivalMethodName != "VD"){
                		arrayToSave.push(currentfulfillments[b]);
                	}
            		$rootScope.items[i].ArrivalMethods.AvailableArrivalMethod = arrayToSave;

                }

//                $rootScope.order_item_ids = $rootScope.updatedItemsArray[i].OrderItemID;
//                $rootScope.arrivalMethod = $rootScope.items[i].ArrivalMethods.SelectedArrivalMethod.SelectedFFMCenter;

                var arrivalMethod = $rootScope.items[i].ArrivalMethods.SelectedArrivalMethod.SelectedFFMCenter;
                var selectedAttributes = $rootScope.items[i].SelectedAttributes[0];
                if(selectedAttributes != ""){
                    for(x in selectedAttributes){
                        selectedAttributes[x] = (selectedAttributes[x].replace(",","")).trim();
                    }
                }
                if($rootScope.items[i].PriceBreakdown == undefined){
                    var savings = ($rootScope.items[i].RegularPrice - $rootScope.items[i].SalePrice);
                    $rootScope.items[i].PriceBreakdown = {"Savings": savings,"RegularPrice": $rootScope.items[i].Price, "SalePrice": $rootScope.items[i].ItemTotal, "TotalPrice": $rootScope.items[i].TotalPrice, "TotalProductPrice": $rootScope.items[i].TotalProductPrice,};
                }

//                fulfillments.push($rootScope.arrivalMethod);
//                orderitemids.push($rootScope.order_item_ids);
//                fulfillments.push($rootScope.updatedItemsArray[i].ArrivalMethods.SelectedArrivalMethod.SelectedFFMCenter);
                fulfillments.push(arrivalMethod);
                orderitemids.push($rootScope.updatedItemsArray[i].OrderItemID);
                partNumbers.push($rootScope.updatedItemsArray[i].DisplayPartNumber);

                $rootScope.cartFulfillmentMethod = $rootScope.items[i].ArrivalMethods.SelectedArrivalMethod.SelectedArrivalMethodName;
                $rootScope.availableArrivalMethods = $rootScope.objToArray($rootScope.items[i].ArrivalMethods.AvailableArrivalMethod);
                
                if(arrivalMethod == "TW" || arrivalMethod == "VD") {
                	$rootScope.hasArrivalType.ship = true;
                } else if(arrivalMethod == "DDC") {
                	$rootScope.hasArrivalType.delivery = true;
                }
                
                $rootScope.items[i].qty = $rootScope.items[i].Qty;
                
            }
            localStorage.myFunnyNumber =   $rootScope.orderId;
            $rootScope.arrivalMethods = fulfillments.toString();
            $rootScope.orderItemIds = orderitemids.toString();
            $rootScope.omniturePartNumbers = partNumbers.toString();
            $rootScope.omniturePartNumbers = ";" + $rootScope.omniturePartNumbers.replace(/\,/g,";");
            localStorage.pOmnNum =  $rootScope.omniturePartNumbers;
            //console.log($rootScope.omniturePartNumbers);
            
		    viewCartOrUpdateCart.removeRAFromCartView();
		    viewCartOrUpdateCart.inputTypeForMultipleInstallation();
		    $rootScope.removeOverSizedItem = new Array();
//		    //console.log("~~~~~~~~~~~~~~~~Current Selected PO~~~~~~~~~~~~~~~~~~~~~~");
//		    //console.log($rootScope.selectedProductOption);
        }
    };

    viewCartOrUpdateCart.updateSelectedProductOption = function(item, index) {
        var productOption = item.AvailableProductOptions;
        var selectedOption = new Array();
        var currentItemTotalPOPrice = 0.0;
       
        $rootScope.items[index].extraAccessories = new Array();
        for(var optionIndex in productOption) { //an object (type of PO eg: installation, product configuration)
            for(var subOptionIndex in (subOption = $rootScope.objToArray(productOption[optionIndex]))) { //an array
                if(subOption[subOptionIndex].isSelected == true) {
                    if((typeof subOption[subOptionIndex].Price != "undefined" && !isNaN(subOption[subOptionIndex].Price))) {
                        currentItemTotalPOPrice += parseFloat(subOption[subOptionIndex].Price);
                    } else {
                        currentItemTotalPOPrice += ((typeof subOption[subOptionIndex].Price != "undefined" && subOption[subOptionIndex].Price != "") ? parseFloat(subOption[subOptionIndex].Price.substring(1,subOption[subOptionIndex].Price.length)) : 0);
                    }
                    selectedOption.push({type: optionIndex , index : subOptionIndex , option : subOption[subOptionIndex]});
                    if(optionIndex == "RequiredAccessories") {
                    	//console.log("showing required Access");
                    	subOption[subOptionIndex].originalPrice = subOption[subOptionIndex].Price.replace("\$","");
                    	$rootScope.items[index].extraAccessories.push(subOption[subOptionIndex]);
                    	$rootScope.items[index].PriceBreakdown.TotalProductPrice = parseFloat($rootScope.items[index].PriceBreakdown.TotalProductPrice) + parseFloat(subOption[subOptionIndex].originalPrice);
                    }
                }
            }
        }
        $rootScope.selectedPOPrice.push(currentItemTotalPOPrice);
        $rootScope.selectedProductOption.push(selectedOption);
    };
    
    viewCartOrUpdateCart.inputTypeForMultipleInstallation = function() {
    	for(var i in $rootScope.selectedProductOption) {
    		var installCount = 0;
    		for(var j in $rootScope.selectedProductOption[i]) {
        		if($rootScope.selectedProductOption[i][j].type == "Installation")
        			installCount++;
    		}
    		if(installCount > 1) {
    			for(var j in $rootScope.selectedProductOption[i]) {
    				if($rootScope.selectedProductOption[i][j].type == "Installation")
    					$rootScope.selectedProductOption[i][j].inputType = "checkbox";
    			}
    		}
    	}
    };

    viewCartOrUpdateCart.removeRAFromCartView = function() {
        for(i = 0; i < $rootScope.items.length; i++) {
            for(j = 0; j < $rootScope.selectedProductOption.length; j++) {
                for(z = 0; z < $rootScope.selectedProductOption[j].length; z++) {
                    if(angular.isDefined($rootScope.selectedProductOption[j][z]) && angular.isDefined($rootScope.items[i]) &&
                        ($rootScope.items[i].CatEntryId == $rootScope.selectedProductOption[j][z].option.PCatEntryId ||
                            $rootScope.items[i].OrderItemID  == $rootScope.selectedProductOption[j][z].option.ChildOrderItemId )) {
//                            || $rootScope.items[i].ItemDescription == $rootScope.selectedProductOption[j][z].option.Description)) {
                        $rootScope.items.splice(i, 1);
                        $rootScope.selectedProductOption.splice(i, 1);
                        $rootScope.selectedPOPrice.splice(i, 1);
                        j = 0;
                    }
                }
            }
        }
    };
    
    viewCartOrUpdateCart.isRA = function(item) {
        for(j = 0; j < $rootScope.selectedProductOption.length; j++) {
            for(z = 0; z < $rootScope.selectedProductOption[j].length; z++) {
                if(angular.isDefined($rootScope.selectedProductOption[j][z]) &&
                    (item.CatEntryId == $rootScope.selectedProductOption[j][z].option.PCatEntryId ||
                     item.OrderItemID  == $rootScope.selectedProductOption[j][z].option.ChildOrderItemId )) {
                    return true;
                }
            }
        }
        return false;
    }

    return viewCartOrUpdateCart;

}]);

WLCC.factory('paymentValidatorService', function(){ //empty undefined returns true
    var paymentValidatorService = {
        reqCVV: '',
        reqCardNo: '',
        alphabets: /^[a-zA-Z ]+$/,
        numbers: /^\-?\d*$/
    };
    var ckNull = function(p){ return (p==null || p=='' || p==undefined); }// return true on null
    paymentValidatorService.vCardType = function(typ, cardTypes){//2nd is list of ccTypes, typ current
        if(ckNull(typ)) return false;
        if(!cardTypes) var cardTypes = ['VISA', 'MasterCard', 'SearsGoldMC', 'SearsPlus', 'DISCOVER', 'SearsCommercialOne', 'AMEX'];
        paymentValidatorService.reqCVV = (typ == 'AMEX') ? 4 : 3;
        paymentValidatorService.reqCardNo = (typ == 'AMEX') ? 15 : 16;
        return (cardTypes.indexOf(typ) > -1)
    };
    paymentValidatorService.vPattern = function(nam,pattern){
        if(ckNull(nam)) return true;
//        //console.log('will be testing if .s.'+nam + ' is a ' + pattern + ': '+(paymentValidatorService[pattern].test(nam)));
        return (paymentValidatorService[pattern].test(nam));
    };
    paymentValidatorService.vLength = function(v, cardType, field){ // v.length is cardType length, c = less, more,equal(no point)
        if(ckNull(v)) return true; if(ckNull(cardType)) return true;
        v += ''; var l = null; var l = 0;
        if (field == 'cvv')
            l = (cardType == 'AMEX') ? 4 : 3;
        else if (field == 'cardNo')
            l = (cardType == 'AMEX') ? 15 : 16;
        return (v.length == l);
    };
    paymentValidatorService.vExpMonth = function(mon){
        if(ckNull(mon)) return true;
        return (Number(mon)!=NaN&&mon%1==0&&mon>0 && mon<13);
    };
    paymentValidatorService.vExpYear = function(yr){
        if(ckNull(yr)) return true;
        if(yr.length==2){yr='20'+yr;}
        return (Number(yr)!=NaN&&yr%1==0&&yr>2012&&yr<2051);
    };
    paymentValidatorService.toBoolean = function(value){
        if (value && value.length !== 0) {
            var v = ("" + value).toLowerCase();
            value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
        } else {
            value = false;
        }
        return value;
    };
    return paymentValidatorService;
});

//fetch premium charge API
WLCC.factory("premiumDeliveryChargeService",['$rootScope', '$q', '$http', function($rootScope, $q, $http) {
    var premiumDeliveryChargeService = {};
    premiumDeliveryChargeService.deferred = $q.defer();
    premiumDeliveryChargeService.fetchPremiumCharge = function(selectedDate) {
        $rootScope.ajaxPending = true;
        var postArrayVars = {
        		 "in_selectedDate" : selectedDate.replace("#A#E", ""), //required
                 "in_sessionKey"  : $rootScope.token,
        };
        
//        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing PremiumDeliveryCharge with postArrayVars: ');//console.log(postArrayVars);
        $http({
        	 method: "POST",
             url: premiumDC_url,
             data: postArrayVars,
             transformRequest: function(data){
         		return $.param(data);
         	},
        }).success(function(data) {
               
                //console.log("successfully retrieve the premium charge");
                //console.log(data);
                if ($.isEmptyObject(data)){
                    $location.path(dynamicCartView +'cart/error')
                    //console.log("Premium Delivery Empty Response")
                }
                else{
                    if(data.PremiumDeliveryResponse.StatusData.ResponseCode == 0 && data.PremiumDeliveryResponse.PremiumDeliveryDetails != "" && data.PremiumDeliveryResponse.PremiumDeliveryDetails != undefined){
                        premiumDeliveryChargeService.premiumDeliveryDetails = data.PremiumDeliveryResponse.PremiumDeliveryDetails;
                        $rootScope.standardDelivery = premiumDeliveryChargeService.premiumDeliveryDetails.StandardDelivery;
                        $rootScope.morningDelivery = premiumDeliveryChargeService.premiumDeliveryDetails.MorningDelivery
                        $rootScope.eveningDelivery = premiumDeliveryChargeService.premiumDeliveryDetails.EveningDelivery
                    }else{
                        //console.log("else case for premium delivery options");
                    }
                }
                premiumDeliveryChargeService.deferred.resolve(data);
                $rootScope.ajaxPending = false;
            }).error(function(data) {
                premiumDeliveryChargeService.deferred.reject("failed to fetch premium delivery date");
                //console.log("failed to fetch premium delivery date\n" + JSON.stringify(data));
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };
    return premiumDeliveryChargeService;
}]);

//remove CC API
WLCC.factory("removeCreditCardService",['$rootScope', '$q', '$http', function($rootScope, $q, $http) {
    var removeCreditCardService = {};
    removeCreditCardService.deferred = $q.defer();
    removeCreditCardService.removeCreditCard = function(scope) {
        $rootScope.ajaxPending = true;
        //piID = The PI-ID is specific to each Wallet Cards. The corresponding value should be passed while deleting any Card.
        //userId = (required) The user id of the profile.
        //profileOrderId = (required for second wallet) �profile order id of the wallet should be passed.
//		//console.log($rootScope);
//        //console.log($rootScope.piId +','+ $rootScope.userId +',' + $rootScope.profileOrderId+',' + $rootScope.ccBrand +','+ $rootScope.token);
        //$rootScope.continueCheckoutResponse.CheckoutResponse.PaymentMethod.SavedCreditCards
        var thisSavedCard = $rootScope.savedCreditCards[scope.$index];
        var postArrayVars = {
        		 "in_piId"           : thisSavedCard.Edp_PIID, //optional I think
                 "in_userId"         : $rootScope.viewProfile.ProfileResponse.AddressBook.userId, //need sears123@gmail.com ...NOT use viewProfile
                 "in_profileOrderId" : $rootScope.viewProfile.ProfileResponse.WalletInfo.OrderId, //need ...NOT use viewProfile
                 "in_cc_brand"       : thisSavedCard.WalletBrand,  //need
                 "in_sessionKey"     : $rootScope.token,
        };
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Billing");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Remove Credit Card with postArrayVars: ');//console.log(postArrayVars);
        $http({
        	 method: "POST",
             url: removeCC_url,
             data: postArrayVars,
             transformRequest: function(data){
         		return $.param(data);
         	}
        }).success(function(data) {
                $('li.removing').addClass('removed');
                //console.log("**successfully removed CC");
                //console.log(data);
                removeCreditCardService.deferred.resolve(data);
                if ($.isEmptyObject(data)){
                    $location.path(dynamicCartView +'cart/error')
                    //console.log("Remove Credit Card Empty Response")
                }
                else{
                    if (!!data.Error || typeof data.ProfileResponse.StatusData.ResponseCode == undefined
                        || data.ProfileResponse.StatusData.ResponseCode != 0){
                        $('li#item'+scope.$index).removeClass('deleting');
                    } //if deletioni fails remove effect

                    //Temporary Solution to no response
                    $rootScope.modifiedSavedCards.splice(scope.$index,1);
//                $rootScope.savedCreditCards.splice(scope.$index,1); //pass by Reference
                    //console.log('removed saved card #' + scope.$index)
                    $rootScope.numberOfSavedCreditCards--;
                    if($rootScope.numberOfSavedCreditCards == 0){ // or -1?
                        $rootScope.hasSavedCreditCards = false;
                    }
//                    notifier = true;
                    $rootScope.ajaxPending = false;
                }
            }).error(function(data) {
            		$('li.removing').removeClass('removing').addClass('unselected');
                removeCreditCardService.deferred.reject("failed to remove CC");
                //console.log(data);
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };
    return removeCreditCardService;
}]);

/**get the set of delivery date for the item according to the addressID we passed in**/
//also displaying the snapshots all the modules (shipping /delivery/pickup/address etc) at any point of time
WLCC.factory("checkoutDisplayService",['$rootScope', '$q', '$http','continueCheckoutParsing', 'payBill', function($rootScope, $q, $http, continueCheckoutParsing, payBill){
    var checkoutDisplayService = {};

    checkoutDisplayService.viewPaymentPage = function() {
    	checkoutDisplayService.deferred = $q.defer();
        $rootScope.ajaxPending = true;
        var postArrayVars = {
        		in_sessionKey: $rootScope.token,
    			in_orderId: $rootScope.orderId,
    			in_prevUpdatedModule: "ADDRESS", //param required from review to payment *not required in the checkout process* 
    			in_editedModule: "PAYMENT", //param required from review to payment *not required in the checkout process*
    			in_addressId: localStorage.myFunnyNumber2,
    			
        };
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Checkout Display with postArrayVars: ');//console.log(postArrayVars);


        $http({
        	  method: "POST",
              url: checkoutDisplay_url,
              data: postArrayVars,
              transformRequest: function(data){
          		return $.param(data);
          	},
        }).success(function(data) {
                checkoutDisplayService.deferred.resolve(data);
                //console.log("successfully retrieved dateString object");
                //console.log(data);
                continueCheckoutParsing.parseData(data);
//                validatePageService.validateFulfillment();
                $rootScope.ajaxPending = false;
            }).error(function(data) {
                checkoutDisplayService.deferred.reject("failed to call checkoutDisplay");
                //console.log("failed to retrieve dateString object");
                //console.log(data);
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };
    
    
    checkoutDisplayService.viewReviewPage = function() {
    	checkoutDisplayService.deferred = $q.defer();
        $rootScope.ajaxPending = true;
        var postArrayVars = {
        		in_sessionKey: $rootScope.token,
    			in_orderId: $rootScope.orderId,
    			in_prevUpdatedModule: "ADDRESS", //param required from review to payment *not required in the checkout process* 
    			in_editedModule: "", //param required from review to payment *not required in the checkout process*
//    			in_addressId: $rootScope.checkoutDisplayAddressId,
    			
        };
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Checkout Display with postArrayVars: ');//console.log(postArrayVars);


        $http({
        	  method: "POST",
              url: checkoutDisplay_url,
              data: postArrayVars,
              transformRequest: function(data){
          		return $.param(data);
          	},
        }).success(function(data) {
            if ($.isEmptyObject(data)){
                $location.path(dynamicCartView +'cart/error')
                //console.log("View Review Page Empty Response")
            }
            else{
                checkoutDisplayService.deferred.resolve(data);
                //console.log("successfully retrieved dateString object");
                //console.log(data);
                payBill.payBillParsing(data);
//                validatePageService.validateFulfillment();
                $rootScope.ajaxPending = false;
            }
        }).error(function(data) {
            checkoutDisplayService.deferred.reject("failed to call checkoutDisplay");
            //console.log("failed to retrieve dateString object");
            //console.log(data);
            $rootScope.ajaxPending = false;
            $rootScope.responseFail = true;
        });
    };
    return checkoutDisplayService;
}]);

//add or remove giftcard API
WLCC.factory("applyOrRemoveGCService",['$rootScope', '$q', '$http', 'continueCheckoutParsing', function($rootScope, $q, $http, continueCheckoutParsing) {
    var applyOrRemoveGCService = {};
    
    
    applyOrRemoveGCService.applyGC = function(giftCardAccNum, giftCardPin) {
    	applyOrRemoveGCService.deferred = $q.defer();
        giftCardAccNum = giftCardAccNum.replace(/[^\d]/g, '');
        giftCardPin = giftCardPin.replace(/[^\d]/g, '');
        $rootScope.ajaxPending = true;

        var postArrayVars = {
        		 "in_addOrRemoveFlag" : "add",//$rootScope.addOrRemoveGC + //need
                 "in_giftCardNumber"  :giftCardAccNum, //need 16 digit gift card number
                 "in_giftCardPin"     :giftCardPin, //need
                 "in_userType"        :$rootScope.userType,
                 "in_sessionKey"      :$rootScope.token,
                 "in_billingAddressId" :$rootScope.selectedBillingAddressId, //need
                 "in_email1"           :$rootScope.email1, //optional
                 "in_email2"           : $rootScope.email2, //optional
                 "in_orderAmount"      : $rootScope.orderTotal, //optional
                 "in_orderId"          :$rootScope.orderId,
        };
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Billing");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Apply or Remove Gift Card with postArrayVars: ');//console.log(postArrayVars);
        
        $http({
        	method: "POST",
            url: applyOrRemoveGC_url,
            data: postArrayVars,
            transformRequest: function(data){
        		return $.param(data);
        	},
        }).success(function(data) {
        	$rootScope.ajaxPending = false;
        	 applyOrRemoveGCService.deferred.resolve(data);

                //console.log(data);
                if ($.isEmptyObject(data)){
                    $location.path(dynamicCartView +'cart/error')
                    //console.log("Apply Gift Card Empty Response")
                }else{
                    if(data.ApplyorRemoveGiftCard != undefined){
                        applyOrRemoveGCService.responseCode = 1;
                        applyOrRemoveGCService.message = data.ApplyorRemoveGiftCard.ErrorMessage;
                        $rootScope.hasGiftCard = false;
                    }else if(data.CheckoutResponse.StatusData.ResponseCode == 1){
                        applyOrRemoveGCService.responseCode = 1;
                        applyOrRemoveGCService.message = data.CheckoutResponse.StatusData.RespMessage;
                        $rootScope.hasGiftCard = false;
                    }else if(data.CheckoutResponse.StatusData.ResponseCode == 0){
                        applyOrRemoveGCService.responseCode = 0;
                        applyOrRemoveGCService.message = "Gift Card was successfully added! Remaining Ammount: " + data.CheckoutResponse.GiftCardDetails.Details.RemainingAmnt + " Applied Ammount: " +data.CheckoutResponse.GiftCardDetails.Details.AppliedAmnt;
                        $rootScope.hasGiftCard = true;
                        continueCheckoutParsing.parseData(data);
                    }
                    applyOrRemoveGCService.deferred.resolve(data);
                }
            }).error(function(data) {
                applyOrRemoveGCService.deferred.reject("failed to add or remove giftcard");
                //console.log("failed to add or remove giftcard");
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };
    
    
    applyOrRemoveGCService.removeGC = function(giftCardAccNum, giftCardPin) {
    	applyOrRemoveGCService.deferred = $q.defer();
        giftCardAccNum = giftCardAccNum.replace(/[^\d]/g, '');
        giftCardPin = giftCardPin.replace(/[^\d]/g, '');
        $rootScope.ajaxPending = true;

        var postArrayVars = {
        		 "in_addOrRemoveFlag" : "remove",//$rootScope.addOrRemoveGC + //need
                 "in_giftCardNumber"  :giftCardAccNum, //need 16 digit gift card number
                 "in_giftCardPin"     :giftCardPin, //need
                 "in_userType"        :$rootScope.userType,
                 "in_sessionKey"      :$rootScope.token,
                 "in_billingAddressId" :$rootScope.selectedBillingAddressId, //need
                 "in_email1"           :$rootScope.email1, //optional
                 "in_email2"           : $rootScope.email2, //optional
                 "in_orderAmount"      : $rootScope.orderTotal, //optional
                 "in_orderId"          :$rootScope.orderId,
        };
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Billing");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('** Firing RemoveGiftCard with postArrayVars: ');//console.log(postArrayVars);
        $http({
        	method: "POST",
            url: applyOrRemoveGC_url,
            data: postArrayVars,
            transformRequest: function(data){
        		return $.param(data);
        	},
        }).success(function(data) {
                if ($.isEmptyObject(data)){
                    $location.path(dynamicCartView +'cart/error')
                    //console.log("Remove Gift Card Empty Response")
                }
                else{
                    //console.log(data);
                    if(data.ApplyorRemoveGiftCard != undefined){
                        $rootScope.hasGiftCard = true;
//                    applyOrRemoveGCService.message = data.ApplyorRemoveGiftCard.ErrorMessage;
                    }else if(data.CheckoutResponse.StatusData.ResponseCode == 1){
                        $rootScope.hasGiftCard = true;
//                    applyOrRemoveGCService.message = data.CheckoutResponse.StatusData.RespMessage;
                    }else{
                        $rootScope.hasGiftCard = false;
//                    applyOrRemoveGCService.message = "Gift Card was successfully removed.";
                        continueCheckoutParsing.parseData(data);
                    }
                    applyOrRemoveGCService.deferred.resolve(data);
                    $rootScope.ajaxPending = false;
                }
            }).error(function(data) {
                applyOrRemoveGCService.deferred.reject("failed to add or remove giftcard");
                //console.log("failed to add or remove giftcard");
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };
    
    return applyOrRemoveGCService;
}]);


WLCC.factory("thirdPartyPickup",['$rootScope', '$q', '$http', function($rootScope, $q, $http){
    var thirdPartyPickup ={};

    thirdPartyPickup.deferred = $q.defer();
    thirdPartyPickup.applyThirdPartyPickup = function(){
        $rootScope.ajaxPending = true;
//        var url =  thirdPartyPickup_url +
//            "in_orderId=" + $rootScope.orderId +
//            "&in_thirdPartyName="+$rootScope.thirdPartyName+
//            "&in_thirdPartyEmail="+$rootScope.thirdPartyEmail +
//            "&in_sessionKey=" + $rootScope.token +
//            "&in_actionTaken=BEGINVERIFICATION";
        var postArrayVars = {
         	   "in_orderId" : $rootScope.orderId,
                "in_thirdPartyName":$rootScope.thirdPartyName,
                "in_thirdPartyEmail":$rootScope.thirdPartyEmail,
                "in_sessionKey" : $rootScope.token,
                "in_actionTaken" : "BEGINVERIFICATION"
         };
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Third Party Pickup with postArrayVars: ');//console.log(postArrayVars);
        
        $http({
        	url: thirdPartyPickup_url,
            method: "POST",
            data: postArrayVars,
            transformRequest: function(data){
        		return $.param(data);
        	},
//            url: url,
//            method: "POST",
//            data: {}
        }).success(function(data) {
                if ($.isEmptyObject(data)){
                    $location.path(dynamicCartView +'cart/error')
                    //console.log("Third Party Pickup Empty Response")
                }
                else{
                    //console.log(data);
                    thirdPartyPickup.deferred.resolve(data)
                    $rootScope.ajaxPending = false;
                }
            }).error(function(data) {
                applyOrRemoveGCService.deferred.reject("failed to verify");
                //console.log("failed to verify");
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    }

    return thirdPartyPickup;
}]);


WLCC.factory("callBacks",['$rootScope', function($rootScope) {
    var callBacks = {};

    return callBacks;
}]);



WLCC.factory('viewProfile',['$rootScope', '$q', '$http', '$timeout', 'validatePageService','eCoupons', 'sywCalls', function($rootScope, $q, $http, $timeout, validatePageService, eCoupons, sywCalls){

    var viewProfile = {};
    viewProfile.view = function(){
    	viewProfile.deferred = $q.defer();
        var postArrayVars = {'in_sessionKey' : $rootScope.token};
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing View Profile with postArrayVars: ');//console.log(postArrayVars);

        $http({
        	url: viewProfile_url,
            method: 'POST',
            data: postArrayVars,
            transformRequest: function(data){
        		return $.param(data);
            }
        }).success(function(data){
        	viewProfile.deferred.resolve();
			//console.log('viewProfile data: ');
			//console.log(JSON.stringify(data));
			//console.log(data);
			$rootScope.viewProfile = data;
            if ($.isEmptyObject(data)){
                $location.path(dynamicCartView +'cart/error')
                //console.log("View Profile Pickup Empty Response")
            }
            else{
                if($rootScope.hasSywAccountInfo = "true" && $rootScope.sywAccountInfo != undefined && $rootScope.sywAccountInfo != ""){
                    eCoupons.getSavedOffers();
                }
                else if(data.ProfileResponse.AccountInfo.MembershipDetails.SYWR != undefined && data.ProfileResponse.AccountInfo.MembershipDetails.SYWR != null &&  data.ProfileResponse.AccountInfo.MembershipDetails.SYWR != ""){
                    $rootScope.hasSywAccountInfo = "true";
                    $rootScope.swyNumb = data.ProfileResponse.AccountInfo.MembershipDetails.SYWR;
                    $rootScope.swyNumb = ($rootScope.swyNumb).replace(/ /g, "");
                    sywCalls.fetchSywOrderTotal($rootScope.swyNumb);
                    $rootScope.sywAccountInfo = $rootScope.maskCCN($rootScope.swyNumb);
                    sywCalls.saveSywOnCart($rootScope.swyNumb);
//				eCoupons.getSavedOffers();
//				$rootScope.sywAccountInfo =  $rootScope.maskCCN(data.ProfileResponse.AccountInfo.MembershipDetails.SYWR);
                }else{
                    $rootScope.hasSywAccountInfo = "false";
                }
                $rootScope.enteredEmail = data.ProfileResponse.AccountInfo.Email1;
                $rootScope.enteredEmail2 = data.ProfileResponse.AccountInfo.Email2;

//                if(angular.isDefined(data.ProfileResponse.ExpressCheckOut) && angular.isDefined(data.ProfileResponse.ExpressCheckOut.ShippingAddress)) {
//                    $rootScope.expressShipId = data.ProfileResponse.ExpressCheckOut.ShippingAddress.AddressId;
//                }
                
                if($rootScope.isExpress) {
            		var expressCOData = data.viewProfile.ProfileResponse.ExpressCheckOut;
            		if(angular.isObject(expressCOData)) {
            			if(expressCOData.hasOwnProperty("ShippingAddress")) {
            				$rootScope.expressShipping = expressCOData.ShippingAddress;
            			}
            			if(expressCOData.hasOwnProperty("BillingAddress")) {
            				$rootScope.expressBilling = expressCOData.BillingAddress;
            			}
            		}


            	}
                //	alert($rootScope.expressShipId);

                // Save Credit Card Info for Auto-Selecting Later Congwen
                if(angular.isObject(data.ProfileResponse.ExpressCheckOut)
                    && angular.isObject(data.ProfileResponse.ExpressCheckOut)) {
                    $rootScope.expressPayMethod = data.ProfileResponse.ExpressCheckOut.PaymentMethod;
                }
            }
		}).error(function(data){
		    //console.log('Error Viewing Profile with the url \n' + url);
		});
    };
    return viewProfile;
}]);

WLCC.factory('userRegistration',['$rootScope', '$q', '$http', function($rootScope, $q, $http){
    var userRegistration = {};

    userRegistration.register = function(password){
        var url = userRegistration_url;

        userRegistration.postArrayVars = {
            "in_sessionKey" : $rootScope.token,
            "in_billingAddressId" : $rootScope.selectedBillingAddressId,
            "in_memberId": "",
            "in_orderId": $rootScope.orderId,
            "in_loginId": $rootScope.enteredEmail,
            "in_logonPassword": password,
            "in_zipCode": $rootScope.zipcode,
            "in_fromPage": "ThankyouPage",
        };
//        //console.log(JSON.stringify(userRegistration.postArrayVars));
        userRegistration.postArrayVars = $rootScope.addOmnitureParams(userRegistration.postArrayVars, "Review Order"); // it should be confirmation or thank you page but no such option was given by minal
        userRegistration.postArrayVars = $rootScope.storeInfo.storeKeyCart(userRegistration.postArrayVars);
        //console.log('firing User Registration with userRegistration.postArrayVars: ');//console.log(userRegistration.postArrayVars);        

        $http({
            url: url,
            method: 'POST',
            data:  userRegistration.postArrayVars,
            transformRequest: function(data){
        		return $.param(data);
        	},
        }).success(function(data){
                //console.log('User Registration: Success');
                //console.log(data);
                $rootScope.userType = "registered";

            }).error(function(data){
            	
                //console.log('User Registration: Failure');
            });
    }
    return userRegistration;
}]);





WLCC.factory('omnitureTagging',['$rootScope', '$q', '$http', function($rootScope, $q, $http){
    var omnitureTagging = {};

    omnitureTagging.tag = function(tagAction, page, param){
    	/*********** possible values ***********/
    	// OmnitureCartlevelPriceBreakdown //yes
    	// OmnitureItemlevelPriceBreakdown //yes
    	// OmnitureViewEnlargedProductImage // yes
    	// OmnitureSaveExpressCheckoutDetails // yes
    	// OmnitureWeekendDelivery // yes
    	// OmnitureClickSYWLogo
    	// OmniturePageError
    	// OmniturePageView
    	// OmnitureProductDetailsPage
    	// OmnitureMultipleShippingAddresses
    	
        var url = servlet_url + "Omniture/" + tagAction + "?";
        var postArrayVars = { "partNumber" : localStorage.pOmnNum };
        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, page);
        if(tagAction == "OmniturePageView"){
        	
        	if($rootScope.swyNumb != undefined){
        		postArrayVars.isSywrMember ="true";
        	}else{
        		postArrayVars.isSywrMember ="false";
        	}
        		
        	
        	if($rootScope.isExpress){
        		postArrayVars.isExpressCheckout = "true";//$rootScope.isExpress;
        	}else{
        		postArrayVars.isExpressCheckout = "false";
        	}
        }
        else if(tagAction == "OmniturePageError"){
        	 postArrayVars.errorType = param;
        }else if(tagAction == "OmnitureProductDetailsPage"){
        	postArrayVars.partNumber = param;
        }else if(tagAction == "OmnitureOrderConfirmation" && page == "Order Confirmation"){
        	postArrayVars.productList = $rootScope.omnitureConfirmationDataToSent;
        	postArrayVars.orderId = $rootScope.orderId;
        	
        	if($rootScope.country){
        		postArrayVars.country = $rootScope.country;
        	}else{
        		postArrayVars.country = "US";
        	}
        	if($rootScope.isExpress){
        		postArrayVars.isExpressCheckout = "true";
        	}else{
        		postArrayVars.isExpressCheckout = "false";
        	}
        	
        	if($rootScope.reviewPayment.GiftCardValue){
        		postArrayVars.giftFlag = "true";
        	}else{
        		postArrayVars.giftFlag = "false";
        	}
        	
        	postArrayVars.sywrFlag = "false";
        	
        	if($rootScope.reviewPayment.CardNumber != undefined){
        		postArrayVars.state = $rootScope.reviewPayment.Address.State;
        		postArrayVars.in_zipCode = $rootScope.reviewPayment.Address.Zipcode;
        		if($rootScope.reviewPayment.CardType){
        			postArrayVars.ccBrand = $rootScope.reviewPayment.CardType;
        		}else{
        			postArrayVars.ccBrand = "PayPal";
        		}
        	}
        }
       
       
//        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log("tagAction: " + tagAction);
        //console.log('Omniture postArrayVars: ');//console.log(postArrayVars);        

        $http({
            url: url,
            method: 'GET',
            params:  postArrayVars
        }).success(function(data){
        	//console.log('Omniture : Success');
        }).error(function(data){
        	//console.log('Omniture : Failure');
        });
    }
    
    return omnitureTagging;
}]);


WLCC.factory('eCoupons', ['$rootScope', '$q', '$http', function($rootScope, $q, $http){
    var eCoupons = {};
    eCoupons.getSavedOffers = function(){
    	if(localStorage.cartStore == "kmart"){
    		theStoreNumber = "7800";
    	}else{
    		theStoreNumber = "9300";
    	}
    	
    	
        var arrVars ={
        		"channel":"sears.com", // localStorage.cartStore
        		"userId":$rootScope.swyNumb,
        		"client":"pdp",
        		"storeNumber": theStoreNumber,
        		"fields":"+offers.coupons",
        		"includes":"savedOffers",
        		"products":[],	
        		
        }	
        		
        		
//            in_sessionKey: $rootScope.token,
//            in_channel: "sears.com",//'i.syw.com', //android.syw.com   depending upon whether it  is android or ios
//            in_client: 'sywdc',
//            in_status: 'all',
//            in_offerSource: encodeURI('TI,HC,HD'),
//            in_action: 'save',
        
        
      for(x in $rootScope.items){
    	  arrVars.products.push({"productId": $rootScope.items[x].DisplayPartNumber });
      }      
        		
//        
//        if($rootScope.swyNumb){
//        	 arrVars.in_sywrNumber = $rootScope.swyNumb;
//        }else{
//        	arrVars.in_sessionKey = $rootScope.token;
//        }
       
        var string = JSON.stringify(arrVars);
        arrVars = $rootScope.storeInfo.storeKeyCart(arrVars);
        //console.log('firing eCoupon GetSavedOffers with arrVars: ');//console.log(arrVars);
        $http({
            url: getCouponOffers_url,//+ "?in_paramObject=" + string,//eCoupon_getSaved_url,
//        	url: "http://offersapivip.prod.ch3.s.com:8780/offersapi/r/v1/ecoupons/product-offers",
            method: 'POST',
            data: {in_paramObject : string}, //arrVars,
            transformRequest: function(data){
        		return $.param(data);
        	},
        }).success(function(data){
            //console.log('**GetSavedOffers Ecoupons Success:'); //console.log(data);
            if ($.isEmptyObject(data)){
                $location.path(dynamicCartView +'cart/error')
                //console.log("eCoupon GetSavedOffers Empty Response")
            }
            else{
                if(data.success == true && data.couponCount > 0 ){//data.offers != undefined && data.offers != "" && ){
                    $rootScope.eCouponsData = $rootScope.objToArray(data.offers);
                    $rootScope.eCoupons = [];
                    for(y in  $rootScope.eCouponsData){
                        if($rootScope.eCouponsData[y].coupons != undefined){
                            for(z in $rootScope.eCouponsData[y].coupons){
                                $rootScope.eCoupons.push($rootScope.eCouponsData[y].coupons[z]);
                            }
                        }
                    }

                    if($rootScope.cartCoupons != undefined){
                        var string = $rootScope.appliedCoupons.toString();
                        for(m in $rootScope.eCoupons){
                            if(string.indexOf($rootScope.eCoupons[m].cso) != -1){
                                $rootScope.eCoupons[m].applied = true;
                                $rootScope.eCoupons[m].message = "";
                            }
                        }
                    }

//            	 //console.log($rootScope.eCoupons);
//            	 for(c in $rootScope.eCoupons){
//            		 $rootScope.thiscouponErrorMessage.push("");
//            	 }
//
                }else{
                    $rootScope.noOffers = "true";
                }

                //console.log(JSON.stringify(data));
            }

        }).error(function(data){
            //console.log('**GetSavedOffers Ecoupons Failure:');
            //console.log(JSON.stringify(data));
        })
    };

 eCoupons.applySavedOffers = function(couponCode, index, couponType){
	 eCoupons.deferred = $q.defer();
        var arrVars ={
        		in_sessionKey: $rootScope.token,
                in_orderId: $rootScope.orderId,
                in_action : "add",
                in_couponType : "C",
                in_isEcoupon : "Y",
                in_promocode :couponCode,
        }
        arrVars = $rootScope.storeInfo.storeKeyCart(arrVars);
        //console.log('firing eCoupon GetSavedOffers with arrVars: ');//console.log(arrVars);
        $http({
            url: applyOrRemoveCoupons_url,
            method: 'GET',
            params: arrVars,
        }).success(function(data){
            //console.log(JSON.stringify(data));
            if ($.isEmptyObject(data)){
                $location.path(dynamicCartView +'cart/error')
                //console.log("eCoupon GetSavedOffer Empty Response")
            } else{
                if(data.ApplyOrRemoveCouponsView != undefined){
                    $rootScope.thiscouponSavings = data.ApplyOrRemoveCouponsView.ApplyOrRemoveCoupons.CurrentCouponSavings;

                    if(couponType != "promo"){
                        if($rootScope.thiscouponSavings != undefined && $rootScope.thiscouponSavings != ""){
                            $rootScope.eCoupons[index].applied = true;
                            $rootScope.eCoupons[index].message = "";
                        }else{
                            $rootScope.eCoupons[index].applied = false;
                            $rootScope.eCoupons[index].message = "This coupon does not apply";
                        }
                    }else{
                        $rootScope.promoErrorCodeMessage = "";
                    }

                    //console.log('Success:');
                }
                eCoupons.deferred.resolve(data);
            }

        }).error(function(data){
        	 eCoupons.deferred.reject(data)
            //console.log('Failure:');
            //console.log(JSON.stringify(data));
        })
    };
    
 eCoupons.removeSavedOffers = function(couponCode, index){
	 eCoupons.deferred = $q.defer();
        var arrVars ={
            in_sessionKey: $rootScope.token,
            in_orderId: $rootScope.orderId,
            in_action : "remove",
            in_couponType : "C",
            in_isEcoupon : "Y",
            in_promocode :couponCode,
        }
        arrVars = $rootScope.storeInfo.storeKeyCart(arrVars);
        //console.log('firing eCoupon GetSavedOffers with arrVars: ');//console.log(arrVars);
        $http({
            url: applyOrRemoveCoupons_url,
            method: 'GET',
            params: arrVars,
        }).success(function(data){
            if ($.isEmptyObject(data)){
                $location.path(dynamicCartView +'cart/error')
                //console.log("eCoupon GetSavedOffer Empty Response")
            } else{
                //console.log('**Remove Ecoupons Success:');
                //console.log(JSON.stringify(data));
                eCoupons.deferred.resolve(data);
//                if(couponType != "promo"){
//            	$rootScope.eCoupons[index].message = "";
//            	$rootScope.eCoupons[index].applied = false;
//              }
            }
//
        }).error(function(data){
        	 eCoupons.deferred.reject(data)
            //console.log('**Remove Offers Ecoupons Failure:');
            //console.log(JSON.stringify(data));
        })
    };
    
//    eCoupons.removeOffer = function(){
//        var arrVars ={
//            in_sessionKey: $rootScope.token,
//            in_channel: 'i.syw.com', //android.syw.com   depending upon whether it  is android or ios
//            in_client: 'sywdc',
//            in_offerUuid: '2ee7e910-bd6a-4457-9bef-91d5d9c33a58', //(Uniquely Defines an offer e.g. 2ee7e910-bd6a-4457-9bef-91d5d9c33a58)
//        }
//        arrVars = $rootScope.storeInfo.storeKeyCart(arrVars);
//        $http({
//            url: eCoupon_removeOffer_url,
//            method: 'DELETE',
//            params: arrVars
//        }).success(function(data){
//                //console.log('**RemoveOffer Ecoupons Success:');
//                //console.log(JSON.stringify(data));
//            }).error(function(data){
//                //console.log('**RemoveOffer Ecoupons Failure:');
//                //console.log(JSON.stringify(data));
//            })
//    }
    return eCoupons;
}]);




WLCC.factory('clearVariables', ['$rootScope', function($rootScope){
    var clearVariables = {};
    clearVariables.clear= function(){
		$rootScope.selectedBillingAddressId = "";
		$rootScope.addressList = new Array();
		$rootScope.continueShippingCheckout = undefined;
		$rootScope.continueShippingCheckout = {
				addressId : new Array(),
				shipModeId: new Array(),
				shippingQuantities: new Array(),
				shippingOrderItemIds: new Array(),
		};
		$rootScope.continueDeliveryCheckout = undefined;
		$rootScope.continueDeliveryCheckout = {
				addressId : "",
				shipModeId: new Array(),
				deliveryQuantities: new Array(),
				deliveryOrderItemIds: new Array(),
		};
		$rootScope.removeExpressUI = false;
//		$rootScope.selectedDeliveryType = "";
//		$rootScope.selectedDeliveryCharge = "";
		$rootScope.expandedStatus = undefined;
		$rootScope.notVisited = undefined;
//		$rootScope.continueCheckoutResponse = undefined;
//		$rootScope.proceedToCheckoutResponse = undefined;
		$rootScope.selectedCreditCardInfo = undefined;
		$rootScope.selectedCreditCardIndex = undefined;
    }
    return clearVariables;
}]);


WLCC.factory('sessionVariables', ['$rootScope', function($rootScope){
    var sessionVariables = {};
    
    sessionVariables.setSessionVariables= function(){
 
		if($rootScope.getUrlVar("token") != undefined){
			sessionVariables.getFromUrl();
		}else if(localStorage.token != undefined){
			sessionVariables.getFromLocalStorage();
		}else if((window.getSession()).sessionKey != undefined){
			sessionVariables.getFromSessionMethod();
		}else{
			//console.log("ERROR: no sessionKey found!");
		}
		
    }
    
    sessionVariables.clearSessionVariables= function(){
		$rootScope.token = undefined;
		$rootScope.zipcode = undefined;
		$rootScope.userType = undefined;
		$rootScope.isExpress = undefined;
		
		localeStorage.removeItem("token");
		localeStorage.removeItem("zipcode");
		localeStorage.removeItem("userType");
		localeStorage.removeItem("isExpress");
    }
    
    sessionVariables.getFromUrl= function(){
    	//console.log($rootScope.getUrlVar("payPal"));
    	if($rootScope.getUrlVar("payPal") == "true") {
    		$rootScope.payPalRan = true;
			$rootScope.token = $rootScope.getUrlVar("sessionKey");
			$rootScope.userType = $rootScope.getUrlVar("userType");
			$rootScope.zipcode = $rootScope.getUrlVar("zipcode");
			$rootScope.isExpress = ($rootScope.getUrlVar("isExpress") == "true" || $rootScope.getUrlVar("isExpress") == true) ? true : false;
			$rootScope.orderId = localStorage.getItem("WLCCPayPalOrderId");
			$rootScope.selectedBillingAddressId = localStorage.getItem("WLCCPayPalSelectedBillingAddressId");
			$rootScope.omniturePartNumbers = localStorage.getItem("WLCCOmniturePartNumber");
//				localStorage.setItem("payPalToken", $rootScope.getUrlVar("token"));
			if($rootScope.getUrlVar("PayerID") != undefined && $rootScope.getUrlVar("PayerID") != null) {
				$rootScope.payPalToken = $rootScope.getUrlVar("token")
				$rootScope.payPalPayerId = $rootScope.getUrlVar("PayerID");
			  
			}
			
//    				localStorage.setItem("token", $rootScope.getUrlVar("sessionKey"));
//    				localStorage.userType = $rootScope.getUrlVar("userType");
//    				localStorage.zipcode = $rootScope.getUrlVar("zipcode");


    	}else{
     			
     			$rootScope.token = $rootScope.getUrlVar("token");
                $rootScope.userType = $rootScope.getUrlVar("userType");
    			$rootScope.zipcode = $rootScope.getUrlVar("zipcode");
    			$rootScope.isExpress = ($rootScope.getUrlVar("isExpress") == "true" || $rootScope.getUrlVar("isExpress") == true) ? true : false;
//        				localStorage.setItem("token", $rootScope.getUrlVar("token"));
//        				localStorage.userType = $rootScope.getUrlVar("userType");
//        				localStorage.zipcode = $rootScope.getUrlVar("zipcode");


//alert($rootScope.token + ' ' +  $rootScope.userType + ' ' + $rootScope.zipcode  + ' ' +$rootScope.isExpress);

    	}
    	//console.log("DATA FROM URL: " + $rootScope.token +" "+ $rootScope.userType +" "+ $rootScope.zipcode +" "+ $rootScope.isExpress);
    }
    
    sessionVariables.getFromLocalStorage= function(){
    	$rootScope.token 		= localStorage.token;
		$rootScope.userType 	= localStorage.userType;
		$rootScope.zipcode 		= localStorage.zipcode;
		$rootScope.isExpress 	= localStorage.isExpress;
//		$rootScope.visitorId	= localStorage.vid;
		
		//console.log("DATA FROM LOCAL STORAGE: " + $rootScope.token +" "+ $rootScope.userType +" "+ $rootScope.zipcode +" "+ $rootScope.isExpress);
    }
    
    sessionVariables.getFromSessionMethod= function(){
    	var session = window.getSession();
    	
    	$rootScope.token 		= session.sessionKey;
		$rootScope.userType 	= session.userType;
		$rootScope.zipcode 		= session.zipcode;
		$rootScope.isExpress 	= session.isExpress;
		$rootScope.visitorId	= session.vid;
		
		//console.log("DATA FROM SESSION METHOD: " + $rootScope.token +" "+ $rootScope.userType +" "+ $rootScope.zipcode +" "+ $rootScope.isExpress);
    }
    
    return sessionVariables;
}]);

//WLCC.factory("expressCheckoutResolve",['$rootScope', 'viewProfile','sessionVariables','validatePageService', '$timeout', function($rootScope, viewProfile, sessionVariables, validatePageService, $timeout) {
//
//	var expressCheckoutResolve = {};
//	
//	expressCheckoutResolve.isTrueOrFalse = function(){
//     $timeout(function() {  
//       if($rootScope.isExpress  == 'true' || $rootScope.isExpress == true  && $rootScope.userType == 'R'){
//			    $rootScope.expressLogin = false;
//			    $rootScope.isExpress  = true;
//		if($rootScope.isExpress == true  && $rootScope.expressLogin == false){
//			           $('#expressCheckoutUI').removeClass('hide');
//	                   $timeout(function() {validatePageService.validateViewCart();  }, 1);
//		   }
//	     
//	     }else if($rootScope.isExpress  == 'true' || $rootScope.isExpress == true  && $rootScope.userType == 'G'){
//
//	            $rootScope.isExpress  = true;
//				$rootScope.expressLogin = true;
//				$timeout(function() {validatePageService.validateViewCart();  }, 200);
//		}else{
//			      $rootScope.isExpress  = false;
//			     
//	         } 
//	
//	      }, 1000);
//	    };
//    
//    
//    expressCheckoutResolve.expressFlow = function(){
//	
//			$timeout(function() {validatePageService.validateFulfillment(); }, 200);
//		    $timeout(function() {validatePageService.validateFulfillment(); }, 200);	    
//     };
//	
//
//
//    return expressCheckoutResolve;
//}]);

WLCC.factory("SYWRService", ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {
	var SYWRService = {};
	
	SYWRService.redeemSYWR = function(operationMode) { 
		var postArrayVars = {
			in_orderId		    : $rootScope.orderId,
			in_userType 	    : $rootScope.userType,
			in_billingAddressId : $rootScope.selectedBillingAddressId,
			in_orderAmount		: $rootScope.orderTotal,
			in_sessionKey		: $rootScope.token,
			in_Operation		: operationMode, //apply to "add", "remove", "edit"
			in_SywrAmt			: "", //apply to "edit"
			in_SywrCardNumber	: "", //apply to "add", "remove", "edit"
			in_SywrPinNumber	: "", //apply to "add", "remove", "edit"
			in_sywrRegisteredMemberId : "", //apply to "remove", 
			
		};
		
		postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
		var url = "";
		
		$http({
			method: "POST",
			url: url,
			params: postArrayVars,
		}).success(function(data){

			//console.log("Successfully redeemSYWRAdd");
			//console.log(data);
		}).error(function(data){
			//console.log("Failed redeemSYWRAdd");
			//console.log(data);
		});
	};
	
	return SYWRService;
}]);


WLCC.factory("carouselImages",['$rootScope', '$q', '$http', 'viewProfile',  function($rootScope, $q, $http, viewProfile){
    var carouselImages = {};
//    carouselImages.deferred = $q.defer();

    carouselImages.products = function() {
//        $rootScope.ajaxPending = true;
        var pArray = localStorage.pOmnNum.split(";")
        for(x in pArray){
        	if(pArray[x].indexOf($rootScope.carouselPartNum) != -1 ){
        		var thePartNumber = pArray[x];
        	}
        }
        
        var postArrayVars = {
        		 "in_items"         : thePartNumber,
                 "in_location"       : "mobile_checkout",
        };
//        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing carousel Images with postArrayVars: ');//console.log(postArrayVars);


        $http({
        	  method: "GET",
              url: carouselProducts_url,
              params: postArrayVars,
        }).success(function(data) {
//        	carouselImages.deferred.resolve(data);
                //console.log("successfully carousel Images [products]");
                $rootScope.carouselProducts = data;
                //console.log(data);
                $rootScope.ajaxPending = false;
            }).error(function(data) {
//            	carouselImages.deferred.reject("failed carousel Images [products]");
                //console.log("failed carousel Images [products]");
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };
    
    
    carouselImages.offers = function() {
    	var pArray = localStorage.pOmnNum.split(";")
        for(x in pArray){
        	if(pArray[x].indexOf($rootScope.carouselPartNum) != -1 ){
        		var thePartNumber = pArray[x];
        	}
        }
//        $rootScope.ajaxPending = true;
        var postArrayVars = {
        	"in_items"         : thePartNumber,  	 
            "in_type":"DC",
            "in_sywr": $rootScope.swyNumb,
            "in_recs":"4",
            "in_upc": $rootScope.viewProfile.ProfileResponse.AddressBook.userId, //"0004740051074",
            "in_category":"1",
            "in_source":"Sears",
                 
        };
//        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing carousel Images [coupons] with postArrayVars: ');//console.log(postArrayVars);


        $http({
        	  method: "GET",
              url: carouselOffers_url,
              params: postArrayVars,
        }).success(function(data) {
//        		carouselImages.deferred.resolve(data);
                //console.log("successfully carousel Images [coupons]");
                //console.log(data);
                $rootScope.carouselOffers = $rootScope.objToArray(data);
                $rootScope.ajaxPending = false;
            }).error(function(data) {
//            	carouselImages.deferred.reject("failed [coupons]");
                //console.log("failed carousel Images [coupons]");
                //console.log(data);
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };
    
    return carouselImages;
}]);



WLCC.factory("sywCalls",['$rootScope', '$q', '$http','eCoupons', function($rootScope, $q, $http, eCoupons){
    var sywCalls = {};
//    sywCalls.deferred = $q.defer();

    sywCalls.add = function(num, pin) {
//        $rootScope.ajaxPending = true;

        
        var postArrayVars = {
        		in_orderId: $rootScope.orderId,
        		in_userType: $rootScope.userType,
        		in_billingAddressId: $rootScope.selectedBillingAddressId,
        		in_orderAmount: $rootScope.orderTotal, // $rootScope.summary.EstimatedPreTaxTotal,
        		in_SywrCardNumber:  $rootScope.swyNumb,
        		in_SywrPinNumber: pin, // ask user?
        		in_sessionKey: $rootScope.token,
        		in_Operation: "add",
        		in_pinLess: $rootScope.sywrDetails.PinLess,
        		in_sywrRegisteredMemberId :"",
        };
//        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing sywservice with postArrayVars: ');//console.log(postArrayVars);


        $http({
        	  method: "POST",
              url: sywService_url,
              data: postArrayVars,
              transformRequest: function(data){
          		return $.param(data);
              },
        }).success(function(data) {
//        	sywCalls.deferred.resolve(data);
                if ($.isEmptyObject(data)){
                    $location.path(dynamicCartView +'cart/error')
                    //console.log("Shop Your Way Empty Response")
                }
                else{
                    //console.log("successfully: sywservice");
                    $rootScope.ajaxPending = false;
                    //console.log(data);
                    if(data.CheckoutResponse.StatusData.ResponseCode == 1){
                        var message = (data.CheckoutResponse.StatusData.RespMessage).split("<");
                        $rootScope.noPointsMesssage = message[0];
                    }else{
                        $rootScope.sywApplied = "true";
                        $rootScope.noPointsMesssage= "";
                        $rootScope.orderTotal = data.CheckoutResponse.OrderSummary.OrderSummaryTotals.Total;
                        $rootScope.sywRedeemed = data.CheckoutResponse.OrderSummary.OrderSummaryTotals.Redemption;
                        if(data.CheckoutResponse.SYWRDetails != undefined){
                            $rootScope.sywrDetails = data.CheckoutResponse.SYWRDetails;
                        }
                    }
                }
            }).error(function(data) {
//            	sywCalls.deferred.reject("failed carousel Images [products]");
                //console.log("failed: sywservice");
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };
    
    
    sywCalls.remove = function(num , pin) {
    	
//        $rootScope.ajaxPending = true;
        var postArrayVars = {
        		in_orderId: $rootScope.orderId,
        		in_userType: $rootScope.userType,
        		in_billingAddressId: $rootScope.selectedBillingAddressId,
        		in_orderAmount: $rootScope.orderTotal,
        		in_SywrCardNumber:  $rootScope.swyNumb,
        		in_SywrPinNumber: pin,
        		in_sessionKey: $rootScope.token,
        		in_Operation: "remove",
                in_SYWRRegisteredMemberId: "true", // or false (from previous api syw)
                in_pinLess: $rootScope.sywrDetails.PinLess,
        };
//        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing sywservice remove with postArrayVars: ');//console.log(postArrayVars);


        $http({
        	  method: "POST",
              url: sywService_url,
              data: postArrayVars,
              transformRequest: function(data){
          		return $.param(data);
              },
        }).success(function(data) {
//        		sywCalls.deferred.resolve(data);
                if ($.isEmptyObject(data)){
                    $location.path(dynamicCartView +'cart/error')
                    //console.log("Shop Your Way Empty Response")
                }
                else{
                    //console.log("successfully: sywservice remove");
                    //console.log(data);
                    $rootScope.orderTotal = data.CheckoutResponse.OrderSummary.OrderSummaryTotals.Total;
                    $rootScope.sywRedeemed = undefined;
                    if(data.CheckoutResponse.SYWRDetails != undefined){
                        $rootScope.sywrDetails = data.CheckoutResponse.SYWRDetails;
                    }
                    $rootScope.sywApplied = "false";
                    $rootScope.ajaxPending = false;
                }
            }).error(function(data) {
//            	sywCalls.deferred.reject("failed [coupons]");
                //console.log("failed sywservice remove");
                //console.log(data);
                $rootScope.ajaxPending = false;
                $rootScope.responseFail = true;
            });
    };
    
    
    sywCalls.edit = function(num, pin) {
    	
//      $rootScope.ajaxPending = true;
      var postArrayVars = {
      		in_orderId: $rootScope.orderId,
      		in_userType: $rootScope.userType,
      		in_billingAddressId: $rootScope.selectedBillingAddressId,
      		in_orderAmount: $rootScope.orderTotal,
      		in_SywrCardNumber:  $rootScope.swyNumb,
      		in_SywrPinNumber: pin,
      		in_sessionKey: $rootScope.token,
      		in_Operation: "edit",
      		in_SywrAmt: $rootScope.orderTotal,
      		in_pinLess: $rootScope.sywrDetails.PinLess,
      };
//      postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
      postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
      //console.log('firing sywservice remove with postArrayVars: ');//console.log(postArrayVars);


      $http({
      	  method: "POST",
            url: sywService_url,
            data: postArrayVars,
            transformRequest: function(data){
        		return $.param(data);
            },
      }).success(function(data) {
//      		sywCalls.deferred.resolve(data);
              if ($.isEmptyObject(data)){
                  $location.path(dynamicCartView +'cart/error')
                  //console.log("Shop Your Way Empty Response")
              }else{
                  //console.log("successfully: sywservice remove");
                  //console.log(data);
                  if(data.CheckoutResponse.SYWRDetails != undefined){
                      $rootScope.sywrDetails = data.CheckoutResponse.SYWRDetails;
                  }
                  $rootScope.ajaxPending = false;
              }
          }).error(function(data) {
//          	sywCalls.deferred.reject("failed [coupons]");
              //console.log("failed sywservice remove");
              //console.log(data);
              $rootScope.ajaxPending = false;
              $rootScope.responseFail = true;
          });
  };
  
  
  sywCalls.fetchSywOrderTotal = function() {
//    $rootScope.ajaxPending = true;
	  if(angular.isDefined($rootScope.summary)) {
		  var postArrayVars = {
			  in_sessionKey: $rootScope.token,
			  in_orderId: $rootScope.orderId,
			  in_SubTotal: $rootScope.summary.SubTotal,
			  in_EstimatedPreTaxTotal :$rootScope.summary.EstimatedPreTaxTotal,
		  };
	//    postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
		  postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
		  //console.log('firing sywservice remove with postArrayVars: ');//console.log(postArrayVars);
		  $http({
	    	  method: "GET",
	          url: fetchSYWROrderTotal_url,
	          params: postArrayVars,
		  }).success(function(data) {
//    			sywCalls.deferred.resolve(data);
              if ($.isEmptyObject(data)){
                  $location.path(dynamicCartView +'cart/error')
                  //console.log("Shop Your Way Empty Response")
              }else{
                  //console.log("successfully: sywservice");
                  //console.log(data);

                  if(data.SYWROrderTotalResponse != undefined &&  data.SYWROrderTotalResponse.SYWROrderTotalDetails.SYWRPreTaxTotal != undefined){
                      $rootScope.summary.EstimatedPreTaxTotal = data.SYWROrderTotalResponse.SYWROrderTotalDetails.SYWRPreTaxTotal;
                  }else if(data.Error != undefined && data.SYWROrderTotalResponse.StatusData.ResponseCode == 1){
                      //console.log("ERROR");
                  }else if(data.SYWROrderTotalResponse.SYWROrderTotalDetails.SYWRMessage== "SYWR No Balance"){
                      //console.log("SYWR No Balance");
                  }

                  $rootScope.ajaxPending = false;
              }

		  }).error(function(data) {
//        		sywCalls.deferred.reject("failed [coupons]");
			  //console.log("failed sywservice remove");
			  //console.log(data);
			  $rootScope.ajaxPending = false;
			  $rootScope.responseFail = true;
		  });
	  	}
  };

sywCalls.saveSywOnCart = function(sywNum) {
  	
//  $rootScope.ajaxPending = true;
  var postArrayVars = {
		in_sessionKey: $rootScope.token,
  		in_orderId: $rootScope.orderId,
  		in_sywrNumber: sywNum//$rootScope.swyNumb,
  };
//  postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
  postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
  //console.log('firing sywservice with postArrayVars: ');//console.log(postArrayVars);


  $http({
  	  method: "POST",
        url: saveSYWRonCart_url,
        data: postArrayVars,
        transformRequest: function(data){
    		return $.param(data);
        },
  }).success(function(data) {
//  		sywCalls.deferred.resolve(data);
	  	//console.log(data);
          //console.log("successfully: saveSywOnCart");
          if ($.isEmptyObject(data)){
              $location.path(dynamicCartView +'cart/error')
              //console.log("Shop Your Way Empty Response")
          }else{
              if(data.CartResponse != undefined && data.CartResponse.StatusData.ResponseCode == 0 && (data.CartResponse.Shoppingcart.Summary.SYWRMessage).indexOf("saved successfully") != -1){
                  if(data.CartResponse.Shoppingcart.Summary.LoyaltyId != undefined && data.CartResponse.Shoppingcart.Summary.LoyaltyId != null &&  data.CartResponse.Shoppingcart.Summary.LoyaltyId != ""){
                    sywCalls.fetchSywOrderTotal(data.CartResponse.Shoppingcart.Summary.LoyaltyId);
                    $rootScope.hasSywAccountInfo = "true";
                    $rootScope.swyNumb = data.CartResponse.Shoppingcart.Summary.LoyaltyId;
                    $rootScope.swyNumb = ($rootScope.swyNumb).replace(/ /g, "");
                    $rootScope.sywAccountInfo = $rootScope.maskCCN($rootScope.swyNumb);
                    $rootScope.summary = $rootScope.removeCurrency(data.CartResponse.Shoppingcart.Summary);
                    eCoupons.getSavedOffers();
                }else{
                    if(data.CartResponse.Shoppingcart.Summary != undefined){
                        $rootScope.summary = $rootScope.removeCurrency(data.CartResponse.Shoppingcart.Summary);
                    }

                    $rootScope.hasSywAccountInfo = "false";
                }
              }else{
                  if(data.CartResponse.Shoppingcart.Summary != undefined){
                        $rootScope.summary = $rootScope.removeCurrency(data.CartResponse.Shoppingcart.Summary);
                    }
                  $rootScope.hasSywAccountInfo = "false";
              }

              $rootScope.ajaxPending = false;
          }
      }).error(function(data) {
//      	sywCalls.deferred.reject("failed [coupons]");
          //console.log("failed: saveSywOnCart");
          //console.log(data);
          $rootScope.ajaxPending = false;
          $rootScope.responseFail = true;
      });
};
    
    return sywCalls;
}]);


	WLCC.factory("applyRebate",['$rootScope', '$q', '$http','viewCartResponse', 'viewCartOrUpdateCart', function($rootScope, $q, $http, viewCartResponse, viewCartOrUpdateCart){
	    var applyRebate = {};
//	    sywCalls.deferred = $q.defer();

	    applyRebate.applyInCart = function(num, pin) {
//	        $rootScope.ajaxPending = true;

	        
	        var postArrayVars = {
	        		in_orderId: $rootScope.orderId,
	        		in_rebateSelected : "true",
	        		in_sessionKey: $rootScope.token,
	        		in_fromPage : "cart",
//	        		in_pageValue : "Delivery",
	        		
	        };
//	        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
	        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
	        //console.log('firing sywservice with postArrayVars: ');//console.log(postArrayVars);


	        $http({
	        	  method: "GET",
	              url: applyRebates_url,
	              params: postArrayVars,
	              
	        }).success(function(data) {
                    if ($.isEmptyObject(data)){
                        $location.path(dynamicCartView +'cart/error')
                        //console.log("Shop Your Way Empty Response")
                    }else{
                        viewCartResponse.viewCart();
                         viewCartResponse.deferred.promise.then(function(){
                        viewCartOrUpdateCart.updateToRootScope(viewCartResponse.json);
                         });
                    }
	            }).error(function(data) {
//	            	sywCalls.deferred.reject("failed carousel Images [products]");
	                //console.log("failed: applyInCart");
	            });
	    };
	    
	    applyRebate.applyInCheckout = function(num, pin) {
//	        $rootScope.ajaxPending = true;

	        
	        var postArrayVars = {
	        		in_orderId: $rootScope.orderId,
	        		in_rebateSelected : "true",
	        		in_sessionKey: $rootScope.token,
	        		in_fromPage : "checkout",
	        		in_pageValue : "Delivery",
	        		
	        };
//	        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shipping Cost Page");
	        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
	        //console.log('firing applyInCheckout with postArrayVars: ');//console.log(postArrayVars);


	        $http({
	        	  method: "GET",
	              url: applyRebates_url,
	              params: postArrayVars,
	             
	        }).success(function(data) {
                    if ($.isEmptyObject(data)){
                        $location.path(dynamicCartView +'cart/error')
                        //console.log("Shop Your Way Empty Response")
                    }else{

                    }
	        }).error(function(data) {
//	            	sywCalls.deferred.reject("failed carousel Images [products]");
	                //console.log("failed: applyInCheckout");
	        });
	    };
	    
	    
	    return applyRebate;
	}]);
	
	
	
	
	WLCC.factory('suiteIdSetting', ['$rootScope', function($rootScope){
	    var suiteIdSetting = {};
	    
	    suiteIdSetting.set = function(){
	    	var location = window.location.origin;
	    	if(localStorage.wlccUserAgent == "IOS"){
	    		if($rootScope.environment == "DEV"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}else if($rootScope.environment == "QA"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}else if($rootScope.environment == "LOCALHOST"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}else if($rootScope.environment == "PROD"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}
	    	}else if(localStorage.wlccUserAgent == "ANDROID"){
	    		if($rootScope.environment == "DEV"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}else if($rootScope.environment == "QA"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}else if($rootScope.environment == "LOCALHOST"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}else if($rootScope.environment == "PROD"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}
	    	}else if(localStorage.wlccUserAgent == "MWEB"){
	    		if($rootScope.environment == "DEV"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}else if($rootScope.environment == "QA"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}else if($rootScope.environment == "LOCALHOST"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}else if($rootScope.environment == "PROD"){
	    			if($rootScope.store == "kmart"){
	    				$rootScope.omSuiteIdClient = "";
	    			}else if($rootScope.store == "sears"){
	    				$rootScope.omSuiteIdClient = "";
	    			}
	    		}
	    	}
	    };
	    return suiteIdSetting;
	}]);
	    WLCC.factory('payPalService', ["$rootScope", "$http", "$q", "$location", "$timeout", "payPalParserService", "continueCheckOut", 'payBill',
function ($rootScope, $http, $q, $location, $timeout, payPalParserService, continueCheckOut, payBill) {
	var payPalService = {};
	payPalService.findCartUrl = function() {
		var path = window.location.pathname;
		var origin = window.location.origin;
		var hash = window.location.hash;
		if(window.location.hostname == "localhost") {
			this.cancelUrl = origin + path + "#/cart/viewcart" + "?sessionKey=" + $rootScope.token + "&userType=" + localStorage.getItem("userType") + "&zipcode=" + localStorage.getItem("zipcode") + "&payPal=true";
			this.returnUrl = origin + path + "#/cart/viewcart" + "?sessionKey=" + $rootScope.token + "&userType=" + localStorage.getItem("userType") + "&zipcode=" + localStorage.getItem("zipcode") + "&payPal=true";
		} else {
			this.cancelUrl = origin + path + "?sessionKey=" + $rootScope.token + "&userType=" + localStorage.getItem("userType") + "&zipcode=" + localStorage.getItem("zipcode") + "&payPal=true";
			this.returnUrl = origin + path + "?sessionKey=" + $rootScope.token + "&userType=" + localStorage.getItem("userType") + "&zipcode=" + localStorage.getItem("zipcode") + "&payPal=true";
		}
	};
	
	payPalService.findPaymentUrl = function() {
		var path = window.location.pathname;
		var origin = window.location.origin;
		var hash = window.location.hash;
		if(window.location.hostname == "localhost") {
			this.cancelUrl = origin + path + "#/cart/co_step_payment" + "?sessionKey=" + $rootScope.token + "&userType=" + localStorage.getItem("userType") + "&zipcode=" + localStorage.getItem("zipcode") + "&payPal=true";
			this.returnUrl = origin + path + "#/cart/co_step_payment" + "?sessionKey=" + $rootScope.token + "&userType=" + localStorage.getItem("userType") + "&zipcode=" + localStorage.getItem("zipcode") + "&payPal=true";
		} else {
			this.cancelUrl = origin + path + "?sessionKey=" + $rootScope.token + "&userType=" + localStorage.getItem("userType") + "&zipcode=" + localStorage.getItem("zipcode") + "&payPal=true" + hash;
			this.returnUrl = origin + path + "?sessionKey=" + $rootScope.token + "&userType=" + localStorage.getItem("userType") + "&zipcode=" + localStorage.getItem("zipcode") + "&payPal=true" + hash;
		}
	}
	
	payPalService.checkoutPayPal = function(){
		$rootScope.ajaxLoader = true;
		this.findCartUrl();
		var url = proceedCheckoutPaypal_url;
		var postArrayVars = {
			in_sessionKey     : $rootScope.token,
			in_arrival_method : $rootScope.arrivalMethods,
			in_orderItemId    : $rootScope.orderItemIds,
			in_orderId        : $rootScope.orderId,
			in_userType       : $rootScope.userType,
			in_payPal         : "Y",
			in_mobileCancelURL: payPalService.cancelUrl,
			in_mobileReturnURL: payPalService.returnUrl,
		};
		postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
		postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Paypal checkoutPayPal with postArrayVars: ');//console.log(postArrayVars);
        //console.log(url + "?" + $.param(postArrayVars));
		$http({
			url: url,
			method: "POST",
			data: postArrayVars,
			transformRequest: function(data){
				return $.param(data);
			},
		}).success(function(data){
			//console.log('proceed to checkout Paypal 1');
			//console.log(data);
			if(angular.isDefined(data.PayPalRedirectView)) {
				payPalParserService.parseRedirect(data);
				payPalService.directToThirdParty();
			} else if(angular.isDefined(data.CheckoutResponse) || angular.isDefined(data.CartResponse)) {
				payPalParserService.parseSCP(data);
				$rootScope.ajaxLoader = false;
			} else if(angular.isDefined(data.StorePickUp)) {
				if(data.StorePickUp.StatusData.RespMessage == $rootScope.responseMessage.invokeStorePickupContinue) {
					$rootScope.ajaxLoader = false;
					$rootScope.cartError =  $rootScope.responseMessage.selectStore;
				}
			}
			
		}).error(function(data){
			//console.log('failure');
			//console.log(data);
		});
	};
	 
	payPalService.directToThirdParty = function() {
		var url = "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&" +
		"&token=" + $rootScope.payPalToken + 
		"&orderId=" + $rootScope.payPalOrderId + 
		"&storeId=" + $rootScope.payPalStoreId +
		"&catalogId=" + $rootScope.payPalCatalogId;
		 
		//console.log(url);
		window.open(url, "_self");
	};
	 
	payPalService.SCPayPal = function() {
		$rootScope.ajaxLoader = true;
		var url = SCPaypal_url;
		var postArrayVars = {
			in_token: $rootScope.payPalToken,
			in_payerId: $rootScope.payPalPayerId,
			in_orderId: $rootScope.orderId,
			in_sessionKey: $rootScope.token,
		};
		postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
		postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
		//console.log('firing Paypal SCPayPal with postArrayVars: ');//console.log(postArrayVars);
		 
		//console.log(url + "?" + $.param(postArrayVars));
		$http({
			url: url,
			method: "POST",
			data: postArrayVars,
			transformRequest: function(data){
				return $.param(data);
			},
		}).success(function(data){
			//console.log('~~~~~~~SCP Paypal~~~~~~');
			//console.log(JSON.stringify(data));
			//console.log(data);
			payPalParserService.parseSCP(data);
//			payPalService.directToThirdParty();
		}).error(function(data){
			//console.log('failure');
			//console.log(data);
		});
	};
	
	payPalService.expressPayBill = function() {
		payPalService.expressPayBillDeferred = $q.defer();
//		$rootScope.ajaxLoader = true;
    	//console.log('will pay using express paypal');
    	var url = payBillPayPal_url;
    	var postArrayVars = {
			in_sessionKey       : $rootScope.token,
			in_userType         : $rootScope.userType,
			in_orderId          : $rootScope.orderId,
			in_payMethod        : "PayPal",
			in_cc_brand         : "PayPal",
			in_totalAmount      : $rootScope.orderTotal,                    /**need to change**/ //have to check the response 
			in_billingAddressId : $rootScope.selectedBillingAddressId, /**need to change**/ //have to check the response 
			in_savedCardSelected: "N",
			in_email1           : $rootScope.enteredEmail, //possibly need modifcation
			in_email2           : $rootScope.enteredEmail2, //possibly need modifcation
    	};
    	postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Paypal PayBill with postArrayVars: ');//console.log(postArrayVars);
    	$http({
    		url: url,
    		method: "POST",
    		data: postArrayVars,
    		transformRequest: function(data){
    			return $.param(data);
    		}
    	}).success(function(data){
    		//console.log("paypal express paybill succeeded");
//    		//console.log(JSON.stringify(data));
    		//console.log(data);
    		payPalService.expressPayBillDeferred.resolve(data);
    	}).error(function(data){
    		//console.log("paypal express paybill failed");
    		//console.log(data);
    		payPalService.expressPayBillDeferred.resolve(data);
//    		$rootScope.ajaxLoader = false;
    	});
	};
	
	payPalService.nonExpressPayBill = function() {
		$rootScope.ajaxLoader = true;
		this.findPaymentUrl();
		//console.log('will pay using non-express paypal');
    	var url = payBillPayPal_url;
    	var postArrayVars = {
			in_sessionKey       : $rootScope.token,
			in_userType         : $rootScope.userType,
			in_orderId          : $rootScope.orderId,
			in_payMethod        : "PayPal",
			in_cc_brand         : "PayPal",
			in_totalAmount      : $rootScope.orderTotal,                    /**need to change**/ //have to check the response 
			in_billingAddressId : $rootScope.selectedBillingAddressId, /**need to change**/ //have to check the response 
			in_savedCardSelected: "N",
			in_email1           : $rootScope.enteredEmail, //possibly need modifcation
			in_email2           : $rootScope.enteredEmail2, //possibly need modifcation
//			in_returnUrl        : "http://localhost:8081/WLCC_BETA_v1.04/testInterface.html#/cart/viewcart?sessionKey=" + $rootScope.token + "&userType=" + localStorage.getItem("userType") + "&zipcode=" + localStorage.getItem("zipcode") + "&payPal=true",
//			in_cancelUrl        : "http://localhost:8081/WLCC_BETA_v1.04/testInterface.html#/cart/viewcart?sessionKey=" + $rootScope.token + "&userType=" + localStorage.getItem("userType") + "&zipcode=" + localStorage.getItem("zipcode") + "&payPal=true",
			in_returnUrl		: payPalService.returnUrl,
			in_cancelUrl		: payPalService.cancelUrl,
    	};
    	postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Paypal PayBill with postArrayVars: ');//console.log(postArrayVars);
        //console.log(payBillPayPal_url + "?" + $.param(postArrayVars));
    	$http({
    		url: url,
    		method: "POST",
    		data: postArrayVars,
    		transformRequest: function(data){
    			return $.param(data);
    		}
    	}).success(function(data){
    		//console.log("paypal nonExpress paybill succeeded");
    		//console.log(JSON.stringify(data));
    		//console.log(data);
    		if(angular.isDefined(data.PayPalRedirectView)) {
    			localStorage.setItem("WLCCPayPalSelectedBillingAddressId", $rootScope.selectedBillingAddressId);
    			localStorage.setItem("WLCCPayPalOrderId", $rootScope.orderId);
    			localStorage.setItem("WLCCOmniturePartNumber", $rootScope.omniturePartNumbers);
//    			localStorage.setItem("WLCCPayPalContinueCheckoutResponse", JSON.stringify($rootScope.continueCheckoutResponse));
    			payPalParserService.parseRedirect(data);
    			payPalService.directToThirdParty();
    		} else if(angular.isDefined(data.CheckoutResponse)) {
    			if(data.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.payBill) {
    				$rootScope.checkoutError = $rootScope.responseMessage.payPalIneligible;
    			} else if(data.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.placeOrder) {
    				$rootScope.payPalStraightToPlaceOrder = true;
    				payPalService.fetchOrderDetailDeferred = $q.defer();
    				payPalService.fetchOrderDetailDeferred.resolve(data);
    				$timeout(function(){ $("a[validate-page]").trigger("handleTrigger"); }, 0);
//    				payBill.payBillParsing(data);
//    				$location.path(dynamicCartView + '/cart/co_step_review');
    			}
    			$rootScope.ajaxLoader = false;
    		}
    	}).error(function(data){
    		//console.log("paypal nonExpress paybill failed");
    		//console.log(JSON.stringify(data));
    		//console.log(data);
    	});
	};
	
	payPalService.fetchOrderDetail = function() {
		$rootScope.ajaxLoader = true;
		payPalService.fetchOrderDetailDeferred = $q.defer();
//		$rootScope.payPalPayerId = $rootScope.getUrlVar("PayerID");
//		$rootScope.payPalToken = $rootScope.getUrlVar("token");
//		$rootScope.orderId = localStorage.getItem("WLCCPayPalOrderId");
//		$rootScope.selectedBillingAddressId = localStorage.getItem("WLCCPayPalSelectedBillingAddressId");
//		localStorage.removeItem("WLCCPayPalSelectedBillingAddressId");
//		localStorage.removeItem("WLCCPayPalOrderId");
		var url = payPalFetchOrderDetail_url;
		
		var postArrayVars = {
			in_sessionKey        : $rootScope.token,
			in_token             : $rootScope.payPalToken,
			in_payerId           : $rootScope.payPalPayerId,
			in_orderId           : $rootScope.orderId,
			in_billingAddressId  : $rootScope.selectedBillingAddressId,
			in_QuickCheckoutFlow : "N",
		};
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log(url + "?" + $.param(postArrayVars));
		postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
        //console.log('firing Paypal Fetch order detail with postArrayVars: ');//console.log(postArrayVars);
        
		$http({
			url: url,
			method: "POST",
			data: postArrayVars,
			transformRequest: function(data) {
				return $.param(data);
			}
		}).success(function(data) {
			//console.log("paypal nonExpress fetchOrder succeeded");
			//console.log(JSON.stringify(data));
    		//console.log(data);
    		payPalService.fetchOrderDetailDeferred.resolve(data);
//    		payPalParserService.parseFetchOrderDetail(data);
//			$rootScope.ajaxLoader = false;

		}).error(function(data) {
			//console.log("paypal nonExpress fetchOrder failed");
			//console.log(JSON.stringify(data));
			//console.log(data);
			payPalService.fetchOrderDetailDeferred.resolve(data);
//			$rootScope.ajaxLoader = false;
		});
	};
	
	payPalService.expressPlaceOrder = function() {
		payPalService.placeOrderDeferred = $q.defer();
		$rootScope.ajaxLoader = true;
		var url = placeOrderPayPal_url;
        var postArrayVars = {
       		 in_sessionKey       : $rootScope.token,
             in_userType         : $rootScope.userType, // R or G
             in_cc_brand         : "PayPal",
             in_totalAmount      : $rootScope.orderTotal, // total ammount for the order
             in_orderId          : $rootScope.orderId, //
             in_orderItemId      : $rootScope.payBillOrderItemIds, // comma separated
             in_billingAddressId : $rootScope.selectedBillingAddressId, // billing address id for the order
//             in_payPalAddressId  : "",  /** need modification **/ //coming from paybill response of paypal
        };
//        postArrayVars = $rootScope.addOmnitureParams(postArrayVars, "Shopping Cart");
        postArrayVars = $rootScope.storeInfo.storeKeyCart(postArrayVars);
        //console.log('firing Paypal Place Order with postArrayVars: ');//console.log(postArrayVars);
        //console.log(url + "?" + $.param(postArrayVars));
        $http({
			method: "POST",
			url: url,
			data: postArrayVars,
			transformRequest: function(data){
				return $.param(data);
			},
       }).success(function(data){
    	   //console.log("Paypal place order succeeded")
    	   //console.log(data);
    	   $rootScope.ajaxLoader = false;
    	   $rootScope.confirmationData = data;
    	   payPalService.placeOrderDeferred.resolve(data);
       }).error(function(data){
           //console.log("Paypal Place Order: failed");
           //console.log(data);
           $rootScope.ajaxLoader = false;
           payPalService.placeOrderDeferred.resolve(data);
           $rootScope.responseFail = true;
       });
	};
	
	return payPalService;
}]);

WLCC.factory('payPalParserService', ["$rootScope", "$location", "$timeout", 'payBill', 'proceedToCheckoutParsing', 'premiumDeliveryChargeService', 
function ($rootScope, $location, $timeout, payBill, proceedToCheckoutParsing, premiumDeliveryChargeService) {
	payPalParserService = {};
	
	payPalParserService.parseRedirect = function(data) {
		$rootScope.payPalToken = data.PayPalRedirectView.PayPalResponse.Token;
		$rootScope.payPalCatalogId = data.PayPalRedirectView.PayPalResponse.catalogId;
		$rootScope.payPalStoreId = data.PayPalRedirectView.PayPalResponse.storeId;
		$rootScope.payPalOrderId = data.PayPalRedirectView.PayPalResponse.orderId;
	};
	
	payPalParserService.parseSCP = function(data) {
		if(angular.isDefined(data.CheckoutResponse)) {
			$rootScope.invokePayPalCO = true;
//			proceedToCheckoutParsing.parseData(data);
			if(data.CheckoutResponse.StatusData.RespMessage != $rootScope.responseMessage.login && data.CheckoutResponse.StatusData.RespMessage != $rootScope.responseMessage.sessionInvalid) {
				$rootScope.proceedToCheckoutResponse = data;
				$("a[validate-page]").trigger("handleTrigger");
			} else {
				$("#signInModal").trigger("loginHandler");
				$rootScope.ajaxLoader = false;
			}
		} else if(angular.isDefined(data.CartResponse)) {
			var cartErrorMsg = data.CartResponse.Shoppingcart.CartErrorMessage;
			if(angular.isDefined(cartErrorMsg) && cartErrorMsg != "") {
				$rootScope.cartError = cartErrorMsg;
			}
			$rootScope.ajaxLoader = false;
		} else {
			$rootScope.cartError = $rootScope.responseMessage.payPalIneligible
			$rootScope.ajaxLoader = false;
		}
	};
	
	payPalParserService.parseFetchOrderDetail = function(data) {
		
//		$rootScope.payPalStraightToPlaceOrder = true;
		if(angular.isDefined(data.CheckoutResponse) && data.CheckoutResponse.StatusData.RespMessage  == $rootScope.responseMessage.placeOrder) {
			$rootScope.fetchOrderDetailData = data;
			payBill.payBillParsing(data);
			$location.path(dynamicCartView + '/cart/co_step_review');
		} else {
			$rootScope.checkoutError = $rootScope.responseMessage.payPalIneligible;
		}
//		$("a[validate-page]").trigger("handleTrigger");
	};
	
	return payPalParserService;
}]);WLCC.factory('productOptionService', ['$rootScope', 'viewCartOrUpdateCart', function($rootScope, viewCartOrUpdateCart) {
	var productOptionService = {};
	
	productOptionService.ajaxArray = {
			in_orderId : "",
			in_sessionKey : "",
			in_userType : "",
			in_orderItemId : "", 
			in_lineItemTypeSC : "",
			in_poItemType : "",
			in_pcatEntryId : "",
			in_questionScimCode : "",
			in_delOrderItemId : "",
			in_poQuantity : "",
	};
	productOptionService.ajaxArray = $rootScope.addOmnitureParams(productOptionService.ajaxArray, "Shopping Cart");
    productOptionService.ajaxArray = $rootScope.storeInfo.storeKeyCart(productOptionService.ajaxArray);

	productOptionService.resetParameters = function() {
		this.ajaxArray.in_lineItemTypeSC = ""; 
		this.ajaxArray.in_poItemType = ""; 
		this.ajaxArray.in_pcatEntryId = ""; 
		this.ajaxArray.in_questionScimCode = "";
		this.ajaxArray.in_delOrderItemId = "";
		this.ajaxArray.in_poQuantity = "";
	};
	
	/**==================== Specifically For Applying Installation PO ===================**/
	productOptionService.CIArray = { //CI = child Installation Options
		lineItemTypeSC: new Array(),
		poItemtype: new Array(),
		pCatEntryId: new Array(),
		poQuantity: new Array(),
//		childOrderItemId: new Array(),
	};
	
	productOptionService.addCI = function(scope) {
		this.CIArray.lineItemTypeSC = scope.$parent.installationOption.ItemType;
		this.CIArray.poItemtype.push(scope.childInstallation.ItemType);
//		this.CIArray.lineItemTypeSC.push(scope.$parent.installationOption.ItemType);
		this.CIArray.pCatEntryId.push(scope.childInstallation.pcatEntryId);
		this.CIArray.poQuantity.push("1.0");
		//console.log(productOptionService.CIArray);
	};
	
	productOptionService.removeCI = function(scope) {
		this.CIArray.poItemtype = $rootScope.removeFromArray(productOptionService.CIArray.poItemtype, scope.childInstallation.ItemType);
//		this.CIArray.lineItemTypeSC = $rootScope.removeFromArray(productOptionService.CIArray.lineItemTypeSC, scope.$parent.installationOption.ItemType);
		this.CIArray.pCatEntryId = $rootScope.removeFromArray(productOptionService.CIArray.pCatEntryId, scope.childInstallation.pcatEntryId);
		this.CIArray.poQuantity.pop();
		if(this.CIArray.poItemtype.length == 0) {
			this.CIArray.lineItemTypeSC = "";
		}
			
	};
	
	productOptionService.emptyCI = function () {
		for(i in this.CIArray) {
			this.CIArray[i] = new Array();
		}
	};
	/**==================== Specifically For Applying Haul Away PO =====================**/
	productOptionService.HAArray = {
		lineItemTypeSC : "",
		poItemtype : "",
		pCatEntryId : "",
	};
	
	productOptionService.addHA = function(scope) {
//		this.HAArray.lineItemTypeSC = "INHA";
		//console.log(scope.installationOption);
		this.HAArray.lineItemTypeSC = scope.installationOption.ItemType;
		this.HAArray.poItemtype = scope.installationOption.POItemType;
		this.HAArray.pCatEntryId = scope.installationOption.PCatEntryId;
//		//console.log(this.HAArray);
	};
		
	productOptionService.removeHA = function() {
		for(i in this.HAArray) {
			this.HAArray[i] = "";
		}
	};
	/**======================== End of Haul Away PO =====================================**/
	
	/**===================== Specifically For Applying Required Accessories PO =====================**/
	productOptionService.RAArray = {
		lineItemTypeSC : "",
		poItemType : new Array(),
		pCatEntryId : new Array(),
		poQuantity : new Array(),
	};
	
//	productOptionService.addRA = function(scope) {
	productOptionService.addRA = function(pCatEntryId) {
		this.RAArray.lineItemTypeSC = "RA";
		this.RAArray.poItemType.push("RA"); 
//		this.RAArray.pCatEntryId.push(scope.raOption.PCatEntryId);
		this.RAArray.pCatEntryId.push(pCatEntryId);
		this.RAArray.poQuantity.push("1.0");
	};
	
//	productOptionService.removeRA = function(scope, pCatEntryId) {
	productOptionService.removeRA = function(pCatEntryId) {
		if(productOptionService.RAArray.pCatEntryId.indexOf(pCatEntryId) > -1) {
			this.RAArray.pCatEntryId = $rootScope.removeFromArray(productOptionService.RAArray.pCatEntryId, pCatEntryId);
			this.RAArray.poItemType.pop();
			this.RAArray.poQuantity.pop();
		}
	};
	
	productOptionService.emptyRAArray = function() {
		this.RAArray.lineItemTypeSC = "";
		this.RAArray.poItemType = new Array();
		this.RAArray.pCatEntryId = new Array();
		this.RAArray.poQuantity = new Array();
	};
	/**======================== End of Required Accessories PO =====================================**/
	
	/**==================== Specifically For Applying Deluxe Requirement =====================**/
	productOptionService.deluxeAjaxArray = {
			lineItemTypeSC : "",
			questionScimCode : "",
		};
	
	productOptionService.addDeluxe = function(scope) {
		this.deluxeAjaxArray.lineItemTypeSC = "Deluxe";
		this.deluxeAjaxArray.questionScimCode = scope.deluxeOption.QuestionScimCode + "%7C" + scope.deluxeOption.CatGroupId;
	};
		
	productOptionService.removeDeluxe = function() {
		for(i in this.deluxeAjaxArray) {
			this.deluxeAjaxArray[i] = "";
		}
	};
	/**======================== End of Deluxe Requirement =====================================**/
	
	/**===================== Specifically For Applying Protection Agreement PO =====================**/
	productOptionService.PAArray = {
		lineItemTypeSC : "",
		pCatEntryId : "",
	};
	
	productOptionService.addPA = function(scope) {
		this.PAArray.lineItemTypeSC = "PA";
		this.PAArray.pCatEntryId = scope.paOption.PCatEntryId;
	};
	
	productOptionService.removePA = function() {
		for(i in this.PAArray) {
			this.PAArray[i] = "";
		}
	};
	/**======================== End of Protection Agreement PO =====================================**/
	
	/**===================== Specifically For Applying Protection Plan PO ==========================**/
	productOptionService.PPArray = {
			lineItemTypeSC : "",
			pCatEntryId : "",
		};
		
		productOptionService.addPP = function(scope) {
			this.PPArray.lineItemTypeSC = "PP";
			this.PPArray.pCatEntryId = scope.ppOption.PCatEntryId;
		};
		
		productOptionService.removePP = function() {
			for(i in this.PPArray) {
				this.PPArray[i] = "";
			}
		};
	/**======================== End of Protection Plan PO =========================================**/
		
	/**======================== Specifically For Applying Road Hazard PO ==========================**/
	productOptionService.RHArray = {
			lineItemTypeSC : "",
			pCatEntryId : "",
		};
		
		productOptionService.addRH = function(scope) {
			this.RHArray.lineItemTypeSC = "RH";
			this.RHArray.pCatEntryId = scope.rhOption.PCatEntryId;
		};
		
		productOptionService.removeRH = function() {
			for(i in this.RHArray) {
				this.RHArray[i] = "";
			}
		};
	/**============================= End of Road Hazard PO =========================================**/
		
	/**======================== Specifically For Applying Smart Plan PO ==========================**/
	productOptionService.SPArray = {
			lineItemTypeSC : "",
			pCatEntryId : "",
		};
		
		productOptionService.addSP = function(scope) {
			this.SPArray.lineItemTypeSC = "S";
			this.SPArray.pCatEntryId = scope.spOption.PCatEntryId;
		};
		
		productOptionService.removeSP = function() {
			for(i in this.SPArray) {
				this.SPArray[i] = "";
			}
		};
	/**============================ End of Road Hazard PO =========================================**/
	
	/**========================== Setting which category to display ===============================**/
	productOptionService.parseProductOptionType = function(productOptionObject, scope) {
		if(productOptionObject.hasOwnProperty("Installation")) {
			scope.installation = $rootScope.objToArray(productOptionObject.Installation);
		} else if(productOptionObject.hasOwnProperty("HaulAway")) {
			scope.installation = $rootScope.objToArray(productOptionObject.HaulAway);
		}
		if(productOptionObject.hasOwnProperty("ProtectionAgreements")) {
			scope.protectionAgreements = $rootScope.objToArray(productOptionObject.ProtectionAgreements);
		} 
		if(productOptionObject.hasOwnProperty("RequiredAccessories")) {
			scope.requiredAccessories = $rootScope.objToArray(productOptionObject.RequiredAccessories);
		} 
		if(productOptionObject.hasOwnProperty("ProductConfiguration")) {
			scope.deluxe = $rootScope.objToArray(productOptionObject.ProductConfiguration);
		} 
		if(productOptionObject.hasOwnProperty("SmartPlan")) {
			scope.smartPlan = $rootScope.objToArray(productOptionObject.SmartPlan);
		} 
		if(productOptionObject.hasOwnProperty("RoadHazard")) {
			scope.roadHazard = $rootScope.objToArray(productOptionObject.RoadHazard);
		} 
		if(productOptionObject.hasOwnProperty("ProtectionPlan")) {
			scope.protectionPlan = $rootScope.objToArray(productOptionObject.ProtectionPlan);
		}
	};
	/**========================== End of setting display ===============================**/
	
	productOptionService.parseHandleInstallation = function(data) {
		var itemIndex = productOptionService.matchingOrderItemId(data);
		//console.log(itemIndex);
		var itemInstallationOption = data.CartResponse.Shoppingcart.OrderItems.OrderItem[itemIndex].AvailableProductOptions.Installation;
		var installationChilds; /**There are two types, a string  or an object of child InstallationPO **/
		//console.log(itemInstallationOption)
		itemInstallationOption = $rootScope.objToArray(itemInstallationOption);
		//console.log(itemInstallationOption);
		for(i in itemInstallationOption) {
			if(itemInstallationOption[i].Description == "Yes, I need installation.") {
				$rootScope.installationItemType = itemInstallationOption[i].ItemType;
				installationChilds = itemInstallationOption[i].InstallationOptions;
				//console.log("installationChilds");
				break;
			}
		}
		return installationChilds;
	};
	
	productOptionService.matchingOrderItemId = function(data) {
		var items = $rootScope.objToArray(data.CartResponse.Shoppingcart.OrderItems.OrderItem);
		for(var i in items) {
			if(items[i].OrderItemID == $rootScope.selectedOrderItemId)
				return i;
		}
	};
	
	productOptionService.checkSelectedProductOption = function(element) {
		var itemIndex = $rootScope.selectedItemPO;
		var currentSelectedPO = $rootScope.selectedProductOption[itemIndex];
		var id = element.attr("id");
		var optionIndex = (id.indexOf("NoThanks") == -1) ? parseInt(id.charAt(id.length-1)) : -1;
		for(i in currentSelectedPO) {
			if(id.indexOf("installationOption") > -1 && currentSelectedPO[i].type == "HaulAway") {
				if(element.text().toString().indexOf("haul") > -1) {
					element.removeClass("unselected").addClass("selected");
				}
			} else if(id.indexOf("installationOption") > -1 && currentSelectedPO[i].type == "Installation") {
				if(element.text().indexOf(currentSelectedPO[i].option.Description) > -1) {
					element.removeClass("unselected").addClass("selected");
					if(angular.isDefined(currentSelectedPO[i].inputType)) {
						$(element.find("span")[0]).removeClass("ui-radio").addClass("ui-checkbox");
					}
				} 
			} else if(id.indexOf("raOption") > -1 && currentSelectedPO[i].type == "RequiredAccessories") {
				if(optionIndex == currentSelectedPO[i].index) {
					element.removeClass("unselected").addClass("selected");
				}
			} else if(id.indexOf("spOption") > -1 && currentSelectedPO[i].type == "SmartPlan") {
				if(optionIndex == currentSelectedPO[i].index) {
					element.removeClass("unselected").addClass("selected");
				}
			} else if(id.indexOf("deluxeOption") > -1 && currentSelectedPO[i].type == "ProductConfiguration") {
				if(optionIndex == currentSelectedPO[i].index) {
					element.removeClass("unselected").addClass("selected");
				}
			} else if(id.indexOf("rhOption") > -1 && currentSelectedPO[i].type == "RoadHazard") {
				if(optionIndex == currentSelectedPO[i].index) {
					element.removeClass("unselected").addClass("selected");
				}
			} else if(id.indexOf("ppOption") > -1 && currentSelectedPO[i].type == "ProtectionPlan") {
				if(optionIndex == currentSelectedPO[i].index) {
					element.removeClass("unselected").addClass("selected");
				}
			} else if(id.indexOf("paOption") > -1 && currentSelectedPO[i].type == "ProtectionAgreements") {
				if(optionIndex == currentSelectedPO[i].index) {
					element.removeClass("unselected").addClass("selected");
				}
			}
		}
		$rootScope.$broadcast("reSetUpList");
	};
	
	productOptionService.isAlreadySelected = function(pCatEntryId) {
		for(i in $rootScope.selectedProductOption) {
			for(j in $rootScope.selectedProductOption[i]) {
				if(pCatEntryId == $rootScope.selectedProductOption[i][j].option.PCatEntryId) {
					return true;
				}
			}
		}
		return false;
	};
	
	return productOptionService;
}]);

WLCC.factory("productOptionAjaxService", ['$timeout', '$rootScope', '$http', '$q', 'productOptionService', 'viewCartOrUpdateCart', function($timeout, $rootScope, $http, $q, productOptionService, viewCartOrUpdateCart) {
	productOptionAjaxService = {};

	productOptionAjaxService.reapplyPO = function(oldItem, newItem, oldItemIndex) {
    	var appliedPO = $rootScope.selectedProductOption[oldItemIndex];
    	//console.log(appliedPO);
    	productOptionService.ajaxArray.in_orderId = $rootScope.orderId;
    	productOptionService.ajaxArray.in_sessionKey = $rootScope.token;
    	productOptionService.ajaxArray.in_userType = $rootScope.userType;
    	productOptionService.ajaxArray.in_orderItemId = newItem.OrderItemID;
    	//console.log(newItem.OrderItemID);
    	var hasInstallation = false
    	for(i in appliedPO) {
    		var option = appliedPO[i].option
    		if(appliedPO[i].type == "ProtectionAgreements") {
    			productOptionService.PAArray.lineItemTypeSC = option.ItemType;
    			productOptionService.PAArray.pCatEntryId = option.PCatEntryId;
    			//console.log("readding PA");
    		} else if(appliedPO[i].type == "RequiredAccessories") {
    			productOptionService.RAArray.lineItemTypeSC = "RA";
    			productOptionService.RAArray.poItemType.push("RA");
    			productOptionService.RAArray.pCatEntryId.push(option.PCatEntryId);
    			productOptionService.RAArray.poQuantity.push("1.0");
    			$rootScope.toggledRA = true;
    			//console.log("readding RA");
    		} else if(appliedPO[i].type == "ProductConfiguration") {
    			productOptionService.deluxeAjaxArray.lineItemTypeSC = "Deluxe";
    			productOptionService.deluxeAjaxArray.questionScimCode = option.QuestionScimCode + "%7C" + option.CatGroupId;
    			//console.log("readding Deluxe");
    		} else if(appliedPO[i].type == "SmartPlan") {
    			productOptionService.SPArray.lineItemTypeSC = "S";
    			productOptionService.SPArray.pCatEntryId = option.PCatEntryId;
    			//console.log("readding SP");
    		} else if(appliedPO[i].type == "RoadHazard") {
    			productOptionService.RHArraselectedOrderItemIdy.lineItemTypeSC = "RH";
    			productOptionService.RHArray.pCatEntryId = option.PCatEntryId;
    			//console.log("readding RH");
    		} else if(appliedPO[i].type == "ProtectionPlan") {
    			productOptionService.PPArray.lineItemTypeSC = "PP";
    			productOptionService.PPArray.pCatEntryId = option.PCatEntryId;
    			//console.log("readding PP");
    		} else if(appliedPO[i].type == "HaulAway") {
    			productOptionService.HAArray.lineItemTypeSC = option.ItemType;
//    			productOptionService.HAArray.lineItemTypeSC = "INHA";
    			productOptionService.HAArray.poItemtype = "HA";
    			productOptionService.HAArray.pCatEntryId = option.PCatEntryId;
    			//console.log("readding HA");
    		} else if(appliedPO[i].type == "Installation") {
    			hasInstallation = true;
    		}
    	}
    	if(hasInstallation) {
			productOptionAjaxService.applyInstallationAddressAjax();
			productOptionAjaxService.installationDefer.promise.then(function(data) {
				$rootScope.selectedOrderItemId = newItem.OrderItemID;
				var installationChilds = productOptionService.parseHandleInstallation(data);
				if(!angular.isArray(installationChilds.installationOption)) { //unique
					installationChilds = $rootScope.objToArray(installationChilds.installationOption.childInstallationOption);
					for(var y in appliedPO) {
						for(var i in installationChilds) {
							if(appliedPO[y].type == "Installation" && appliedPO[y].option.PCatEntryId == installationChilds[i].pcatEntryId) {
								productOptionService.CIArray.lineItemTypeSC = $rootScope.installationItemType;
								productOptionService.CIArray.poItemtype.push(installationChilds[i].ItemType);
								productOptionService.CIArray.pCatEntryId.push(installationChilds[i].pcatEntryId);
								productOptionService.CIArray.poQuantity.push("1.0");
								break;
							}
						}
					}
				} else { //nonUnique
					installationChilds = installationChilds.installationOption;
					var found = false;
					for(var i in installationChilds) {
						for(var y in appliedPO) {
							if(appliedPO[y].type == "Installation" && appliedPO[y].option.PCatEntryId == installationChilds[i].pcatEntryId) {
								for(var z in installationChilds[i]) {
									if(appliedPO[y].option.PCatEntryId == installationChilds[i][z].pcatEntryId) {
										productOptionService.CIArray.lineItemTypeSC = $rootScope.installationItemType;
										productOptionService.CIArray.poItemtype.push(installationChilds[i][z].ItemType);
										productOptionService.CIArray.pCatEntryId.push(installationChilds[i][z].pcatEntryId);
										productOptionService.CIArray.poQuantity.push("1.0");
										found = true;
									}
								}
							}
						}
						if(found == true) break;
					}
				}
				productOptionAjaxService.applyInstallationAjax();
			}, function(error) {
				//console.log("Note Installation options must be re-applied");
				productOptionAjaxService.applyInstallationAjax();
			});
    	} else {
    		productOptionAjaxService.applyInstallationAjax();
    	}
    	
	};
/** ====================================== Applying Remove Product Option ===============================**/
	productOptionAjaxService.removeProductOptionAjax = function(removeSelectedPO, scope, removeMore) {
//		productOptionAjaxService.removePODeferred = $q.defer();
		$timeout(function() {$rootScope.ajaxPending = true;},0);
		
		var ajaxArray = {
			in_orderId: productOptionService.ajaxArray.in_orderId,
			in_orderItemId: productOptionService.ajaxArray.in_orderItemId,
			in_sessionKey: productOptionService.ajaxArray.in_sessionKey,
			in_userType: productOptionService.ajaxArray.in_userType,
			in_lineItemTypeSC: removeSelectedPO.option.ItemType,
			in_productId: removeSelectedPO.option.PCatEntryId,
			in_pcatEntryId: removeSelectedPO.option.PCatEntryId,
			in_childOrderItemId: removeSelectedPO.option.ChildOrderItemId
		};
		ajaxArray = $rootScope.addOmnitureParams(ajaxArray, "Shopping Cart");
        ajaxArray = $rootScope.storeInfo.storeKeyCart(ajaxArray);
        //console.log('firing Remove PO with ajaxArray: ');//console.log(ajaxArray);
		
		$http({
			url: removePO_url,
			params: ajaxArray,
			method: "GET",
		}).success(function(data){
			//console.log("successfully removed PO");
			//console.log(data);
			if(angular.isDefined(scope) && removeMore == "installation") {
				//console.log("updating instalaltion");
				scope.updateInstallation(data);
				productOptionAjaxService.removedPOData = data;
			} else {
//				//console.log("updating whole cart");
//				viewCartOrUpdateCart.updateToRootScope(data);
//				//this forloop takes care of when requiredaccessories are added, 
//				//the order of the items changes, so we must change the selected Item Index as well
//				for(i in $rootScope.items) {
//					if($rootScope.items[i].OrderItemID == $rootScope.selectedOrderItemId) {
//						$rootScope.selectedItemPO = i;
//						break;
//					}
//				}
				productOptionAjaxService.removedPOData = data;
			}
//			productOptionAjaxService.removePODeferred.resolve();
			$rootScope.ajaxPending = false;
			if(angular.isDefined(removeMore)) {
				scope.$emit("readyToRemoveMore");
			}
		}).error(function(data) {
			//console.log("failed to remove PO");
			//console.log(data);
			productOptionAjaxService.removePODeferred.reject("failed");
			$rootScope.ajaxPending = false;
		});
	};
	
	productOptionAjaxService.removeDeluxeOptionAjax = function(removeSelectedPO) {
		var ajaxArray = {
				in_orderId: productOptionService.ajaxArray.in_orderId,
				in_orderItemId: productOptionService.ajaxArray.in_orderItemId,
				in_sessionKey: productOptionService.ajaxArray.in_sessionKey,
				in_userType: productOptionService.ajaxArray.in_userType,
				in_lineItemTypeSC: "Deluxe",
				in_poItemType : "",
				in_questionScimCode: "",
				in_pcatEntryId: "",
				in_delOrderItemId : "",
				in_poQuantity : "",
		};
        ajaxArray = $rootScope.storeInfo.storeKeyCart(ajaxArray);
        //console.log('firing PO Remove Deluxe Option ??? GetHong with ajaxArray: ');//console.log(ajaxArray);

		$http({
			url: applyPO_url,
			params: ajaxArray,
			method: "GET",
		}).success(function(data){
			//console.log("successfully removed Deluxe");
			//console.log(data);
			viewCartOrUpdateCart.updateToRootScope(data);
		}).error(function(data) {
			//console.log("failed to remove Deluxe");
			//console.log(data);
		});
	};
/** ====================================== Applying Installation Product Option ===============================**/
	productOptionAjaxService.applyInstallationAddressAjax = function() {
		productOptionAjaxService.installationDefer = $q.defer();
		if(localStorage.getItem("installationAddress") != null && localStorage.getItem("installationAddress") != "") {
			var ajaxArray = {
				"in_zipCode": localStorage.getItem("installationZipcode"),
				"in_state": localStorage.getItem("installationState"),
				"in_city": localStorage.getItem("installationCity"),
				"in_addr1": (localStorage.getItem("installationAddress")),
				"in_addr2": "",
				"in_ua": "ca",
				"in_sessionKey": productOptionService.ajaxArray.in_sessionKey,
				"in_orderItemsId": productOptionService.ajaxArray.in_orderItemId,
			};
			
//			//console.log(ajaxArray);
//			var handleAddressUrl = servlet_url + "product-option/HandleInstallation?"; //+ unescape($.param(ajaxArray));
//			//console.log(handleAddressUrl);
			ajaxArray = $rootScope.addOmnitureParams(ajaxArray, "Shopping Cart");
            ajaxArray=$rootScope.storeInfo.storeKeyCart(ajaxArray);
            //console.log('firing Handle Installation with ajaxArray: ');//console.log(ajaxArray);

			$http({
				url: handleInstallation_url,
				params: ajaxArray,
				method: "GET",
			}).success(function(data) {
				//console.log("Successfully Added Installation Address");
				//console.log(data);
//				//console.log(JSON.stringify(data));
				productOptionAjaxService.installationDefer.resolve(data);
			}).error(function(data){
				//console.log("failed to add installation address");
				productOptionAjaxService.installationDefer.reject("failed to add installation address");
//				//console.log(data);
			});
		} else {
			productOptionAjaxService.installationDefer.reject("No installation address");
		}
	};
	
	productOptionAjaxService.applyInstallationAjax = function() {
		productOptionAjaxService.hasChanged = false;
		productOptionAjaxService.deferred = $q.defer();
		$rootScope.ajaxPending = true;
//		if(productOptionService.CIArray.lineItemTypeSC.length > 0) {
		if(productOptionService.CIArray.poItemtype.length > 0) {
			productOptionService.ajaxArray.in_lineItemTypeSC = productOptionService.CIArray.lineItemTypeSC;
//			productOptionService.ajaxArray.in_lineItemTypeSC = productOptionService.CIArray.lineItemTypeSC.toString();
			productOptionService.ajaxArray.in_poItemType = productOptionService.CIArray.poItemtype.toString();
			productOptionService.ajaxArray.in_pcatEntryId = productOptionService.CIArray.pCatEntryId.toString();
			productOptionService.ajaxArray.in_poQuantity = productOptionService.CIArray.poQuantity.toString();
//			//console.log(productOptionService.CIArray);
//			//console.log(productOptionService.ajaxArray);
            //console.log('firing Applying Installation PO with productOptionService.ajaxArray: ');//console.log(productOptionService.ajaxArray);

			$http({
				url: applyPO_url,
				params: productOptionService.ajaxArray,
				method: "GET",
			}).success(function(data){
				
				//console.log(data);
				viewCartOrUpdateCart.updateToRootScope(data);
				productOptionService.emptyCI();
				productOptionService.resetParameters();
				productOptionAjaxService.applyHaulAwayAjax();
				productOptionAjaxService.hasChanged = true;
//				//console.log(data.CartResponse.Shoppingcart.OrderItems.OrderItem);
			}).error(function(data){
				productOptionService.emptyCI();
				productOptionService.resetParameters();
				//console.log("failed to add Child Installation");
				//console.log(data);
				$rootScope.ajaxPending = false;
			    $rootScope.responseFail = true;
				productOptionAjaxService.hasChanged = true;
			});
		} else {
			productOptionAjaxService.applyHaulAwayAjax();
		}
	};
/** ========================================= Applying Haul Away Product Option ===============================**/
	productOptionAjaxService.applyHaulAwayAjax = function() {
		if(productOptionService.HAArray.lineItemTypeSC != "") {
			productOptionService.ajaxArray.in_lineItemTypeSC = productOptionService.HAArray.lineItemTypeSC;
			productOptionService.ajaxArray.in_poItemType = productOptionService.HAArray.poItemtype;
			productOptionService.ajaxArray.in_pcatEntryId = productOptionService.HAArray.pCatEntryId;
//			
//			//console.log(productOptionService.ajaxArray);
//			var applyPOUrl = servlet_url + "product-option/ApplyProductOption?";// + unescape($.param(productOptionService.ajaxArray));
//			//console.log(applyPOUrl);
            //console.log('firing HaulAway PO with productOptionService.ajaxArray: ');//console.log(productOptionService.ajaxArray);
            $http({
				url: applyPO_url,
				params: productOptionService.ajaxArray,
				method: "GET",
			}).success(function(data){
				//console.log(data);
				viewCartOrUpdateCart.updateToRootScope(data);
				productOptionService.removeHA();
				productOptionService.resetParameters();
				productOptionAjaxService.applyRequiredAccessoryAjax();
				productOptionAjaxService.hasChanged = true;
//				//console.log(data.CartResponse.Shoppingcart.OrderItems.OrderItem);
			}).error(function(data){
				productOptionService.removeHA();
				productOptionService.resetParameters();
				//console.log("failed to add Haul Away");
				$rootScope.ajaxPending = false;
			    $rootScope.responseFail = true;
				productOptionAjaxService.hasChanged = true;
			});
		} else {
			productOptionAjaxService.applyRequiredAccessoryAjax();
		}
	};
	
/** ========================================= Applying Required Accessory Product Option ===============================**/
	productOptionAjaxService.applyRequiredAccessoryAjax = function() {
		//console.log(productOptionService.RAArray.pCatEntryId);
		//console.log(productOptionService.RAArray.pCatEntryId.toString());
		if(productOptionService.RAArray.lineItemTypeSC != "" && $rootScope.toggledRA) {
			productOptionService.ajaxArray.in_lineItemTypeSC = productOptionService.RAArray.lineItemTypeSC;
			productOptionService.ajaxArray.in_poItemType = productOptionService.RAArray.poItemType.toString();
			productOptionService.ajaxArray.in_pcatEntryId = productOptionService.RAArray.pCatEntryId.toString();
			productOptionService.ajaxArray.in_poQuantity = productOptionService.RAArray.poQuantity.toString();
            //console.log('firing Require Accessory PO with productOptionService.ajaxArray: ');//console.log(productOptionService.ajaxArray);

            $http({
				url: applyPO_url,
				params: productOptionService.ajaxArray,
				method: "GET",
			}).success(function(data){
//				//console.log(data);
				viewCartOrUpdateCart.updateToRootScope(data);
				productOptionService.emptyRAArray();
				productOptionService.resetParameters();
				productOptionAjaxService.applyDeluxeOptionAjax();
				productOptionAjaxService.hasChanged = true;
				$rootScope.toggledRA = false;
			}).error(function(data){
				productOptionService.emptyRAArray();
				productOptionService.resetParameters();
				//console.log("failed to add Required Accessory");
				$rootScope.ajaxPending = false;
			    $rootScope.responseFail = true;
				productOptionAjaxService.hasChanged = true;
				$rootScope.toggledRA = false;
			});
		} else {
			productOptionAjaxService.applyDeluxeOptionAjax();
		}
	};
	
/** ========================================= Applying Deluxe Product Option ===============================**/
	productOptionAjaxService.applyDeluxeOptionAjax = function() {
		if(productOptionService.deluxeAjaxArray.lineItemTypeSC != "") {
			productOptionService.ajaxArray.in_lineItemTypeSC = productOptionService.deluxeAjaxArray.lineItemTypeSC;
			productOptionService.ajaxArray.in_questionScimCode = productOptionService.deluxeAjaxArray.questionScimCode;
			
//			//console.log(productOptionService.ajaxArray);
//			var applyPOUrl = servlet_url + "product-option/ApplyProductOption?"; //+ unescape($.param(productOptionService.ajaxArray));
            //console.log('firing Deluxe PO with productOptionService.ajaxArray: ');//console.log(productOptionService.ajaxArray);

            $http({
				url: applyPO_url,
				params: productOptionService.ajaxArray,
				method: "GET",
			}).success(function(data){
				viewCartOrUpdateCart.updateToRootScope(data);
//				//console.log(JSON.stringify(data));
				productOptionService.removeDeluxe();
				productOptionService.resetParameters();
				productOptionAjaxService.applyProtectionAgreementAjax();
				productOptionAjaxService.hasChanged = true;
			}).error(function(data){
				productOptionService.removeDeluxe();
				productOptionService.resetParameters();
				//console.log("failed to add Deluxe");
				$rootScope.ajaxPending = false;
			    $rootScope.responseFail = true;
				productOptionAjaxService.hasChanged = true;
			});
		} else {
			productOptionAjaxService.applyProtectionAgreementAjax();
		}
	};
	
/** ====================================== Applying Protection Agreement Product Option ===============================**/
	productOptionAjaxService.applyProtectionAgreementAjax = function() {
		if(productOptionService.PAArray.lineItemTypeSC != "") {
			productOptionService.ajaxArray.in_lineItemTypeSC = productOptionService.PAArray.lineItemTypeSC;
			productOptionService.ajaxArray.in_pcatEntryId = productOptionService.PAArray.pCatEntryId;
			
//			//console.log(productOptionService.ajaxArray);
//			var applyPOUrl = servlet_url + "product-option/ApplyProductOption?"; //+ unescape($.param(productOptionService.ajaxArray));
            //console.log('firing PA PO with productOptionService.ajaxArray: ');//console.log(productOptionService.ajaxArray);
            $http({
				url: applyPO_url,
				params: productOptionService.ajaxArray,
				method: "GET",
			}).success(function(data){
				viewCartOrUpdateCart.updateToRootScope(data);
				productOptionService.removePA();
				productOptionService.resetParameters();
				productOptionAjaxService.applyProtectionPlanAjax();
				productOptionAjaxService.hasChanged = true;
			}).error(function(data){
				productOptionService.removePA();
				productOptionService.resetParameters();
				//console.log("failed to add Protection Agreement");
				$rootScope.ajaxPending = false;
			    $rootScope.responseFail = true;
				productOptionAjaxService.hasChanged = true;
			});
		} else {
			productOptionAjaxService.applyProtectionPlanAjax();
		}
	};

/** ====================================== Applying Protection Plan Product Option ===============================**/
	productOptionAjaxService.applyProtectionPlanAjax = function() {
		if(productOptionService.PPArray.lineItemTypeSC != "") {
			productOptionService.ajaxArray.in_lineItemTypeSC = productOptionService.PPArray.lineItemTypeSC;
			productOptionService.ajaxArray.in_pcatEntryId = productOptionService.PPArray.pCatEntryId;
			
//			//console.log(productOptionService.ajaxArray);
//			var applyPOUrl = servlet_url + "product-option/ApplyProductOption?"; //+ unescape($.param(productOptionService.ajaxArray));
            //console.log('firing PP PO with productOptionService.ajaxArray: ');//console.log(productOptionService.ajaxArray);
            $http({
				url: applyPO_url,
				params: productOptionService.ajaxArray,
				method: "GET",
			}).success(function(data){
				viewCartOrUpdateCart.updateToRootScope(data);
				productOptionService.removePP();
				productOptionService.resetParameters();
				productOptionAjaxService.applyRoadHazardAjax();
				productOptionAjaxService.hasChanged = true;
			}).error(function(data){
				productOptionService.removePP();
				productOptionService.resetParameters();
				//console.log("failed to add Protection Plan");
				$rootScope.ajaxPending = false;
			    $rootScope.responseFail = true;
				productOptionAjaxService.hasChanged = true;
			});
		} else {
			productOptionAjaxService.applyRoadHazardAjax();
		}
	};

/** ====================================== Applying Road Hazard Product Option ===============================**/
	productOptionAjaxService.applyRoadHazardAjax = function() {
		if(productOptionService.RHArray.lineItemTypeSC != "") {
			productOptionService.ajaxArray.in_lineItemTypeSC = productOptionService.RHArray.lineItemTypeSC;
			productOptionService.ajaxArray.in_pcatEntryId = productOptionService.RHArray.pCatEntryId;
			
//			//console.log(productOptionService.ajaxArray);
//			var applyPOUrl = servlet_url + "product-option/ApplyProductOption?"; //+ unescape($.param(productOptionService.ajaxArray));
            //console.log('firing RH PO with productOptionService.ajaxArray: ');//console.log(productOptionService.ajaxArray);
            $http({
				url: applyPO_url,
				params: productOptionService.ajaxArray,
				method: "GET",
			}).success(function(data){
				viewCartOrUpdateCart.updateToRootScope(data);
				productOptionService.removeRH();
				productOptionService.resetParameters();
				productOptionAjaxService.applySmartPlanAjax();
				productOptionAjaxService.hasChanged = true;
			}).error(function(data){
				productOptionService.removeRH();
				productOptionService.resetParameters();
				//console.log("failed to add  Road Hazard");
				$rootScope.ajaxPending = false;
			    $rootScope.responseFail = true;
				productOptionAjaxService.hasChanged = true;
			});
		} else {
			productOptionAjaxService.applySmartPlanAjax();
		}
	};
	
/** ====================================== Applying Smart Plan Product Option ===============================**/
	productOptionAjaxService.applySmartPlanAjax = function() {
		if(productOptionService.SPArray.lineItemTypeSC != "") {
			productOptionService.ajaxArray.in_lineItemTypeSC = productOptionService.SPArray.lineItemTypeSC;
			productOptionService.ajaxArray.in_pcatEntryId = productOptionService.SPArray.pCatEntryId;

            //console.log('firing SP PO with productOptionService.ajaxArray: ');//console.log(productOptionService.ajaxArray);
            $http({
				url: applyPO_url,
				params: productOptionService.ajaxArray,
				method: "GET",
			}).success(function(data){
				viewCartOrUpdateCart.updateToRootScope(data);
				productOptionService.removeSP();
				productOptionService.resetParameters();
				$rootScope.ajaxPending = false;
				productOptionAjaxService.hasChanged = true;
				productOptionAjaxService.deferred.resolve();
			}).error(function(data){
				productOptionService.removeSP();
				productOptionService.resetParameters();
				//console.log("failed to add Smart Plan");
				$rootScope.ajaxPending = false;
			    $rootScope.responseFail = true;
				productOptionAjaxService.hasChanged = true;
				productOptionAjaxService.deferred.resolve();
			});
		} else {
			$rootScope.ajaxPending = false;
			productOptionAjaxService.deferred.resolve();
//				productOptionAjaxService.applyRequiredAccessoryAjax();
		}
	};
	
	return productOptionAjaxService;
}]);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END OF FIRST PART OF INSTALLATION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


WLCC.factory("parseContinueInstallation", ['$rootScope', '$q', 'continueCheckoutParsing', function($rootScope, $q, continueCheckoutParsing) {
	var parseContinueInstallation = {};
	parseContinueInstallation.parseAddInstallationAddress = function() {

		var resp = $rootScope.continueCheckoutResponse.CheckoutResponse; //data
		var items = $rootScope.objToArray(resp.OrderSummary.OrderSummaryItem);
		var installationDate = resp.InstallationDetails.BlackOutDatesList.split("|");
		if(installationDate[installationDate.length-1] == "")
			installationDate.pop();
		for(i in installationDate) {
			installationDate[i] = $rootScope.convertToMonthDayYearFormat(installationDate[i]);
		}
		$rootScope.earliestInstallationDate = [resp.InstallationDetails.EarliestDatesList.EarliestDates.DateValue];
		$rootScope.installationDate = $rootScope.earliestInstallationDate.concat(installationDate);
		//console.log($rootScope.installationDate);
		$rootScope.installationItem = $rootScope.objToArray(resp.InstallationDetails.InstallationItem);
		$rootScope.installationAddress = $rootScope.installationItem[0].InstallationAddress;
		$rootScope.installationAddressLine1 = $rootScope.installationAddress.Address1;
		$rootScope.installationCity = $rootScope.installationAddress.City;
		$rootScope.installationState = $rootScope.installationAddress.State;
		$rootScope.installationZipcode = $rootScope.installationAddress.ZipCode;
		$rootScope.selectedInstallationDate = $rootScope.earliestInstallationDate.toString();
		$rootScope.installationOrderItemId = new Array();
		for(var i = 0; i < $rootScope.installationItem.length; i++) {
			for(var j = 0; j < items.length; j++) {
				if(items[j].ItemDescription.indexOf($rootScope.installationItem[i].ItemDescription) > -1) {
					$rootScope.installationOrderItemId.push(items[j].OrderItemId);
					//console.log($rootScope.installationOrderItemId);
				}
			}
		}
	};
	
	parseContinueInstallation.parseContinueInstallation = function(data) {
		$rootScope.continueCheckoutResponse = data;

		$rootScope.continueCheckoutResponse.CheckoutResponse.PaymentMethod = new Object();
        var temp = [""]
        if (!data.CheckoutResponse.SavedCreditCards == ""){
            var temp = $rootScope.objToArray(data.CheckoutResponse.SavedCreditCards);
            for(i in temp){
                temp[i].CardType = temp[i].WalletBrand;
                temp[i].ExpiryDate = temp[i].WalletExpiryMonth + '/' + temp[i].WalletExpiryYear;
                temp[i].NameonCard = temp[i].WalletNameOnCard;
            }
        }
        $rootScope.continueCheckoutResponse.CheckoutResponse.PaymentMethod.SavedCreditCards = temp;
            //
		$rootScope.continueCheckoutResponse.CheckoutResponse.PaymentMethod.IsPayPalEligible = data.CheckoutResponse.IsPayPalEligible;
        $rootScope.continueCheckoutResponse.CheckoutResponse.UserType = 'R';

        $rootScope.continueCheckoutResponse.CheckoutResponse.OrderSummary.OrderSummaryTotals = new Object();
        $rootScope.continueCheckoutResponse.CheckoutResponse.OrderSummary.OrderSummaryTotals.Total = data.CheckoutResponse.OrderSummary.OrderTotal;
		$rootScope.expandedStatus = "payment";
		
		continueCheckoutParsing.parseData($rootScope.continueCheckoutResponse, true);
	};
	
	return parseContinueInstallation;
}]);

WLCC.factory("continueInstallationAjaxService", ['$rootScope', '$http', '$q', '$location', 'parseContinueInstallation', function($rootScope, $http, $q, $location, parseContinueInstallation) {
	var continueInstallationAjaxService = {};
	continueInstallationAjaxService.addAddressDeferred = $q.defer();
	continueInstallationAjaxService.continueInstallationDeferred = $q.defer();
	
	continueInstallationAjaxService.addAddress = function() {
//		parseContinueInstallation.parseAddInstallationAddress();
		var ajaxArray = {
			in_orderId     : $rootScope.orderId,
			in_orderItemId : $rootScope.installationOrderItemId.toString(),
			in_address1    : encodeURI((angular.isDefined($rootScope.installationAddress.Address1)) ? $rootScope.installationAddress.Address1 : $rootScope.installationAddress.AddressLine1),
			in_address2    : encodeURI((angular.isDefined($rootScope.installationAddress.Address2)) ? $rootScope.installationAddress.Address2 : ((angular.isDefined($rootScope.installationAddress.AddressLine2)) ? $rootScope.installationAddress.AddressLine2 : "")),
			in_city        : encodeURI($rootScope.installationAddress.City),
			in_state       : $rootScope.installationAddress.State,
			in_zipCode     : (angular.isDefined($rootScope.installationAddress.ZipCode)) ? $rootScope.installationAddress.ZipCode : $rootScope.installationAddress.Zipcode,
			in_sessionKey  : $rootScope.token
		};
		ajaxArray = $rootScope.addOmnitureParams(ajaxArray, "Shopping Cart");
        ajaxArray = $rootScope.storeInfo.storeKeyCart(ajaxArray);
        //console.log('firing Add Installation Address with ajaxArray: ');//console.log(ajaxArray);
		var url = addInstallationAddress_url;
		//console.log(url + $.param(ajaxArray));
		$http({
			url: url,
			method: "GET",
			params: ajaxArray
		}).success(function(data){
			continueInstallationAjaxService.addAddressDeferred.resolve(data);
			//console.log("successfully added installation address");
			//console.log(data);
			continueInstallationAjaxService.continueInstallation();
		}).error(function(data) {
			continueInstallationAjaxService.addAddressDeferred.reject("failed to add installation address");
			//console.log("failed to add installation address");
			//console.log(data);
		});
	};
	
	continueInstallationAjaxService.continueInstallation = function() {
//		in_isMultiple: This parameter is to passed when there are more than one installation items and each are to be installed on different dates otherwise. 
		var ajaxArray = {
			in_catalogId: "",
			in_orderId: $rootScope.orderId,
			in_orderItemId: $rootScope.installationOrderItemId.toString(),
			in_selectedDate: $rootScope.selectedInstallationDate.toString(), //$rootScope.selectedInstallationDate, need to be changed
			in_defaultDate: $rootScope.earliestInstallationDate.toString(),
			in_isQuickCheckoutFlow: false,
			in_isMultiple: "N",
			in_sessionKey: $rootScope.token,
		};
		ajaxArray = $rootScope.addOmnitureParams(ajaxArray, "Shopping Cart");
        ajaxArray = $rootScope.storeInfo.storeKeyCart(ajaxArray);
        //console.log('firing Continue Installation with ajaxArray: ');//console.log(ajaxArray);

		var url = installationContinue_url;
		
		$http({
			url: url,
			method: "GET",
			params: ajaxArray
		}).success(function(data) {
			//console.log("successfully continued instsallation checkout");
			//console.log(data);
			parseContinueInstallation.parseContinueInstallation(data);
			continueInstallationAjaxService.continueInstallationDeferred.resolve(data);
			$rootScope.ajaxLoader = false;
			$rootScope.ajaxPending = false;
			$location.path(dynamicCartView +'/cart/co_step_payment');
		}).error(function(data) {
			continueInstallationAjaxService.continueInstallationDeferred.reject("failed to continue installation checkout");
			//console.log("failed to continue installation checkout");
			//console.log(data);
		});
	};
	
	return continueInstallationAjaxService;
}]);

WLCC.factory("checkoutDisplay", ["$rootScope", "$http", "$q", "continueCheckoutParsing", "proceedToCheckoutParsing",
function($rootScope, $http, $q, continueCheckoutParsing, proceedToCheckoutParsing) {
	var checkoutDisplay = {};
	
	checkoutDisplay.ajaxCall = function(scope) {
		checkoutDisplay.deferred = $q.defer();
		//console.log($rootScope.expandedStatus);
		var postVarArray = {
			in_sessionKey: $rootScope.token,
			in_orderId: $rootScope.orderId,
			in_prevUpdatedModule: "ADDRESS", //param required from review to payment *not required in the checkout process* 
			in_editedModule: $rootScope.expandedStatus.toUpperCase(), //param required from review to payment *not required in the checkout process*
			in_addressId: $rootScope.checkoutDisplayAddressId, //Address id corresponding to an address. Mandatory if we need to get the delivery dates corresponding to an address.
//			in_lastAddressScim: "", //optional
//			in_listdosNumber: "", //optional (The values of this parameter can be obtained from the delivery page.)
		}
		var url = checkoutDisplay_url;
//		postVarArray = $rootScope.addOmnitureParams(postVarArray, "Shopping Cart");
		postVarArray = $rootScope.storeInfo.storeKeyCart(postVarArray);
		//console.log(url + $.param(postVarArray));
		$http({
			url : url,
			method :  "POST",
			data: postVarArray,
			transformRequest: function(data){
        		return $.param(data);
            },
		}).success(function(data){
			//console.log("Successfully invoked checkout Display");
			//console.log(data);
			checkoutDisplay.parse(data, scope);
			checkoutDisplay.deferred.resolve();
		}).error(function(data){
			//console.log("Failed to invoke checkout Display");
			//console.log(data);
			checkoutDisplay.deferred.resolve();
		});
	};
	checkoutDisplay.parse = function(data, scope) {
		if(angular.isDefined(data.CheckoutResponse)) {
			if($rootScope.expandedStatus == "shipping" && angular.isDefined(data.CheckoutResponse.ShippingSection)) { //shipping
				var shippingSection = data.CheckoutResponse.ShippingSection;
				if(angular.isDefined(shippingSection.ConsolidatedShippingOptions)) {
					//console.log(shippingSection.ConsolidatedShippingOptions.AvailableShippingOptions);
					scope.$emit("checkoutDisplayCompleteShipping", shippingSection.ConsolidatedShippingOptions.AvailableShippingOptions);
				} else {
					scope.$emit("checkoutDisplayCompleteShipping", $rootScope.objToArray(shippingSection.ShippingDetails.ShippingItem)[0].ShippingOptions.AvailableShippingOptions);
				}
			} else if($rootScope.expandedStatus == "delivery") { //delivery
				proceedToCheckoutParsing.parseDeliverySection(data);
			} else if($rootScope.expandedStatus == "payment") {
				continueCheckoutParsing.parseData(data);
			}
		}
	}
	return checkoutDisplay;
}]);

WLCC.factory("applyShippingOption", ["$rootScope", "$http", "$q",
function($rootScope, $http, $q) {
	var applyShippingOption = {};
	
	applyShippingOption.postVarArray = {
		in_sessionKey: "",
		in_orderId: "",
		in_quantity: "",
		in_orderItemId : "",
		in_shipModeId : "",
		in_addressId: "",
		in_modeIndicator: "",
		in_orderLevel: "",
		in_prevAddressId: "",
		in_itemShipModeId: "",
		in_itemLevel: "",
	};
	
	applyShippingOption.setDefaultValue = function() {
		this.postVarArray.in_sessionKey = $rootScope.token;
		this.postVarArray.in_orderId = $rootScope.orderId;
	}
	//This request structure is used for Apply Shipping Options from the shipping page when all the items added to cart is 
	//having the same shipping address. 
	applyShippingOption.scenarioOne = function() {
		//console.log("~~~~~~~~~~~applying scenario one ~~~~~~~~");
		this.postVarArray.in_itemLevel = ""; //empty out
		this.postVarArray.in_itemShipModeId = ""; //empty out
		this.postVarArray.in_prevAddressId = ""; //empty out
		this.postVarArray.in_orderLevel = "Y";
		this.postVarArray.in_modeIndicator = "allItems";
		this.postVarArray.in_orderItemId = $rootScope.continueShippingCheckout.shippingOrderItemIds.toString();
		this.postVarArray.in_shipModeId = $rootScope.continueShippingCheckout.shipModeId[0];
		this.postVarArray.in_addressId = $rootScope.continueShippingCheckout.addressId.toString();
		this.postVarArray.in_quantity =  $rootScope.continueShippingCheckout.shippingQuantities.toString();
 	};
 	//This request structure is used for Apply Shipping Options from the shipping page, when the user has different shipping address 
 	//for different items in cart. 
 	applyShippingOption.scenarioTwo = function(index) {
 		//console.log("~~~~~~~~~~~applying scenario two ~~~~~~~~");
 		this.postVarArray.in_orderLevel = ""; //empty out
 		this.postVarArray.in_modeIndicator = ""; //empty out
 		this.postVarArray.in_prevAddressId = ""; //empty out
		this.postVarArray.in_itemLevel = "true";
		//console.log($rootScope.shippingOptions[index]);
		this.postVarArray.in_itemShipModeId = $rootScope.shippingOptions[index].itemShipModeId.toString();
		this.postVarArray.in_shipModeId = $rootScope.continueShippingCheckout.shipModeId[index];
		this.postVarArray.in_addressId = $rootScope.continueShippingCheckout.addressId[index];
		this.postVarArray.in_quantity = $rootScope.continueShippingCheckout.shippingQuantities[index];
		this.postVarArray.in_orderItemId = $rootScope.continueShippingCheckout.shippingOrderItemIds[index];
 	};
 	//This request structure is used for Apply Shipping Options from the shipping page, when the shipping address is changed for an item 
 	//added to cart. 
 	applyShippingOption.scenarioThree = function(index) {
 		//console.log("~~~~~~~~~~~applying scenario three ~~~~~~~~");
 		this.postVarArray.in_orderLevel = ""; //empty out
		this.postVarArray.in_itemLevel = "true";
		this.postVarArray.in_modeIndicator = "changeAddress";
		this.postVarArray.in_itemShipModeId = $rootScope.shippingOptions[index].itemShipModeId.toString();
		this.postVarArray.in_prevAddressId = $rootScope.shippingOptions[index].previousAddressId;
		this.postVarArray.in_shipModeId = $rootScope.continueShippingCheckout.shipModeId[index];
		this.postVarArray.in_addressId = $rootScope.continueShippingCheckout.addressId[index];
		this.postVarArray.in_quantity = $rootScope.continueShippingCheckout.shippingQuantities[index];
		this.postVarArray.in_orderItemId = $rootScope.continueShippingCheckout.shippingOrderItemIds[index];
 	};
 	
 	applyShippingOption.ajaxCall = function(index) {
 		this.deferred = $q.defer();
 		this.setDefaultValue();
 		var url = applyShippingOption_url;
// 		//console.log(applyShippingOption_url + "?" + $.param(applyShippingOption.postVarArray));
// 		//console.log(applyShippingOption.postVarArray);
 		applyShippingOption.postVarArray = $rootScope.addOmnitureParams(applyShippingOption.postVarArray, "Shipping Cost Page");
 		applyShippingOption.postVarArray = $rootScope.storeInfo.storeKeyCart(applyShippingOption.postVarArray);
        
        $http({
        	url: url,
        	method: "POST",
        	data: applyShippingOption.postVarArray,
        	transformRequest: function(data){
        		return $.param(data);
            },
        }).success(function(data){
        	if(angular.isDefined(index)) {
        		if(index == $rootScope.shippingItems.length - 1)
        			applyShippingOption.deferred.resolve(data);
        	} else{
        		applyShippingOption.deferred.resolve(data);
        	}
        	//console.log("successfully applied shipping option");
        	//console.log(data);
        }).error(function(data) {
        	applyShippingOption.deferred.resolve(data);
        	//console.log("failed to apply shipping option");
        	//console.log(data);
        });
 	};
 	return applyShippingOption;
}]);WLCC.controller('mainCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
	$rootScope.isCheckout = false;

	//standard javascript observer-pattern for navigating the progress menu
	$scope.placement = 0;
	var Progress = function(){
		this.current = 0;
		//set up an array of possible menu steps
		this.steps = [
			{ 
				step: "contact",
				display: "contact info",
				hash: "co_step_contact"
			},
			{ 
				step: "fulfillment",
				display: "shipping & delivery",
				hash: "co_step_fulfillment"
			},
			{ 
				step: "payment",
				display: "payment",
				hash: "co_step_payment"
			},
			{ 
				step: "review",
				display: "review order",
				hash: "co_step_review"
			}
		];
		
		//get current index value
		this.getCurrent = function(){
			return this.current;
		};
		
		//set current index value
		this.observe = function(value){
			this.current = value
		};
		
		//move forward method
		this.nextStep = function(){
			$scope.placement++;
			$scope.placement > $scope.checkout.steps.length-1 ? $scope.placement = $scope.checkout.steps.length-1 : $scope.placement = $scope.placement;
			$scope.checkout.observe($scope.placement);
			$scope.current = $scope.checkout.getCurrent();
			////console.log('/'+$scope.checkout.steps[$scope.current].hash);
		};
		
		//move backward method
		this.prevStep = function(){
			$scope.placement--;
			$scope.placement < 0 ? $scope.placement = 0 : $scope.placement = $scope.placement;
			$scope.checkout.observe($scope.placement);
			$scope.current = $scope.checkout.getCurrent();
			////console.log('/'+$scope.checkout.steps[$scope.current].hash);
		};
	};
	//instantiate the menu
	$scope.checkout = new Progress;	
	
	$scope.forceBlur = function(id){
		$('#'+id).blur();
	}
	
	
}]);//end main controller

WLCC.controller('viewCartCtrl', ['$scope', '$rootScope', 'viewCartResponse', 'viewCartOrUpdateCart', 'viewProfile', 'payPalService', 'sessionVariables', 'productOptionAjaxService', 'clearVariables', 'validatePageService',
function($scope, $rootScope, viewCartResponse, viewCartOrUpdateCart, viewProfile, payPalService, sessionVariables, productOptionAjaxService, clearVariables, validatePageService){
	clearVariables.clear();
	//console.log("*******************************************************");
	$rootScope.omnitureTagging('OmniturePageView', 'Shopping Cart');
	//console.log("*******************************************************");
	$rootScope.templateSource = "cart";
 	$rootScope.isCheckout = false;

 	if(localStorage.uid == undefined){
 		localStorage.uid = new Date().getTime();
 	}

	sessionVariables.setSessionVariables();
	

	$scope.$on('$routeChangeStart', function(scope, next, current){
		  if(next.$route.controller == "reviewController" || next.$route.controller == "confirmationController" || next.$route.controller == "paymentController"){
			  var currentTime = new Date();
				currentTime = currentTime.getTime();
				$rootScope.ajaxPending = false;
			  $location.path(dynamicCartView + "cart/viewcart/"+currentTime);
	       }
		  $rootScope.isLoading = true;
		  $('#co-modal, #co-modal-bg').remove();
		  $('body').removeClass('modaled');
	  });

	
	if(!angular.isDefined($rootScope.removeOverSizedItem) || $rootScope.removeOverSizedItem.length == 0) {
		delete $rootScope.removeOverSizedItem;
		viewCartResponse.viewCart();
		viewCartResponse.deferred.promise.then(function(){
			viewCartOrUpdateCart.updateToRootScope(viewCartResponse.json);
			if($rootScope.userType == "R"){
				if($rootScope.isExpress == true) {
					$rootScope.ajaxLoader = true;
					viewProfile.view();
					viewProfile.deferred.promise.then(function() {
						$('#expressCheckoutUI').removeClass('hide');
					    validatePageService.validateViewCart();
					});
				} else {
					viewProfile.view();
				}
			} else {
				if($rootScope.isExpress == true) {
					$("#signInModal").trigger("loginHandler");
				}
			}
			$scope.isGift = function(){
				////console.log(this.gift);
				if (this.gift == true) {$('#gift-modal').trigger("click");}
			};
			$scope.viewProductOptions = function(partNumber){
		         wlccProductDetails(partNumber);
		    };
		    
//		    if(($rootScope.isExpress  == 'true' || $rootScope.isExpress == true)  && $rootScope.userType == 'R'){
//		    	$rootScope.isExpress  = true;
//		    	if($rootScope.userType == "R") {
//				    $('#expressCheckoutUI').removeClass('hide');
//				    validatePageService.validateViewCart();
//		    	} else {
//					$("#signInModal").trigger("loginHandler");
//		    	}
//		    } else{
//			      $rootScope.isExpress  = false;
//	        }
	
			if(angular.isDefined($rootScope.getUrlVar("PayerID")) && angular.isDefined($rootScope.getUrlVar("token"))) {
				payPalService.SCPayPal();
	        }
		});
	}
	
	$scope.updateStorePickUpViews = function(data){
		viewCartOrUpdateCart.updateToRootScope(data, 'editFulfillment');
	};
	
	$scope.$on("editStep2Finished", function(e, data) {
		$scope.updateStorePickUpViews(data);
		e.stopPropagation();
	});

	$rootScope.bridgingViewCartAndPO = function(oldItem, newItem, oldItemIndex) {
    	////console.log("im called here");
		productOptionAjaxService.reapplyPO(oldItem, newItem, oldItemIndex);
    };
    
    $scope.updateCart = function(){
    	viewCartResponse.viewCart();
    	viewCartResponse.deferred.promise.then(function(){
    		viewCartOrUpdateCart.updateToRootScope(viewCartResponse.json);
    	});
	};
	
}]);

WLCC.controller('emptyCartCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
	$rootScope.templateSource = "empty";
    $rootScope.errorToShow = "empty";
	$scope.backToTesting = function(){
//		////console.log('open testing interface webpage');
		window.open(testingInterfaceUrl,"_self"); //testing
		//open testingInterfaceUrl
	};
}]);
WLCC.controller('errorPageCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
    $rootScope.templateSource = "empty";
    $rootScope.errorToShow = "error";
}]);


// checking
WLCC.controller("fulfillmentController", ['$scope', '$rootScope', '$location', '$timeout', 'proceedToCheckOut', 'omnitureTagging', 'clearVariables', 'parseContinueInstallation',
    function($scope, $rootScope, $location, $timeout, proceedToCheckOut, omnitureTagging, clearVariables, parseContinueInstallation){
	$rootScope.templateSource = "fulfillment";
	$rootScope.isCheckout = true;
	
//	  $scope.$on('$locationChangeStart', function(event, next, current){
//	       if(next.indexOf("cart/co_step_payment") == -1){
//	    	   alert("here");
//	    	   event.preventDefault();
//	       }else{
//	    	   alert("not here");
//	       }
//	    	   
//	  });
	
	  $scope.$on('$routeChangeStart', function(scope, next, current){
		  if(next.$route.controller != "paymentController"){
			  var currentTime = new Date();
				currentTime = currentTime.getTime();
				$rootScope.ajaxPending = false;
				clearVariables.clear();
				$location.path(dynamicCartView + "cart/viewcart/"+currentTime);
			  
	       }
		  $rootScope.isLoading = true;
		  $('#co-modal, #co-modal-bg').remove();
		  $('body').removeClass('modaled');
	  });
	
	/*********** Omniture tag page **************/
    omnitureTagging.tag("OmniturePageView", "Shipping Cost Page");
    
	//show pickup items first for mixed carts
	$scope.endPickupFulfillment = function(){
		$("#tab-pickup").addClass("closed");
		if($rootScope.shippingItems) {
			$("#tab-shipping, #ffPageContinue").show();
			$("#spuPageContinue").hide();
			$rootScope.expandedStatus = "shipping";
		} else if (!$rootScope.shippingItems && $rootScope.deliveryItems) {
			$("#tab-delivery, #ffPageContinue").show();
			$("#spuPageContinue").hide();
			$rootScope.expandedStatus = "delivery";
		}  
	}

	$scope.decide= function(){
		$timeout(function() {
			var status = String($rootScope.expandedStatus);			
			switch(status){
				case "shipping":
				  $(".tab-content, #spuPageContinue").hide();
				  $("#tab-shipping").show();
				  $(".acc-tab").removeClass("current inactive disabled");
				  $("#shippingTab").addClass("current");
				  $("#pickupTab").addClass("inactive");
				  $("#deliveryTab, #installationTab").addClass("disabled");
				  break;
				case "delivery":
				  $(".tab-content, #spuPageContinue").hide();
				  $("#tab-delivery").show();
				  $(".acc-tab").removeClass("current inactive disabled");
				  $("#shippingTab, #pickupTab").addClass("inactive");
				  $("#installationTab").addClass("disabled");
				  $("#deliveryTab").addClass("current");
				  break;
				case "pickup":  
				  if (!$rootScope.shippingItems && !$rootScope.deliveryItems) {
				  	$(".tab-content, #spuPageContinue").hide();
				  	$("#tab-pickup, #ffPageContinue").show(); 	 
				  } else {
				  	$(".tab-content, #ffPageContinue").hide();
				  	$("#tab-pickup, #spuPageContinue").show();
				  }
				  $(".acc-tab").removeClass("current inactive disabled");
				  $("#shippingTab, #deliveryTab, #installationTab").addClass("disabled");
				  $("#pickupTab").addClass("current");
				  break;
				case "installation":
				  $(".tab-content, #spuPageContinue").hide();
				  $("#tab-installation").show();
				  $(".acc-tab").removeClass("current inactive disabled");
				  $("#shippingTab, #deliveryTab, #pickup").addClass("inactive");
				  $("#installationTab").addClass("current");
				  break;
				case "payment":
				  $(".tab-content, #spuPageContinue").hide();
				  $("#tab-pickup, #ffPageContinue").show();
				  $(".acc-tab").removeClass("current inactive disabled");
				  $("#shippingTab, #deliveryTab, #installationTab").addClass("disabled");
				  $("#pickupTab").addClass("current");
				  break;
				default:
				  $(".tab-content, #spuPageContinue").hide();
				  $("#tab-shipping").show();
				  $(".acc-tab").removeClass("current inactive disabled");
				  $("#shippingTab").addClass("current");
				  $("#pickupTab").addClass("inactive");
				  $("#deliveryTab, #installationTab").addClass("disabled");
			}
		}, 200);
		
	};
	
	
	
	$scope.$watch("expandedStatus", function(newVal, oldVal){
		if(newVal != oldVal) {
			$scope.decide();
			if($rootScope.expandedStatus == "installation" && localStorage.getItem("installationAddress") != null) {
				 $rootScope.isAtInstallationForm = true;
				 parseContinueInstallation.parseAddInstallationAddress();
			} else {
				$rootScope.isAtInstallationForm = false;
			}
		}
	});
	
	$scope.displayRequiredTabs = function() {
		
		if(angular.isDefined($rootScope.notVisited)) {
			if($rootScope.pickupSection == undefined){
				////console.log("no pickup");
				$("#pickupWrap").remove();
			}
			if($rootScope.notVisited.indexOf("installation") == -1 && $rootScope.expandedStatus.indexOf("installation") == -1) {
				////console.log("no installation");
				$("#installationWrap").remove();
			}
			if($rootScope.notVisited.indexOf("shipping") == -1 && !$rootScope.shippingItems) {
				////console.log("no shipping");
				$("#shippingWrap").remove();
			}
			if($rootScope.notVisited.indexOf("delivery") == -1 && !$rootScope.deliveryItems) {
				////console.log("no delivery");
				$("#deliveryWrap").remove();
			}
		}
	};
	

//	});//end .then statement	
}]);// end fulfillment controller


WLCC.controller('cartEditCtrl', ['$scope', '$rootScope', '$templateCache', '$location', '$routeParams',
    function($scope, $rootScope, $templateCache, $location, $routeParams){
	$rootScope.isCheckout = false;
	$scope.cartInfo = $scope.data[$routeParams.id]
	$scope.cartEdit = function(){
  	$location.path(dynamicCartView + "#/edit{{$index}}")
  }

	$scope.saveCartEdit = function(){
		$location.path(dynamicCartView + '#/cart.html');
	}
}]);//end cartEditController


WLCC.controller('checkoutController', ['$scope', '$rootScope', function($scope, $rootScope){
	////console.log('checkout controller');
	$rootScope.isLoggedIn();



}]);//end checkoutController

//checkoutController.$inject = ['$scope', '$rootScope'];


WLCC.controller('contactController', ['$q', '$scope', '$rootScope', '$routeParams', 'proceedToCheckOut', '$location', 'checkoutlogInResponse', 'proceedToCheckoutParsing', 'logInResponse', 'viewCartOrUpdateCart', 'viewCartResponse', 'continueCheckoutParsing', 'payPalParserService', 'validatePageService',
function($q, $scope, $rootScope, $routeParams, proceedToCheckOut, $location, checkoutlogInResponse, proceedToCheckoutParsing, logInResponse,viewCartOrUpdateCart, viewCartResponse, continueCheckoutParsing, payPalParserService, validatePageService){
	//make sure progress bar is visible
	//$rootScope.isCheckout = true;
	$rootScope.isCheckout = false;
	//exit checkout
	$rootScope.omnitureTagging('OmniturePageView', 'Checkout Login');
	
	$scope.forgotPassword = function(){  
        wlccForgotPassword();
	}
	
		//progress bar manual controls
	$scope.logIn = function(thisUserType){
        //Congwen Triggers Change
        $rootScope.loginError = "";
        if(thisUserType=='R'){
            $('#emailR, #password').trigger('change');
        } else {
            $('#emailG').trigger('change');
        }

	    if(!$("#email"+$rootScope.userType).parent().hasClass("error") && !$("#password").parent().hasClass("error") && $("#email"+$rootScope.userType).val() != ""){
		    $rootScope.enteredEmail = ($("#email"+$rootScope.userType).val()).trim();
		    $rootScope.enterdPassword =($("#password").val()).trim();
			localStorage.userType = thisUserType;
			$rootScope.userType = thisUserType;
	        ////console.log($rootScope.enteredEmail +" "+ $rootScope.enterdPassword);
	        ////console.log("userType: "+ thisUserType);
	        $rootScope.ajaxLoader = true;
	        checkoutlogInResponse.logIn();
	     		
	        checkoutlogInResponse.deferred.promise.then(function(){
	        	$rootScope.ajaxLoader = false;
//	        	if(checkoutlogInResponse.json.CheckoutShippingResponse != undefined){
//	        		response = checkoutlogInResponse.json.CheckoutShippingResponse;
//	        		$rootScope.expandedStatus = "shipping";
//	        	
//	        	
//	        	}else if(checkoutlogInResponse.json.CheckOutDelivery != undefined){
//	        		response = checkoutlogInResponse.json.CheckOutDelivery;
//	        		$rootScope.expandedStatus = "delivery";
//	        	}else if(checkoutlogInResponse.json.CheckoutResponse != undefined){
//	        		response = checkoutlogInResponse.json.CheckoutResponse;
//	        		$rootScope.expandedStatus = "payment";
//	        	}
	        	
	        	var string = JSON.stringify(checkoutlogInResponse.json);
	        	if($rootScope.userType == "G"){
	            	//Please Enter your Address Details to proceed
	            	if(string.indexOf($rootScope.responseMessage.addAddress) != -1 || string.indexOf($rootScope.responseMessage.addAddress2) != -1 || string.indexOf($rootScope.responseMessage.handleAddress) != -1){
	            		$rootScope.showNewAddressForm = true;
	             		$location.path(dynamicCartView + 'cart/co_step_fulfillment');
	            	} else { //paypal flow for guest user
	            		$rootScope.showNewAddressForm = false;
//	            		payPalParserService.checkoutLogin(checkoutlogInResponse.json);
	            		proceedToCheckoutParsing.parseData(checkoutlogInResponse.json);
	            		$location.path(dynamicCartView + 'cart/co_step_fulfillment');
	            	}
	            } else{
	            	if(checkoutlogInResponse.json.CheckoutResponse.StatusData.ResponseCode == 0){
		            	proceedToCheckOut.deferred = $q.defer();
		            	proceedToCheckOut.checkOut();
									setSession({
										'userType': 'R',
										'sessionKey' : $rootScope.token
									});
									updateLoggedIn($rootScope.enteredEmail, $rootScope.token );
		            	
		            	proceedToCheckOut.deferred.promise.then(function(){
							if($rootScope.proceedToCheckoutResponse.CheckoutResponse != undefined){
								$rootScope.showNewAddressForm = false;
								if($rootScope.proceedToCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.payBill){
									$rootScope.setExpandedStatus($rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus);
//									$rootScope.expandedStatus = $rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus.ExpandedStatus;
//									$rootScope.notVisited = $rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus.NotVisited;
//									$rootScope.expandedStatus = (($rootScope.expandedStatus).replace(",","")).toLowerCase();
//									$rootScope.notVisited = (($rootScope.notVisited).replace(",","")).toLowerCase();
									proceedToCheckoutParsing.parseData($rootScope.proceedToCheckoutResponse);
									continueCheckoutParsing.parseData($rootScope.proceedToCheckoutResponse);
									$rootScope.ajaxLoader = false;
									$location.path(dynamicCartView + '/cart/co_step_fulfillment');
								}else if($rootScope.proceedToCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.continueCheckout){
									$rootScope.setExpandedStatus($rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus);
//									$rootScope.expandedStatus = $rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus.ExpandedStatus;//"shipping"
//									$rootScope.notVisited = $rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus.NotVisited;//"payment"
//									$rootScope.expandedStatus = (($rootScope.expandedStatus).replace(",","")).toLowerCase();
//									$rootScope.notVisited = (($rootScope.notVisited).replace(",","")).toLowerCase();
									
									proceedToCheckoutParsing.parseData($rootScope.proceedToCheckoutResponse);
									$rootScope.ajaxLoader = false;
									$location.path(dynamicCartView + '/cart/co_step_fulfillment');
								}else if($rootScope.proceedToCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.handleAddress){
									$rootScope.setExpandedStatus($rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus);
//									$rootScope.expandedStatus = $rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus.ExpandedStatus;//"shipping"
//									$rootScope.notVisited = $rootScope.proceedToCheckoutResponse.CheckoutResponse.CurrentStatus.NotVisited;//"payment"
//									$rootScope.expandedStatus = (($rootScope.expandedStatus).replace(",","")).toLowerCase();
//									$rootScope.notVisited = (($rootScope.notVisited).replace(",","")).toLowerCase();
									$rootScope.showNewAddressForm = true;
									$rootScope.ajaxLoader = false;
									$location.path(dynamicCartView + '/cart/co_step_fulfillment');
								}else if($rootScope.proceedToCheckoutResponse.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.login){
									$rootScope.ajaxLoader = false;
									$("#signInModal").trigger("click");
								}
							}else if($rootScope.proceedToCheckoutResponse.UserLogonResponse != undefined){     
								if($rootScope.proceedToCheckoutResponse.UserLogonResponse.StatusData.ResponseMessage == $rootScope.responseMessage.registration){
									$rootScope.ajaxLoader = false;
									$("#signInModal").trigger("click");
								}
							}else if($rootScope.proceedToCheckoutResponse.StorePickUp != undefined){
								$rootScope.ajaxLoader = false;
								$rootScope.cartError = "Please select a pick up store for your pick up items";
							}else if($rootScope.proceedToCheckoutResponse.CartResponse != undefined){
								if($rootScope.proceedToCheckoutResponse.CartResponse.Shoppingcart.CartErrorMessage != ""){
									$rootScope.ajaxLoader = false;
									$rootScope.cartError = $rootScope.proceedToCheckoutResponse.CartResponse.Shoppingcart.CartErrorMessage;
								}
							}
	
		            	});
	            	}
	            }
	        });
	    }else{
	    	$rootScope.ajaxLoader = false;
	    	$("#email"+$rootScope.userType).addClass("error");
	    }
//            	
		
	};
	//set up scope variables
	$scope.user = {name: "user name", email: $rootScope.enteredEmail, password: ""};
	$scope.defaultEmail = false;

	$scope.onLoad = function() {
		////console.log("contact template loaded");
	};
	
	$scope.changeDefault = function(){
		////console.log($scope.userEmail + " changed default settings to: " + $scope.defaultEmail);
	};
	

}]);//end contactController


WLCC.controller('giftCardController', ['$timeout', '$scope', '$rootScope', '$location', 'applyOrRemoveGCService', 'continueCheckOut', 'continueCheckoutParsing', 'payBill', 'paymentValidatorService', 'viewProfile',
    function($timeout, $scope, $rootScope, $location, applyOrRemoveGCService, continueCheckOut, continueCheckoutParsing, payBill, paymentValidatorService, viewProfile){
	$scope.giftCardAccNum = "";
	
	$scope.addGiftCard = function(){
		applyOrRemoveGCService.applyGC($scope.giftCardAccNum, $scope.giftCardPin);
		applyOrRemoveGCService.deferred.promise.then(function(){
			$scope.message = applyOrRemoveGCService.message;
			if(applyOrRemoveGCService.responseCode == 0){
				$scope.closeModal();
			}
		});
	}
	
}]);

WLCC.controller('paymentController', ['$route','$timeout', '$scope', '$rootScope', '$location', 'continueCheckOut', 'continueCheckoutParsing', 'payBill', 'paymentValidatorService', 'viewProfile', 'omnitureTagging', 'clearVariables', 'sessionVariables', 'payPalService', 'checkoutDisplay', 'checkoutDisplayService',
    function($route, $timeout, $scope, $rootScope, $location, continueCheckOut, continueCheckoutParsing, payBill, paymentValidatorService, viewProfile, omnitureTagging, clearVariables, sessionVariables, payPalService, checkoutDisplay, checkoutDisplayService){
	$scope.expressUi = false;
	//console.log($rootScope);
	// HONG PLEASE SEE IF THIS WOULD BREAK YOUR PAYPAL FLOW! ********* THIS CODE IS FOR THE REFRESH PAGE!
	if($rootScope.continueCheckoutResponse == undefined && $rootScope.getUrlVar("payPal") == undefined){
		$rootScope.orderId = localStorage.myFunnyNumber;
		checkoutDisplayService.viewPaymentPage();
		checkoutDisplayService.deferred.promise.then(function(){
			if($rootScope.userType == "R") {
				viewProfile.view();
			}
		});
	}
//	 $scope.$on('$locationChangeStart', function(event, next, current){
//	       if(next.indexOf("cart/co_step_review") == -1){
//	    	   alert("here");
//	    	   event.preventDefault();
//	       }else{
//	    	   alert("not here");
//	       }
//	    	   
//	  });

	if($rootScope.getUrlVar("payPal") == "true" && $rootScope.payPalRan == undefined) {
		$rootScope.payPalRan = true;
		sessionVariables.setSessionVariables();
		if($rootScope.userType == "R") {
			viewProfile.view();
		}
		$rootScope.ajaxLoader = true;
		if(angular.isDefined($rootScope.payPalToken)) {
			$rootScope.payPalStraightToPlaceOrder = true;
			payPalService.fetchOrderDetail();
			payPalService.fetchOrderDetailDeferred.promise.then(function(data){
				$timeout(function(){ $("a[validate-page]").trigger("handleTrigger"); }, 0);
	//			if(angular.isDefined(data.CheckoutResponse) && data.CheckoutResponse.StatusData.RespMessage  == $rootScope.responseMessage.placeOrder) {
	//				$rootScope.ajaxLoader = false;
	//				$rootScope.fetchOrderDetailData = data;
	//				payBill.payBillParsing(data);
	//				$location.path(dynamicCartView + '/cart/co_step_review');
	//			} else {
	//				$rootScope.cartErrorPayPal = $rootScope.responseMessage.payPalIneligible;
	//			}
			});
		} else { //canceled paypal
			$rootScope.expandedStatus = "payment";
			$rootScope.checkoutDisplayAddressId = $rootScope.selectedBillingAddressId;
			checkoutDisplay.ajaxCall();
			checkoutDisplay.deferred.promise.then(function() {
				$rootScope.ajaxLoader = false;
			});
		}
	}
	
	$scope.$on('$routeChangeStart', function(scope, next, current){
        ////console.log('**next page: ');////console.log(next);
		if(next.$route.controller == "errorPageCtrl"){
//            $location.path(dynamicCartView+"cart/error")
        }
        else if(next.$route.controller != "reviewController"){
			var currentTime = new Date();
				currentTime = currentTime.getTime();
				$location.path(dynamicCartView +"cart/viewcart/"+currentTime);
				clearVariables.clear();
		}
		$rootScope.isLoading = true;
		$('#co-modal, #co-modal-bg').remove();
		$('body').removeClass('modaled');
	});
	$rootScope.templateSource = "payment";
//        $scope.savedCards.prototype.addPaymentMethodType=function()

    //listen for user updates, change selected payment method
    $scope.$on('updatePayment', function(event, args){
        ////console.log('payment method changed to: '+ args);
    });

    /*********** Omniture tag page **************/
    omnitureTagging.tag("OmniturePageView", "Payment Method");

/*************************************** CREDIT CARD ************************************/
	$scope.selectCard = function(index){  //cardType, cardName, cardNumber, cardSecurityCode, expMonth, expYear
//        ////console.log('selected Index ' + index);
        if (index == -1) return ; //forcqe leave

        //REMOVING ERRO
        $('.cvvErrorOn').removeClass('cvvErrorOn').addClass('cvvErrorOff');
        /**************** SETTING FLAGS AND CONFIGS ***************************************/
            var _this = $('#card'+index);   // GREP SELECTED RADIO
            _this.parent().addClass('selected').removeClass('unselected'); // MARK CLASS I THINK SHOWS CVV
            $('li[id^=item]').not(_this.parent()).addClass('unselected').removeClass('selected');

            $('input.creditCards').not(_this).prop('checked', false); // CLEAR OTHER RADIO BUT SHOULD LEAVE THIS.
            _this.prop('checked', true);
            $rootScope.selectedCreditCardIndex = index; // SET TO ROOTSCOPE
            $('#cvv'+index).focus(); // FOCUS
//            $('input.cvv').not(_this).val('');//nullify all other cvv inputs
        /**********************************************************************************/
        //      SELECTS CARD TO $rootScope.selectedCreditCardInfo
        /**********************************************************************************/
        if ($rootScope.modifiedSavedCards[index].TrueAccount != undefined){//NEW CARD
            $rootScope.selectedCreditCardInfo = $rootScope.mergeObj($rootScope.newCreditCard,{
                'MaskedAccount': $rootScope.newCreditCard.TrueAccount    // GIVE REAL CREDIT CARD NUMBER TO PASS
            });
            $rootScope.savedCreditCardUsed = 'N';
            //console.log('**using new CC.');//console.log($rootScope.selectedCreditCardInfo);
        }else{ //SAVED CARD
            $rootScope.selectedCreditCardInfo = $rootScope.modifiedSavedCards[index];
            $rootScope.savedCreditCardUsed = 'Y';
            //console.log('**using saved CC. ' + $rootScope.selectedCreditCardIndex);//console.log($rootScope.selectedCreditCardInfo);
        }
	};
	$scope.selectOtherPayment = function(isPayPal) {
		$rootScope.invokePayPalCO = (isPayPal == true) ? true : false;
	};
	
	$scope.hidePayPal = function() {
		if($rootScope.checkoutError != $rootScope.responseMessage.payPalIneligible && $rootScope.payPalRan == undefined)
			return true;
		else
			return false;
	};
    //INITIALIZE by Selecting First Card
/*    if ($rootScope.numberOfSavedCreditCards > 0){
        ////console.log($rootScope.modifiedSavedCards);
        ////console.log('Will Automatically Select First Card');
        $timeout(function(){
            $scope.selectCard(0);
        },250);
    }*/

    // INITIALLY CHECK IF EXPRESS PAYMENT IS ON.
    $scope.init = function(){
        if(!!$rootScope.expressPayMethod){
            var need2Select = $rootScope.expressPayMethod.PIId;
            for (index in $rootScope.modifiedSavedCards){
                //console.log('&&comparing ' + need2Select + ' vs. ' + $rootScope.modifiedSavedCards[index].Edp_PIID);
                if (need2Select == $rootScope.modifiedSavedCards[index].Edp_PIID){
                    //console.log(index + ' need to be selected b/c of EXPRESS CHECKOUT');
                    $timeout(function(){
                        $scope.selectCard(index);
                    },0);
                }
            }
        }
    };
}]); // end of new payment controller

WLCC.controller('addCreditCardCtrl', ['$rootScope', '$scope', '$timeout', function($rootScope, $scope, $timeout){
    /*   Invisible Objects:    scope temp Variables: card     rootScope Variables: newCreditCard{}   */
    $scope.card ={submit: false}; // INITIALIZE
    $scope.saveCardProfile = function(){ // AFTER

        $scope.card.submit = true;
        if ($scope.card.$valid){
            //************* Setting Flags and Filling the Gap ****************
            $scope.closeModal();// CLOSE ADD CREDIT CARD MODAL
            $rootScope.hasSavedCreditCards = true;
            $rootScope.modifiedSavedCards.splice($rootScope.numberOfSavedCreditCards,1); // REMOVE EXISTING SAVED CREDIT CARD
            var maskedCard = $rootScope.mergeObj($scope.card,{
                savedCreditCardUsed: 'N',
                WalletPayMethodId: 'CREDITCARD',
//                WalletPayMethodId: $scope.card.WalletBrand,
                TrueAccount: $scope.card.MaskedAccount,
                CardType: $scope.card.WalletBrand,
                MaskedAccount: $rootScope.maskCCN($scope.card.MaskedAccount),
                WalletExpiryMonth: $scope.card.expiryDateParsed.substring(0,2),
                WalletExpiryYear: $scope.card.expiryDateParsed.substring(3),
                ExpiryDate: $scope.card.expiryDateParsed,
                cvvSize: ($scope.card.WalletBrand == 'AMEX') ? 4 : 3
            });
            //****************************************************************//
            $rootScope.newCreditCard = maskedCard; // SAVE A COPY INTO ROOTSCOPE
            $rootScope.modifiedSavedCards.push(maskedCard);
            $timeout(function(){
                $scope.selectCard($rootScope.modifiedSavedCards.length-1);//selects this new card;
            }, 100);
            ////console.log('saving New Credit Card: '); ////console.log(maskedCard);
            return true;
        }else {
            return false;
        };
    };
}]);


WLCC.controller('reviewController', ['$scope', '$rootScope', '$location', 'payBill', 'omnitureTagging', 'clearVariables', 'checkoutDisplayService', 'viewProfile', function($scope, $rootScope, $location, payBill, omnitureTagging, clearVariables, checkoutDisplayService, viewProfile){
	$rootScope.templateSource = "review";
	//$rootScope.ajaxLoader = true;
	//payBill.checkOut(); 
//	 $scope.$on('$locationChangeStart', function(event, next, current){
//	       if(next.indexOf("cart/co_step_confirmation") == -1){
//	    	   alert("here");
//	    	   event.preventDefault();
//	       }else{
//	    	   alert("not here");
//	       }
//	    	   
//	  });
	// or $rootScope.reviewPayment
	if($rootScope.payBillResponse == undefined){
		$rootScope.orderId = localStorage.myFunnyNumber;
		$rootScope.selectedBillingAddressId = localStorage.myFunnyNumber2;
		checkoutDisplayService.viewReviewPage();
		checkoutDisplayService.deferred.promise.then(function(){
			if($rootScope.userType == "R") {
				viewProfile.view();
			}
			payBill.preparingDataForReview();
		});
	}
	
	/*********** Omniture tag page **************/
    omnitureTagging.tag("OmniturePageView", "Review Order");
	/***** TO CONGWEN: THIS LOGIC IS RUINING THE BACK BUTTON FUNCTIONALITY ********/
	 $scope.$on('$routeChangeStart', function(scope, next, current){
//         ////console.log('!!going from...');////console.log(current);////console.log(' to ');////console.log(next);
          if($rootScope.templateSource == 'payment'){
              $location.path(dynamicCartView+"cart/co_step_payment");
          }
		  else if(next.$route.controller != "confirmationController"){
			  var currentTime = new Date();
				currentTime = currentTime.getTime();
			  $location.path(dynamicCartView +"cart/viewcart/"+currentTime);
			  clearVariables.clear();
	       }
		  $rootScope.isLoading = true;
		  $('#co-modal, #co-modal-bg').remove();
		  $('body').removeClass('modaled');
	  });
	
	 
	$scope.$on('repeatReady', function(){
		
		var l = Number($('#review-items').children().length);
		var w = Number(l*155);
		////console.log(l);
		$('.wlccCartPage .touchSlider').css({width: w+'px'});
		if (l>1){Zepto('#review-items').flickable({segments:l});}
		// If you're on a desktop, show next/prev links for mouse navigation
		$('#test-nav').append('<p><a class="prev">Prev</a> | <a class="next">Next</a></p>');
		$('.next').click(function() { Zepto('#review-items').flickable('scrollNext');});
		$('.prev').click(function() { Zepto('#review-items').flickable('scrollPrev');});
	});
	
	//payBill.deferred.promise.then(function(){
		//$rootScope.ajaxLoader = false;
		////console.log(payBill.json);
		
		$scope.reviewItems = $rootScope.reviewItems;//payBill.json.CheckoutResponse.OrderSummary.OrderSummaryItem;
		$scope.reviewPayment = $rootScope.reviewPayment;
	//});//end .then statement
}]);//end review controller


WLCC.controller('registerGuestController', ['$scope', '$rootScope', '$rootScope', '$location', 'userRegistration', function($scope, $rootScope, $rootScope, $location, userRegistration){
	$scope.zipcode = $rootScope.zipcode;
	$scope.userPassword = "";
	 $scope.register = function(){
		if(!$("#password").hasClass("error") && $scope.userPassword != ""){// && $rootScope.zipcode != "" && $rootScope.zipcode){
			////console.log($scope.zipcode);
	     	userRegistration.register($scope.userPassword);
		}
     }
}]);

WLCC.controller('confirmationController', ['$scope', '$rootScope', '$rootScope', '$location', 'placeOrder', 'callBacks', 'userRegistration', '$timeout', 'omnitureTagging', 'clearVariables', 'carouselImages',
    function($scope, $rootScope, $rootScope, $location, placeOrder, callBacks, userRegistration, $timeout, omnitureTagging, clearVariables, carouselImages){
	$rootScope.templateSource = "confirmation";
	$rootScope.isCheckout = false;
	$scope.userPassword = "";
	
//	 $scope.$on('$locationChangeStart', function(event, next, current){
//	       if(next.indexOf("cart/co_step_review") == -1){
//	    	   alert("here");
//	    	   event.preventDefault();
//	       }else{
//	    	   alert("not here");
//	       }
//	    	   
//	  });
	
	carouselImages.products();
	if($rootScope.hasSywAccountInfo == "true" & $rootScope.userType == "R" ){
		carouselImages.offers();
	}
	
	$scope.$on('repeatReady', function(){
		var l = Number($('#related-items').children().length);
		var w = Number(l*155);
		$('.wlccCartPage .touchSlider').css({width: w+'px'});
		if (l>1){Zepto('#related-items').flickable({segments:l});}
	});
	 
	 
	 $scope.$on('$routeChangeStart', function(scope, next, current){
		 //console.log(next);
		 //console.log(current);
		  if(next.$route.controller == "reviewController"){
			  var currentTime = new Date();
				currentTime = currentTime.getTime();
			  $location.path(dynamicCartView +"cart/viewcart/"+currentTime);
			  clearVariables.clear();
			  $scope.clearData();
	       }
		  $rootScope.isLoading = true;
		  $('#co-modal, #co-modal-bg').remove();
		  $('body').removeClass('modaled');
	  });
	
	$scope.clearData = function(){
		if($rootScope.userType=="registered"){
			  $rootScope.userType=="G";
		}
	};
	
		////console.log("Place Order Data: " + JSON.stringify($rootScope.confirmationData));
    
        $scope.confirmationNumber = $rootScope.confirmationData.CheckoutResponse.ServiceHeaders.OrderId;
        /*********** Omniture tag page **************/
        omnitureTagging.tag("OmnitureOrderConfirmation", "Order Confirmation");
    
        $scope.exitCheckout = function(){
        	var userAgent = $rootScope.wlccUserAgent;
            
            wlccContinueShopping(); 
        }

        
}]);

WLCC.controller('modalController', ['$scope', '$templateCache', '$compile', function($scope, $templateCache, $compile){
	//create a 'History' stack for our in-modal navigation
	$scope.goBack = function(){	
		var prevInclude;
		var prevTemplate = $scope.modalHistory.pop();
		$scope.template = $templateCache.get(prevTemplate);
		$scope.currentScreen = prevTemplate;
		prevTemplate = $scope.template[1];
		prevInclude = $compile(prevTemplate)($scope);	
		$('#co-modal-inc').html(prevInclude[0]);
	};
	$scope.addInclude = function(){
		var newTemplate = $scope.template[1];
		var newInclude = $compile(newTemplate)($scope);	
		$('#co-modal-inc').html(newInclude[0]);
	};
	$scope.modalScreen = function(tmpl){
		var newTemplate = String(tmpl);
		$scope.modalHistory.push($scope.currentScreen);
		$scope.currentScreen = newTemplate;
		$scope.template = $templateCache.get(newTemplate);
		$scope.addInclude();
	};
}]);//end modalController






WLCC.controller('promoCodeController', ['$scope', '$q', '$timeout', '$rootScope','applyOrRemoveCoupon', function($scope, $q, $timeout, $rootScope, applyOrRemoveCoupon){
	
//	$rootScope.promoCodeApplied = false;

		
		$scope.applyCoupon = function(){
		$rootScope.promoCodeMessage = "";
//		alert($scope.$$childHead.theEnteredCode);
		//FAIR WARNING: IF HTML CHANGES AND SCOPES ARE ADDED THIS VALUE WILL CHANGE!
		applyOrRemoveCoupon.deferred = $q.defer();
		applyOrRemoveCoupon.coupon("add", $scope.$$childHead.theEnteredCode);
		
		applyOrRemoveCoupon.deferred.promise.then(function(){
			if(applyOrRemoveCoupon.json.CartResponse.StatusData.ResponseCode == 0){
				var json = applyOrRemoveCoupon.json.CartResponse.Shoppingcart.Summary;
				$rootScope.promoCodeMessage = json.SavingsBreakdown.CouponDiscounts.CouponDiscount.ShortDescription;
				$rootScope.summary = $rootScope.removeCurrency(json);
//				$rootScope.theEnteredCode = $scope.$$childHead.theEnteredCode;
				$scope.$$childHead.theEnteredCode = "";
				$scope.promoCodeApplied = true;
			}else{
				$rootScope.promoCodeMessage = applyOrRemoveCoupon.json.CartResponse.StatusData.RespMessage;
			}
		});
	};
	
	$scope.removeCoupon = function(){
		$rootScope.promoCodeMessage = "";
		applyOrRemoveCoupon.deferred = $q.defer();
		applyOrRemoveCoupon.coupon("remove", "");
		applyOrRemoveCoupon.deferred.promise.then(function(){
			if(applyOrRemoveCoupon.json.CartResponse.StatusData.ResponseCode == 0){
				var json = applyOrRemoveCoupon.json.CartResponse.Shoppingcart.Summary;
				$rootScope.summary = $rootScope.removeCurrency(json);
				////console.log($rootScope.summary);
				$rootScope.promoCodeMessage = "";
				$scope.$$childHead.theEnteredCode = "";
				$scope.promoCodeApplied = false;
			}else{
				$rootScope.promoCodeMessage = applyOrRemoveCoupon.json.CartResponse.StatusData.RespMessage;
			}
		});
	};
	
	$('#promoCodeForm').submit(function(){
		if ($scope.promoCodeApplied) {
			////console.log("hello");
			$scope.removeCoupon();
			alert('submit');
		} else {
			////console.log("hello");
			$scope.applyCoupon();
			alert('submit');
		}
	});
	
}]);

//WLCC.controller('ecouponsCodeController', ['$scope', '$q', '$timeout', '$rootScope','applyOrRemoveCoupon', function($scope, $q, $timeout, $rootScope, applyOrRemoveCoupon){

//		$scope.applyCoupon = function(){
//		$rootScope.promoCodeMessage = "";
////		alert($scope.$$childHead.theEnteredCode);
//		//FAIR WARNING: IF HTML CHANGES AND SCOPES ARE ADDED THIS VALUE WILL CHANGE!
//		applyOrRemoveCoupon.deferred = $q.defer();
//		applyOrRemoveCoupon.coupon("add", $scope.$$childHead.theEnteredCode);
//		
//		applyOrRemoveCoupon.deferred.promise.then(function(){
//			if(applyOrRemoveCoupon.json.CartResponse.StatusData.ResponseCode == 0){
//				var json = applyOrRemoveCoupon.json.CartResponse.Shoppingcart.Summary;
//				$rootScope.promoCodeMessage = json.SavingsBreakdown.CouponDiscounts.CouponDiscount.ShortDescription;
//				$rootScope.summary = $rootScope.removeCurrency(json);
////				$rootScope.theEnteredCode = $scope.$$childHead.theEnteredCode;
//				$scope.$$childHead.theEnteredCode = "";
//				$scope.promoCodeApplied = true;
//			}else{
//				$rootScope.promoCodeMessage = applyOrRemoveCoupon.json.CartResponse.StatusData.RespMessage;
//			}
//		});
//	};
//	
//	$scope.removeCoupon = function(){
//		$rootScope.promoCodeMessage = "";
//		applyOrRemoveCoupon.deferred = $q.defer();
//		applyOrRemoveCoupon.coupon("remove", "");
//		applyOrRemoveCoupon.deferred.promise.then(function(){
//			if(applyOrRemoveCoupon.json.CartResponse.StatusData.ResponseCode == 0){
//				var json = applyOrRemoveCoupon.json.CartResponse.Shoppingcart.Summary;
//				$rootScope.summary = $rootScope.removeCurrency(json);
//				////console.log($rootScope.summary);
//				$rootScope.promoCodeMessage = "";
//				$scope.$$childHead.theEnteredCode = "";
//				$scope.promoCodeApplied = false;
//			}else{
//				$rootScope.promoCodeMessage = applyOrRemoveCoupon.json.CartResponse.StatusData.RespMessage;
//			}
//		});
//	};
//}]);
WLCC.controller("productOptionsController", ['productOptionService', 'productOptionAjaxService', "$scope", "$rootScope", "$location", "$routeParams", "$timeout", "viewCartOrUpdateCart", "viewCartResponse",
function(productOptionService, productOptionAjaxService, $scope, $rootScope, $location, $routeParams, $timeout, viewCartOrUpdateCart, viewCartResponse) {
	var productOptions = $rootScope.items[$rootScope.selectedItemPO].AvailableProductOptions;
	$timeout(function(){productOptionService.parseProductOptionType(productOptions, $scope);}, 0); //determine which categories to be displayed

	//Ajax params: 
	productOptionService.ajaxArray.in_orderId = $rootScope.orderId;
	productOptionService.ajaxArray.in_sessionKey = $rootScope.token;
	productOptionService.ajaxArray.in_userType = $rootScope.userType;
	productOptionService.ajaxArray.in_orderItemId = $rootScope.items[$rootScope.selectedItemPO].OrderItemID;
	
	$scope.updateInstallation = function(data){
		var items = $rootScope.objToArray(data.CartResponse.Shoppingcart.OrderItems.OrderItem);
		var newPOIndex = -1;
		
		for(var i in items) {
			if(items[i].OrderItemID == $rootScope.selectedOrderItemId) {
				newPOIndex = i;
				break;
			}
		}
		//console.log($rootScope.items[$rootScope.selectedItemPO]);
		
		viewCartOrUpdateCart.updateSelectedProductOption(items[newPOIndex], $rootScope.selectedItemPO);
		$rootScope.selectedPOPrice.splice($rootScope.selectedItemPO, 1, $rootScope.selectedPOPrice.pop());
		$rootScope.selectedProductOption.splice($rootScope.selectedItemPO, 1, $rootScope.selectedProductOption.pop());
		$rootScope.items[$rootScope.selectedItemPO].AvailableProductOptions = items[newPOIndex].AvailableProductOptions;
		
		var installation = $rootScope.items[$rootScope.selectedItemPO].AvailableProductOptions.Installation;
		$scope.installation = angular.isDefined(installation) ? $rootScope.objToArray($rootScope.items[$rootScope.selectedItemPO].AvailableProductOptions.Installation) : $rootScope.objToArray($rootScope.items[$rootScope.selectedItemPO].AvailableProductOptions.HaulAway);
		viewCartOrUpdateCart.inputTypeForMultipleInstallation();
		$rootScope.$broadcast("reSetUpList");
	};
	
	$scope.needInstallation = function(installation) {
		if(installation.Description == "Yes, I need installation.") {
			installation.Description = "SEARS Professional Installation";
		} else if(installation.Description.toLowerCase().indexOf("haul") > -1) {
			installation.Description = "I would like my old item hauled away";
		}
		return installation.Description;
	};
	
	$scope.hasPrice = function(productOptionType) {
		if(!productOptionType.hasOwnProperty("Price") && productOptionType.Description != "SEARS Professional Installation")
			productOptionType.Price = "";
		else if(productOptionType.Description == "SEARS Professional Installation") {
			productOptionType.Price = "Select for Price";
		} else if(productOptionType.hasOwnProperty("Price") && productOptionType.Price != "") {
			productOptionType.Price = $rootScope.numberToCurrency(productOptionType.Price);
			if(productOptionType.Price.indexOf("add") == -1){
				productOptionType.Price = "add " + productOptionType.Price;
			}
		}
		return productOptionType.Price;
	};
	
	$scope.checkInputType = function(productOption, isChild) {
		if(productOption != undefined) {
			if(productOption.hasOwnProperty("IsCheckBox") && productOption.IsCheckBox == "Y") {
				if(!isChild) {
					return "ui-checkbox";
				} else {
					return "ui-checkboxChild";
				}
			} else if(typeof isChild == 'boolean') {
				if(!isChild) {
					return "ui-radio";
				} else {
					return "ui-radioChild";
				}
			} else if(productOption.hasOwnProperty("IsRadioButton") && productOption.IsRadioButton == "Y"){
				return "ui-radioGrandChild";
			} else {
				return "ui-checkboxGrandChild";
			}	
		}
	};
	
	 $scope.updateCart = function(){
	    	viewCartResponse.viewCart();
	    	viewCartResponse.deferred.promise.then(function(){
	    		viewCartOrUpdateCart.updateToRootScope(viewCartResponse.json);
	    	});
		};
	
    //console.log("~~~~~~~~~~~~~~~~Current Selected PO~~~~~~~~~~~~~~~~~~~~~~");
    //console.log($rootScope.selectedProductOption);
}]);

WLCC.controller("addressFormController", ["$scope", "$rootScope", "$location", "handleAddress", "continueCheckoutParsing", 'continueInstallationAjaxService', 
function($scope, $rootScope, $location, handleAddress, continueCheckoutParsing, continueInstallationAjaxService){
	$scope.$on("stateChange", function(e, state) {
		e.stopPropagation();
		$scope.state = state;
	});
	
	$scope.$on("countyChange", function(e, county) {
		e.stopPropagation();
		$scope.county = county;
	});
	
	$scope.addNewAddress = function() {
		
		if($scope.state == undefined && $scope.$$childTail.newAddState != undefined){
			$scope.state = $scope.$$childTail.newAddState;
		}
		
		if($rootScope.showNewAddressForm) {
			$scope.fromPage = "Shipping";
			$scope.isFirstAddress = true;
			
		} else if(angular.isDefined($scope.item) && $scope.item.hasOwnProperty("ShippingOptions")) {
			$scope.fromPage = "Shipping";
		} else if($rootScope.expandedStatus == "shipping"){
			$scope.fromPage = "Shipping";
		}else if($rootScope.expandedStatus == "delivery") {
			$scope.fromPage = "Delivery";
		} else if($rootScope.expandedStatus == "payment") {
			$scope.fromPage = "Billing";
			$scope.sameAsBilling = "Y";
		} 
		
		if(angular.isDefined($rootScope.addressList) && $rootScope.addressList.length > 0) {
			$scope.isFirstAddress = false;
		} else {
			$scope.isFirstAddress = true;
		}
		
		var sameAsBilling = ($("body").find("#sameAsBilling").prop("checked") == true) ? "Y" : "N";
		//console.log($scope);
		
		$rootScope.enteredAddressValues = {
				"firstName": $scope.newAddFirstName,
				"lastName" : $scope.newAddLastName,
				"address1" : $scope.newAddAddress,
				"address2" : ($scope.newAddAddress2 == undefined)? "": $scope.newAddAddress2,
				"city" : $scope.newAddCity,
				"state" : $scope.state,
				"zipCode": $scope.$$childTail.newAddZipUS,
				"phone1" : $scope.$$childTail.newAddPhoneUS, //"2345678901",
				"fromPage" : $scope.fromPage, //"shipping",
				"sameAsBilling" : $scope.sameAsBilling,//"Y"
				"isFirstAddress" : $scope.isFirstAddress,
				"country": $rootScope.country,
				"county" : $scope.county,
		};
//		if($scope.county != undefined) {
//			$rootScope.enteredAddressValues.
//		}
		handleAddress.checkOut();
		handleAddress.deferred.promise.then(function(data) { //successful
			if($rootScope.showNewAddressForm) { //When it's first address
				$scope.$emit("addAddressComplete");
				$rootScope.showNewAddressForm = false;
				if(data.CheckoutResponse != undefined && data.CheckoutResponse.StatusData.ResponseCode == 0 && data.CheckoutResponse.StatusData.RespMessage == $rootScope.responseMessage.payBill){
                    continueCheckoutParsing.parseData($rootScope.proceedToCheckoutResponse);
                    $location.path(dynamicCartView + 'cart/co_step_payment');
               } else if($rootScope.removeOverSizedItem.length > 0) {
            	   $location.path(dynamicCartView + 'cart/viewcart');
               }
			} else { //When user wants to add more address
				$scope.$emit("addAddressComplete");
			}
			if($scope.closeModal != undefined){
				$scope.closeModal();
			}
		}, function(reason) { //failed
			if(reason == "wrong input") {
//				if($rootScope.showNewAddressForm) {
				$scope.$broadcast("wrongInputCombo");
//				} else {
//					$scope.$broadcast("wrongInputCombo");
//				}
			} else {//county
				$scope.hasCounty = true;
				$scope.addressCounty = reason.AddressValidationResponse.AvailableCounty.County;
			}
		});
	};
	
	$scope.addInstallationAddress = function() {
		
	}
}]);

WLCC.controller("installationAddressFormController", ["$rootScope", "$scope", function($rootScope, $scope) {
	$scope.installationAddress = {
		address: "",
		city: "",
		zipcode: "",
		state: "",
	};
	
	$scope.$on("stateChange", function(e, state) {
		e.stopPropagation();
		$scope.state = state;
	});
	                    	
	$scope.storeInstallationAddress = function() {
		localStorage.setItem("installationAddress", $scope.installationAddress.address);
		localStorage.setItem("installationCity", $scope.installationAddress.city);
		localStorage.setItem("installationZipcode", $scope.installationAddress.zipcode);
//		localStorage.setItem("installationZipcode", $scope.$$childTail.newAddZipUS);
		localStorage.setItem("installationState", $scope.state);
	};
	
	$scope.hasChildOptionPrice = function(productOptionType) {
		if(!productOptionType.hasOwnProperty("Price")) {
			productOptionType.Price = "";
		} else {
			if(productOptionType.Price.indexOf("add") == -1) {
				if(productOptionType.Price == "") {
					if(productOptionType.hasOwnProperty("tmpPrice")) {
						productOptionType.Price = "add " + $rootScope.numberToCurrency(productOptionType.tmpPrice);
					} else if(productOptionType.hasOwnProperty("priceBD")) {
						productOptionType.Price = "add " + $rootScope.numberToCurrency(productOptionType.priceBD);
					}
				} else {
					productOptionType.Price = "add " + productOptionType.Price;
				}
			}
		}
		return productOptionType.Price;
	};
}]);
"use restrict";
WLCC.directive("hasAddress", ['$timeout', function($timeout) {
	return {
		restrict: "C",
		scope: false,
		link: function(scope, element, attr) {
			$timeout(function(){scope.displayRequiredTabs();});
		}
	};
}]);

WLCC.directive("promoRemoveIcon", ['$rootScope', function($rootScope) {
	return{
		restrict: "A",
		link: function(scope, element, attr){
			element.bind($rootScope.myEvent, function() {
				if(element.attr("class").indexOf("untoggled") == -1) {
					toggled = true;
				} else toggled = false;
				$rootScope.transitionalCss("class", "detail-content", toggled, 20);
				
				if(toggled == true){
					toggled = false;
					$(".details-toggler").removeClass("toggled").addClass("untoggled");
				} else {
					$(".details-toggler").removeClass("untoggled").addClass("toggled");
					toggled = true;
				}
			});
		}
	};
}]);

/** This appends a template on the current element **/
WLCC.directive("appendTemplate", ['$rootScope', '$compile', '$timeout', '$http', '$templateCache', function($rootScope, $compile, $timeout, $http, $templateCache) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			$http({
				method : "GET",
				cache : $templateCache,
				url : attr.appendTemplate
			});
			
			$timeout(function(){
				element.append($compile($templateCache.get(attr.appendTemplate)[1])(scope));
			}, 300);
				
		}
	};
}]);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Product Options Directive~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**locate in the viewcart page**/
WLCC.directive("productOptionButton", ['$rootScope', '$location', function($rootScope, $location){
	return {
		restrict: "A",
		link: function(scope, element, attr) {
			var productOption = $rootScope.items[scope.$index].AvailableProductOptions;
			if(productOption.hasOwnProperty("GiftWrap")) {
				$rootScope.items[scope.$index].GiftWrap = productOption.GiftWrap;
				delete productOption.GiftWrap;
			} else {
				$rootScope.items[scope.$index].GiftWrap = "";
			}
			if(productOption == "" || JSON.stringify(productOption) == "{}") element.remove();
			
			element.bind($rootScope.myEvent, function() {
				$rootScope.selectedItemPO = scope.$index;
				$rootScope.selectedOrderItemId = $rootScope.items[$rootScope.selectedItemPO].OrderItemID;
			});
		}
	};
}]);

WLCC.directive("dexluxe", ['$rootScope', '$timeout', 'productOptionService', function($rootScope, $timeout, productOptionService) {
	return {
		restrict:"A",
		scope: "=",
		link: function(scope, element, attr) {
			scope.$on("readyToBind",function(){
			element.bind($rootScope.myEvent, function(){
				scope.$apply(function(){
					if(element.hasClass("deselected")) {
						if((deluxeIndex = productOptionService.deluxeAjaxArray.lineItemTypeSC) != "") {
							productOptionService.removeDeluxe();
						}
					} else {
						productOptionService.addDeluxe(scope);
					}
				});
			});
			});
		}
	};
}]);

WLCC.directive("protectionAgreements", ['$rootScope', '$timeout', 'productOptionService', function($rootScope, $timeout, productOptionService) {
	return {
		restrict:"A",
		scope: "=",
		link: function(scope, element, attr) {
			scope.$on("readyToBind",function(){
			element.bind($rootScope.myEvent, function(){
				scope.indexOfPreviousSelectedProtectionAgreements = -1;
				scope.$apply(function(){
					if(element.hasClass("deselected")) {
						productOptionService.removePA();
					} else {
						if(!productOptionService.isAlreadySelected(element.attr("pcatentryid"))) {
							//console.log("add PA");
							productOptionService.addPA(scope);
						}
					}
				});
			});
			});
		}
	};
}]);

WLCC.directive("protectionPlan", ['$rootScope', 'productOptionService', function($rootScope, productOptionService) {
	return {
		restrict:"A",
		scope: "=",
		link: function(scope, element, attr) {
			scope.$on("readyToBind",function(){
				element.bind($rootScope.myEvent, function(){
					scope.$apply(function(){
						if(element.hasClass("deselected")) {
							productOptionService.removePP();
						} else {
							if(!productOptionService.isAlreadySelected(element.attr("pcatentryid"))) {
								productOptionService.addPP(scope);
							}
						}
					});
				});
			});
		}
	};
}]);

WLCC.directive("roadHazard", ['$rootScope', 'productOptionService', function($rootScope, productOptionService) {
	return {
		restrict:"A",
		scope: "=",
		link: function(scope, element, attr) {
			scope.$on("readyToBind",function(){
				element.bind($rootScope.myEvent, function(){
					scope.$apply(function(){
						if(element.hasClass("deselected"))
							productOptionService.removeRH();
						else {
							if(!productOptionService.isAlreadySelected(element.attr("pcatentryid"))) {
								//console.log("added Road Hazard");
								productOptionService.addRH(scope);
							}
						}
					});
				});
			});
		}
	};
}]);


WLCC.directive("smartPlan", ['$rootScope', 'productOptionService', function($rootScope, productOptionService) {
	return {
		restrict:"A",
		scope: "=",
		link: function(scope, element, attr) {
			scope.$on("readyToBind",function(){
				element.bind($rootScope.myEvent, function(){
					scope.$apply(function(){
						if(element.hasClass("deselected"))
							productOptionService.removeSP();
						else {
							if(!productOptionService.isAlreadySelected(element.attr("pcatentryid"))) {
								//console.log("add smart plan");
								productOptionService.addSP(scope);
							}
						}
					});
				});
			});
		}
	};
}]);

WLCC.directive("submitProductOptionButton", ['$rootScope', '$timeout', 'productOptionAjaxService', 'viewCartOrUpdateCart', function($rootScope, $timeout, productOptionAjaxService, viewCartOrUpdateCart){
	return {
		restrict: "A",
		scope: false,
		link: function(scope, element, attr){
			element.bind($rootScope.myEvent, function() {
				$timeout(function(){
					productOptionAjaxService.applyInstallationAjax();
					productOptionAjaxService.deferred.promise.then(function(){
						if(!productOptionAjaxService.hasChanged && angular.isDefined(productOptionAjaxService.removedPOData)) {
							viewCartOrUpdateCart.updateToRootScope(productOptionAjaxService.removedPOData);
							delete productOptionAjaxService.removedPOData;
							delete $rootScope.displayInstallationNote;
						}
//						scope.updateCart();
						scope.closeModal();
					});
				}, 0);
			});
		}
	};
}]);

WLCC.directive("descriptionToggler", ['$rootScope', function($rootScope) {
	return {
		restrict: "A",
		scope: false,
		link: function(scope, element, attr) {
			element.bind($rootScope.myEvent, function() {
				if(element.parent().children().hasClass("untoggled")) {
					element.html("less");
					element.parent().children().removeClass("untoggled").addClass("toggled");
				} else {
					element.html("more");
					element.parent().children().removeClass("toggled").addClass("untoggled");
				}
			});
		}
	};
}]);

/** Check if the current PO is selected from before **/
WLCC.directive("poIsApplied", ['$timeout', '$rootScope', 'productOptionService', 'productOptionAjaxService', function($timeout, $rootScope, productOptionService, productOptionAjaxService) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			$timeout(function() {
				productOptionService.checkSelectedProductOption(element);
			}, 0);
			
			scope.$on("repeatReady", function() {
				$timeout(function() {
					if($(element[0]).parent().find(".selected").length == 0) {
						$(element[0]).parent().find(".deselected").removeClass("unselected").addClass("selected");
					}
				}, 0);
			});
			
			scope.$on("readyToBind", function() {
				element.bind($rootScope.myEvent, function(){
					var itemIndex = $rootScope.selectedItemPO;
					var selectedPOArray = $rootScope.selectedProductOption[itemIndex];
					var itemType = element.attr("name");
					for(var i in selectedPOArray) {
						if(element.attr("pcatentryid") == "" || !productOptionService.isAlreadySelected(element.attr("pcatentryid"))) {
							if(itemType == selectedPOArray[i].type) {
								//console.log("removing PO");
								productOptionAjaxService.removeProductOptionAjax(selectedPOArray[i]);
								$rootScope.selectedProductOption[itemIndex].splice(i, 1);
							}
						}
					}
				});
			});
		}
	}
}]);

WLCC.directive("poIsAppliedForInstallation", ['$timeout', '$rootScope', 'productOptionService', 'productOptionAjaxService', function($timeout, $rootScope, productOptionService, productOptionAjaxService) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			$timeout(function() {
				productOptionService.checkSelectedProductOption(element);
			}, 0);
			
			scope.$on("repeatReady", function() {
				$timeout(function() {
					if($(element[0]).parent().find(".selected").length == 0) {
						$(element[0]).parent().find(".deselected").removeClass("unselected").addClass("selected");
					}
				}, 0);
			});
			
			scope.$on("readyToRemoveMore", function(event) {
				event.stopPropagation();
				$rootScope.selectedProductOption[$rootScope.selectedItemPO].length;
				var itemIndex = $rootScope.selectedItemPO;
				var selectedPOArray = $rootScope.selectedProductOption[itemIndex];
				if(element.attr("input-type") == "ui-radio") {
					for(var i in selectedPOArray) {
						var itemType = element.attr("name");
						if(element.attr("pcatentryid") == "" || !productOptionService.isAlreadySelected(element.attr("pcatentryid"))) {
							if(itemType == selectedPOArray[i].type || (itemType == "Installation" && selectedPOArray[i].type == "HaulAway")) {
								productOptionAjaxService.removeProductOptionAjax(selectedPOArray[i], scope, "installation");
								$rootScope.selectedProductOption[itemIndex].splice(i, 1);
								break;
							}
						} 
					}
				} else if(!element.hasClass("selected")){
					for(var i in selectedPOArray) {
						if(selectedPOArray[i].option.PCatEntryId == scope.installationOption.PCatEntryId) {
							//console.log("installation to remove found");
							productOptionAjaxService.removeProductOptionAjax(selectedPOArray[i], scope, "installation");
							$rootScope.selectedProductOption[itemIndex].splice(i, 1);
							$rootScope.displayInstallationNote = true;
							break;
						}
					}
				}
			});
			
			scope.$on("readyToBind", function() {
				element.bind($rootScope.myEvent, function() {
					scope.$emit("readyToRemoveMore");
				});
			});
		}
	}
}]);

WLCC.directive("poIsAppliedForRequiredAccessory", ['$timeout', '$rootScope', 'productOptionService', 'productOptionAjaxService', function($timeout, $rootScope, productOptionService, productOptionAjaxService) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			$timeout(function() {
				productOptionService.checkSelectedProductOption(element);
				scope.addSelectedRequiredAccessory();
				$rootScope.toggledRA = false;
			}, 0);
			
			scope.$on("repeatReady", function() {
				$timeout(function() {
					if($(element[0]).parent().find(".selected").length == 0) {
						$(element[0]).parent().find(".deselected").removeClass("unselected").addClass("selected");
					}
				}, 0);
			});
			
			scope.addSelectedRequiredAccessory = function() {
				if($(element[0]).hasClass("selected") && $(element[0]).attr("input-type") == "ui-checkbox") {
//					productOptionService.addRA(scope);
					productOptionService.addRA(element.attr("pcatentryid"));
				}
			};
			
			scope.$on("readyToRemoveMore", function() {
				$rootScope.toggledRA = true;
				var itemIndex = $rootScope.selectedItemPO;
				var selectedPOArray = $rootScope.selectedProductOption[itemIndex];
				for(var i in selectedPOArray) {
					/** remove the specific required accessory if it's checkbox**/
					if(element.attr("input-type") == "ui-checkbox" && selectedPOArray[i].option.PCatEntryId == scope.raOption.PCatEntryId) {
						//console.log("accessory to remove found");
						productOptionAjaxService.removeProductOptionAjax(selectedPOArray[i]);
						$rootScope.selectedProductOption[itemIndex].splice(i, 1);
					/** remove all the required accessory in the selected if it's radio **/
					} else if(element.attr("input-type") == "ui-radio" && selectedPOArray[i].type == "RequiredAccessories") {
						//console.log("accessory to remove found");
						productOptionAjaxService.removeProductOptionAjax(selectedPOArray[i], scope, "requiredAccessories");
						$rootScope.selectedProductOption[itemIndex].splice(i, 1);
					}
				}
			});
			
			scope.$on("readyToBind", function() {
				element.bind($rootScope.myEvent, function() {
					scope.$emit("readyToRemoveMore");
				});
			});
		}
	};
}]);

WLCC.directive("removeDeluxe", ['$rootScope', 'productOptionAjaxService', function($rootScope, productOptionAjaxService) {
	return {
		restrict: "A",
//		scope: false,
		scope: "=",
		link: function(scope, element, attr) {
			scope.$on("readyToBind", function(){
				element.bind($rootScope.myEvent, function(){
					var itemIndex = $rootScope.selectedItemPO;
					var selectedPOArray = $rootScope.selectedProductOption[itemIndex];
					var itemType = element.attr("name");
					for(var i in selectedPOArray) {
						if(selectedPOArray[i].type == itemType) {
							productOptionAjaxService.removeDeluxeOptionAjax();
							$rootScope.selectedProductOption[itemIndex].splice(i, 1);
						}
					}
				});
			});
		}
	};
}]);

WLCC.directive("cartViewItem" , [function() {
	return {
		restrict: "A",
		scope: true,
		controller: function($scope, $timeout){
			$scope.cartDisplayType = "viewingItem";
			$scope.deleteItem = function(item, index){
				cartEdit.deleteCurrentItem(item);
				$('div#item'+index).addClass('deleting');
				
			}
			$scope.changeViewMode = function(index){
				if ($scope.cartDisplayType == "viewingItem"){
					$('div#item'+index).addClass('delete-view');
					$('#viewWrapper_'+index).animate({opacity:0}, 100, 'linear', function(){
						$timeout(function(){$scope.cartDisplayType = "removingItem"},0);
						$timeout(function(){$('#removeWrapper_'+index).animate({opacity:1}, 100, 'linear')}, 10);	
					});
				} else if ($scope.cartDisplayType == "removingItem"){
					$('div#item'+index).removeClass('delete-view');
					$('#removeWrapper_'+index).animate({opacity:0}, 100, 'linear', function(){
						$timeout(function(){$scope.cartDisplayType = "viewingItem"},0);
						$timeout(function(){$('#viewWrapper_'+index).animate({opacity:1}, 100, 'linear')}, 10);	
					});
				}
			}
		},
		link: function(scope, element, attr) {
			scope.$on("getItemIndex", function() {
				scope.$broadcast("returnItemIndex", scope.$index);
			});
		}
	};
}]);

//for both Required Accessories and Installation
WLCC.directive("requiredAccessories", ['$rootScope', 'productOptionService', function($rootScope, productOptionService) {
	return {
		restrict:"A",
//		scope: false,
		scope: "=",
		link: function(scope, element, attr) {
			
			/**when radio button is clicked, uncheck the checkboxes and other radio buttons**/
			scope.radioSelection = function(element) {
//				if(!element.hasClass("unselected")) 
//					element.removeClass("selected").addClass("unselected");
				
				if(element.hasClass("unselected")) 
					element.removeClass("unselected").addClass("selected");
				
				var children = element.parent().find("li");
				$.each(children, function(key, val) {
					if($(val).hasClass("selected") && $(val).attr("input-type") === "ui-checkbox") {
						$(val).removeClass("selected").addClass("unselected");
					} else if($(val).hasClass("selected") && $(val).attr("id") != element.attr("id")) {
						$(val).removeClass("selected").addClass("unselected");
					}
				});
			};
			
			/**when checkbox button is clicked, uncheck the checkboxes and other radio buttons**/
			scope.checkboxSelection = function(element) {
				var children = element.parent().find("li");
				$.each(children, function(key, val) {
					if($(val).hasClass("selected") && $(val).attr("input-type") === "ui-radio") {
						$(val).removeClass("selected").addClass("unselected");
					}
				});
			};
			
			scope.$on("readyToBind", function(){
				element.bind($rootScope.myEvent, function(){
					scope.$apply(function(){
						if(element.hasClass("deselected")) {
							scope.radioSelection(element);
							productOptionService.emptyRAArray();
							//console.log("emptying all RA");
						} else if(element.attr("input-type") === "ui-radio"){
							scope.radioSelection(element);
							productOptionService.emptyRAArray();
							productOptionService.addRA(element.attr("pcatentryid"));
//							productOptionService.addRA(scope);
						} else if(element.hasClass("unselected")) {
							scope.checkboxSelection(element);
	//						productOptionService.addRA(scope);
							//console.log("removing RA");
							productOptionService.removeRA(element.attr("pcatentryid"));
//							productOptionService.removeRA(scope);
						} else if(element.hasClass("selected")) {
							scope.checkboxSelection(element);
	//						productOptionService.removeRA(scope);
							//console.log("adding RA");
							productOptionService.addRA(element.attr("pcatentryid"));
							var removeSelectRadioCatEntry = $(element[0]).parent().find("[input-type=ui-radio]");
							for(var i = 0; i < removeSelectRadioCatEntry.length; i++) {
								if($(removeSelectRadioCatEntry[i]).attr("pcatentryid") != "") {
									productOptionService.removeRA($(removeSelectRadioCatEntry[i]).attr("pcatentryid"));
								}
							}
//							productOptionService.addRA(scope);
						}
					});
				});
			});
		}
	};
}]);

WLCC.directive("childInstallation", ['$rootScope', '$timeout', 'productOptionService', function($rootScope, $timeout, productOptionService) {
	return {
		restrict:"A",
//		scope: "=",
		scope: false,
		link: function(scope, element, attr) {
			/**when radio button is clicked, uncheck the checkboxes and other radio buttons**/
			scope.radioSelection = function(element) {
				if(!element.hasClass("unselectedChild")) 
					element.removeClass("selectedChild").addClass("unselectedChild");
				
				var children = element.parent().find("li");
				$.each(children, function(key, val) {
					if($(val).hasClass("selectedChild") && $(val).attr("input-type") === "ui-checkboxChild") {
						$(val).removeClass("selectedChild").addClass("unselectedChild");
					} else if($(val).hasClass("selectedChild") && $(val).attr("id") != element.attr("id")) {
						$(val).removeClass("selectedChild").addClass("unselectedChild");
					}
				});
			};
			
			/**when checkbox button is clicked, uncheck the checkboxes and other radio buttons**/
			scope.checkboxSelection = function(element) {
				var children = element.parent().find("li");
				$.each(children, function(key, val) {
					if($(val).hasClass("selectedChild") && $(val).attr("input-type") === "ui-radioChild") {
						$(val).removeClass("selectedChild").addClass("unselectedChild");
					}
				});
			};
			
			element.bind($rootScope.myEvent, function() {
				if(element.attr("input-type") === "ui-radioChild"){
					scope.radioSelection(element);
					productOptionService.emptyCI();
					productOptionService.addCI(scope);
				} else if(element.hasClass("selectedChild")) {
					element.removeClass("selectedChild").addClass("unselectedChild")
					scope.checkboxSelection(element);
					productOptionService.removeCI(scope);
				} else if(element.hasClass("unselectedChild")) {
					element.removeClass("unselectedChild").addClass("selectedChild");
					scope.checkboxSelection(element);
					productOptionService.addCI(scope);
				}
			});
		}
	};
}]);

WLCC.directive("grandChildInstallation", ['$rootScope', '$timeout', 'productOptionService', function($rootScope, $timeout, productOptionService) {
	return {
		restrict:"A",
		scope: false,
		link: function(scope, element, attr) {
			var choices;
			$timeout(function() {
				scope.childOptions.childInstallationOption = $rootScope.objToArray(scope.childOptions.childInstallationOption);
				choices = $(element[0]).parent().find("li[name='ChildOption']");
				
				element.bind($rootScope.myEvent, function(){
					if(element.hasClass("unselectedGrandChild")) {
						productOptionService.emptyCI();
						$(choices).find("li[name='ChildInstallation']").removeClass("selectedChild").addClass("unselectedChild");
					}
					choices.removeClass('selectedGrandChild').addClass('unselectedGrandChild');
					element.removeClass('unselectedGrandChild').addClass('selectedGrandChild');
				});
			}, 0);
		}
		
	};
}]);

WLCC.directive("installation", ['$rootScope', '$compile', '$timeout', 'productOptionService', function($rootScope, $compile, $timeout, productOptionService) {
	return {
		restrict:"A",
		scope: "=",
		controller: "installationAddressFormController",
		link: function(scope, element, attr) {
			
			scope.showInstallationAddress = false;
			$timeout(function(){
				if(typeof scope.installationOption != "undefined" && typeof scope.installationOption.Description != "undefined") {
					scope.$on("HandleInstallationFinished", function(e, installationChildOptions) { //
						scope.appendInstallationElements(installationChildOptions);
					});
				}
			}, 0);
			
			scope.$on("removeInstallationAddressForm", function() {
				scope.showInstallationAddress = false;
			});
				
			scope.$on("readyToBind",function(){
				element.bind($rootScope.myEvent, function(){
					if(element.hasClass("selected")) {
						scope.$apply(function(){
							if(element.hasClass("deselected")) {
								$(element[0]).find(".toggleInstallationForm").hide();
								productOptionService.removeHA();
								productOptionService.emptyCI();
								$timeout(function(){$rootScope.$broadcast("removeInstallationAddressForm")}, 300);
							} else {
								if(scope.installationOption.Description == "SEARS Professional Installation") {
									scope.showInstallationAddress = true;
									productOptionService.removeHA();
								} else {
									$(element[0]).find(".toggleInstallationForm").hide();
									$timeout(function(){$rootScope.$broadcast("removeInstallationAddressForm")}, 300);
									productOptionService.emptyCI();
									productOptionService.addHA(scope);
								}
							}
						});
					}
				});
			});
				
			scope.appendInstallationElements = function(installationChildOptions) {
				var displayChildOption = $("<div></div>").addClass("childOptions");
				element.find("b").remove();
				if(typeof installationChildOptions == "string") {
					if(installationChildOptions == "EXCEPTION:_MSG_INCLUDED_WITH_DELIVERY") {
						$timeout(function() {
							element.addClass("filled");
							scope.filled = true
							$(element[0]).find(".toggleInstallationForm").show();
							if($(element[0]).find(".childOptions").length == 0) {
								element.find("p").append($compile(displayChildOption)(scope));
//								element.find("p").append($compile('<a class="toggleInstallationForm button even text-center" ng:click="showInstallationForm()">Change Installation Address</a>')(scope));
								var childOptionE = element.find("p").find("div");
								childOptionE.text("Installation is included with delivery");
								childOptionE.css("font-weight", "bold");
							}
						}, 0);
					} else if(installationChildOptions == "EXCEPTION:_ERR_INSTALLATION_ISS_SHS_WEBSERVICE_ERROR" || installationChildOptions == "EXCEPTION") {
						$timeout(function() {
							element.addClass("filled");
							scope.filled = true
							element.find("p").append($compile(displayChildOption)(scope));
							var childOptionE = element.find("p").find("div");
							childOptionE.text("We are temporarily unable to handle your installation request.");
							childOptionE.css("font-weight", "bold").css("color", "red").css("background-color", "#fed6d6");
						}, 0);
					} else if(installationChildOptions == "EXCEPTION:_MSG_NOT_AVAILABLE") {
						$timeout(function() {
							element.addClass("filled");
							scope.filled = true
							element.find("p").append($compile(displayChildOption)(scope));
							var childOptionE = element.find("p").find("div");
							childOptionE.text("Installation is not available for this product in your area.");
							childOptionE.css("font-weight", "bold").css("color", "red").css("background-color", "#fed6d6");
						}, 0);
					} else if(installationChildOptions == "EXCEPTION:_ERR_STATE_ZIP_CITY_COMBINATION") {
						scope.$broadcast("wrongInputCombo");
					}
				} else { //installationChildOptions has multiple options
					$timeout(function() {
						element.addClass("filled");
						scope.filled = true
						$(element[0]).find(".toggleInstallationForm").show();
						if($(element[0]).find(".childOptions").length == 0) {
							if(!angular.isArray(installationChildOptions.installationOption)) {
								scope.isUniqueChildOptions = true;
								scope.childOptions = $rootScope.objToArray(installationChildOptions.installationOption.childInstallationOption);
//								displayChildOption.attr("append:template", "./partials/tmplChildInstallationOptionsUnique.html");
//								element.append($compile(displayChildOption)(scope));
							} 
							else {
								scope.isUniqueChildOptions = false;
								scope.childOptionsNonUnique = installationChildOptions.installationOption;
//								displayChildOption.attr("append:template", "./partials/tmplChildInstallationOptionsNonUnique.html");
//								element.append($compile(displayChildOption)(scope));
							}
							displayChildOption.attr("append:template", "./partials/tmplChildInstallationOptions.html");
							element.append($compile(displayChildOption)(scope));
						}
					}, 0);
				}
				
			};
			
			scope.showInstallationForm = function() {
				element.removeClass("filled");
				scope.filled = false;
				$(element[0]).find(".toggleInstallationForm").hide();
			};
			
		}
	};
}]);

WLCC.directive("submitInstallationAddressButton", ['$rootScope', 'productOptionAjaxService', 'productOptionService', function($rootScope, productOptionAjaxService, productOptionService) {
	return {
		restrict: "A",
		scope: false,
		link: function(scope, element, attr) {
			scope.$on("readyForAjaxCall", function() {
				productOptionAjaxService.applyInstallationAddressAjax();
				productOptionAjaxService.installationDefer.promise.then(function(data) {
					scope.data = data;
					var itemIndex = $rootScope.selectedItemPO;
//					scope.$emit("HandleInstallationFinished", productOptionService.parseHandleInstallation(scope.data, itemIndex));
					scope.$emit("HandleInstallationFinished", productOptionService.parseHandleInstallation(scope.data));
				});
			});
			
			element.bind($rootScope.myEvent, function(){
				scope.storeInstallationAddress();
				scope.$emit("readyToValidate", "installation");
			});
		}
	};
}]);

WLCC.directive("installationDateListener", ['$rootScope', function($rootScope) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			$rootScope.$watch("installationDate", function(newValue) {
				if(angular.isDefined($rootScope.installationDate))
					$rootScope.selectedInstallationDate = $rootScope.installationDate[0];
			});
		}
	};
}]);

WLCC.directive("emitInstallationDate", ['$rootScope', '$timeout', function($rootScope, $timeout) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			scope.$on('repeatReady', function() {
				var choices = $(element[0]).children('li');
				choices.on($rootScope.myEvent, function(){
					var self = $(this);
					$timeout(function(){
						if (self.hasClass('selected')){
							$rootScope.selectedInstallationDate = self.attr("data-id");
						}
					}, 100);
				});
			});
		}
	};
}]);

WLCC.directive("displayInstallationAgreement", ['$rootScope', function($rootScope) {
	return {
		restrict: "A",
		scope: false,
		link: function(scope, element, attr) {
			element.bind($rootScope.myEvent, function() {
				if(element.hasClass("unselected")) {
					element.removeClass("unselected")
				} else element.addClass("unselected");
			});
		}
	}
}]);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of Product Options Directive~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Address Form Validation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
WLCC.directive("validateAddress", ['$rootScope', '$timeout', 'productOptionAjaxService', function($rootScope, $timeout, productOptionAjaxService) {
	return {
		restrict: "A",
		scope: false,
//		controller: "addressFormController",
		link: function(scope, element, attr) {
			$rootScope.$watch("expandedStatus", function() {
				
//				if($rootScope.expandedStatus != "payment" || $rootScope.deliverySection != undefined || element.attr("validate:address") == "InstallationAddress") {
//					$rootScope.isAtBillingForm = false;
//					$rootScope.isInternational= false;
//					$rootScope.country = "US";
//				} else {
					
				if($rootScope.expandedStatus == "payment" && $rootScope.deliverySection == undefined && $rootScope.pickupSection == undefined ){
						$rootScope.isAtBillingForm = true;
						$rootScope.isInternational = false;
						$rootScope.country = "US";
						$timeout(function() {
							$(element[0]).find("select[name=country]").bind("change", function() {
								$rootScope.country = $(this).val();
								if($rootScope.country != "US"){
									$rootScope.isInternational= true;
									//console.log("inter")
								}else{
									$rootScope.isInternational= false;
									//console.log("US");
								}
								//console.log($rootScope.country);
								$rootScope.$apply();
							})
//							$(element[0]).find("li[name=US]").bind($rootScope.myEvent, function() {
//								$rootScope.isInternational= false;
//							});
//							$(element[0]).find("li[name=Canada]").bind($rootScope.myEvent, function() {
//								$rootScope.isInternational= true;
//							});
						},0);
				}else{
						$rootScope.isAtBillingForm = false;
						$rootScope.isInternational= false;
						$rootScope.country = "US";
					

				}
			});
			
			var addressObj = {};
			$rootScope.$watch("isInternational", function(isInternational) {
				$timeout(function() {
					addressObj = {
						address1 : $(element[0]).find("input[name=address]"),
						city     : $(element[0]).find("input[name=city]"),
						zipcode  : $(element[0]).find("input[name=zipcode]")
					};
					addressObj.address1.unbind("change").bind("change", function() {
						if($(this).val() == "") {
							$(this).parent('label').addClass("error");
						} else {
							$(this).parent('label').removeClass("error");
							$('label.error').first().addClass("showing");
						}
					});
					
					addressObj.city.unbind("change").bind("change", function() {
						if($(this).val() == ""){
							$(this).parent('label').addClass("error");
						} else {
							$(this).parent('label').removeClass("error");
							$('label.error').first().addClass("showing");
						}
					}).unbind("keyup").bind("keyup", function(e) {
						var city = $(this).val();
						if(!isNaN(String.fromCharCode(e.keyCode)) && String.fromCharCode(e.keyCode) != " ") { //e.keyCode == ascii number
							$(this).val(city.substring(0, city.length-1));
						}
					});
					
					if(attr.validateAddress == "HandleAddress") {
						addressObj.firstName = $(element[0]).find("input[name=firstName]");
						addressObj.lastName = $(element[0]).find("input[name=lastName]");
						addressObj.address2 = $(element[0]).find("input[name=address2]");
						addressObj.phone = $(element[0]).find("input[name=phone]");
						
						addressObj.firstName.unbind("change").bind("change", function() {
							if($(this).val() == "" && !(/^[a-zA-Z ]+$/).test($(this).val())) {
								$(this).parent('label').addClass("error");
							} else {
								$(this).parent('label').removeClass("error");
								$('label.error').first().addClass("showing");
							}
						}).unbind("keyup").bind("keyup", function(e) {
	//						//console.log(String.fromCharCode(e.keyCode));
	//						//console.log(e);
							if(!(/^[a-zA-Z ]+$/).test(String.fromCharCode(e.keyCode))) {
								$(this).val($(this).val().replace(/[^a-zA-Z]/g, ""));
								$(this).parent('label').addClass("error");
								
							} else {
								$(this).parent('label').removeClass("error");
								$('label.error').first().addClass("showing");
							}
						});
						
						addressObj.lastName.unbind("change").bind("change", function() {
							if($(this).val() == "" && !(/^[a-zA-Z ]+$/).test($(this).val())) {
								$(this).parent('label').addClass("error");
							} else $(this).parent('label').removeClass("error");
						}).unbind("keyup").bind("keyup", function(e) {
							if(!(/^[a-zA-Z ]+$/).test(String.fromCharCode(e.keyCode))) {
								$(this).val($(this).val().replace(/[^a-zA-Z]/g, ""));
								$(this).parent('label').addClass("error");
							} else {
								$(this).parent('label').removeClass("error");
								$('label.error').first().addClass("showing");
							}
						});
						
						addressObj.phone.unbind("change").bind("change", function() {
							if($(this).val() == "" || $(this).val().length < 10 || isNaN($(this).val())) {
								$(this).parent('label').addClass("error");
							} else {
								$(this).parent('label').removeClass("error");
								$('label.error').first().addClass("showing");
							}
						}).unbind("keyup").bind("keyup", function(e) {
							var phone = $(this).val();
							if((isNaN(String.fromCharCode(e.keyCode)) || String.fromCharCode(e.keyCode) == " " ) && e.keyCode != 8 && e.keyCode != 46) {
								$(this).val(phone.substring(0, phone.length-1));
							} else if(phone.charAt(0) == "0" || phone.charAt(0) == "1") {
								$(this).val("");
								$(this).attr("placeholder", "No country code needed");
								$(this).parent('label').addClass("error");
							}
						});
					}
					
					if(!isInternational) { //for US zipcode validation
						addressObj.zipcode.attr("maxlength", "5");
						addressObj.zipcode.unbind("change").unbind("keyup").bind("change", function(e) {
							var zipcode = $(this).val(); {
								if(zipcode.length < 5) {
									$(this).parent('label').addClass("error");
								} else {
									$(this).parent('label').removeClass("error");
									$('label.error').first().addClass("showing");
								}
							}
						}).bind("keyup", function(e) {
							var zipcode = $(this).val();
							if(zipcode.length > 5) {
								$(this).val(zipcode.substring(0, 5));
							}
							if((isNaN(String.fromCharCode(e.keyCode)) || String.fromCharCode(e.keyCode) == " ") && e.keyCode != 8 && e.keyCode != 46) {
								$(this).val(zipcode.substring(0, zipcode.length-1));
							}
						});
					}
				}, 300);
			});
					
			scope.$on("readyToValidate", function(e, validateType) { //validateType = handleInstallation or HandleAddress
				scope.$broadcast("readyToValidateEachField");
				var readyToCallAjax = true;
				$timeout(function() {
					for(i in addressObj) {
						addressObj[i].trigger("change");
						if(addressObj[i].parent('label').hasClass("error")) {
							//console.log($('label.error').first().find('input').focus());
							readyToCallAjax = false;	
						}
					}
					
					if($('label.error').length){
						$('label.error').first().addClass("showing").focus();
					}
					
					if(readyToCallAjax) {
						if(validateType == "installation") {
							scope.$broadcast("readyForAjaxCall"); //for installation
						} else if(validateType == "addInstallationAddress") {
							scope.$emit("readyForAjaxCall", "addInstallationAddress");
						} else {
							scope.$emit("readyForAjaxCall");
						}
					}
				}, 0);
				
				
			});
			
			scope.$on("wrongInputCombo", function() {
//					addressObj.state.addClass("error");
				addressObj.city.parent('label').addClass("error");
				addressObj.zipcode.parent('label').addClass("error");
			});
				
				
			

		}
	};
}]);

WLCC.directive("wlccStateSelection", ['$timeout', function($timeout) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			scope.$on("wrongInputCombo", function() {
				element.parent().addClass("error");
			});
			
			scope.$on("readyToValidateEachField", function(e) {
				$timeout(function() {
					element.triggerHandler("change");
				}, 0);
			});
			
			if(attr.name == "state") {
				element.bind("change", function() {
					if(element.val() == "Please select a state" || element.val() == "") {
						element.parent().addClass("error");
					} else {
						scope.$emit("stateChange", scope.newAddStateUS.name);
						element.parent('label').removeClass("error");
						element.parent('label').removeClass("error");
						$('label.error').first().addClass("showing");
					}
				});
			} else if(attr.name == "county") {
				element.bind("change", function() {
					if(element.val() == "Please select a county" || element.val() == "") {
						element.parent().addClass("error");
					} else {
						scope.$emit("countyChange", scope.newAddCounty.CountyDetail);
						//console.log(scope.newAddCounty.CountyDetail);
						element.parent('label').removeClass("error");
						element.parent('label').removeClass("error");
						$('label.error').first().addClass("showing");
					}
				});
			}
		}
	};
}]);


WLCC.directive("handleAddressForm", ['$http', '$rootScope', '$templateCache', '$compile', '$timeout', 'handleAddress', function($http, $rootScope, $templateCache, $compile, $timeout, handleAddress){
	return {
		restrict: "A",
		scope: "=",
		controller: "addressFormController",
		link: function(scope, element, attr) {
			scope.$on("addAddressComplete", function() {
				$rootScope.selectedAddress = $rootScope.addressList[0];
				$rootScope.selectedBillingAddressId = $rootScope.addressList[0].AddressId;
			});
			
			scope.$on("readyForAjaxCall", function() {
				scope.addNewAddress();
			});
			
			scope.closeForm = function() {
				$('.addressForm input.form-elem').val('');
				element.removeClass("selected");
			};
			
//			scope.$on("editAddress", function(e, addressId) {
////				$timeout(function(){
//				var profileAddress =  $rootScope.objToArray($rootScope.viewProfile.ProfileResponse.AddressBook.PrimaryAddress).concat($rootScope.objToArray($rootScope.viewProfile.ProfileResponse.AddressBook.SecondaryAddress));
//				var address;
//				for(var i in $rootScope.addressList) {
//					if($rootScope.addressList[i].AddressId == addressId) {
//						address = $rootScope.addressList[i];
//						break;
//					}
//				}
//				scope.newAddFirstName = address.FirstName;
//				scope.newAddLastName = address.LastName;
//				scope.newAddAddress = address.AddressLine1;
//				scope.newAddAddress2 = address.AddressLine2;
//				scope.newAddCity = address.City;
//				scope.state = address.State;
//				scope.newAddZipUS = address.Zipcode;
//			});
		}
	};
}]);

WLCC.directive('shippingAddressListener', ['$rootScope', '$timeout', 'productOptionAjaxService', 'productOptionService', 'applyShippingOption',
function($rootScope, $timeout, productOptionAjaxService, productOptionService, applyShippingOption){
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			delete $rootScope.selectedAddress;
			scope.$watch("selectedAddress", function(newVal, oldVal) {
				if(angular.isDefined(oldVal) && newVal.AddressId != oldVal.Addressid) {
					$rootScope.addressChanged = true;
				}
			});
			
			scope.getDefaultShippingAddress = function() {
				if(attr.addressSetting == undefined || attr.addressSetting == "multiple"){
					for(i in $rootScope.addressList) {
						if($rootScope.addressList[i].SelectedAddress == "Y") {
							scope.selectedAddress = $rootScope.addressList[i];
							scope.defaultAddress = $rootScope.addressList[i];
							if($rootScope.expandedStatus == "shipping") {
								if(!angular.isArray($rootScope.continueShippingCheckout.addressId)) $rootScope.continueShippingCheckout.addressId = new Array();
								$rootScope.continueShippingCheckout.addressId[scope.$index] = $rootScope.addressList[i].AddressId;
							}
							$rootScope.continueDeliveryCheckout.addressId = $rootScope.addressList[i].AddressId;
							$rootScope.selectedBillingAddressId = $rootScope.addressList[i].AddressId;
							break;
						}
					}
				} else {
					for(i in $rootScope.addressList) {
						if($rootScope.addressList[i].SelectedAddress == "Y") {
							scope.selectedAddress = $rootScope.addressList[i];
							scope.defaultAddress = $rootScope.addressList[i];
//							for(x in $rootScope.shippingItems){
//								$rootScope.continueShippingCheckout.addressId[x] = $rootScope.addressList[i].AddressId;
//							}
							$rootScope.continueShippingCheckout.addressId = $rootScope.addressList[i].AddressId;
							$rootScope.continueDeliveryCheckout.addressId = $rootScope.addressList[i].AddressId;
							$rootScope.selectedBillingAddressId = $rootScope.addressList[i].AddressId;;
							break;
						}
					}
				}
			};
			
			if(element.attr("name") == "Delivery" || element.attr("Payment")) {
				scope.$watch("addressList", function() {
					scope.getDefaultShippingAddress();
				});
			}
			
			$timeout(function(){
				scope.getDefaultShippingAddress();
			}, 100);
			
			scope.$on("updateSelectedAddress", function(e, addressId) {
				delete $rootScope.cartError;
				if(attr.addressSetting == undefined || attr.addressSetting == "multiple"){ //ship to multiple
					for(i in $rootScope.addressList) {
						if($rootScope.addressList[i].AddressId == addressId) {
							
							if($rootScope.expandedStatus == "shipping") {
								$rootScope.continueShippingCheckout.addressId[scope.$index] = $rootScope.addressList[i].AddressId;
							}
							scope.selectedAddress = $rootScope.addressList[i];
							//console.log(addressId);
							$rootScope.continueDeliveryCheckout.addressId = $rootScope.addressList[i].AddressId;
							$rootScope.selectedBillingAddressId = $rootScope.continueDeliveryCheckout.addressId;
							if($rootScope.isAtInstallationForm) {
								scope.setInstallationAddress($rootScope.addressList[i]);
							}

							
							break;
						}
					}
				}else{ //ship to one address
					//console.log("at one address");
					for(var i in $rootScope.addressList) {
						if($rootScope.addressList[i].AddressId == addressId) {
							scope.selectedAddress = $rootScope.addressList[i];
							//console.log(addressId);
							if($rootScope.expandedStatus == "shipping" && scope.selectedAddress.AddressId != $rootScope.continueShippingCheckout.addressId) { //change in shipping option
								$rootScope.continueShippingCheckout.addressId = $rootScope.addressList[i].AddressId;
							}
							
							$rootScope.continueDeliveryCheckout.addressId = $rootScope.addressList[i].AddressId;
							$rootScope.selectedBillingAddressId = $rootScope.continueDeliveryCheckout.addressId;
							if($rootScope.isAtInstallationForm) {
								scope.setInstallationAddress($rootScope.addressList[i]);
							}
							break;
						}
					}
				}
				$timeout(function(){scope.$apply()},0);;
			});
			
			scope.setInstallationAddress = function(address) {
				$rootScope.installationAddress.Address1 = (angular.isDefined(address.Address1)) ? address.Address1 : address.AddressLine1;
				$rootScope.installationAddress.Address2 = (angular.isDefined(address.Address2)) ? address.Address2 : ((angular.isDefined(address.AddressLine2)) ? address.AddressLine2 : "");
				$rootScope.installationAddress.City = address.City;
				$rootScope.installationAddress.State = address.State;
				$rootScope.installationAddress.ZipCode = (angular.isDefined(address.ZipCode)) ? address.ZipCode : address.Zipcode;
			}
		}
	};
}]);

//announce a change in selected address on a model
WLCC.directive('emitAddress', ['$timeout', '$rootScope', function($timeout, $rootScope){
	return {
		restrict: "A",
		scope: "=",
		controller: "addressFormController",
		link: function(scope, element, attr) {
			delete $rootScope.selectedAddress;
			
			scope.$on("readyForAjaxCall", function(e) {
				e.stopPropagation();
//				if(addIsntallationAddress == "addInstallationAddress") {
//					//console.log("adding installation address");
//					scope.addInstallationAddress();
//				}
				scope.addNewAddress();
			});
		
			scope.$on("addAddressComplete", function(e) {
				e.stopPropagation();
				$timeout(function() {
					for(i in $rootScope.addressList) {
						if($rootScope.addressList[i].SelectedAddress == "Y") {
							scope.$emit("updateSelectedAddress", $rootScope.addressList[i].AddressId);
							break;
						}
					}
				}, 300);
			});
		}
	};
}]);

//place this directive on a single cart item 
//it will bind to any changes in user preferences down the line 
WLCC.directive('shippingMethodListener', ['$rootScope', "$timeout", function($rootScope, $timeout){
	return {
		restrict: "A",
		scope: "=",
		link: function (scope, element, attrs) {
			var myOptions = new Array();
			if(attrs.addressSetting == "one" && $rootScope.shippingSection){
				scope.myOptions = $rootScope.shippingSection.ConsolidatedShippingOptions.AvailableShippingOptions;
				$rootScope.continueShippingCheckout.shipModeId = new Array();
				for(var i in $rootScope.shippingItems) {
					$rootScope.continueShippingCheckout.shipModeId[i] = $rootScope.shippingItems[i].ShippingOptions.SelectedShipMode;
				}
			}else if($rootScope.shippingSection){
				scope.myOptions = scope.item.ShippingOptions.AvailableShippingOptions;
				$rootScope.modifyShippingOptionAddress = new Array();
				$rootScope.shippingOptions = new Array();
				$rootScope.continueShippingCheckout.shipModeId = new Array();
				for(var i in $rootScope.shippingItems) {
					$rootScope.shippingOptions[i] = new Object();
					$rootScope.shippingOptions[i].itemShipModeId = $rootScope.returnAvailableShipModeId(scope.myOptions);
					//console.log($rootScope.shippingOptions[i]);
					
					$rootScope.modifyShippingOptionAddress[i] = false;
					$rootScope.continueShippingCheckout.shipModeId[i] = $rootScope.shippingItems[i].ShippingOptions.SelectedShipMode;
				}
			}
			
			scope.$on("checkoutDisplayCompleteShipping", function(e, shippingOptions) {
				e.stopPropagation();
				scope.myOptions = shippingOptions;
				$rootScope.selectedAddressChanged = true;
				if(scope.selectedAddress.AddressId != scope.defaultAddress.AddressId && attrs.addressSetting == "multiple") {
					$rootScope.shippingOptions[scope.$index].itemShipModeId = $rootScope.returnAvailableShipModeId(shippingOptions);
					$rootScope.shippingOptions[scope.$index].previousAddressId = scope.defaultAddress.AddressId;
					$rootScope.shippingOptions[scope.$index].addressId = scope.selectedAddress.AddressId;
					$rootScope.runScenarioThree = true;
					$rootScope.modifyShippingOptionAddress[scope.$index] = true;
				}
			});
			
			$timeout(function() {
				var shippingMode = $(element[0]).find("ul[name=shippingMode]").children("li");
				shippingMode.on($rootScope.myEvent, function() {
					if(attrs.addressSetting == "one") {
						for(var i in $rootScope.shippingItems) {
							$rootScope.continueShippingCheckout.shipModeId[i] = $(this).attr("data-id");
						}
						$rootScope.shippingOptionChanged = true;
					} else { //multiple
						$rootScope.continueShippingCheckout.shipModeId[scope.$index] = $(this).attr("data-id");
					}
					//console.log($rootScope.continueShippingCheckout.shipModeId);
					//console.log($rootScope.continueShippingCheckout);
				});
			}, 300);
		}
	}
	
}]);

WLCC.directive("checkExpandedStatus", ["$rootScope", "$timeout", "checkoutDisplay", function($rootScope, $timeout, checkoutDisplay) {
	return {
		restrict: "A",
		scope: "=",
		link:function(scope, element, attr) {
		   scope.checkIsPayPalCO = function() {
		    	if(($rootScope.invokePayPalCO == true || $rootScope.payPalStraightToPlaceOrder == true) && $rootScope.expandedStatus == "payment") {
		    		$timeout(function(){ $("a[validate-page]").trigger("handleTrigger"); }, 310);
		    	}
		   };
		   
		   scope.callCheckoutDisplay = function() {
			   //console.log(scope.selectedAddress);
			   $rootScope.checkoutDisplayAddressId = scope.selectedAddress.AddressId;
			   checkoutDisplay.ajaxCall(scope);
		   };
		   
		   element.bind($rootScope.myEvent, function() {
			   scope.checkIsPayPalCO;
			   if(($rootScope.expandedStatus == "shipping" || $rootScope.expandedStatus == "delivery") && $rootScope.addressChanged == true) {
				   scope.callCheckoutDisplay();
				   $rootScope.addressChanged = false;
			   }
		   });
		   
		}
	}
}]);

WLCC.directive("paymentAddressListener", ['$rootScope', '$timeout', function($rootScope, $timeout) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			scope.fromPage = "Billing";
			
			scope.getDefaultShippingAddress = function() {
				for(i in $rootScope.addressList) {
					if(angular.isDefined($rootScope.selectedBillingAddressId) &&  $rootScope.selectedBillingAddressId != "") {
						if($rootScope.addressList[i].AddressId == $rootScope.selectedBillingAddressId) {
							scope.selectedAddress = $rootScope.addressList[i];
							break;
						}
					} else if($rootScope.addressList[i].SelectedAddress == "Y") {
						scope.selectedAddress = $rootScope.addressList[i];
						$rootScope.selectedBillingAddressId = $rootScope.addressList[i].AddressId;
						break;
					}
				}
				
				if($rootScope.expressPaypal == true) {
					$rootScope.selectedBillingAddressId = $rootScope.expressAddressId;
				}
			};
			
			$timeout(function(){
				scope.getDefaultShippingAddress();
			}, 100);
			
			scope.$on("updateSelectedAddress", function(e, addressId) {
				for(i in $rootScope.addressList) {
					if($rootScope.addressList[i].AddressId == addressId) {
						scope.selectedAddress = $rootScope.addressList[i];
						$rootScope.selectedBillingAddressId = $rootScope.addressList[i].AddressId;
						break;
					}
				}
			});
		}
	};
}]);

WLCC.directive("addressSelection", ['$rootScope', '$timeout', function($rootScope, $timeout) {
	return {
		restrict: "A",
		scope : "=",
		link: function(scope, element, attr) {
			scope.$watch("selectedAddress.AddressId", function(newVal, oldVal) {
				if(element.attr("data-id") == scope.selectedAddress.AddressId) {
					element.triggerHandler("handleTrigger");
					element.parent().find("li").removeClass("selected").addClass("unselected");
					element.removeClass("unselected").addClass("selected");
				}
			});
			
			scope.$on("readyToBind", function() {
				element.bind($rootScope.myEvent, function() {
					//console.log(element.attr('data-id'));
					if(element.attr('data-id') != "installation") {
						scope.$emit('updateSelectedAddress', element.attr('data-id'));
					} else { //set back to default installation address;
						$rootScope.installationAddress.Address1 = $rootScope.installationAddressLine1;
						$rootScope.installationAddress.Address2 = "";
						$rootScope.installationAddress.City = $rootScope.installationCity;
						$rootScope.installationAddress.State = $rootScope.installationState;
						$rootScope.installationAddress.ZipCode = $rootScope.installationZipcode;
					};
				});
				
				element.bind("handleTrigger", function(e){
					scope.$emit('updateSelectedAddress', element.attr('data-id'));
				});
			});
		}
	};
}]);

WLCC.directive("displayBillingAddressModal", ['$rootScope', '$timeout', function($rootScope, $timeout) {
	return {
		restrict: "A",
		scope: false,
		link: function(scope, element, attr) {
			$timeout(function(){
				var parentE = $('.billingAddressSelection');
				
				scope.display = function(){
					if(element.prop("checked") == true) {
						scope.$apply(function(){
							parentE.find("#newBillingAddress").css("display", "none");
						});
						if($rootScope.continueShippingCheckout.addressId.length > 0)
							$rootScope.selectedBillingAddressId = $rootScope.continueShippingCheckout.addressId[0];
						else if($rootScope.continueDeliveryCheckout.addressId != "") {
							$rootScope.selectedBillingAddressId = $rootScope.continueDeliveryCheckout.addressId;
						}
					} else {
						scope.$apply(function(){
							parentE.find("#newBillingAddress").css("display", "block");
							parentE.find("a").trigger('handleTrigger');
							$rootScope.omnitureTagging('OmniturePageView', 'Shipping Information');
						});
					}
				}
				
				element.bind('change', function() {
					scope.display();
				});
				
				element.bind('handleTrigger', function() {
					scope.display();
				});
				
				if(!angular.isDefined($rootScope.selectedBillingAddressId) || $.trim($rootScope.selectedBillingAddressId) == "" || $rootScope.invokePayPalCO == true && $rootScope.payPalStraightToPlaceOrder == true) {
					$timeout(function(){
						scope.selectedAddress = $rootScope.addressList[0];
						element.prop("checked", false);
						scope.display();
					}, 500);
				}
				
			},0);
		}
	};
}]);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of Address Form Validation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Paypal Directive~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
WLCC.directive("payPalButton", ['$rootScope', 'payPalService', '$timeout', function($rootScope, payPalService, $timeout) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			$rootScope.$watch("isPayPalEligible", function(isEligible) {
				if(isEligible) {
					element.css("display", "inherit");
				} else {
					element.css("display", "none");
				}
			});
			
			element.bind($rootScope.myEvent, function() {
				//console.log( $rootScope.continueShippingCheckout.addressId.toString());
				if(element.attr("pay:pal:button") == "express") {
					localStorage.removeItem("WLCCPayPalNonExpress");
					payPalService.checkoutPayPal();
				} else { //nonExpress
//					scope.storeAllInfoToLocalStorage();
					$rootScope.ajaxLoader = true;
					payPalService.nonExpressPayBill();
				}
			});
			
			scope.storeAllInfoToLocalStorage = function() {
				if(angular.isDefined($rootScope.continueShippingCheckout.shipModeId) && $rootScope.continueShippingCheckout.shipModeId.toString() != "") {
					//console.log(scope.continueShippingCheckout.addressId.toString());
					localStorage.setItem("PaypalShippingAddressId", $rootScope.continueShippingCheckout.addressId.toString());
					localStorage.setItem("PaypalShipModeId", $rootScope.continueShippingCheckout.shipModeId.toString());
				}
				if(angular.isDefined($rootScope.continueDeliveryCheckout.shipModeId) && $rootScope.continueDeliveryCheckout.shipModeId.toString() != "") {
					localStorage.setItem("PaypalDeliveryAddressId", $rootScope.continueDeliveryCheckout.addressId.toString());
					localStorage.setItem("PaypalDeliveryModeId", $rootScope.continueDeliveryCheckout.shipModeId.toString());
					localStorage.setItem("PaypalSelectedDeliveryDate", $rootScope.selectedDeliveryDate);
					localStorage.setItem("PaypalSelectedDeliveryType", $rootScope.selectedDeliveryType);
				}
				if(angular.isDefined($rootScope.selectedInstallationDate)) {
					localStorage.setItem("PaypalInstallationDate", $rootScope.selectedInstallationDate.toString());
				}
			};

			
			scope.removeAllInfoFromLocalStorage = function() {
				localStorage.removeItem("PaypalDeliveryAddressId");
				localStorage.removeItem("PaypalDeliveryModeId");
				localStorage.removeItem("PaypalSelectedDeliveryDate");
				localStorage.removeItem("PaypalSelectedDeliveryType");
				localStorage.removeItem("PaypalShippingAddressId");
				localStorage.removeItem("PaypalShipModeId");
				localStorage.removeItem("PaypalInstallationDate");
			}
			
			if(element.attr("pay:pal:button") == "nonExpress") {
				scope.removeAllInfoFromLocalStorage();
			}
		}
	};
}]);

'use strict';
$.Event('handleTrigger', { bubbles: false });
$.Event('loginHandler', { bubbles: false });

/********************* CHECKOUT MENU. USED???????? *****************/

WLCC.directive('checkoutMenu', ['$rootScope', '$route', '$location', function($rootScope, $route, $location){
	return { 
		restrict: "AE",
		replace:false,
		compile: function(tEl, tAttrs){
			var el = $(tEl[0]);
						
			//call 'link' function
			return function(scope, element, attrs){
				scope.$on("$routeChangeSuccess", function(current, previous){
					var page = $location.path();
					var stepsArray = el.children('#progress-bar').children();
					
					$rootScope.isLoading = false;
					$('.step').addClass('disabled').removeClass('active inactive');
					
					$.each(stepsArray, function(){
						var self = $(this);
						var menuItem = "/"+self.attr('data-step');
						if (menuItem == page){ 
							self.toggleClass('active').toggleClass('disabled');
							return false;
						} else {
							self.addClass('inactive').toggleClass('disabled');
						}
					});
					
				});
			};
		}
	}
}]);

WLCC.directive('selectionTypeFour', ['$rootScope', function($rootScope){
	var dirLink = function (scope, element, attrs) {
	var choices;
	
	//group all <li>'s 
	scope.setList = function(){
		choices = $(element[0]).find('li');
		choices.removeClass('unselected').addClass('selected');
	};
	scope.setList();
	
	//in case the list is an ng-repeat, start over
	scope.$on('repeatReady', function(){
		scope.setList();
	});
			
	};
	
	return { 
		restrict: "A",
		link:dirLink,
		scope:'='
	}
}]);

/*********************** SET EXPRESS CHECKOUT PAYMENT ****************************/

WLCC.directive('expressCheckoutListenerPayment', ['$rootScope', function($rootScope){
	var dLink = function (scope, element, attrs) {
       element.bind($rootScope.myEvent, function() {
			
		 if(element.is(':checked')){
		   $rootScope.setExpressPay = "Y";
	       $rootScope.xBillingAddressId = $rootScope.selectedBillingAddressId;
	      // alert($rootScope.xBillingAddressId);
	    }else{
		   $rootScope.setExpressPay ="N"
         }
      });
   };
	
	return { 
		restrict: "A",
		scope:'=',
		link:dLink
	}
}]);

/*********************** SET EXPRESS CHECKOUT SHIP ADDRESS ****************************/

WLCC.directive('expressCheckoutListenerShipping', ['$rootScope', function($rootScope){
	var dLink = function (scope, element, attrs) {
       element.bind($rootScope.myEvent, function() {
				  
		if(element.is(':checked')){
		  $rootScope.setExpressShipAddress = "Y";
	      $rootScope.xShippingAddressId = $rootScope.continueShippingCheckout.addressId;
	      // alert($rootScope.xShippingAddressId);
	    }else{
		     $rootScope.setExpressShipAddress ="N"
         }

       });
    };
	
	return { 
		restrict: "A",
		scope:'=',
		link:dLink
	}
}]);




/**************** EXPRESS CHECKOUT UI LISTENER  **********************/
WLCC.directive('expressCheckout', ['$rootScope' ,  function($rootScope){
	var dLink = function (scope, element, attrs) {
         

        if($rootScope.isExpress  == 'true' || $rootScope.isExpress == true ){
	           
	           element.removeClass('hide');
                scope.expressUi = true;
                //  alert('Express UI' + scope.expressUi)
	        }
	        
	    var location = window.location.href;
        
         if(location.indexOf("co_step_payment") > -1  || location.indexOf("co_step_review") > -1 || location.indexOf("co_step_confirmation") > -1 ) {
                 element.addClass('hide');
    
}
	     
	        
	        
	}
	
	return { 
		restrict: "A",
		replace:false,
		scope:'=',
		link:dLink
	}
}]);

////place this directive on a single cart item 
////it will bind to any changes in user preferences down the line 
//WLCC.directive('shippingMethodListener', ['$rootScope', function($rootScope){
//	var dLink = function (scope, element, attrs) {
//		var myOptions = new Array();
//		if(attrs.addressSetting == "one" && $rootScope.shippingSection){
//			myOptions = $rootScope.shippingSection.ConsolidatedShippingOptions.AvailableShippingOptions;
//		}else if($rootScope.shippingSection){
//			myOptions = scope.item.ShippingOptions.AvailableShippingOptions;
//		}
//		scope.myOptions = myOptions;
//		
//		
//		//make arrays and selected items available on scope level
//		scope.methods = [];
//		scope.selectedMethod;
//		
//		scope.customDate = function(date) {
//			return {
//		    "ShipModeId": "11105",
//		    "LeadTime": date,
//		    "ShippingCharge": ""
//			};
//		};
//
//		//the 'options' part of the JSON is not in an array, so make it one.
//		$.each(myOptions, function(){
//			if (this.LeadTime){scope.methods.push(this);}
//		});
//
//		//match the correct object to the user-selection's ID
//		scope.updateShippingMethodView = function(){
//			//put the entire 'selected' object on the scope level
//			$.map(scope.methods, function(i){ 
//				if(attrs.addressSetting == "multiple"){
//					if (i.ShipModeId == scope.item.ShippingOptions.SelectedShipMode){ 
//						scope.selectedMethod = i; 
//					} else if (scope.item.ShippingOptions.SelectedShipMode == '11105'){
//						scope.myDate = $('.selected #scroller').val();
//						scope.selectedMethod = scope.customDate(scope.myDate);
//					}
//				}else{
//					if (i.ShipModeId == $rootScope.shippingSection.ConsolidatedShippingOptions.SelectedShipMode){ 
//						scope.selectedMethod = i; 
//					} else if ($rootScope.shippingSection.ConsolidatedShippingOptions.SelectedShipMode == '11105'){
//						scope.myDate = $('.selected #scroller').val();
//						scope.selectedMethod = scope.customDate(scope.myDate);
//					}
//				}
//				return false;
//			});
//		};
//		
//		//listen for the user to update the 'selected shipping method'
//		scope.$on('updateMethod', function(event, args){
//			scope.item.ShippingOptions.SelectedShipMode = args;
//			scope.updateShippingMethodView();
//		});
//		
//		scope.updateShippingMethodView();
//		
//	};
//	
//	return { 
//		restrict: "A",
//		replace:false,
//		scope:'=',
//		link:dLink
//	}
//}]);

///****************** EMIT SHIPPING METHODS ***************************/
////announce a change in shipping method on a model
//WLCC.directive('emitShippingMethod', ['$timeout', '$rootScope', function($timeout, $rootScope){
//	var dirLink = function (scope, element, attrs) {
//		
//		scope.$on('repeatReady', function(){
//			var choices = $(element[0]).children('li');
//
//			choices.on($rootScope.myEvent, function(){
//				var self = $(this);
//				$timeout(function(){
//					if (self.hasClass('selected')){
//						scope.$emit('updateMethod', self.attr('data-id'));
//					}
//				}, 100);
//			});
//			
//			scope.setCustomDate = function() {
//				scope.$emit('updateMethod', '11105');
//			}
//			
//			//wait for scope to process {{data-id's}}, then check if there is already a default selection
//			scope.onLoad = function(){
//				$.each(choices, function(){
//					if ($(this).attr('data-id') == scope.selectedMethod.ShipModeId) {
//						$(this).trigger($rootScope.myEvent);
//					}
//				});
//			};
//			$timeout(scope.onLoad, 300);
//			
//		});
//			
//	};
//	
//	return { 
//			restrict: "A",
//			scope: '=',
//			link:dirLink
//	};
//}]);

/**************** SELECTION TYPE RADIO BUTTON **********************/

//standard radio button type functionality for a <ul>
//will NOT allow for zero items to be selected
WLCC.directive('selectionTypeOne', ['$rootScope', '$timeout', function($rootScope, $timeout){
	var dirLink = function (scope, element, attrs) {
		var choices,
			tapping;
			tapping = false;

		//group all <li>'s 
		scope.setList = function(){
			choices = $(element[0]).find('li');
			choices.bind('touchstart', function(e) {
				element.addClass('pressed');
				tapping = true;
			});
			choices.bind('mousedown', function(e) {
				element.addClass('pressed');
				tapping = true;
			});
			choices.bind('touchmove', function(e) {
				element.removeClass('pressed');
				tapping = false;
			});
			choices.on($rootScope.myEvent, function(){
				if (tapping) {
					var self = $(this);
					choices.removeClass('selected').addClass('unselected');
					self.removeClass('unselected').addClass('selected');
					if (self.data('id')==="00000"){
						$timeout(function(){$rootScope.addingNewAddress = true;},1); 
					} else {
						$timeout(function(){$rootScope.addingNewAddress = false;},1);
					}
				}
			});
		};
		scope.setList();
		
		//in case the list is an ng-repeat, start over
		scope.$on('repeatReady', function(){
			choices.off($rootScope.myEvent);//prevent double bindings
			scope.setList();
			scope.$broadcast("readyToBind");
		});
			
	};
	
	return { 
		restrict: "A",
		link:dirLink,
		replace:false,
		scope:'='
	}
}]);


/**************** SELECTION TYPE RADIO **********************/

/** For childRadio **/
WLCC.directive('selectionTypeOneChild', ['$rootScope', '$timeout', function($rootScope, $timeout){
	var dirLink = function (scope, element, attrs) {
		var choices;
		scope.setChildList = function(){
			choices = $(element[0]).find('li');
			choices.on($rootScope.myEvent, function(){
				var self = $(this);
//				if (self.hasClass('selectedChild')){
//					self.removeClass('selectedChild').addClass('unselectedChild');
//				} else {
//					self.removeClass('unselectedChild').addClass('selectedChild');
//				}
				choices.removeClass('selectedChild').addClass('unselectedChild');
				self.removeClass('unselectedChild').addClass('selectedChild');
			});
		};
		
		$timeout(function() {
			scope.setChildList();
		}, 0);
		
		//in case the list is an ng-repeat, start over
		scope.$on('repeatReady', function(){
			choices.off($rootScope.myEvent);//prevent double bindings
			scope.setChildList();
			scope.$broadcast("readyToBind");
		});
			
	};
	
	return { 
		restrict: "A",
		link:dirLink,
		replace:false,
		scope:'='
	}
}]);

/**************** SELECTION TYPES. USED????  **********************/

//extended radio button type functionality for a <ul>
//WILL allow for zero items to be selected
WLCC.directive('selectionTypeTwo', ['$rootScope', function($rootScope){
	var dirLink = function (scope, element, attrs) {
		var choices,
			tapping;
			tapping = false;
		
		//group all <li>'s
		scope.setList = function(){
			choices = $(element[0]).find('li');
			choices.bind('touchstart', function(e) {
				element.addClass('pressed');
				tapping = true;
			});
			choices.bind('mousedown', function(e) {
				element.addClass('pressed');
				tapping = true;
			});
			choices.bind('touchmove', function(e) {
				element.removeClass('pressed');
				tapping = false;
			});
			choices.on($rootScope.myEvent, function(){
				if (tapping) {
					var self = $(this);
					if (self.hasClass('selected')){
						self.removeClass('selected').addClass('unselected');
						choices.removeClass('selected');
					} else {
						choices.removeClass('selected');
						self.removeClass('unselected').addClass('selected');
					}
				}
			});
		};
		scope.setList();
		
		//in case the list is an ng-repeat, start over
		scope.$on('repeatReady', function(){
			choices.off($rootScope.myEvent);//prevent double bindings
			scope.setList();
		});
			
	};
	
	return { 
		restrict: "A",
		link:dirLink,
		replace:false,
		scope:'='
	}
}]);

/**************** SELECTION TYPES. USED????  **********************/

//standard checkbox type functionality for a <ul>
WLCC.directive('selectionTypeThree', ['$rootScope', function($rootScope){
	var dirLink = function (scope, element, attrs) {
		var choices;
		
		//group all <li>'s
		scope.setList = function(){
			choices = $(element[0]).find('li');
			choices.on($rootScope.myEvent, function(){
				var self = $(this);
				if (self.hasClass('selected')){
					self.removeClass('selected').addClass('unselected');
				} else {
					self.removeClass('unselected').addClass('selected');
				}
			});
		};
		scope.setList();
		
		//in case the list is an ng-repeat, start over
		scope.$on('repeatReady', function(){
			choices.off($rootScope.myEvent);//prevent double bindings
			scope.setList();
			scope.$broadcast("readyToBind");
		});
			
	};
	
	return { 
		restrict: "A",
		link:dirLink,
		replace:false,
		scope:'='
	}
}]);


/**************** SELECTION TYPES. USED????  **********************/

//make sure these options cannot be unselected. Used for 'required' lists
WLCC.directive('selectionTypeFour', ['$rootScope', function($rootScope){
	var dirLink = function (scope, element, attrs) {
	var choices;
	
	//group all <li>'s 
	scope.setList = function(){
		choices = $(element[0]).find('li');
		choices.removeClass('unselected').addClass('selected');
	};
	scope.setList();
	
	//in case the list is an ng-repeat, start over
	scope.$on('repeatReady', function(){
		scope.setList();
	});
			
	};
	
	return { 
		restrict: "A",
		link:dirLink,
		scope:'='
	}
}]);

//For both radio and checkbox
WLCC.directive('selectionTypeMix', ['$rootScope', '$timeout', function($rootScope, $timeout) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			$timeout(function() {
				var radios = $(element[0]).find("li .ui-radio").parent();
				var checkBoxes = $(element[0]).find("li .ui-checkbox").parent();
				
				scope.setList = function() {
					radios = $(element[0]).find("li .ui-radio").parent();
					checkBoxes = $(element[0]).find("li .ui-checkbox").parent();
					radios.attr("input-type", "ui-radio");
					checkBoxes.attr("input-type", "ui-checkbox");
					
					checkBoxes.bind($rootScope.myEvent, function() { 
						radios.removeClass("selected").addClass("unselected");
						if($(this).hasClass("unselected"))
							$(this).removeClass("unselected").addClass("selected");
						else 
							$(this).removeClass("selected").addClass("unselected");
					});
					
					radios.bind($rootScope.myEvent, function() {
						checkBoxes.removeClass("selected").addClass("unselected");
						radios.removeClass("selected").addClass("unselected");
						$(this).removeClass("unselected").addClass("selected");
					});
				};
				
				scope.$on('reSetUpList', function(){
					radios.unbind($rootScope.myEvent);
					checkBoxes.unbind($rootScope.myEvent);
					scope.setList();
					scope.$broadcast("readyToBind");
				});
				
				scope.$on('repeatReady', function(){
					scope.setList();
				});
			})
		}
	};
}]);

/*************** EMIT PAYMENT. USED?? ******************/

//announce a change in payment method
WLCC.directive('emitPayment', ['$timeout', '$rootScope', function($timeout, $rootScope){
	var dirLink = function (scope, element, attrs) {
		
		scope.$on('repeatReady', function(){
			var choices = $(element[0]).children('li');

			choices.on($rootScope.myEvent, function(){
				var self = $(this);
				$timeout(function(){
					if (self.hasClass('selected')){
						scope.$emit('updatePayment', self.attr('data-id'));
					}
				}, 100);
			});
			
			//wait for scope to process {{data-id's}}, then check if there is already a default selection
			scope.onLoad = function(){
				$.each(choices, function(){
					if ($(this).attr('data-id') == 'PUT DEFAULT CC ID HERE') {
						$(this).trigger($rootScope.myEvent);
					}
				});
			};
			$timeout(scope.onLoad, 300);
			
		});		
	};
	
	return { 
		restrict: "E",
		link:dirLink,
		replace:false,
		scope:'='
	}
}]);



/******************* TEXT WHEN READY. NOT COMPLETE *****************************/

WLCC.directive('textWhenReady', ['$rootScope', function($rootScope){
	var dLink = function (scope, element, attrs) {
       element.bind($rootScope.myEvent, function() {
    				  
      

       });
    };
	
	return { 
		restrict: "A",
		scope:'=',
		link:dLink
	}
}]);


/********************** THIRD PARTY PICK UP. NOT COMPLETE *******************************/

//WLCC.directive('thirdPartyPickup', ['$rootScope', function($rootScope){
//	var dLink = function (scope, element, attrs) {
//		element.bind($rootScope.myEvent, function() {
//	    	var thirdPartyName = $('#thirdPartyName').val();
//	    	var thirdPartyEmail = $("#thirdPartyEmail").val();
//	    	 $rootScope.thirdPartyName = thirdPartyName;
//	    	 $rootScope.thirdPartyEmail = thirdPartyEmail;
//	    	 if(!thirdPartyName && !thirdPartyEmail){
//		    	 $rootScope.thirdPartyPickup = false;
//		    	 ////console.log($rootScope.thirdPartyPickup);
//	    	 }else{
//		    	 $rootScope.thirdPartyPickup = true;
//		    	 ////console.log($rootScope.thirdPartyPickup);
//	        }
//		});
//        var tpEmail = $('input#confirmEmail');
//        var tpHeight = tpEmail.css('height');
//        var tpSend = $('#sendConfirm');
//	    $('input[name="thirdPartyPickup"]').change(function(){
//            if (tpSend.is(':checked')){
//                   tpEmail.show();
//            } else{ //dontSend is checked
//                  tpEmail.hide();
//           }
//        });
//    };
//	
//	return { 
//		restrict: "A",
//		scope:'=',
//		link:dLink
//	}
//	
//}]);



/********************************* EMIT DELIVERY METHOD ****************************/

//announce a change in shipping method on a model
WLCC.directive('emitDeliveryMethod', ['$timeout', '$rootScope', 'premiumDeliveryChargeService', function($timeout, $rootScope, premiumDeliveryChargeService){
	var dirLink = function (scope, element, attrs) {

		scope.$watch("selectedDeliveryDay", function(newValue, oldValue){
			if(oldValue != newValue)
//			$rootScope.selectedDeliveryDay = scope.selectedDeliveryDay;
//			premiumDeliveryChargeService.fetchPremiumCharge($rootScope.selectedDeliveryDay.date);
			premiumDeliveryChargeService.fetchPremiumCharge(scope.selectedDeliveryDay.date);
			
		});
		
		
//		scope.$on('repeatReady', function(){
//			var choices = $(element[0]).children('li');
//
//			choices.on($rootScope.myEvent, function(){
//				var self = $(this);
//				var date = "0"+self.attr('data-id');
//				var day = self.attr('data-day');
//				$timeout(function(){
//					if (self.hasClass('selected')){
//						$rootScope.selectedDeliveryDay = day;
//						$rootScope.selectedDeliveryDate = date+":"+day;
//						////console.log(date);
//						premiumDeliveryChargeService.fetchPremiumCharge(date);
//					}
//				}, 100);
//			});
//			
//			//wait for scope to process {{data-id's}}, then check if there is already a default selection
//			scope.onLoad = function(){
//				$.each(choices, function(){
//					//if ($(this).attr('data-id') == scope.selectedMethod.ShipModeId) {
//					if ($(this).attr('data-day') == $rootScope.selectedDeliveryDay ) {
//						$(this).trigger($rootScope.myEvent);
//					}
//				});
//			};
//			$timeout(scope.onLoad, 300);
//			
//		});
			
	};
	
		return { 
				restrict: "A",
				scope: '=',
				link:dirLink
		}
}]);

/********************** ADD FOCUS TO INPUT FIELDS. BEING USED??????????? *********************/

//add focus to any input field
WLCC.directive('addFocus', ['$timeout', '$rootScope', function($timeout, $rootScope){
	var dLink = function (scope, element, attrs) {
		$timeout(function(){
			element.bind($rootScope.myEvent, function(){
				$(attrs.addFocus).focus();
			});
		}, 500);
	};
	
		return { 
				restrict: "A",
				link:dLink
		}
}]);

/**************** ETAP ***************************/

//add a touch event so we don't need to wait for click events
WLCC.directive('eTap', ['$rootScope', function($rootScope){
	var dLink = function (scope, element, attrs) {
		if($rootScope.MOBILE) {
			var tapping;
			tapping = false;
			element.bind('touchstart', function(e) {
				element.addClass('pressed');
				tapping = true;
			}).bind('touchmove', function(e) {
				element.removeClass('pressed');
				tapping = false;
			}).bind('touchend', function(e) {
				e.preventDefault();
				element.removeClass('pressed');
				if (tapping) {
					scope.$apply(attrs['eTap'], element);
				}
			}).unbind('click');
		} else {
			element.bind('mousedown', function(e) {
				element.addClass('pressed');
			}).bind('click',function(){
				element.removeClass('pressed');
				scope.$apply(attrs['eTap'], element);
			});
		}
		
//		element.bind( 'touchstart', function(e){ 
//			e.preventDefault(); 
//		}).bind($rootScope.myEvent, function() {
//			scope.$apply(attrs.eTap);
//		});    
	};
	return { 
		link:dLink,
		scope:true
	}
}]);

WLCC.directive('onKeyup', function() {
  var dLink = function(scope, element, attrs) {
    function applyKeyup() {
      scope.$apply(attrs.onKeyup);
    };           
    var allowedKeys = scope.$eval(attrs.allowkeys);
    var trigger = attrs.trigger;
    element.bind('keyup', function(e) {
    	var code = e.keyCode;
      if (!allowedKeys || allowedKeys.length == 0) {
        if (!trigger){
        	applyKeyup();
        } else {
        	$(element[0]).trigger(trigger);
        }
      } else {
        angular.forEach(allowedKeys, function(key) {
          if (key == code) {
            if (!trigger){
            	applyKeyup();
            } else {
            	$(element[0]).trigger(trigger);
            } 
          }
        });
      }
      e.preventDefault();
    });
  };
  return { 
  	link:dLink,
  }
});

WLCC.directive('wlccError', function(){
	var dLink = function (scope, element, attrs) {
		var el = $(element[0]);
		var msg = attrs.wlccError;
		el.append(
			'<span class="err-msg">'
			+'<span class="err-arrow"></span>'
			+msg
			+'</span>'
		);
	};

	return {
		restrict: "A",
		link:dLink
	}
});


/**************** FULFILLMENT TO TRIGGER CUSTOM EVENT ******************************/

WLCC.directive('ffListener', ['$rootScope', function($rootScope){
	var dLink = function (scope, element, attrs) {
		scope.$on('ffchange', function(event, args){
			//alert(scope.$index+ " : " + args.index);
			if (args.method == "pickup" && scope.$index == args.index){
				////console.log("triggered " + args.index);
				$(element[0]).trigger('handleTrigger', [args.index]);
				$rootScope.omnitureTagging('OmniturePageView', 'Pickup')
			}
		});
	};
	return {
		restrict: "A",
		link:dLink
	}
}]);

/*************** VERY IMPORTANT! USED EVERYWHERE! MODAL WINDOW *************************/

//attach a modal to the DOM, set its content with a partial
WLCC.directive('coModal', ['$compile', '$parse', '$http', '$templateCache', '$timeout', '$rootScope', function($compile, $parse, $http, $templateCache, $timeout, $rootScope){
	var dirLink = function (scope, element, attrs) {
		var body = angular.element(document).find('body');
		
		//cache any template that the user will need 
	
		$http.get(attrs.coModal, {cache:$templateCache});
		var start = !attrs.startfrom ? "bottom" : attrs.startfrom ;

		//start in-modal history stack
		scope.modalHistory = [];

		scope.removeModal = function(){
			$('#co-modal, #co-modal-bg').remove();
		};

		scope.openModal = function(){
			$('#co-modal').addClass('open');
			$('#co-modal-bg').addClass('on');
		};
		
		scope.closeModal = function(){
			$('#co-modal').removeClass('open');
			$('#co-modal-bg').animate({opacity: 0}, 310);
			body.removeClass('modaled');
			$timeout( scope.removeModal, 310 );
		};
		
		scope.saveModal = function(){
			$('#co-modal').removeClass('open');
			$('#co-modal-bg').animate({opacity: 0}, 310);
			body.removeClass('modaled');
			$timeout( scope.removeModal, 310 );
		};
		
		scope.noOpacity = function(){
			//alert('no opacity');
			$('#co-modal-bg').removeClass('on');
		}
		
		scope.launchModal = function(){
			//reset history when opening a modal
			scope.modalHistory = [];
			
			//get cached template
			scope.template = $templateCache.get(attrs.coModal);

			scope.currentScreen = attrs.coModal;			
			
			var myModalBg = 
				$("<div></div>")
				.attr('id', 'co-modal-bg');

			var myModal = 
				$("<div></div>")
				.attr('ng:controller', 'modalController')
				.attr('id', 'co-modal');
			
			var myModalInclude = 
				$("<div></div>")
				.attr('id', 'co-modal-inc');
				
			if(start == "left"){myModal.attr("class", "wlccCartPage fromLeft")}
			else if (start == "right") {myModal.attr("class", "wlccCartPage fromRight")}
			else if (start == "top") {myModal.attr("class", "wlccCartPage fromTop")}
			else if (start == "bottom") {myModal.attr("class", "wlccCartPage fromBottom")}
			else if (start == "login") {myModal.attr("class", "wlccCartPage fromLogin")}
				
			//populate modal content
			myModalInclude.html(scope.template[1]);
			myModal.append(myModalInclude);

			//add modal to bottom of document
			body.addClass('modaled').append(myModalBg);
			body.append($compile(myModal)(scope));
			
			myModalBg.on($rootScope.myEvent, function(){
				scope.closeModal();
			});
			
			//scope.$digest();//digest important if no '$timeout'
			$timeout( scope.openModal, 10 );
		}
		
		element.bind($rootScope.myEvent, function(){
			scope.launchModal();
		});
		
		$(element[0]).on('handleTrigger', function(event, params){	
			if(scope.$parent.$index === params){
				scope.launchModal();
			}
		});
		
		$(element[0]).on('loginHandler', function(){
				scope.launchModal();
		});	
	};
	return { 
		restrict: "A",
		link:dirLink,
		scope:'='
	}
}]);

/***************************************(NOT USED CURRENTLY) POP UP WINDOW (SMALL) THAT CAN TAKE A TEMPLATE TO DISPLAY *******************/


//a popover window with position detection to make sure it is always on the screen
WLCC.directive('coPopover', ['$rootScope', '$compile', '$http', function($rootScope, $compile, $http){
	
	return {
	    scope: '=',
	    restrict: "A",
	    link: function (scope, element, attrs) {

	      $http({
	          method: 'GET',
	          url: attrs.coPopover
	      }).success(function (data, status) {
	        scope.template = data;

	        
		//get popover position on screen
		function isViewed(){
			var docViewTop = document.body.scrollTop,
		  		docViewBottom = docViewTop + $(window).height(),
		  		elemTop = $('.co-popover').offset().top,
		  		elemBottom = elemTop + $('.co-popover').height();
			//check if element is off the screen bottom and top 
			if (!(elemBottom <= docViewBottom)){return 'bottom'};
			if (!(elemTop >= docViewTop)){return 'top'};
		};	
		
		element.bind($rootScope.myEvent, function(){
//			scope.template = attrs.coPopover;
			//does this element already have a popover open
			if (element[0].lastChild.id == 'popover') {
				$('.co-popover').remove();
				$(window).unbind("scroll");
			} else {	
				//create popover
				var myPopOver = 
					$("<div></div>")
					.attr('class', 'co-popover')
					.attr('id', 'popover')
					//.attr('ng:controller', 'popoverController');
				myPopOver.append(
					$("<div class='po-close'></div>")
				);
				myPopOver.append(
					$("<div class='po-content'></div>")
				);
				
				//remove any open popovers from screen
				$('.co-popover').remove();
				myPopOver.html(scope.template);
				//add popover to screen
				element.append($compile(myPopOver)(scope));
				scope.$digest();//digest important! if no '$timeout'	
				
				//check if element has scrolled off the page
				$('.co-popover').toggleClass('stickyTop', isViewed()=='top');
				$('.co-popover').toggleClass('stickyBottom', isViewed()=='bottom');
				
				//continue checking as user scrolls
				$(window).scroll(function() {
				  $('.co-popover').toggleClass('stickyTop', isViewed()=='top');
				  $('.co-popover').toggleClass('stickyBottom', isViewed()=='bottom');
	            });
	          }      
	        });//end click event
	      }).error(function (data, status) {
	        ////console.log(status);
	      });

	    }

	  }
	}]); //end pop over directive


	
//		return { 
//				restrict: "A",
//				link:dirLink,
//				scope:'='
//		}
//});


/*************************** BEING USED ?????????? **********************************/

//add slideToggle functionality to any element
WLCC.directive('wlccSlideToggle', ['$rootScope', function($rootScope){
	var dLink = function (scope, element, attrs) {
		
		
			var el = $(element[0]);	
			
			//wrap content div in one with overflow hidden, we will animate the height of this div
			el.wrap('<div class="toggle-wrap"/>');
			
			var wrap = el.parent('.toggle-wrap');
			////console.log(wrap);
			
			wrap.on($rootScope.myEvent, function() {		
				var height = el.css('height');
				////console.log(wrap.height());
				if (wrap.height() != 20){
					$(this).css('height', '20px');
				} else {
					$(this).css('height', height);
				};
			});//end click event
		
	};
	
	return { 
			restrict: "A",
			link:dLink
	}
}]);


/***************************** TO MAKE A DIV SLIDE DOWN OR SLIDE UP ******************************/

//add slideToggle functionality to any element's next sibling
WLCC.directive('wlccAccordion', ['$rootScope', function($rootScope){
	var dLink = function (scope, element, attrs) {
		
//		scope.$on('repeatReady', function(){
			var title = $(element[0]),
				content = $(element[0]).next(),	
				tapping;
			
			//wrap content div in one with overflow hidden, we will animate the height of this div
			content.wrap('<div class="acc-wrap" />');
				
			tapping = false;
			title.bind('touchstart', function(e) {
				title.addClass('pressed');
				tapping = true;
			});
			title.bind('touchmove', function(e) {
				title.removeClass('pressed');
				tapping = false;
			});
			title.bind('mousedown', function(e) {
				title.addClass('pressed');
				tapping = true;
			});

			title.bind($rootScope.myEvent, function() {		
				if (tapping){
					var wrap = $(element[0]).next('.acc-wrap'),
							height = content.css('height');
					
					if (wrap.height()){
						wrap.css('height', 0);
					} else {
						wrap.css('height', height);
						if($(element[0]).attr("id")== "cart-total"){
							$rootScope.omnitureTagging('OmnitureCartlevelPriceBreakdown', 'Shopping Cart')
						}else if($(element[0]).hasClass("item-total")){
							$rootScope.omnitureTagging('OmnitureItemlevelPriceBreakdown', 'Shopping Cart');
						}
					};
					title.removeClass('pressed');
					tapping = false;
				}
			});//end click event
//		});//end scope ready
	};
	
	return { 
			restrict: "A",
			link:dLink
	}
}]);



/*********************** BEING USED ???? ************************************/
//date picker widget 
WLCC.directive('datePicker', ['$timeout', function($timeout){
	var dLink = function(scope, element, attrs){	
		var start = attrs.startdate,
				end = Number(attrs.daysout),
				weekends = attrs.weekends,
				holidays = attrs.holidays,
				preset = attrs.preset,
				observed = ['1/1', '1/21', '2/18', '5/27', '7/4', '9/2', '10/14', '11/11', '11/28', '12/24', '12/25'],
				d, min, max, excludeGroup1, excludeGroup2;
		
		if(!start){
			min = "";
		} else {
			start == 'today' ? min = new Date() : min = new Date(start);
		}
		
		if (!end){
			max = "";
		} else {
			d = new Date(min);
			max = new Date(d.setDate(d.getDate()+end));
		}	
		
		if(!weekends){
			excludeGroup1 = "";	
		} else {
			excludeGroup1 = [0, 6];
		};
		
		if(!holidays){
			excludeGroup2 = "";	
		} else {
			excludeGroup2 = observed;
		};
		
		if(!preset) {
			//do nothing if no preset is selected
		} else if (preset && preset == 'dob'){
			min, max, excludeGroup1, excludeGroup2 = "";
		} else if (preset && preset == 'delivery'){
			min = new Date();
			d = new Date(min);
			max = new Date(d.setDate(d.getDate()+30));
			excludeGroup1 = [0, 6];
			excludeGroup2 = observed;
		};

		scope.mobiscroll = function (){
			$("#scroller").mobiscroll().date({
			    invalid: { daysOfWeek: excludeGroup1, daysOfMonth: excludeGroup2 },
			    theme: 'android-ics light',
			    display: 'inline',
			    mode: 'mixed',
			    dateOrder: 'mmD ddyy',
			    minDate: min,
			    maxDate: max
			}); 
		};
		
		//timeout function will provide all the necessary angular $apply functions
		$timeout(scope.mobiscroll, 1);
		
	}
	
	return {
		restrict: 'E',
		template:'<input id="scroller" value="{{myDate}}" placeholder="mm/dd/yyyy" name="scroller"/>',
		link: dLink,
		scope: '='
	}
}]);

/*************** BEING USED??? *******************/

//announce when any ng-repeat has finished
WLCC.directive('repeatReady', [function(){
	var dLink = function (scope, element, attrs) {
		if (scope.$last){scope.$emit('repeatReady');}
	};	
	return { 
		restrict: "ACME",
		link:dLink
	}
}]);





/*************************** PROBABLY NOT BEING USED?????? ******************************/

//WLCC.directive("selectedSpuStore", ['$rootScope', function ($rootScope) {
//	return {
//		scope:'=',
//	    restrict: 'A',    
//	    link: function(scope, element, attrs){
//		    	
//		    		var selectedFulfillment =  scope.item.ArrivalMethods.SelectedArrivalMethod.SelectedArrivalMethodName;
//	
//		    		if(selectedFulfillment !== "PickUp"){
//		    		     
//		    		      	$(element[0]).addClass("hide");
//		    		
//		    		}
//      }    
//	   
//	};
//}]);


/********************** IS THIS BEING USED???? ********************************/

WLCC.directive('cartPopover', ['$rootScope', '$compile', '$http', '$timeout', function ($rootScope, $compile, $http, $timeout) {
  return {
    scope: '=',
    restrict: "A",
    link: function (scope, element, attrs) {

      $http({
          method: 'GET',
          url: attrs.cartPopover
      }).success(function (data, status) {
        scope.template = data;
       
        var body = angular.element(document).find('body');

        //get popover position on screen
        function isViewed() {
          var docViewTop = document.body.scrollTop,
              docViewBottom = docViewTop + $(window).height(),
              elemTop = $('.cr-popover').offset().top,
              elemBottom = elemTop + $('.cr-popover').height();
      

          //check if element is off the screen bottom and top 
          if (!(elemBottom <= docViewBottom)) {
              return 'bottom'
          };
          if (!(elemTop >= docViewTop)) {
              return 'top'
          };
        };

        element.bind($rootScope.myEvent, function () {
          //does this element already have a popover open
          if (element[0].lastChild.id == 'popover') {
              $('.cr-popover').remove();
              $(window).unbind("scroll");
          } else {
            //create popover
            var myPopOver = $("<div></div>")
                .attr('class', 'cr-popover')
                .attr('id', 'popover');
            // .attr('ng:controller', 'popoverController');
            myPopOver.append(
            $("<div class='po-close'></div>"));
            myPopOver.append(
            $("<div class='po-content'></div>"));

            //remove any open popovers from screen
            $('.cr-popover').remove();

            //add any partials to pop over
            myPopOver.html(scope.template);
            
            //add popover to screen
            element.append($compile(myPopOver)(scope));
            scope.$digest(); //digest important! if no '$timeout'

            //check if element has scrolled off the page
            $('.cr-popover').toggleClass('stickyTop', isViewed() == 'top');
            $('.cr-popover').toggleClass('stickyBottom', isViewed() == 'bottom');

            //continue checking as user scrolls
            $(window).scroll(function () {
                $('.cr-popover').toggleClass('stickyTop', isViewed() == 'top');
                $('.cr-popover').toggleClass('stickyBottom', isViewed() == 'bottom');
            });
          }      
        });//end click event
      }).error(function (data, status) {
        ////console.log(status);
      });

    }

  }
}]); //end pop over directive

/****************************** ITEM QUANTITY CHANGE ****************************************/


WLCC.directive('updatableField', ['$rootScope','cartEdit', function($rootScope, cartEdit){

    return{
            restrict: 'A',
            link: function(scope, element, attr, model){
            		var originalValue = "";
                    var previousVal = "";
                    var newVal = "";
                    
                    element.bind($rootScope.myEvent, function(){
                    	originalValue = element.val();
                    	this.select();
                    });
                    
                    element.bind('keyup', function(){
                    	var size = (element.val()).toString().length;
                    	previousVal = element.val();
                    	if(size == 1 && ((previousVal).indexOf(0) == '0'|| isNaN((previousVal).charAt(0)))){
                    		element.val(originalValue);
                    	}else if(size>1 && isNaN(previousVal.charAt(size -1))){
                    		newVal = (previousVal).substring(0,size - 1);
                    		element.val(newVal.toString());
                    	}
                    	
                    });
                    
                    
                      element.keyup(function (e) {
                          $(this).val(function(i, v) { return v.replace(/ /g,""); });
                      })
                    
                    element.bind('change', function(){
                            var index = scope.$index;
                            var qty = scope.items[index].Qty;
                            //index then value;
                            if(qty > 0){
	                             ////console.log('about to update'+qty);
	                             cartEdit.updateQuantity(index, qty);
	                             wlccUpdateCount(qty);
	                         }else{
                            	element.val(originalValue);
                            }
                            
                    });
            }
    };
}]);

/************************** EDIT FULFILLMENT ****************************************/

WLCC.directive('editFulfillment', ['cartEdit', '$rootScope', '$timeout','refractorCart', function(cartEdit, $rootScope, $timeout, refractorCart){
	
    return{
            restrict: 'A',
            link: function(scope, element, attr, model){
            	$timeout(function(){
            		element.prop("checked", scope.searchSelectedFulfillment(scope.availableArrivalMethod.AvailableArrivalMethodName, scope.item.ArrivalMethods.SelectedArrivalMethod.SelectedArrivalMethodName));
            		var isChecked = element.prop("checked");
            		var itemIndex = scope.$parent.$parent.$index;
        			var fulfillmentIndex = scope.$index;
        			var fulfillmentType = scope.items[itemIndex].ArrivalMethods.AvailableArrivalMethod[fulfillmentIndex].AvailableArrivalMethodName;
        			
        			fulfillmentType = (fulfillmentType.replace(/ /g, "")).toLowerCase();
        			if(fulfillmentType == "pickup" && isChecked){
      					$('.spuSelectedStoreDropdown'+itemIndex).removeClass('hide');
      				}
            	},20);

            	
        		element.bind("click", function(){
//        			$rootScope.ajaxPending = true;
        			var itemIndex = scope.$parent.$parent.$index;
        			var fulfillmentIndex = scope.$index;
        			var fulfillment = scope.items[itemIndex].ArrivalMethods.AvailableArrivalMethod[fulfillmentIndex].AvailableArrivalMethodName;
        			var indicator = (fulfillment.replace(" ", "")).toLowerCase();
        			var attached = {method: indicator, index: itemIndex};
        			//Are the two following lines needed???
        			$('.cartRadio, .buttonRadio').removeClass('selectedItem');
        			$(this).parent().addClass('selectedItem');
        			if(indicator == "pickup"){
        				if($rootScope.zipcode != undefined && $rootScope.zipcode != ""){
        					$rootScope.ajaxPending = true;
//        					cartEdit.editFulfillmentStep1(itemIndex, indicator);    //process PickupData
                            refractorCart.processPickupData(itemIndex, indicator);
        				}
        					$rootScope.$broadcast('ffchange', attached);
//        				$rootScope.ajaxPending = true;
        				$('.spuSelectedStoreDropdown'+itemIndex).removeClass('hide');
        			}else{
        				$rootScope.ajaxPending = true;
        				cartEdit.editFulfillmentStep1(itemIndex, indicator);
        				$('.spuSelectedStoreDropdown'+itemIndex).addClass('hide');
        			}
        		});
        		
        		scope.searchSelectedFulfillment = function(available, selected) {
        			available = (available.replace(/ /g,"")).toLowerCase();
        			selected = (selected.replace(/ /g, "")).toLowerCase();
        			if(available == selected){
        				return true;
        			}else{
        				return false;
        			}
        		};
            }
    };
}]);


/**************************** SHOW PICK UP STORES *************************************/

WLCC.directive("showStores", ['$rootScope', 'cartEdit', 'refractorCart', function($rootScope, cartEdit, refractorCart){
	return {
		restrict: "A",
		scope:'=',
		link: function(scope, element, attr) {
			scope.showStores = function() {
				if($rootScope.RefactorSPUPickupData != undefined){
					$rootScope.RefactorSPUPickupData.Status.StatusMessageExt = "";
				}
				
				var itemIndex = scope.$index;
				var zipAction = element.attr("show-stores");
				
				if(zipAction == "zipcode"){
					var zip = $(".pickupZipCode"+itemIndex).val();
					if(zip != undefined || zip != ""){
						$rootScope.zipcode = zip;
						$rootScope.$apply();
					}
				}
				if($rootScope.zipcode != undefined && $rootScope.zipcode != ""){
//					cartEdit.editFulfillmentStep1(itemIndex, "pickup");           //needs to be changed to processpickupData.
                    refractorCart.processPickupData(itemIndex, "pickup");
				}
			}
			
			element.bind($rootScope.myEvent, function(){
				scope.showStores();
			});
            /*1. Get Stpre
            * 2. Save Store && add to Cart called
            * 3. Others*/
		}
	}
}]);

/************************ CHOOSE PICK UP STORE *************************************/

WLCC.directive("chooseStore", ['$rootScope', 'cartEdit', function($rootScope, cartEdit){
	return {
		restrict: "A",
		link: function(scope, element, attr) {
            // DURING POPULATION(V.), CHECK IF CURRENT STORE MATCHES THE SELECTED STORE IN VIEWCART RESPONSE
            scope.getChosenStore = function() {
				////console.log(scope.item.ArrivalMethods.SelectedArrivalMethod.SelectedStore.SelectedStoreName + " : " + scope.avaiStores[scope.$index].StoreName);
				if(scope.item.ArrivalMethods.SelectedArrivalMethod.SelectedStore.SelectedStoreName == scope.avaiStores[scope.$index].StoreName) {
					element.removeClass("unselected").addClass("selected");
				}
			};
			scope.getChosenStore(); // AND DO EXACTLY THAT

			element.bind('click', function(){ //SELECTING A STORE
				var index = scope.$index;
				var itemIndex = scope.$parent.$parent.$index;

				

                cartEdit.editFulfillmentStep1(itemIndex, 'pickup', attr.itemInfo);
                scope.closeModal();
                
                /*cartEdit.editFulfillmentStep2(itemIndex, scope.avaiStores[index].StoreCount);       //spu continue, needs to be add to cart later.
				cartEdit.editStep2Deferred.promise.then(function(data) {
					////console.log(data);
					////console.log("emited");
					scope.$emit("editStep2Finished", data);
					scope.closeModal();
				});  */
                
//				scope.$parent.$apply(function(){
//					//$rootScope.currentlySelectedStoreName = $rootScope.avaiStores[index].SelectedStoreName;
//					scope.$parent.item.ArrivalMethods.SelectedArrivalMethod.SelectedStore.SelectedStoreName = $rootScope.avaiStores[index].SelectedStoreName;
//					$rootScope.storeStatus = "storedAtEdit";
////					$rootScope.selectedStore = $rootScope.avaiStores[index];
//					$rootScope.selectedStore.push($rootScope.avaiStores[index]);
//					scope.getClosingHour();
//					$rootScope.selectedStore.Storepickupphone = "(" + $rootScope.selectedStore.Storepickupphone.substring(0, 3) + ")" + $rootScope.selectedStore.Storepickupphone.substring(3, 6) + "-" + $rootScope.selectedStore.Storepickupphone.substring(6, $rootScope.selectedStore.Storepickupphone.length);
//				});
			});
			
//			scope.getClosingHour = function() {
//				var date = new Date();
//				var day = date.getDay();
//				if(day < 6 && day > 0)
//					$rootScope.selectedStore.closingHour = $rootScope.selectedStore.WorkingHours.MondayToFriday.split("-")[1];
//				else if(day == 0) {
//					$rootScope.selectedStore.closingHour = $rootScope.selectedStore.WorkingHours.Sunday.split("-")[1];
//				} else $rootScope.selectedStore.closingHour = $rootScope.selectedStore.WorkingHours.Saturday.split("-")[1];
//			};
		}
	}
}]);


/*************************** APPLY OR REMOVE COUPON ***************************************/

WLCC.directive("applyRemoveCoupon", ['$rootScope', 'applyOrRemoveCoupon', function($rootScope, applyOrRemoveCoupon){
	return {
		restrict: "A",
		link: function(scope, element, attr) {
			element.bind($rootScope.myEvent, function(){
					var code = $("#couponInput").val();
					//Validation needs to happen! 
					//inside the cart : is there a coupon already? then dont offer apply, only remove
					var action = element.attr('apply-remove-coupon');;
					//var index = scope.$index;
					if(action == "add"){
						applyOrRemoveCoupon.coupon(action, code);
						
					}else if(action == "remove"){
						applyOrRemoveCoupon.coupon(action, "");
					}
					
					applyOrRemoveCoupon.deferred.promise.then(function(){
						
					});
					scope.$apply(function(){
						//$rootScope.currentlySelectedStoreName = $rootScope.avaiStores[index].SelectedStoreName;
						//scope.$parent.currentlySelectedStoreName = $rootScope.avaiStores[index].SelectedStoreName;
					});
			});
		}
	}
}]);


/************************ PAYMENT VALIDATIONS ****************************/
WLCC.directive('paymentValidations', ['paymentValidatorService', function(paymentValidatorService){        //Called on form payment
    var dirLink =function(scope, elem, attrs, ctrl){ // DONT USE ctrl
        deba=[scope,elem,attrs,ctrl];
        scope.card.submit = false; // NOT YET SUBMIT

        var finder = $.fn.find; // WACK CODE TO GREP FINDER
        function grabCtrl(stu){ return angular.element(stu).controller('ngModel')}

        var cardTypeCtrl = grabCtrl($(elem[0]).find('.cardType')); // IMPORTANT, DEPENDENCY
        var numberCtrl = grabCtrl($(elem[0]).find('.cardNo'));
        var nameCtrl = grabCtrl($(elem[0]).find('.ownersName'));
        var cvvCtrl = grabCtrl($(elem[0]).find('.cvvNo'));
//        var expMonthCtrl = grabCtrl($(elem[0]).finder('#expMonthCardPayment'));
//        var expYearCtrl = grabCtrl($(elem[0]).finder('#expYearCardPayment'));
        var expDateElem = $(elem[0]).find('.expDate');
        var expDateCtrl = grabCtrl(expDateElem);
        //Parsers
        var v = paymentValidatorService;
        var cardType = scope.card.cardType ? scope.card.cardType : '';
//        ////console.log('scope.creditCardForm')
//        ////console.log(scope.creditCardForm);
        scope.$watch('card',function(newVal, oldVal){
            //console.log('watched');
            if(newVal.submit == true && oldVal.submit == false){
                scope.card.submit == true;
            }
            else{
                scope.card.submit = false; //SET ON MODEL CHANGE
            }
        }, true);
//        ////console.log('items to be changed'); ////console.log( $(elem).find('input'));  deba.push($(elem).find('input'))

//        $(elem).find('input').attr('disabled','');
        cardTypeCtrl.$parsers.unshift(function(viewValue){
//            var cardTypes = ['VISA', 'MasterCard', 'SearsGoldMC', 'SearsPlus', 'DISCOVER', 'SearsCommercialOne', 'AMEX'];
            cardTypeCtrl.$setValidity('cardType', v.vCardType(viewValue));
            /*if(cardTypeCtrl.$valid){
                ////console.log('allow input');
                $(elem).find('input').removeAttr('disabled');
            }*/
//            ////console.log('cvv'+v.reqCVV + 'cardno'+v.reqCardNo);
            scope.card.cvvSize = v.reqCVV;
            scope.card.cardDigits = v.reqCardNo;
//            ////console.log('$$Check if scope.card have cvvSize and require.cardDigits:'); ////console.log(scope);
            // CHECK CVV AND CARDNO DIGITS
            cvvCtrl.$setValidity('cvvDigits', v.vLength($(elem[0]).find('.cvvNo').val(), viewValue, 'cvv'));
            numberCtrl.$setValidity('cardDigits', v.vLength($(elem[0]).find('.cardNo').val(), viewValue, 'cardNo'));
            return cardType = viewValue;
        });
        nameCtrl.$parsers.unshift(function(viewValue){
            nameCtrl.$setValidity('nameAlphabetical', v.vPattern(viewValue,'alphabets')); //needs vcardtype()
            nameCtrl.$setValidity('nameLength',  viewValue.length < 40);
            return viewValue;
        });
        numberCtrl.$parsers.unshift(function(viewValue){
//            ////console.log('checking if card number "'+viewValue+'" have digits of ' + v.reqCardNo);
            numberCtrl.$setValidity('cardDigits', v.vLength(viewValue, cardType, 'cardNo'));
            numberCtrl.$setValidity('cardNumbers', v.vPattern(viewValue,'numbers'));
            cardTypeCtrl.$setValidity('cardType', v.vCardType(cardType));
            return viewValue;
        });
        cvvCtrl.$parsers.unshift(function (viewValue) {
//            ////console.log('checking if card number "'+viewValue+'" have digits of ' + v.reqCVV);
            cvvCtrl.$setValidity('cvvDigits', v.vLength(viewValue, cardType, 'cvv'));
            cvvCtrl.$setValidity('cvvNumbers', v.vPattern(viewValue,'numbers'));
            cardTypeCtrl.$setValidity('cardType', v.vCardType(cardType));
            return viewValue;
        });
        /*expMonthCtrl.$parsers.unshift(function(viewValue){
            expMonthCtrl.$setValidity('expMonth', v.vExpMonth(viewValue));
            return viewValue;
        });
        expYearCtrl.$parsers.unshift(function(viewValue){
            expYearCtrl.$setValidity('expYear', v.vExpYear(viewValue));
            return viewValue;
        });*/
        expDateCtrl.$parsers.unshift(function(viewValue){
            var validateYear = viewValue.length == 4 && v.vExpYear(viewValue.substring(2));
//            expDateCtrl.$setValidity('blur', true);
            expDateCtrl.$setValidity('isNumber', v.vPattern(viewValue,'numbers'));
            expDateCtrl.$setValidity('month', v.vExpMonth(viewValue.substring(0,2)));
//            ////console.log(validateYear);
            expDateCtrl.$setValidity('year', (validateYear));
//            ////console.log(expDateCtrl);

            if(viewValue.length == 4){
                var allTrue = true;
                for (var key in expDateCtrl.$error) {
                    if (expDateCtrl.$error.hasOwnProperty(key)) {
                        if (expDateCtrl.$error[key] == true) allTrue = false;
                    }
                }
                if (allTrue){
                    ////console.log('Date Format Correct');
                    scope.card.validatedDate = true;
                    scope.card.expiryDateParsed = viewValue.substring(0, 2) + '/' + '20'+viewValue.substring(2);
                }
            }
            else{
                scope.card.validatedDate = false;
                expDateCtrl.$setValidity('length', true);
            }
            return viewValue;
        });
//        expDateElem.bind('click', function(){   // TO CONFIG ONBLUR ACTIONS,
//            expDateCtrl.$render({
//              expDateCtrl.$setValidity('blur', false);
//            });
//        })
    };
    return{
        controller: 'addCreditCardCtrl',
        link: dirLink,
        scope: '='
    }
}]);

WLCC.directive('vMark',['$rootScope','paymentValidatorService','$timeout', function($rootScope, paymentValidtorService, $timeout){
    return{
        link: function(scope, element, attr){
//            deba.push(scope,element,attr);
            var vMarker = attr.vMark;
            var targetInput = $(element).prev();
            var targetCtrl = angular.element(targetInput).controller('ngModel');
            function process(value,decision){
//               ////console.log('new Value: ' + value);
//                ////console.log('show error');////console.log($(element).find('p:not([style="display: none;"])'));
                $timeout(function(){
                    //DeterMine if Diamond Flag Shows up or not
                    var arrowFlag = $(element).find('p:not([style="display: none;"])').length > 0;
                    if(arrowFlag ){
                        $(element).addClass('error');
                    }else{
                        $(element).removeClass('error');
                    }
                    element.find('span.err-arrow').css('display', arrowFlag ? 'block' : 'none');

                    ////console.log('checking');   //  REMOVING ERRORS AND SHOWING ERRORS
                    $('input').removeClass('ccInvalid');
                    var elements = $('div.errorDiv.error');
                    var first = elements.first();
                    elements.not(first).removeClass('showing');
                    if (elements.length > 0){
//                        //console.log(elements);
                        first.addClass('showing');
                        elements.prev('input').addClass('ccInvalid');
                    }
                },0);
                return value;
            }
            if (!!vMarker){
                scope.$watch(vMarker, function(decision){
                    process('', decision);
                });
            }
            $timeout(function(){
                $('#saveBtn').addClass('bound').on($rootScope.myEvent, function(){
                    //console.log('Clicked Save')
                    scope.$apply(function(){
                        process();
                    })
                });
            }, 100);
            scope.$watch('card',function(newVal, oldVal){
                process(newVal);
            }, true);
        }
    }
}]);

WLCC.directive('errMarker', ['$rootScope', function($rootScope){
    return {
        link: function(s,e,a,c){

        },
        scope: '='
    }
}]);

/*
WLCC.directive('cvvValidation', ['paymentValidatorService', function(paymentValidatorService){
    var dirLink = function(s,e,a,c){
        deba = [s,e,a,c];
        var v = paymentValidatorService
        var thisCard = s.$parent.$parent.card;
        c = angular.element(e).controller('ngModel');
        c.$parsers.unshift(function(newVal){
//            ////console.log('checking if card number "'+newVal+'" have digits of ' + v.reqCVV);
            c.$setValidity('cvvDigits', v.vLength(newVal,thisCard.WalletBrand, 'cvv'));
            c.$setValidity('cvvNumbers', v.vPattern(newVal,'numbers'));

            */
                /*            c.cvvDigits = !v.vLength(newVal, v.reqCVV);
                 c.cvvNumbers = !v.vPattern(newVal,'numbers');
                 *//*

             ////console.log(s);////console.log(c);
             return newVal;
             });
             };
             return{
             //        require: 'ngModel',
             link: dirLink,
             scope: '='
             }
             }]);
             */


/************************** DELETE CREDIT CARD *************************************/
WLCC.directive('deleteCreditCard', ['$rootScope', 'removeCreditCardService', '$timeout', function($rootScope, removeCreditCardService, $timeout){
    return{
        scope: '=',
        link: function(scope,elem,attr,ctrl){
            elem.unbind($rootScope.myEvent).bind($rootScope.myEvent, function(){
//               deba = [scope,elem,attr,ctrl];
                $('li#item'+scope.$index).addClass('removing').removeClass('selected'); //give it Effect
                if(scope.$index == $rootScope.selectedCreditCardIndex){ //clean index
                    $rootScope.selectedCreditCardIndex = -1;
                }
                var thisCard = $rootScope.modifiedSavedCards[scope.$index];
                
                ////console.log('before...'); ////console.log( $rootScope.modifiedSavedCards);
                if (thisCard.TrueAccount != undefined){
                    //delete new card
                    $rootScope.modifiedSavedCards.splice(scope.$index,1);
                    $rootScope.newCreditCard = undefined;
                    ////console.log('deleting new card');
                }
                else{ //saved card
                    ////console.log('deleting saved card');
                    var notifier = removeCreditCardService.removeCreditCard(scope);
                }
                ////console.log('Deleting Card Index: ' + scope.$index);
                ////console.log('after...'); ////console.log($rootScope.modifiedSavedCards);

                /*$timeout(function(){
                },100);*/
                scope.$apply(function(){

                });
            });
        }
    }
}]);

/************************ SHOWING THE RIGHT SIGN IN FORM ACCORDING TO USERD DECISION **********************/

WLCC.directive("signInForm", ['$rootScope', 'cartEdit', function($rootScope, cartEdit){
	return {
		restrict: "A",
		link: function(scope, element, attr) {
//			localStorage.userType = "R";
//			$rootScope.userType = "R";
			element.bind($rootScope.myEvent, function(){
				var thisType = element.attr("data-this");
				var otherType = element.attr("data-other");
				
				$(".form"+thisType).removeClass("hide");
				$(".form"+otherType).addClass("hide");
				
//				localStorage.userType = thisType;
//				$rootScope.userType = thisType;
			});
		}
	}
}]);



/*************** CHOOSING A DELIVERY TYPE (WEEKEND AND SO ON) **************/

WLCC.directive("selectingDeliveryType", ['$rootScope', '$timeout', 'premiumDeliveryChargeService', function($rootScope, $timeout, premiumDeliveryChargeService){
	return {
		restrict: "A",
		link: function(scope, element, attr, model) {
			$timeout(function(){
				premiumDeliveryChargeService.deferred.promise.then(function(){
					if(element.hasClass("selected")){
						////console.log(element.attr("data-type") + " " + element.attr("data-price"));
						$rootScope.selectedDeliveryType = element.attr("data-type");
						$rootScope.selectedDeliveryCharge = element.attr("data-price");
					}
				});
			},300);
			
			scope.$watch("standardDelivery", function(){
				if(element.hasClass("selected")){
					////console.log(element.attr("data-type") + " " + element.attr("data-price"));
					$rootScope.selectedDeliveryType = element.attr("data-type");
					$rootScope.selectedDeliveryCharge = element.attr("data-price");
				}
			});
			
			element.bind($rootScope.myEvent, function(){
				////console.log(element.attr("data-type") + " " + element.attr("data-price"));
				$rootScope.selectedDeliveryType = element.attr("data-type");
				$rootScope.selectedDeliveryCharge = element.attr("data-price");
			});
		}
	}
}]);



/*********************** USE THIS FOR AN EMAIL INPUT IN ORDER TO VALIDATE *************************/

WLCC.directive("validateEmail", ['$rootScope', '$compile', '$timeout', '$http', '$templateCache', function($rootScope, $compile, $timeout, $http, $templateCache) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
            var parent = $(element).parent();
            deba.push(element);
            element.bind("keyup change", function() {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                ////console.log('validating email');
                if($(this).val() == "" || !$(this).val()) {
                    $(parent).addClass("error");
                    $(element).next('span.err-msg').addClass('showing');
                    $(element).parent().next('label').find('span.err-msg').removeClass('showing');
                }else if(!filter.test($(this).val())) {
                    $(parent).addClass("error");
                    $(element).next('span.err-msg').addClass('showing');
                    $(element).parent().next('label').find('span.err-msg').removeClass('showing');
                }else{
                    $(parent).removeClass("error");
                    $(element).next('span.err-msg').removeClass('showing');
                    $(element).parent().next('label').find('span.err-msg').addClass('showing');
                }
//                scope.$apply(function(){
//                });
            });
		}
	};
}]);


/*********************** USE THIS FOR AN PASSWORD INPUT IN ORDER TO VALIDATE *************************/

WLCC.directive("validatePassword", ['$rootScope', '$compile', '$timeout', '$http', '$templateCache', function($rootScope, $compile, $timeout, $http, $templateCache) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
            var parent = $(element).parent();
            deba.push(this);
			$timeout(function(){
				element.bind("keyup change", function() {
					if($(this).val().length < 6 || !(/[A-z]/.test($(this).val())) ){ //|| !(/\d/.test($(this).val()))) {
						$(parent).addClass("error");
                        if(!$(element).parent().prev('label').hasClass('error')){ //if username has error
                            $(element).next('span.err-msg').addClass('showing');
                        }
					}else {
                        $(parent).removeClass("error");
                        $(element).next('span.err-msg').removeClass('showing');
                    }

                    //check if top shows, if not this shows

				});
			}, 300);
			
		}
	};
}]);

WLCC.directive("deleteGiftCard", ['$rootScope','$timeout', '$http', 'applyOrRemoveGCService', function($rootScope, $timeout, $http, applyOrRemoveGCService) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
//			$timeout(function(){
				element.bind($rootScope.myEvent, function() {
					////console.log(scope.$index);
					var giftCardAccNum = attr.num;
					var giftCardPin	= attr.pn;
					$('div#gc'+scope.$index).addClass('deleting');
					applyOrRemoveGCService.removeGC(giftCardAccNum, giftCardPin);
//					applyOrRemoveGCService.deferred.promise.then(function(){
// 						$scope.message = applyOrRemoveGCService.message;
//					});
				});
//			}, 300);
		}
	};
}]);


WLCC.directive("ecouponsApply", ['$rootScope','$timeout', '$http', 'eCoupons', function($rootScope, $timeout, $http, eCoupons) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
				element.bind($rootScope.myEvent, function() {
					////console.log(scope.$parent.$index);
					
					eCoupons.applySavedOffers(attr.couponCode, scope.$parent.$index, attr.couponType);
					eCoupons.deferred.promise.then(function(){
						scope.$parent.theEnteredCode = "";
						scope.updateCart();
					});
					
				});
		}
	};
}]);

WLCC.directive("ecouponsRemove", ['$rootScope','$timeout', '$http', 'eCoupons', function($rootScope, $timeout, $http, eCoupons) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
				element.bind($rootScope.myEvent, function() {
					eCoupons.removeSavedOffers(attr.couponCode, scope.$parent.$index);
					eCoupons.deferred.promise.then(function(){
						scope.updateCart();
						
					});
				});
		}
	};
}]);


WLCC.directive("sywAction", ['$rootScope','$timeout', '$http', 'sywCalls', function($rootScope, $timeout, $http, sywCalls) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
			//autoremove when unchecked?
			if(attr.action == "autoRemove"){
				sywCalls.remove(attr.num);
			}
//			sywrDetails.PinLess
			
				element.bind($rootScope.myEvent, function() {
						if(attr.action == "save"){

							if(scope.validateSywInput(scope.syw)){
								sywCalls.saveSywOnCart(scope.syw);
							}else{
								alert("Please Enter 16 Digits");
							}
						}if(attr.action== "add"){
							if($rootScope.sywrDetails.PinLess == "Yes"){
								sywCalls.add(scope.syw, scope.$$nextSibling.sywPin);
							}else if($rootScope.sywrDetails.PinLess == "No"){
								if(scope.validatePinInput(scope.$$nextSibling.sywPin)){
									sywCalls.add(scope.syw,scope.$$nextSibling.sywPin);
								}else{
									alert("Please Enter up to 8 Digits");
								}
							}else{
								sywCalls.add(scope.syw, scope.$$nextSibling.sywPin);
							}
							
						}else if(attr.action== "remove"){
							sywCalls.remove(attr.num);
						}else if(attr.action== "edit"){
							if(scope.syw != "" && scope.syw != undefined){
								if(scope.validateSywInput(scope.syw)){
									sywCalls.edit(scope.syw, scope.$$nextSibling.sywPin);
								}else{
									alert("Please Enter 16 Digits");
								}
							}else if($rootScope.swyNumb != "" && $rootScope.swyNumb != undefined){
								sywCalls.edit($rootScope.swyNumb, scope.$$nextSibling.sywPin);
							}
						}
				});
				
				scope.validateSywInput = function(input){
					var filter = /^([0-9]{16})+$/;
					if((input).size < 16 ){
						return false;
					}else if(!filter.test(input)){
						return false;
					}
					return true;
				}
				
				
				scope.validatePinInput = function(input){
					var filter = /^([0-9])+$/;
					if((input).size > 8 ){
						return false;
					}else if(!filter.test(input)){
						return false;
					}
					return true;
				}
				
		}
	};
}]);



WLCC.directive("rebateApply", ['$rootScope','$timeout', '$http', 'applyRebate', function($rootScope, $timeout, $http, applyRebate) {
	return {
		restrict: "A",
		scope: "=",
		link: function(scope, element, attr) {
				element.bind($rootScope.myEvent, function() {
					applyRebate.applyInCart();
				});
		}
	};
}]);


WLCC.directive('cartTotalCounter',function($rootScope,$timeout,$compile){
	return {
		scope: true,
		restrict: 'CAE',
		compile: function(sc,el,tr) {
			return {
				pre: function(sc,el,at,co) {
					sc.updateViaBroadcast = function(newNum){
						for(var j = 0; j < sc.newDigits; j++) {
							var toBroadCast = 'changeDigit'+j;
							sc.$broadcast(toBroadCast,newNum[j]);
						}
					};
					sc.doThis = function() {
						if(sc.newDigits != sc.oldDigits) {
							$timeout(function(){
								if($(el[0]).find('.cart-total-counter-digit').length < sc.newDigits) {
									var noToAdd = sc.newDigits - $(el[0]).find('.cart-total-counter-digit').length;
									for(var x = 0; x < noToAdd; x++) {
										var num = sc.newNumber[sc.oldDigits + x];
										el.append($compile('<cart-total-counter-digit ct-digit="' + num + '" ct-digit-index="' + (sc.oldDigits + x) + '"></cart-total-counter-digit')(sc));
									}
									$timeout(function(){sc.updateViaBroadcast(sc.newNumber);},0);
								} else if($(el[0]).find('.cart-total-counter-digit').length > sc.newDigits) {
									var noToRem = $(el[0]).find('.cart-total-counter-digit').length - sc.newDigits;
									for(var y = 0; y < noToRem; y++) {
										var num = sc.newNumber[x];
										$('.cart-total-counter-digit:last-child').remove();
									}
									$timeout(function(){sc.updateViaBroadcast(sc.newNumber);},0);
								}
							},0)
						} else {
							sc.updateViaBroadcast(sc.newNumber);
						}
					}
				},
				post: function(sc,el,at,co) {
					el.append('<span class="moneySign">$</span>');
					sc.$watch(function(){
						return sc[at.varToWatch];
					},function(newObj,oldObj,sc){
						if(!sc[at.varToWatch] || sc[at.varToWatch] == '') {
							el.css('opacity','0');
						} else {
							el.css('opacity','1');
						}
						sc.newNumber = newObj ? newObj.replace(/\D/g,'') : '';
						sc.oldNumber = oldObj ? oldObj.replace(/\D/g,'') : '';
						sc.newDigits = sc.newNumber.length;
						sc.oldDigits = sc.oldNumber.length;
						$timeout(function(){sc.doThis();},100);
					},true)
				}
			}
		}
	}
}).directive('cartTotalCounterDigit',function($rootScope,$timeout){
	return {
		scope: true,
		restrict: 'E',
		template: '<span class="cart-total-counter-digit"><span class="num current top">{{currentDigit}}</span><span class="num current bottom">{{currentDigit}}</span><span class="num next top">{{nextDigit}}</span><span class="num next bottom">{{nextDigit}}</span></span>',
		replace: true,
		compile: function(sc,el,tr) {
			return {
				pre: function(sc,el,at,co) {
					sc.transitioning = false;
					sc.transHitCount = 0;
					sc.currentDigit = 0;
					sc.nextDigit = 1;
					sc.transitionEvent = function(){
						sc.steps--;
						$(el[0]).find('span.num').addClass('noTransition');
						$(el[0]).removeClass('goNext');
						$timeout(function(){
							if(sc.currentDigit < 9){sc.currentDigit ++;}else{sc.currentDigit = 0;}
							sc.nextDigit = sc.currentDigit > 8 ? 0 : sc.currentDigit + 1;
							$(el[0]).find('.noTransition').removeClass('noTransition');
						},0)
						
						if(sc.steps > 0) {
							$timeout(function(){$(el[0]).addClass('goNext');},10);
						} else {
							sc.transitioning = false;
						}
					};
					sc.flipTo = function(newNumber) {
						if(newNumber != sc.currentDigit) {
							if(sc.currentDigit <= newNumber) {sc.steps = Math.abs(parseInt(sc.currentDigit)-parseInt(newNumber));}
							else{sc.steps = Math.abs(10+parseInt(newNumber)-parseInt(sc.currentDigit));};
							sc.totalSteps = sc.steps;
							sc.transTime = 1/sc.totalSteps;
							$(el[0]).find('span.num').css('-webkit-transition-duration',sc.transTime+'s')
							sc.transitioning = true;
							$(el[0]).addClass('goNext').unbind('webkitTransitionEnd').bind('webkitTransitionEnd',function(e){
								if(e.propertyName == '-webkit-transform') {
									sc.transHitCount++;
								};
								if(sc.transHitCount == 2) {
									sc.transHitCount = 0;
									sc.transitionEvent();
								}
							})
						};
					}
				},
				post: function(sc,el,at,co) {
					$timeout(function(){
						sc.flipTo(parseInt(at.ctDigit));
						sc.$on('changeDigit'+at.ctDigitIndex,function(e,num){
							sc.flipTo(num);
						})
					},0);
				}
			}
		}
	}
});
