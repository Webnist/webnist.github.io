'use strict';
/* Controllers */
var assemblyKitControllers = angular.module('assemblyKitControllers', []);
assemblyKitControllers.controller('Main', function($scope, $http, $routeParams) {
	var url = 'http://managed.nattodaisuki.com/wp-json/posts/?'
		+ [
			'callback=JSON_CALLBACK'
		].join('&');

	$http.get(url).success( function( data ){
		$scope.posts = data;
	});
}).controller('Post', function($scope, $location, $filter) {
	var $post = $scope.post;
	var $baseUrl = $location.$$absUrl;
	$scope.post_ID       = $post.ID;
	$scope.post_title    = $post.title;
	$scope.permalink     = $post.link;
	$scope.post_data     = $filter('date')($post.date, "yyyy-MM-dd");
	$scope.author_name   = $post.author.name;
	$scope.author_avatar = $post.author.avatar;
	$scope.author_slug   = $post.author.slug;
	$scope.author_url    = $baseUrl + $scope.author_slug;
	//$scope.has_thumbnail = $filter('thumbSize')( $post.featured_image );
	$scope.has_thumbnail = $post.featured_image;
	$scope.featured_image = $post.featured_image.thumbnail;
	if ( $scope.has_thumbnail ) {
		$scope.thumbnail_title  = $post.featured_image.title;
		$scope.thumbnail_size   = $post.featured_image.attachment_meta.sizes.thumbnail;
		$scope.thumbnail_width  = $scope.thumbnail_size.width;
		$scope.thumbnail_height = $scope.thumbnail_size.height;
		$scope.thumbnail_url    = $scope.thumbnail_size.url;
	}

	console.log($post);
});
/*
var assemblyKitControllers = angular.module('assemblyKitControllers', []);

assemblyKitControllers.controller('Main', function($scope, $http, $routeParams) {
	$http.get('wp-json/posts/').success(function(res){
		$scope.posts = res;
	});
});
assemblyKitControllers.controller('Content', function($scope, $http, $routeParams) {
	$http.get('wp-json/posts/' + $routeParams.ID).success(function(res){
		$scope.post = res;
	});
});
*/
//assemblyKitControllers.constant( 'jsonURL', 'http://managed.nattodaisuki.com/wp-json/' );
/*
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
		console.log($scope.menus);

	});


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
