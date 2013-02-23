var Compass = {
	init: function () {
		$.mobile.loading('show');
		navigator.compass.watchHeading(Compass.onSuccess, Compass.onError, Compass.options);
	},
	onSuccess: function (heading) {
		$.mobile.loading('hide');
		var newHeading = Math.round(heading.magneticHeading);
		$('#heading').html(newHeading + "&deg;");
		$('#compass').css('-webkit-transform', 'rotate(' + 360 - newHeading + 'deg)');
	},
	onError: function (compassError) {
		$.mobile.loading('hide');
		navigator.notification.alert("Compass error: " + compassError.code, null, 'Uh oh!');
	},
	options: {
		frequency: 100
	}
};
