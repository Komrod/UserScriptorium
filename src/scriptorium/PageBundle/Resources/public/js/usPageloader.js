/*
 * UserScriptorium Pageloader and JQuery loader
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
	 * Apply page load on click event of links, load the HTML in center container
	 */
	window.usPageloader = function(selector)
	{
		selector = selector || '';
		
		$(selector + ' a:not(.pl-ignore)').click(function() {
			
			// already loading a page
			if (window.usPageloaderActive) {
				// request below 1 second is canceled
				var now = +new Date();
				if (window.usPageloaderTimeout && now-1000 <= window.usPageloaderTimeout ) {
					return false;
				}
			}
			
			var url = $(this).attr('href');
			
			// adding
			if (url.indexOf('?') == -1) {
				var urlShort = url + '?format=short';
			} else {
				var urlShort = url + '&format=short';
			}
				
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
	
	/**
	 * Load url in specified selected element
	 */
	window.usJQueryloader = function(selector, url, options)
	{
		options = options || {};
		
		options.dataType = options.dataType || 'html';
		options.preloadHTML = options.preloadHTML || '<center><img src="/bundles/userscriptorium/img/jquery-preloading.gif" width="24" height="24" /></center>';
		options.errorHTML = options.errorHTML || '';
		options.error = options.error || function (xhr, status, error) { };
		options.success = options.success || function (response, status, xhr) { };
		options.complete = options.complete || function (xhr, status) { };
		
		// page is loading
		$(selector).html(options.preloadHTML);
		
		$.ajax({
			  url: url,
			  dataType: options.dataType,
			}).error(function(xhr, status, error) {
				$(selector).html(options.errorHTML);
				return options.error(xhr, status, error);
			}).success(function(response, status, xhr) {
				$(selector).html(response);
				return options.success(response, status, xhr);
			}).complete(function(xhr, status) {
				return options.complete(xhr, status);
			});
	}
	
	
	// init page loader links
	usPageloader();
	
	// init Tooltip of the header
	$('#page-loading .error').tooltip();
});
