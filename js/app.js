'use strict';

/* App Module */

var assemblyKitApp = angular.module('assemblyKit', [
  'ngRoute',
  'ngResource',
  'assemblyKitControllers'
]);
assemblyKitApp.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});
/*
assemblyKitApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/list', {
        templateUrl: 'partials/company-list.html',
        controller: 'CompanyListCtrl'
      }).
      when('/stock/:companyId', {
        templateUrl: 'partials/company-detail.html',
        controller: 'CompanyDetailCtrl'
      }).
      otherwise({
        redirectTo: '/list'
      });
  }
]);
*/
