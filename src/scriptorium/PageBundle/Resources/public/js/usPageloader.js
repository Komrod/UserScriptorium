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
		
		$(selector + ' a').click(function() {
			var url = $(this).attr('href');
			var urlShort = url + '?format=short';
			$('#page-full').load(urlShort, function (response, status, xhr) {
				console.log(xhr);
				if (status == 'error') {
					// page has an error
					$('#page-loading img').hide();
					$('#page-loading .error')
						.attr('data-original-title', 'There was an error: ' + xhr.status + " " + xhr.statusText)
						.show();
				} else
				{
					// page loaded successfully
					usPageloader('#page-full');
					$('#page-loading').hide();
					$('#page-loading .error').hide();
					var title = $(response).find('div[name="page-infos"]').attr('data-title');
					var state = { html: response, pageTitle: title}
					window.history.pushState(state, title, url); 
				}
			});
			
			// page loading
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
