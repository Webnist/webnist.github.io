'use strict';

/* App Module */
var wpRestApi = angular.module('makAPP', [
	'ngRoute',
	'ngResource'
]);

wpRestApi.config( function($routeProvider, $locationProvider ) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$routeProvider
	.when('/', {
		templateUrl: '/templates/archive.html',
		controller: 'Archive'
	})
	.when('/archives/category/:terms', {
		templateUrl: '/templates/archive.html',
		controller: 'Archive'
	})
	.when('/archives/tag/:tags', {
		templateUrl: '/templates/archive.html',
		controller: 'Archive'
	})
	.when('/archives/:ID', {
		templateUrl: '/templates/single.html',
		controller: 'Single'
	})
	.when('/:pagename', {
		templateUrl: '/templates/single.html',
		controller: 'Pages'
	});
});


wpRestApi.value('makConfig', {
	apiUrl:        'http://managed.nattodaisuki.com/',
	thumbnailSize: 'thumbnail'
});

wpRestApi.factory('makQuery', function( $rootScope, $routeParams, $http ) {
	return {
		wp_posts: function ( $url ) {
			return $http.get($url).success( function( data ){
				return data;
			});
		}
	}
});

wpRestApi.factory('makPost', function( makConfig ) {
	var $thumbnail_size = makConfig.thumbnailSize;
	return {
		mak_post : function( $post ) {
			var $thumbnail        = $post.featured_image;
			var $thumbnail_id     = $thumbnail ? $thumbnail.ID : false;
			var $thumbnail_height = $thumbnail ? $thumbnail.attachment_meta.sizes[$thumbnail_size].height : false;
			var $thumbnail_url    = $thumbnail ? $thumbnail.attachment_meta.sizes[$thumbnail_size].url : false;
			var $thumbnail_width  = $thumbnail ? $thumbnail.attachment_meta.sizes[$thumbnail_size].width : false;
			var $thumbnail_title  = $thumbnail ? $thumbnail.title : false;

			var $query            = {
				post: {
					post_id            : $post.ID,
					author_id          : $post.author.ID,
					author_avatar      : $post.author.avatar,
					author_description : $post.author.description,
					author_name        : $post.author.name,
					post_content       : $post.content,
					post_date          : $post.date,
					post_excerpt       : $post.excerpt,
					has_thumbnail      : $thumbnail,
					thumbnail_id       : $thumbnail_id,
					thumbnail_height   : $thumbnail_height,
					thumbnail_url      : $thumbnail_url,
					thumbnail_width    : $thumbnail_width,
					thumbnail_title    : $thumbnail_title,
					post_title         : $post.title,
					permalink          : $post.link,
				}
			};
			return $query;
		}
	};
});

wpRestApi.controller('Archive', function( $scope, $routeParams, makConfig, makQuery, makPost ) {
	var apiurl = makConfig.apiUrl;
	var url = apiurl + 'wp-json/posts/?'
	+ [
		'callback=JSON_CALLBACK'
	].join('&');
	makQuery.wp_posts(url).then(function(json){
		$scope.wp_posts = json.data;
	});
});

wpRestApi.controller('Single', function( $scope, $routeParams, makConfig, makQuery, makPost ) {
	var apiurl = makConfig.apiUrl;
	var url = apiurl + 'wp-json/posts/' + $routeParams.ID +'/?'
	+ [
		'callback=JSON_CALLBACK'
	].join('&');
	makQuery.wp_posts(url).then(function(json){
		$scope.wp_post  = json.data;
		$scope.mak_post = makPost.mak_post( $scope.wp_post ).post;
	});
});

wpRestApi.controller('Pages', function( $scope, $routeParams, makConfig, makQuery, makPost ) {
	var apiurl = makConfig.apiUrl;
	var url = apiurl + 'wp-json/pages/' + $routeParams.pagename +'/?'
	+ [
		'callback=JSON_CALLBACK'
	].join('&');
	makQuery.wp_posts(url).then(function(json){
		$scope.wp_post  = json.data;
		$scope.mak_post = makPost.mak_post( $scope.wp_post ).post;
	});
});

wpRestApi.controller('the_post', function( $rootScope, $scope, makPost ) {
	var $post       = $scope.wp_post;
	$scope.mak_post = makPost.mak_post( $post ).post;
});
