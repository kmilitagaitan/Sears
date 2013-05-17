// Generated by CoffeeScript 1.6.1
(function() {
  var PriceHelper;

  PriceHelper = (function() {

    function PriceHelper() {}

    PriceHelper.minMax = function(products) {
      var minMax, prices, product;
      minMax = {};
      prices = [];
      prices = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = products.length; _i < _len; _i++) {
          product = products[_i];
          _results.push(this.asNumber(product.RegularPrice));
        }
        return _results;
      }).call(this);
      console.log("Price: ", prices[1]);
      console.log("Max: ", Math.min.apply(Math, prices));
      minMax.min = Math.min.apply(Math, prices);
      minMax.max = Math.max.apply(Math, prices);
      return minMax;
    };

    PriceHelper.asNumber = function(aString) {
      return parseFloat(aString.replace(/\$/g, ''));
    };

    return PriceHelper;

  })();

  window.PriceHelper = PriceHelper;

}).call(this);