'use strict'

directives = angular.module 'link-action.directives', []

# Base64 encoded
# http://cqapp301p.dev.ch3.s.com:4502/etc/shc/content/data.sears.wizard.1234567.d.e.0.0.1.allJson
# http://cqapp301p.dev.ch3.s.com:4502/etc/shc/content/data.kmart.wizard.12345678.d.e.0.0.1.allJson

# raw
# http://cqapp301p.dev.ch3.s.com:4502/etc/shc/content/data.sears.wizard.1234567.d.e.1.0.1.allJson
# http://cqapp301p.dev.ch3.s.com:4502/etc/shc/content/data.kmart.wizard.12345678.d.e.1.0.1.allJson

window.utf8_to_b64 = ( str ) ->
  window.btoa(unescape(encodeURIComponent( str )))
 
window.b64_to_utf8 =  ( str ) ->
  decodeURIComponent(escape(window.atob( str )))
 
# Usage:
# utf8_to_b64('✓ à la mode'); // "4pyTIMOgIGxhIG1vZGU="
# b64_to_utf8('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"

directives.directive 'bindHtml', ($compile, $location) ->
  restrict: 'A'
  compile: (element, attrs, transinclude) ->
    pre: (scope, element, attrs, controller) ->
    post: (scope, element, attrs, controller) ->
      scope.$watch attrs.bindHtml, (val) ->
        if val
          decoded = decodeURIComponent(escape(window.atob( val.code )))
          console.log "DECODED", decoded

          element.html(decoded)
          $compile(element.contents())(scope)
          
          dataXHrefs = element.children().find('div[data-x-href]');

          for child in dataXHrefs
            aChild = angular.element(child)
            attrClass = aChild.attr('class')
            console.log "CLAZZ", attrClass
            attrValue = aChild.attr('data-x-href')
            do (attrValue) ->
              element.bind "click", (e) ->
                if val.action == "feed"
                  console.log "FEED ACTION TYPE DETECTED"
                  encoded = encodeURIComponent(attrValue)
                  scope.$apply -> 
                    $location.path("/feed/#{encoded}")
                else                
                console.log "data-x-href = ",attrValue
