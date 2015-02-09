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
				var $query = $resource(
					$url,
					{},
					{
						'query': {
							method:'GET',
							isArray:true
						},
						'get': {
							method:'GET',
							isArray:false
						}
					}
				);
				//var $query = resource.get({}, function( query, headers ){});
				return $query;
				var user = User.get({}, function(u, getResponseHeaders){
					console.log(u);
					console.log(getResponseHeaders('X-WP-Total'));
				});
				/*
				return $resource(
					$url,
					{},
					{
						'query': {
							method:'GET',
							isArray:true,
							responseType:'json'
						}
					}
				);
				*/
			}
		}
		/*
		return {
			wp_posts: function ( $url ) {
				return $http.get(
					$url
				).success(function(data, status, headers, config) {
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
					content : $sce.trustAsHtml( $menu )
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
