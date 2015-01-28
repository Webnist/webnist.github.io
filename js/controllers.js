'use strict';

/* Controllers */

var assemblyKitControllers = angular.module('assemblyKitControllers', []);

//assemblyKitControllers.constant( 'jsonURL', 'http://managed.nattodaisuki.com/wp-json/' );
assemblyKitControllers.factory( 'GetJson', function ( $resource ) {

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
assemblyKitControllers.factory( 'GetJsonMenu', function ( $resource ) {

	var res = $resource(
			'http://managed.nattodaisuki.com/wp-json/menus/primary/content/',
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

assemblyKitControllers.controller( 'WPGlobalMenu', function ( $scope, GetJsonMenu ) {

		$scope.menus = GetJsonMenu.all();
		console.log(GetJsonMenu);

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
