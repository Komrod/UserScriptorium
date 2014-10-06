/*
 * UserScriptorium Pageloader
 * Copyright 2014 Thierry DE LAPEYRE
 */

$( document ).ready(function() {
	
	/**
	 * Detects Forward and Back navigation in browser
	 */
	window.onpopstate = function(e) {
	    if (e.state) {
	        document.getElementById("page-full").innerHTML = e.state.html;
	        document.title = e.state.pageTitle;
	    }
	};
	
	/**
	 * Load page HTML in center container
	 */
	window.usPageloader = function(selector)
	{
		selector = selector || '';
		
		$(selector + ' a:not(.reload)').click(function() {
			
			// already loading a page
			if (window.usPageloaderActive) {
				// request below 1 second is canceled
				var now = +new Date();
				if (window.usPageloaderTimeout && now-1000 <= window.usPageloaderTimeout ) {
					return false;
				}
			}
			
			var url = $(this).attr('href');
			var urlShort = url + '?format=short';
			$.ajax({
				  url: urlShort,
				  dataType: "html",
				}).error(function(xhr, status, error) {
					// page has an error
					$('#page-loading img').hide();
					$('#page-loading .error')
						.attr('data-original-title', 'There was an error: ' + xhr.status + " " + xhr.statusText)
						.show();
				}).success(function(response, status, xhr) {
					// page loaded successfully
					$('#page-full').html(response);
					usPageloader('#page-full');
					$('#page-loading').hide();
					$('#page-loading .error').hide();
					var title = $('<div>'+response+'</div>').find('div[data-name="page-infos"]').attr('data-title');
					var state = { html: response, pageTitle: title}
					window.history.pushState(state, title, url); 
				}).complete(function(xhr, status) {
					window.usPageloaderActive = false;
				});
			
			// page is loading
			window.usPageloaderActive = true;
			window.usPageloaderTimeout = +new Date();
			$('#page-loading').show();
			$('#page-loading .error').hide();
			$('#page-loading img').show();
			return false;
		});
	}
	
	usPageloader();
	
	// init Tooltip
	$('#page-loading .error').tooltip();
});
