'use strict';

/* Controllers */

var assemblyKitControllers = angular.module('assemblyKitControllers', []);

assemblyKitControllers.factory('GetJson', function ($resource) {

	var res = $resource(
		'http://managed.nattodaisuki.com/wp-json/posts/',
		{
			'update': { method: 'PUT' },
			'query': { method: 'GET', isArray: true, cache: false }
		}
	);

	return {
		all: function () {
			return res.query();
		}
	};

});
assemblyKitControllers.controller( 'MainCtrl', function ( $scope, GetJson ) {

		$scope.posts = GetJson.all();
		console.log($scope.posts);

	});
/*
assemblyKitControllers.controller('CompanyDetailCtrl', ['$scope', '$routeParams', '$http',
	function($scope, $routeParams, $http) {
		$http({
			method: 'get',
			url: 'http://www.everybirdie.net/api/stock/' + $routeParams.companyId,
			withCredentials: true
		}).
		success(function(data, status) {
			$scope.company = data;
		}).
		error(function(data, status) {
			alert('通信エラーが発生しました');
		});
	}]
);
*/
