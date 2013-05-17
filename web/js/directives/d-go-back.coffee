###

Go back directive to bind to html elements 
for the back button

###

'use strict'

directives = angular.module 'go-back.directives', []

directives.directive 'goBack', ($compile, $location) ->
	restrict: 'A'
	compile: (element, attrs, transinclude) ->
		pre: (scope, element, attrs, controller) ->
		post: (scope, element, attrs, controller) ->
			element.bind "click", (e) ->
				window.history.back();
  