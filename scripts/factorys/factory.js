(function(window, angular, undefined) {'use strict';

	/* App Module */
	var makFactory = angular.module('makFactory', []);

	makFactory.factory('makHeader', function( $http ) {
		return {
			header: function ( $url ) {
				return $http.headers.get(
					$url
				).success( function( data ){
					return data;
				}).error(function(data, status) {
					return data;
				});
			}
		}
	});

	makFactory.factory('makQuery', function( $http, $resource ) {
		return {
			wp_posts: function ( $url ) {
				return $resource(
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
			}
		}
		/*
		return {
			wp_posts: function ( $url ) {
				return $http.get(
					$url
				).success(function(data, status, headers, config) {
					console.log(headers());
					return data, status, headers, config;
				}).error(function(data, status, headers, config) {
					return data, status, headers, config;
				});
			}
		}
		return {
			wp_posts: function ( $url ) {
				return $http({
					method: 'OPTIONS',
					url: $url,
					headers: {'Access-Control-Request-Headers': 'Content-Type, Accept, X-WP-Total, X-WP-TotalPages, Link'}
				}).success(function(data, status, headers, config) {
					console.log(headers());
					return data, status, headers, config;
				}).error(function(data, status, headers, config) {
					return data, status, headers, config;
				});
			}
		}
		*/
	});

	makFactory.factory('makMenu', function( $sce ) {
		return {
			mak_menu : function( $menu ) {
				var $query = {
					content : $sce.trustAsHtml( $menu.content )
				}
				return $query;
			}
		};
	});

	makFactory.factory('makPost', function( $sce, makConfig ) {
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
						post_content       : $sce.trustAsHtml( $post.content ),
						post_date          : $post.date,
						post_excerpt       : $sce.trustAsHtml( $post.excerpt ),
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

})(window, window.angular);
