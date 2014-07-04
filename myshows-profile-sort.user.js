// ==UserScript==
// @name        MyShows: sort serials
// @namespace   https://github.com/powerman/userjs-myshows
// @description Sort serials in alphabetic order on myshows.ru
// @include     http://myshows.ru/profile/
// @match       http://myshows.ru/profile/
// @downloadURL https://github.com/powerman/userjs-myshows/raw/master/myshows-profile-sort.user.js
// @updateURL   https://github.com/powerman/userjs-myshows/raw/master/myshows-profile-sort.user.js
// @version     2.4
// @grant       none
// ==/UserScript==

window.addEventListener('load', function(){
	'use strict';

	function restore_hover(){
		// this was copied from $(document).ready() handler in
		// http://myshows.ru/shared/minify.php?2&files=/shared/js/fe/locale/ru.js,/shared/js/fe/jquery.js,/shared/js/fe/jquery.movable-label.js,/shared/js/fe/jquery.fancybox.js,/shared/js/fe/jquery.checkboxes.js,/shared/js/fe/script.js,/shared/js/fe/md5.js,/shared/js/fe/script.custom.js,/shared/js/ext/swfobject/swfobject.js,/shared/js/fe/utils/cookie.js,/shared/js/fe/myshows.js,/shared/js/fe/social.js
		$('.status-returning a').hover (
			function () {
				showHint('', Lang.statuses.s_returning, this, $(this).parent().width()-4 , 2 );
			},
			function () {
				hideHint();
			}
		);

		$('.status-new a').hover (
			function () {
				showHint('', Lang.statuses.s_new, this, $(this).parent().width()-4 , 2 );
			},
			function () {
				hideHint();
			}
		);

		$('.status-dead a').hover (
			function () {
				showHint('', Lang.statuses.s_dead, this, $(this).parent().width()-4 , 2 );
			},
			function () {
				hideHint();
			}
		);

		$('.status-tbd a').hover (
			function () {
				showHint('', Lang.statuses.s_tbd, this, $(this).parent().width()-4 , 2 );
			},
			function () {
				hideHint();
			}
		);
	}

	function sort_shows(){
		// sort lists at left panel
		$('div.lside ul').html(function(){
			return $(this).children().sort(function(a,b){
				return $(a).text() < $(b).text() ? -1 : 1;
			});
		});
		// sort main content
		$('div.bserial').html(function(){
			return $(this).children('h4').map(function(){
				return $(this).nextUntil('h4').andSelf();
			}).sort(function(a,b){
				return a.first().text() < b.first().text() ? -1 : 1;
			}).map(function(){
				return this.get();
			});
		});
	}
	sort_shows();
	hideHint();
	restore_hover();

	$('.watch-episode').live('click', function(){
		$('#content-inner').one('DOMNodeInserted', sort_shows);
	});
}, false);
