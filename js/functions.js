function checkRequirements () {
	if (navigator.connection.type == Connection.NONE) {
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
	$(document).on('pageshow', '#image-page', Image.capture);
	$(document).on('pageshow', '#compass-page', Compass.init);
	$(document).on(
			'pageshow',
			'#map-page',
			function () {
				var geolocationOptions = {
					timeout: 15 * 1000, // 15 seconds
					maximumAge: 10 * 1000, // 10 seconds
					enableHighAccuracy: true
				};
				var position = new Position();
				$.mobile.loading('show');
				navigator.geolocation.getCurrentPosition(
						function (location) {
							// Save the position in the history log
							position.savePosition(
									new Coords(
											location.coords.latitude,
											location.coords.longitude,
											location.coords.accuracy
									)
							);
							// Update the saved position to set the address name
							Map.requestLocation(position);
							Map.displayInfo(position);
							Map.displayMap(location, null);
							$.mobile.loading('hide');
						},
						function (error) {
							navigator.notification.alert(
									'Unable to retrieve your position. Is your GPS enabled?',
									function(){
										alert("Unable to retrieve the position: " + error.message);
									},
									'Error'
							);
							$.mobile.loading('hide');
							$.mobile.changePage('index.html');
						},
						geolocationOptions
				);
			}
	);
}