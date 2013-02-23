function checkRequirements () {
	if (navigator.connection && navigator.connection.type == Connection.NONE) {
		navigator.notification.alert(
				'To use this app you must enable your internet connection',
				function(){},
				'Warning'
		);
		return false;
	}
	return true;
}
function updateIcons () {
	if ($(window).width() > 480) {
		$('a[data-icon], button[data-icon]').each(
				function () {
					$(this).removeAttr('data-iconpos');
				}
		);
	} else {
		$('a[data-icon], button[data-icon]').each(
				function()
				{
					$(this).attr('data-iconpos', 'notext');
				}
		);
	}
}
/**
 * Initialize the application
 */
function initApplication () {
	$('#get-location').click(function () {
		if (checkRequirements() === false) {
			$(this).removeClass('ui-btn-active');
			return false;
		}
	});
	$(document).on('pagebeforecreate orientationchange', updateIcons);
	$(document).on('pageshow', '#image-page', PGS.Image.capture);
	$(document).on('pageshow', '#compass-page', PGS.Compass.init);
	$(document).on('pageshow', '#map-page', PGS.Map.init);
}