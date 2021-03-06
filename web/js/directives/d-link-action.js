// Generated by CoffeeScript 1.6.1
(function() {
  'use strict';
  var directives;

  directives = angular.module('link-action.directives', []);

  window.utf8_to_b64 = function(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  };

  window.b64_to_utf8 = function(str) {
    return decodeURIComponent(escape(window.atob(str)));
  };

  directives.directive('bindHtml', function($compile, $location) {
    return {
      restrict: 'A',
      compile: function(element, attrs, transinclude) {
        return {
          pre: function(scope, element, attrs, controller) {},
          post: function(scope, element, attrs, controller) {
            return scope.$watch(attrs.bindHtml, function(val) {
              var aChild, attrClass, attrValue, child, dataXHrefs, decoded, _i, _len, _results;
              if (val) {
                decoded = decodeURIComponent(escape(window.atob(val.code)));
                console.log("DECODED", decoded);
                element.html(decoded);
                $compile(element.contents())(scope);
                dataXHrefs = element.children().find('div[data-x-href]');
                _results = [];
                for (_i = 0, _len = dataXHrefs.length; _i < _len; _i++) {
                  child = dataXHrefs[_i];
                  aChild = angular.element(child);
                  attrClass = aChild.attr('class');
                  console.log("CLAZZ", attrClass);
                  attrValue = aChild.attr('data-x-href');
                  _results.push((function(attrValue) {
                    return element.bind("click", function(e) {
                      var encoded;
                      if (val.action === "feed") {
                        console.log("FEED ACTION TYPE DETECTED");
                        encoded = encodeURIComponent(attrValue);
                        scope.$apply(function() {
                          return $location.path("/feed/" + encoded);
                        });
                      } else {

                      }
                      return console.log("data-x-href = ", attrValue);
                    });
                  })(attrValue));
                }
                return _results;
              }
            });
          }
        };
      }
    };
  });

}).call(this);
