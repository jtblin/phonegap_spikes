var PGS = PGS || {};

PGS.Compass = {
	init: function () {
		$.mobile.loading('show');
		navigator.compass.watchHeading(PGS.Compass.onSuccess, PGS.Compass.onError, PGS.Compass.options);
	},
	onSuccess: function (heading) {
		$.mobile.loading('hide');
		var newHeading = Math.round(heading.magneticHeading);
		$('#heading').html(newHeading + "&deg;");
		// TODO: fix - this code only works on webkit browsers, not wp7
		$('#compass').css('-webkit-transform', 'rotate(' + (360 - newHeading) + 'deg)');
	},
	onError: function (compassError) {
		$.mobile.loading('hide');
		navigator.notification.alert("Compass error: " + compassError.code, null, 'Uh oh!');
	},
	options: {
		frequency: 100
	}
};
