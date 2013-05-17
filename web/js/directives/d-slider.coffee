'use strict'

directives = angular.module 'slider.directives', []

directives.directive 'slider', ($compile, $location) ->
  restrict: 'A'
  link: (scope, element, attrs) ->
    element.noUiSlider
      range: [scope.minMax.min, scope.minMax.max]
      start: [scope.minMax.min, scope.minMax.max]
      step: .01
      slide: ->
        values = $(this).val()
        scope.minMax.min = values[0]
        scope.minMax.max = values[1]
        $(".range").text "$"+values[0] + " - " + "$"+values[1]