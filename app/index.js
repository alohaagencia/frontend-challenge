(function(){
  
  app = angular.module('myApp', ['ngRoute']);

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'products/tabs.html',
        controller: 'productsCtrl'
      })
  });

})();
