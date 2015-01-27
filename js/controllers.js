'use strict';

/* Controllers */

var assemblyKitControllers = angular.module('assemblyKitControllers', []);

assemblyKitControllers.constant( 'jsonURL', 'http://managed.nattodaisuki.com/wp-json/' );
assemblyKitControllers.factory( 'GetJson', function ( $resource, jsonURL ) {

	var res = $resource(
		jsonURL,
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

	});
assemblyKitControllers.controller( 'MkHead', function ( $scope, GetJson ) {
		var config = {
			jsonURL: 'http://managed.nattodaisuki.com/wp-json/'
		};

		$scope.haed = GetJson.all();

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
