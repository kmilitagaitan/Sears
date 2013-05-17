'use strict'

directives = angular.module 'siteworx-body-js.directives', []

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

directives.directive 'siteworxBodyJs', ($compile, $location) ->
  restrict: 'E'
  scope: true
  compile: (element, attrs, transinclude) ->
    pre: (scope, element, attrs, controller) ->
    post: (scope, element, attrs, controller) ->
      scope.$watch 'cmsScriptsBody', (val) ->
        if val
          decoded = decodeURIComponent(escape(window.atob( val[0])))
          console.log "cmsScriptsBody", decoded
          # decoded = '<script type="text/javascript" src="js/dynamic-injection.js"></script>'
          element.html(decoded)
          $compile(element.contents())(scope)

      ###
      scope.$watch element, (val) ->
        if val
          #decoded = decodeURIComponent(escape(window.atob( val)))
          console.log "SITEWORXJS"
          #element.html(decoded)
          $compile(element.contents())(scope)
      ###