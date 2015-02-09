(function(window, angular, undefined) {'use strict';

  /**
   * @ngdoc overview
   * @name mediaAssemblyKitApp
   * @description
   * # mediaAssemblyKitApp
   *
   * Main module of the application.
   */

  /* App Module */
  var makApp = angular.module('makApp', [
    'ui.router',
    'ngResource',
    'makFactory',
    'makController'
  ]);

  makApp.config( function( $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider ) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    /*
    $httpProvider.defaults.headers.get = { 'X-WP-Total' : '10' };
    $httpProvider.defaults.headers.get = { 'X-WP-TotalPages' : '10' };
    $httpProvider.defaults.headers.get = { 'Link' : '10' };
    */
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home',{
        url:'/',
        views:{
            main:{
                templateUrl: '/views/archive.html',
                controller: 'Archive'
            }
        }
     }).state('category',{
        url:'/archives/category/{terms:.*}',
        views:{
            main:{
                templateUrl: '/views/archive.html',
                controller: 'Archive'
            }
        }
    }).state('tag',{
        url:'/archives/tag/:tags',
        views:{
            main:{
                templateUrl: '/views/archive.html',
                controller: 'Archive'
            }
        }
    }).state('single',{
        url:'/archives/:ID',
        views:{
            main:{
                templateUrl: '/views/single.html',
                controller: 'Single'
            }
        }
    }).state('page',{
        url:'/{pagename:.*}',
        views:{
            main:{
                templateUrl: '/views/single.html',
                controller: 'Pages'
            }
        }
    });

  });

  makApp.value('makConfig', {
    apiUrl        : 'http://managed.nattodaisuki.com/',
    thumbnailSize : 'thumbnail',
    menu_id       : 'primary'
  });

})(window, window.angular);
