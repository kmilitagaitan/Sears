/**
 * Auto select controller.
 * @author Valentin Sagrario  <valentin.sagrario@globant.com>
 * @param  {[type]} $scope    [description]
 * @param  {[type]} $location [description]
 */
function AutomotiveTiresFitmentCtrl( $scope, $location ){

  // Values are hard-coded until hooked up with API

  $scope.years = [];
  for ( var yearIndex = 2013; yearIndex >= 1960; --yearIndex ){
    $scope.years.push( { name: yearIndex } );
  }

  $scope.makes = [
    { name: 'Acura' },
    { name: 'Audi' },
    { name: 'Bentley' },
    { name: 'Bmw' },
    { name: 'Buick' },
    { name: 'Cadillac' },
    { name: 'Chevrolet' },
    { name: 'Chrysler' },
    { name: 'Dodge' },
    { name: 'Dodge-ram' },
    { name: 'Ford' },
    { name: 'Freightliner' },
    { name: 'Gmc' },
    { name: 'Hino' },
    { name: 'Honda' },
    { name: 'Hyundai' },
    { name: 'Infiniti' },
    { name: 'Jeep' },
    { name: 'Kia' },
    { name: 'Lamborghini' },
    { name: 'Land Rover' },
    { name: 'Lexus' },
    { name: 'Lincoln' },
    { name: 'Mazda' },
    { name: 'Mercedes Benz' },
    { name: 'Mini' },
    { name: 'Mitsu Fuso' },
    { name: 'Mitsubishi' },
    { name: 'Nissan-datsun' },
    { name: 'Porsche' },
    { name: 'Rolls Royce' },
    { name: 'Scion' },
    { name: 'Smart' },
    { name: 'Subaru' },
    { name: 'Toyota' },
    { name: 'Ud Truck' },
    { name: 'Volkswagen' },
    { name: 'Volvo' }
  ];

  $scope.models = [
    { name: 'Cooper Clubman' },
    { name: 'Cooper Coupe' },
    { name: 'Cooper' },
    { name: 'Roadster' }
  ];

  $scope.trims = [
    { name: 'Base Hatchback' },
    { name: 'S Hatchback' },
    { name: 'S Coupe' }
  ];

  /**
   * Executed once the user taps on Done button.
   * @author Valentin Sagrario <valentin.sagrario@globant.com>
   */
  $scope.findTires = function(){
    //TODO: validate fields
    $location.path('automotive/search_results');
  };

}

/**
 * 
 * @author Valentin Sagrario  <valentin.sagrario@globant.com>
 * @param  {[type]} $scope    [description]
 * @param  {[type]} $http     [description]
 * @param  {[type]} $location [description]
 */
function AutomotiveSearchResutsCtrl( $scope, $http, $location ){

  $scope.vehicleName = 'Mini Cooper S';

  $http.get( 'data/automotive/search-results.json' ).success( function( data ) {
    $scope.items = data.subCatKeyword.items;
  });

  /**
   * Executed when the user taps on a product on the results list
   * @author Valentin Sagrario <valentin.sagrario@globant.com>
   */
  $scope.viewProductDetails = function(){
    $location.path( 'automotive/product_details/p' );
  };

  /**
   * Executed when the user taps on the vehicle bar.
   * @author Valentin Sagrario <valentin.sagrario@globant.com>
   */
  $scope.selectVehicle = function(){
    $location.path( 'automotive/select_vehicle_menu' );
  };
}

/**
 * Vehicle select page controller.
 * @author Valentin Sagrario  <valentin.sagrario@globant.com>
 * @param  {[type]} $scope    [description]
 * @param  {[type]} $location [description]
 */
function AutomotiveSelectVehicleCtrl( $scope, $location ){

  $scope.vehicleName = 'Select your vehicle';

  /**
   * Executed when the user taps the back/close button.
   * @author Valentin Sagrario <valentin.sagrario@globant.com>
   * @return {[type]} [description]
   */
  $scope.close = function(){
    $location.path( 'automotive/search_results' );
  };

  /**
   * Executed when the user selects the option "Select another vehicle".
   * @author Valentin Sagrario <valentin.sagrario@globant.com>
   */
  $scope.selectVehicle = function(){
    $location.path( 'automotive/select_vehicle' );
  };
}

/**
 * Automotive product detail controller.
 * @author Valentin Sagrario <valentin.sagrario@globant.com>
 * @param  {[type]} $scope   [description]
 * @param  {[type]} $http    [description]
 */
function AutomotiveProductCtrl( $scope, $http ){
$http.get( 'data/automotive/product-details.json' ).success( function( data ) {
    $scope.item = data;
  });
}

/**
 * Automotive Services main page controller.
 * @author Valentin Sagrario <valentin.sagrario@globant.com>
 * @param  {[type]} $scope   [description]
 */
function AutomotiveServicesCtrl( $scope ){

}

/**
 * Placeholder page within automotive section.
 * @author Valentin Sagrario <valentin.sagrario@globant.com>
 * @param  {[type]} $scope   [description]
 */
function AutomotivePlaceholderCtrl( $scope ){
  
}