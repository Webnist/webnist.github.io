(function(window, angular, undefined) {'use strict';

	/* App Module */
	var makController = angular.module('makController', []);

	makController.controller('GlobalMenu', function( $scope, $sce, makConfig, makQuery, makMenu ) {
		var $apiurl  = makConfig.apiUrl;
		var $menu_id = makConfig.menu_id;
		var $url = $apiurl + 'wp-json/menus/' + $menu_id +'/content/?'
		+ [
			'callback=JSON_CALLBACK'
		].join('&');
		//$scope.mak_data = makQuery.wp_posts( $url );
		makQuery.wp_posts( $url ).get(function( data, headers){
			console.log(headers());
			$scope.mak_menu = $sce.trustAsHtml( data.content );
		});
	});
	makController.controller('SideBar', function( $scope, makConfig, makQuery, makMenu ) {
		/*
		var $apiurl  = makConfig.apiUrl;
		var $menu_id = makConfig.menu_id;
		var $url = $apiurl + 'wp-json/taxonomies/category/terms/?'
		+ [
			'callback=JSON_CALLBACK'
		].join('&');
		$scope.mak_data = makQuery.wp_posts( $url ).query({isArray:false});
		$scope.mak_categories = $scope.mak_data;
		*/
	});


	makController.controller('the_post', function( $rootScope, $scope, makPost ) {
		var $post       = $scope.wp_post;
		$scope.mak_post = makPost.mak_post( $post ).post;
	});

	makController.controller('Archive', function( $scope, $stateParams, makConfig, makQuery, $http ) {
		var $apiurl = makConfig.apiUrl;
		var $terms  = angular.isUndefined( $stateParams.terms ) ? '' : $stateParams.terms;
		var $tags   = angular.isUndefined( $stateParams.tags ) ? '' : $stateParams.tags;
		var $url    = $apiurl + 'wp-json/posts/?'
		+ [
			'filter[category_name]=' + $terms,
			'filter[tag]=' + $tags
		].join('&');
		$scope.wp_posts = makQuery.wp_posts( $url ).query();
			console.log($scope.wp_posts);
		makQuery.wp_posts( $url ).query(function( data, headers){
			console.log(headers());
		});
		/*
		makQuery.wp_posts( $url ).then(function(json){
			console.log($scope);
			console.log(json.headers("last-modified"));
			$scope.wp_posts = json.data;
		});
		*/
	});

	makController.controller('Single', function( $scope, $stateParams, makConfig, makQuery, makPost ) {
		var $apiurl = makConfig.apiUrl;
		var $url = $apiurl + 'wp-json/posts/' + $stateParams.ID + '/?'
		+ [
			'callback=JSON_CALLBACK'
		].join('&');
		$scope.wp_post = makQuery.wp_posts( $url ).query();
		$scope.mak_post = makPost.mak_post( $scope.wp_post ).post;
	});

	makController.controller('Pages', function( $scope, $stateParams, makConfig, makQuery, makPost ) {
		var $apiurl = makConfig.apiUrl;
		var $url = $apiurl + 'wp-json/pages/' + $stateParams.pagename + '/?'
		+ [
			'callback=JSON_CALLBACK'
		].join('&');
		$scope.wp_post = makQuery.wp_posts( $url ).query();
		$scope.mak_post = makPost.mak_post( $scope.wp_post ).post;
	});

})(window, window.angular);
