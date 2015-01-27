'use strict';

angular.module('assemblyKit')
.controller('MainCtrl', ['$scope', '$http',
  function($scope, $http) {
	console.log($scope);
    $http({
      method: 'get',
      url: 'http://managed.nattodaisuki.com/wp-json/posts/',
      withCredentials: true
    }).
　　success(function(data) {
      $scope.companies = data;
    }).
　　error(function(data, status) {
      alert('通信エラーが発生しました');
    });

    $scope.orderProp = 'age';
  }]
);
/*
(function($) {
	//Setting
	var $remoteDomain = 'http://managed.nattodaisuki.com/';
	var $localDomain  = 'http://nattodaisuki.com/';
	var $dir          = location.href.replace( $localDomain, '' ).split('/');
	var $storage      = sessionStorage;
	var $nav          = $('#global-nav');

	function restApiPermalink() {
		console.log($dir);
		$.each( $dir, function( index, el ) {
			console.log( index );
			console.log( el );
			console.log( isFinite( el ) );
		});
	}
	function getWpJson( $key, $value ) {
		$.ajax({
			type: 'GET',
			url: $remoteDomain + 'wp-json/posts/',
			dataType: 'json',
			cache : true
		}).done(function(json) {
			var len = json.length;
			console.log(json);
			for (var i = 0; i < len; i++) {
				slug = json[i].slug;
				link = json[i].link.replace('managed.', '');
				$(".ajax").append('<li class="single" data-type="' + slug + '"><a href="' + link + '">' + json[i].title + '</a></li>');
			}
		}).fail(function(json) {
			console.log(json);
		});
	}
	function getWpJsonNav( $key, $value ) {
		$nav_id = $nav.attr('data-json');
		$.ajax({
			type: 'GET',
			url: $remoteDomain + 'wp-json/menus/' + $nav_id + '/content',
			dataType: 'json',
			cache : true
		}).done(function(json) {
			var len = json.length;
			console.log(json);
			$nav.append(json.content);
		}).fail(function(json) {
			console.log(json);
		});
	}
	getWpJson();
	getWpJsonNav();
	$(document).on( 'click', 'li.single a', function(event) {
		var $type = $(this).parent('li').attr('data-type');
		$storage.setItem( 'type', $type );
	});

})(jQuery);
 */
