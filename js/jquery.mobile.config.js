$(document).on(
		'mobileinit',
		function()
		{
			// Default pages' transition effect
			$.mobile.defaultPageTransition = 'slide';
			// Page Loader Widget
			$.mobile.loader.prototype.options.textVisible = true;
			// Theme
			$.mobile.page.prototype.options.theme  = 'c';
			$.mobile.page.prototype.options.headerTheme = 'c';
			$.mobile.page.prototype.options.contentTheme = 'c';
			$.mobile.page.prototype.options.footerTheme = 'c';
			$.mobile.page.prototype.options.backBtnTheme = 'c';
		}
);