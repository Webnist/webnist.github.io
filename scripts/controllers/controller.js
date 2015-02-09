(function(window, angular, undefined) {'use strict';

	/* App Module */
	var makController = angular.module('makController', []);

	makController.controller('GlobalMenu', function( $scope, makConfig, makQuery, makMenu ) {
		/*
		var $apiurl  = makConfig.apiUrl;
		var $menu_id = makConfig.menu_id;
		var $url = $apiurl + 'wp-json/menus/' + $menu_id +'/content/?'
		+ [
			'callback=JSON_CALLBACK'
		].join('&');
		makQuery.wp_posts( $url ).then(function(json){
			$scope.mak_data  = json.data;
			$scope.mak_menu = makMenu.mak_menu( $scope.mak_data ).content;
		});
		*/
	});
	makController.controller('SideBar', function( $scope, makConfig, makQuery, makMenu ) {
		/*
		var $apiurl  = makConfig.apiUrl;
		var $menu_id = makConfig.menu_id;
		var $url = $apiurl + 'wp-json/taxonomies/category/terms/?'
		+ [
			'callback=JSON_CALLBACK'
		].join('&');
		makQuery.wp_posts( $url ).then(function(json){
			$scope.mak_data  = json.data;
			$scope.mak_categories = $scope.mak_data;
		});
		*/
	});


	makController.controller('the_post', function( $rootScope, $scope, makPost ) {
		var $post       = $scope.wp_post;
		$scope.mak_post = makPost.mak_post( $post ).post;
	});

	makController.controller('Archive', function( $scope, $stateParams, makConfig, makQuery, makPost, $http, $resource ) {
		var $apiurl = makConfig.apiUrl;
		var $terms  = angular.isUndefined( $stateParams.terms ) ? '' : $stateParams.terms;
		var $tags   = angular.isUndefined( $stateParams.tags ) ? '' : $stateParams.tags;
		var $url    = $apiurl + 'wp-json/posts/?'
		+ [
			'filter[category_name]=' + $terms,
			'filter[tag]=' + $tags,
			'page=1',
			'callback=JSON_CALLBACK'
		].join('&');
		//makQuery.wp_posts( $url ).query().$promise.then(function(data, status, headers, config){
		$scope.itemsPerPage = 3;
		$scope.currentPage = 1;
		$scope.totalItems = 0;
		var req = new XMLHttpRequest();
		var URL = "http://managed.nattodaisuki.com/wp-json/posts";
		req.open('GET', URL, false);
		req.send(null);
		//var maxpagine = req.getResponseHeader("X-WP-TotalPages");
		//var totarticoli = req.getResponseHeader("X-WP-Total");getAllResponseHeaders

		console.log(req);
		console.log(req.getAllResponseHeaders());
		console.log(req.getResponseHeader('Pragma'));
		console.log(req.getResponseHeader('X-WP-Total'));
		$http({
			method: 'GET',
			url: 'http://managed.nattodaisuki.com/wp-json/posts/'
		}).success(function(a,b,c,d,e){
			console.log(c());
			console.log(d);
			console.log(e);

		});
		/*
		var test = $resource(
			'http://managed.nattodaisuki.com/wp-json/posts/',
			{},
			{
				'query': {
					method: 'GET',
					withCredentials: true,
					isArray: true,
					responseType:"json"
				},
				'post': {
					method: 'POST',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				},
				'get': {
					method:'GET'
				}
			}
		);
		test.query(function( data, headers){
			console.log(data);
			console.log(headers());
		}).$promise.then(function(value, status, headers, config){
			console.log(value);
			console.log(status);
			console.log(headers);
			console.log(config);
		});
*/
/*
		makQuery.wp_posts( $url ).query(function( data, headers){
			console.log(data);
			console.log(headers());
		});
*/
		/*
		makQuery.wp_posts( $url ).then(function(json, status, headers, config){
			console.log(headers);
			console.log(json.headers('X-Content-Type-Options'));
			$scope.wp_posts = json.data;
		});
		*/
	});

	makController.controller('Single', function( $scope, $stateParams, makConfig, makQuery, makPost ) {
		console.log($stateParams);
		var $apiurl = makConfig.apiUrl;
		var $url = $apiurl + 'wp-json/posts/' + $stateParams.ID + '/?'
		+ [
			'callback=JSON_CALLBACK'
		].join('&');
		makQuery.wp_posts( $url ).then(function(json){
			$scope.wp_post  = json.data;
			$scope.mak_post = makPost.mak_post( $scope.wp_post ).post;
		});
	});

	makController.controller('Pages', function( $scope, $stateParams, makConfig, makQuery, makPost ) {
		console.log($stateParams);
		var $apiurl = makConfig.apiUrl;
		var $url = $apiurl + 'wp-json/pages/' + $stateParams.pagename + '/?'
		+ [
			'callback=JSON_CALLBACK'
		].join('&');
		makQuery.wp_posts( $url ).then(function(json){
			$scope.wp_post  = json.data;
			$scope.mak_post = makPost.mak_post( $scope.wp_post ).post;
		});
	});

})(window, window.angular);
