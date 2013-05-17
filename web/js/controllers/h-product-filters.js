// Generated by CoffeeScript 1.6.1
(function() {
  var ProductFiltersHelper,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ProductFiltersHelper = (function() {

    function ProductFiltersHelper(products, selectedCategories, priceRange, selectedBrands) {
      var product, work, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      work = [[], [], []];
      for (_i = 0, _len = products.length; _i < _len; _i++) {
        product = products[_i];
        if ((_ref = product.Category, __indexOf.call(selectedCategories, _ref) >= 0)) {
          work[0].push(product);
        }
      }
      _ref1 = work[0];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        product = _ref1[_j];
        if ((_ref2 = product.BrandName, __indexOf.call(selectedBrands, _ref2) >= 0)) {
          work[1].push(product);
        }
      }
      _ref3 = work[1];
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        product = _ref3[_k];
        if (PriceHelper.asNumber(product.RegularPrice) <= priceRange.max && PriceHelper.asNumber(product.RegularPrice) >= priceRange.min) {
          work[2].push(product);
        }
      }
      this.filteredProducts = work[2];
    }

    return ProductFiltersHelper;

  })();

  window.ProductFiltersHelper = ProductFiltersHelper;

}).call(this);